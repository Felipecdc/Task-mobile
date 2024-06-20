import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../Pages/Login";
import NewTask from "../Pages/NewTask";

function AuthRoute(){

    const Stack = createNativeStackNavigator()

    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Login"
            component={Login}
            options={{
                headerShown:false
            }}
            />
        </Stack.Navigator>
    )
}

export default AuthRoute;