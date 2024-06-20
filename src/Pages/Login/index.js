import React, {useState, useContext} from "react";
import {View, Text, StyleSheet, Image, TextInput, Platform, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator} from 'react-native';

import { AuthContext } from "../../Context/auth";

function Login(){

    const { singUP, loadingAuth, signIn} = useContext(AuthContext)

    const [type, setType] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function SignIn(){
        if(email === '' || password === ''){
            console.log('PREENCHA TODOS OS CAMPOS')
            return;
        };

        await signIn(email, password)
    }

    async function SignUp(){
        if(email === '' || password === '' || name === ''){
            console.log('PREENCHA TODOS OS CAMPOS PARA CADASTRAR')
            return;
        }

        await singUP(email, password, name)
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.areaImage}>
                <Image
                source={require('../../Assets/N.png')}
                style={styles.Image}
                />
            </View>
            <KeyboardAvoidingView style={styles.areaLogin} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <Text style={{color: '#000', fontSize: 35, fontWeight: "bold"}}>Bem vindo(a)!</Text>
                <View style={styles.areaInput}>
                    {type && (
                    <TextInput
                    placeholder="Full Name"
                    keyboardType="name-phone-pad"
                    value={name}
                    onChangeText={(Text) => setName(Text)}
                    style={styles.input}
                    />
                    )}
                    <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(Text) => setEmail(Text)}
                    style={styles.input}
                    />
                    <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(Text) => setPassword(Text)}
                    style={styles.input}
                    />
                </View>
                <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => type ? SignUp() : SignIn()}>
                    {loadingAuth ? (
                        <ActivityIndicator size={20} color="#fff"/>
                    ) : (
                        <Text style={styles.textButton}>{type ? 'Create account' : 'Sign In'}</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: 5}} onPress={() => setType(!type)}>
                    <Text style={{color: '#202020'}}>{type ? 'I already have an account' : 'Create account'}</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    areaImage:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#000',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30
    },
    Image:{
        width: '50%',
        height: '55%'
    },
    areaLogin:{
        flex: 1,
        marginTop: 20,
        backgroundColor: '#fff',
        alignItems: "center",
    },
    areaInput:{
        width: '100%',
        alignItems: "center",
        marginTop: 20
    },
    input:{
        width: '80%',
        height: 45,
        backgroundColor: '#f1f1f1',
        borderColor: '#808080',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 15,
        paddingHorizontal: 10,
        marginTop: 10
    },
    button:{
        width: '50%',
        height: 40,
        marginTop: 20,
        backgroundColor: '#2389EF',
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    textButton:{
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff'
    }
})