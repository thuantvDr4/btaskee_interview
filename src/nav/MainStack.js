import * as React from "react";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Tabs
import Tabs from "./Tabs";
//Screens
import {Tutorial} from "@screens";
//
import AudioPlayer from "@components/AudioPlayer";
import VideoPlayer from "@components/VideoPlayer";
import VideoFullScreen from "@components/VideoFullScreen";
import YoutubePlayer from "@components/YoutubePlayer";
import TiktokPlayer from "@components/TiktokPlayer";
import DownloadFileSample from "@components/DownloadFileSample";
import OfflineMode from "@components/OfflineMode";
//

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
const MainStack = () => {
  return (
    <Stack.Navigator
        screenOptions={() => ({
            gestureEnabled: true,
            headerBackground: () => null,
        })}
    >

      <Stack.Screen
        options={{ ...nonHeader}}
        name="Tabs"
        component={Tabs}
      />

        <Stack.Screen
            options={{title: "AudioPlayer",...showHeader}}
            name="AudioPlayer"
            component={AudioPlayer}
        />

        <Stack.Screen
            options={{title: "Video Player",...showHeader}}
            name="VideoPlayer"
            component={VideoPlayer}
        />

        <Stack.Screen
            options={{...nonHeader}}
            name="VideoFullScreen"
            component={VideoFullScreen}
        />

        <Stack.Screen
            options={{...nonHeader}}
            name="YoutubePlayer"
            component={YoutubePlayer}
        />

        <Stack.Screen
            options={{...nonHeader}}
            name="TiktokPlayer"
            component={TiktokPlayer}
        />

        <Stack.Screen
            name={'DownloadFileSample'}
            component={DownloadFileSample}
            options={{title:'Download file sample',...showHeader}}
        />

        <Stack.Screen
            options={{title:'Offline Mode',...showHeader}}
            component={OfflineMode}
            name={'OfflineMode'}/>


    </Stack.Navigator>
  );
};

export default MainStack;
