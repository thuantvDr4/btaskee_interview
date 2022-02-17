import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
import{RecoilRoot} from 'recoil'
import RootStack from "./src/nav/RootStack";
import {nativeBaseConfig} from "@utils/nativeBaseConfig";
import {AuthProvider} from "@providers/AuthProvider";

function App() {

    return (
        <RecoilRoot>
            <NativeBaseProvider config={nativeBaseConfig}>
                <AuthProvider>
                    <RootStack/>
                </AuthProvider>
            </NativeBaseProvider>
        </RecoilRoot>
    );
}

export default App;
