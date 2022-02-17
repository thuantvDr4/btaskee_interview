import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer, createNavigationContainerRef, } from '@react-navigation/native';
import { LogBox } from 'react-native';
import auth from '@react-native-firebase/auth';
//
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import {AuthContext} from "@providers/AuthProvider";

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

//----->
const navigationRef = createNavigationContainerRef()

//----------->
const RootStack =()=>{
    const {user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <NavigationContainer ref={navigationRef}>
            {!user?
                <AuthStack/>
                :
                <MainStack/>
            }

        </NavigationContainer>
    )

}

export  default  RootStack;