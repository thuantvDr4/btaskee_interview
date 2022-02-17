import React, {useEffect, useMemo, useRef, useState} from "react";
import {Center, Slider, Pressable, Spinner, Box, Text} from 'native-base';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {TouchableOpacity} from 'react-native';
import TrackPlayer, { usePlaybackState, useProgress, Event } from "react-native-track-player";
import tw from 'twrnc'
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
const SliderBar =()=>{
    //
    const {position, duration} =useProgress();
    const [isSeeking, setIsSeeking] = useState(false);
    const [seek, setSeek] = useState(0);

    //--->get event play-state
    useEffect(() => {
        TrackPlayer.addEventListener(Event.PlaybackTrackChanged, () => {
            setIsSeeking(false);
        });
    }, []);


    //---formatTime
    const formatTime = secs => {
        let minutes = Math.floor(secs / 60);
        let seconds = Math.ceil(secs - minutes * 60);

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    };

    //-----handleChange
    const handleChange = async (val)=>{
       await TrackPlayer.seekTo(val);
        await TrackPlayer.play();
        setTimeout(async () => {
            setIsSeeking(false);
        }, 1000);
    }


    //----------------------Return
    return <Center >
        <Box width="80%" mt="4" mb='0'>
            <Slider
                onChange={(val)=>{
                    TrackPlayer.pause();
                    setIsSeeking(true);
                    setSeek(val)
                }}
                onChangeEnd={handleChange}
                size="lg"
                value={isSeeking ? seek : position}
                defaultValue={0}
                minValue={0}
                maxValue={duration}
                step={0.1}
            >
                <Slider.Track>
                    <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
            </Slider>
        </Box>

    {/*--time--*/}
        <Box width="80%" style={tw`flex-row justify-between`}>
            <Text bold fontSize={'md'} color={'gray.600'}>{formatTime(isSeeking ? seek : position)}</Text>
            <Text bold fontSize={'md'} color={'gray.600'}>{formatTime(duration)}</Text>
        </Box>

    </Center>
}

export default SliderBar;