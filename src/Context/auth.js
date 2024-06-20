import React, {useState, createContext, useEffect} from 'react';
import {Keyboard} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function LoadStorage() {
      const storageUser = await AsyncStorage.getItem('@taskapp');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }
    LoadStorage();
  }, []);

  async function singUP(email, password, name) {
    setLoadingAuth(true);
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async value => {
        Keyboard.dismiss();

        let uid = value.user?.uid;

        await firestore()
          .collection('users')
          .doc(uid)
          .set({
            name: name,
            email: email,
            createdAt: firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            let data = {
              uid: uid,
              name: name,
              email: email,
            };
            setUser(data);
            StorageUser(data);
            setLoadingAuth(false);
          });
      })
      .catch(err => {
        console.log(err);
        setLoadingAuth(false);
      });
  }

  async function signIn(email, password) {
    setLoadingAuth(true);

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async value => {
        Keyboard.dismiss();

        let uid = value.user?.uid;

        const userProfile = await firestore()
          .collection('users')
          .doc(uid)
          .get();

        let data = {
          uid: uid,
          name: userProfile.data().name,
          email: email,
        };

        setUser(data);
        StorageUser(data);
        setLoadingAuth(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingAuth(false);
      });
  }

  async function StorageUser(data) {
    await AsyncStorage.setItem('@taskapp', JSON.stringify(data));
    console.log(AsyncStorage);
  }

  async function SignOut() {
    await auth().signOut();
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        singUP,
        loadingAuth,
        loading,
        SignOut,
        signIn,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
