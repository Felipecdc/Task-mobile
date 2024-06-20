import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../Pages/Home";
import Trash from "../Pages/Trash";
import NewTask from "../Pages/NewTask";

function AppRoutes(){

    const Drawer = createDrawerNavigator()

    return(
        <Drawer.Navigator
        screenOptions={{
            headerShown: false
        }}
        >
            <Drawer.Screen
            name="Home"
            component={Home}
            />
            <Drawer.Screen
            name="Trash"
            component={Trash}
            />
            <Drawer.Screen
            name="NewTask"
            component={NewTask}
            initialParams={{titleU: null, descriptionU: null}}
            />
        </Drawer.Navigator>
    )
}

export default AppRoutes;