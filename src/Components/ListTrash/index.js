    import React, {useState} from "react";
    import {View, Text, StyleSheet, Touchable, TouchableOpacity, Alert} from 'react-native';

    import firestore from '@react-native-firebase/firestore';

    function ListTasks({data, Delet, Restaurar}){

        function ShowAlert(){
            Alert.alert(
                "Atention",
                "Excluir tarefa permanentemente?",
                [
                    {
                        text: "Cancelar",
                        onPress: () => {},
                        style: "cancel",
                    },
                    {
                        text: "Restaurar",
                        onPress: () => Restaurar()
                    },
                    {
                        text: "Excluir",
                        onPress: () => Delet()
                    }

                ]
            )
        }


        return(
            <TouchableOpacity style={styles.container} onPress={ShowAlert}>
                <View style={styles.areaBox}>
                    <View style={styles.areatitle}>
                        <Text style={{color: '#000', fontWeight: "600", fontSize: 16}}>{data.title}</Text>
                    </View>
                    <View style={styles.areaText}>
                        <Text style={{color: '#303030', fontSize: 14}}>{data.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    export default ListTasks;

    const styles = StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        areaBox:{
            backgroundColor: '#fcfcfc',
            width: '95%',
            marginVertical: 5,
            paddingHorizontal: 5,
            paddingVertical: 8,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#8B8B8B'
        },
        areatitle:{
            borderBottomWidth: 1,
            borderBottomColor: '#d9d9d9',
            backgroundColor: '#FFDBDB'
        },
        areaText:{
            paddingTop: 8
        },
    })