import React from "react";
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

import Routes from "./src/Routes";
import AuthProvider from "./src/Context/auth";

export default function App(){
  return(
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#000' barStyle='light-content' translucent={false}/>
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  )
}
