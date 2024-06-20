import React, {useState, useEffect, useContext} from "react";
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import Feather from 'react-native-vector-icons/Feather';
import ListTrash from '../../Components/ListTrash';
import {AuthContext} from '../../Context/auth';

function Trash(){

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const {user} = useContext(AuthContext);
    const [refresh, setRefresh] = useState(false)

    const [listTrash, setListTrash] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        let isActive = true;

        async function PushItem(){
            firestore().collection('trash_task').doc(user.uid)
            .collection('tasks')
            .get()
            .then((snapshot) => {
                setListTrash([]);

                let list = [];

                snapshot.docs.map( doc => {
                    list.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                console.log(list)
                setListTrash(list)
            })
        }

        PushItem();

        return () => {
            isActive = false
        }

    }, [isFocused, refresh])

    async function DeletTask(id){
        firestore().collection('trash_task')
        .doc(user.uid)
        .collection('tasks')
        .doc(id)
        .delete()

        setRefresh(!refresh)
    }

    async function RestaurarItem(id){
        const List = firestore().collection('tasks').doc(user.uid).collection('userTasks');
        const trash = firestore().collection('trash_task').doc(user.uid).collection('tasks');

        const itemTrash = await trash.doc(id).get();

        try{
            if(itemTrash.exists){
                await List.add(itemTrash.data());
                await trash.doc(id).delete()
            }else{
                console.log('TAREFA NÃO ENCONTRADA')
            }
        }catch(err){
            console.log(err)
        }

        setRefresh(!refresh)
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.containerNav}>
                <View style={styles.AreaNavi}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Feather
                        name="arrow-left"
                        size={35}
                        color="#000"
                        />
                    </TouchableOpacity>
                    <View style={styles.areaInput}>
                    <TextInput
                        placeholder="Search your notes!"
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        style={styles.input}
                        />                    
                    </View>
                </View>
            </View>

            <FlatList
            showsVerticalScrollIndicator={false}
            data={listTrash}
            renderItem={({item}) => <ListTrash data={item} Delet={() => DeletTask(item.id)} Restaurar={() => RestaurarItem(item.id)}/>}
            />
        </SafeAreaView>
    )
}

export default Trash;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#FFF3F3" //'#f3f3f3'
    },
    containerNav:{
        alignItems: "center",
        justifyContent: "center",
        height: 100
    },
    AreaNavi:{
        width: '85%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D7CBCB", //'#d8d8d8'
        borderRadius: 30,
    },
    areaInput:{
        width: '80%',
    },
    input:{
        fontSize: 20,
        textAlign: "center",
        padding: 10
    },
})