import React, { useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

//Screens
import {Tutorial, Login, Signup} from "@screens";

//----->

const Stack = createNativeStackNavigator();

//--config-options
const showHeader ={
    headerShown: true,
    headerBackTitleVisible: false,
    headerTintColor: 'black',
}
//---->
const nonHeader ={
    title: "",
    headerShown: false,
}

//--------------------------->MAIN
const AuthStack = () => {

    useEffect(() => {
        //
        GoogleSignin.configure({
            webClientId:"504693176138-47g755ie47t0q370ll70fdp2rhlgjj91.apps.googleusercontent.com",
        });
    }, []);

    return (
        <Stack.Navigator
            screenOptions={() => ({
                gestureEnabled: true,
                headerBackground: () => null,
            })}
        >


            <Stack.Screen
                options={{ ...nonHeader}}
                name="Tutorial"
                component={Tutorial}
            />

            <Stack.Screen
                options={{ ...nonHeader}}
                name="Login"
                component={Login}
            />

            <Stack.Screen
                options={{ ...nonHeader}}
                name="Signup"
                component={Signup}
            />

        </Stack.Navigator>
    );
};


export default AuthStack;
