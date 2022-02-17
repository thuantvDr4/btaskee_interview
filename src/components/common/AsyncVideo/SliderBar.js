import React, {useEffect, useMemo, useRef, useState} from "react";
import {Center, Slider, Pressable, HStack, Box, Text, Button} from 'native-base';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {TouchableOpacity} from 'react-native';
import tw from 'twrnc'
//
import {getWidth} from "@utils/dimensions";

const width = getWidth();

//----------------------->Main
const SliderBar =({onChange,value,
                      onChangeEnd,
                      duration,
                      onFullScreen})=>{

    //---formatTime
    const formatTime = secs => {
        let minutes = Math.floor(secs / 60);
        let seconds = Math.ceil(secs - minutes * 60);

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    };


    //----------------------Return
    return <Center >
        <HStack space={6} w={'100%'} alignItems={'center'}>
            {/*--time--*/}
            <HStack width="20%" alignItems={'center'} space={1}>
                <Text fontSize={'md'} color={'gray.100'}>{formatTime(value)}</Text>
                <Text  fontSize={'md'} color={'gray.100'}>{'/'}</Text>
                <Text  fontSize={'md'} color={'gray.100'}>{formatTime(duration)}</Text>
            </HStack>
            {/*--silder--*/}
            <Box width="60%" >
                <Slider
                    onChange={onChange}
                    onChangeEnd={onChangeEnd}
                    size="sm"
                    value={value}
                    defaultValue={0}
                    minValue={0}
                    maxValue={duration}
                    step={0.1}
                >
                    <Slider.Track bg="info.100">
                        <Slider.FilledTrack bg="info.600"/>
                    </Slider.Track>
                    <Slider.Thumb size={'3'}/>
                </Slider>
            </Box>

        {/*---full-screen--*/}
            <TouchableOpacity onPress={onFullScreen}>
                <FontAwesome5 name={'expand'} size={24} color={'#ffffff'}/>
            </TouchableOpacity>
        </HStack>

    </Center>
}

export default SliderBar;