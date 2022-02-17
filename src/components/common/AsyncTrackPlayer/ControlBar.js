import React, {useEffect, useMemo, useRef, useState} from "react";
import {Center, HStack, Pressable, Spinner} from 'native-base';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {TouchableOpacity} from 'react-native';
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
//
import {getWidth} from "@utils/dimensions";


const IconPress =({name, size=24, color='#424242', onPress,})=>{

    if(name ==='loading'){
        return <Pressable>
            <Spinner size="lg" color={color} />
        </Pressable>
    }
    //
    return <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}>
        <FontAwesome5 name={name} size={size} color={color} />
    </TouchableOpacity>
}

//----------------------->Main
const ControlBar =({onNextTo, onPrevTo})=>{
    const playbackState = usePlaybackState();
    const isPlaying = useRef('paused'); //paused play loading
    const [isIcon, setIcon] = useState('play');


    //--->get event play-state
    useEffect(()=>{
        //set the player state
        if (playbackState === 'playing' || playbackState === 3) {
            isPlaying.current = 'playing';
            setIcon('pause');

        } else if (playbackState === 'paused' || playbackState === 2) {
            isPlaying.current = 'paused';
            setIcon('play');
        }
        else if (playbackState === 'ready' || playbackState === 6) {
            isPlaying.current = 'paused';
            setIcon('play');

        }
        else {
            isPlaying.current = 'loading';
            setIcon('loading');
        }
        console.log('---playbackState:',playbackState)

    },[playbackState])


    //--onPlayTo
    const onPlayTo =async ()=>{
        if (isPlaying.current === 'playing') {
           await TrackPlayer.pause();
        } else if (isPlaying.current === 'paused') {
           await TrackPlayer.play();
        }
    };


    //----------------------Return
    return <Center >
        <HStack space={20} justifyContent="space-between" >
            <IconPress name={'backward'} onPress={onPrevTo}/>
            <IconPress name={isIcon} onPress={onPlayTo} size={30}/>
            <IconPress name={'forward'} onPress={onNextTo}/>
        </HStack>
    </Center>
}

export default ControlBar;