import React from "react";
import {View, Text, StyleSheet, Touchable, TouchableOpacity, Alert} from 'react-native';

import firestore from '@react-native-firebase/firestore';

function ListTasks({data, Delet, Edit}){

    function AlertDelet(){
        Alert.alert(
            "Atention",
            "Deseja excluir o item?",
            [
                {
                    text: 'Cancelar',
                    onPress: () => {},
                    style: "cancel" 
                },
                {
                    text: 'Excluir',
                    onPress: () => Delet()
                }
            ]
        )
    }

    return(
        <TouchableOpacity style={styles.container} onPress={Edit} onLongPress={AlertDelet}>
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
        backgroundColor: '#E0EBFC'
    },
    areaText:{
        paddingTop: 8
    }
})