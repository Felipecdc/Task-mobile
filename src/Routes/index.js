import React, {useState, useContext} from "react";
import {ActivityIndicator, View} from 'react-native';

import AuthRoute from "./Auth.Routes";
import AppRoutes from "./App.Routes";
import { AuthContext } from "../Context/auth";

function Routes(){

    const {signed, loading} = useContext(AuthContext)

    if(loading){
        return(
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#f9f9f9'}}>
                <ActivityIndicator size={50} color="#000"/>
            </View>
        )
    }

    return(
        signed ? <AppRoutes/> : <AuthRoute/> 
    )
}

export default Routes;

