import React, {useState, useRef, useEffect, useMemo} from 'react';
import {Animated, TouchableOpacity} from 'react-native'
import {Box, Text, Center, FlatList, HStack, Pressable, Spinner, Modal} from 'native-base';
import tw from 'twrnc'
import Video from "react-native-video";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useNavigation} from "@react-navigation/native";

//--Components
import SliderBar from './SliderBar';

//utils
import {getHeight, getWidth} from "@utils/dimensions";
import TrackPlayer from "react-native-track-player";


//Constant
const cardWidth = getWidth();
const cardHeight = getHeight()*0.4;

//----------------->Main
const DynamicVideo =({source, width, height, resizeMode='cover', paused,})=>{
    //refs
    const videoRef = useRef(null);
    //
    const [isPaused, setIsPaused] = useState(false);
    const [showMaskCover, setShowMaskCover] = useState(false);
    const [loader, setLoader] = useState(false);
    const [isSeeking, setIsSeeking] =useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [seek, setSeek] = useState(0);
    const [isMuted, setIsMuted] = useState(true)

    //--->clear

    useEffect(()=>{
        //
        return ()=>{
            clearTimeout();
        };
    },[])
    //



    useEffect(()=>{
        //
        setIsPaused(paused)
    },[paused])
    //

    useEffect(()=>{
        if(showMaskCover){
            setTimeout(()=>{
                setShowMaskCover(false)
            },3000)
        }
        //
        return ()=>{
            clearTimeout();
        };
    },[showMaskCover])


    //--toggleControlBar
    const toggleControlBar =()=>{
        setShowMaskCover(!showMaskCover)
    }

    //----togglePaused
    const togglePaused =()=>{
        setIsPaused(!isPaused);
    }

    //----onChangeSeek
    const onChangeSeek =(val)=>{
        videoRef.current.seek(val);
        setIsPaused(false);
        // await TrackPlayer.seekTo(val);
        // await TrackPlayer.play();
        setTimeout(async () => {
            setIsSeeking(false);
        }, 1000);
    }

    //---handleFullMode
    const handleFullScreen =()=>{
        setIsPaused(true)
        setShowMaskCover(false);
        navigation.navigate("VideoFullScreen")
    }



    //-------------->Return
    return <Box bgColor={'gray.900'}>
        {/* ---List--*/}
        <Center w={width}>
            <Pressable onPress={toggleControlBar}>
                <Video source={source}   // Can be a URL or a local file.
                    // controls={true}
                    //  fullscreen={isFullScreen}
                       muted={isMuted}
                       resizeMode={resizeMode}
                       paused={isPaused}
                       ref={videoRef}
                       repeat={true}
                       onProgress={({currentTime})=>setPosition(currentTime)}
                       onLoad={({duration})=>{
                           setLoader(true);
                           setDuration(duration)
                       }}
                       onReadyForDisplay={()=>setLoader(false)}
                       onError={(e)=>setLoader(false)}
                       style={{width:width, height:height}} />
            </Pressable>
        </Center>

        {/* ---Loader--*/}
        {loader&&
            <Center w={width} h={height}  position={'absolute'} style={tw`top-0, left-0 right-0 bottom-0`}  w={width} h={cardHeight} bgColor={'gray.900'} opacity={0.8}>
                <Spinner size={'lg'} color={'gray.100'}/>
            </Center>
        }

        {/* ---mask-cover -controlBar--*/}
        {showMaskCover &&
            <Pressable onPress={toggleControlBar}
                       position={'absolute'}
                       style={tw`top-0, left-0 right-0 bottom-0`}
                       w={width} h={height} >
                <Center w={width} h={height}>
                    {/* --muted--*/}
                    <TouchableOpacity
                        onPress={()=>setIsMuted(!isMuted)}
                        activeOpacity={0.8}
                        style={[tw`absolute top-1 right-6 w-10 h-10 
                        rounded-full bg-gray-600
                        items-center 
                        justify-center`]}>
                        <FontAwesome5 name={isMuted?'volume-mute' : 'volume-up'}
                                      size={16}
                                      color={'#fafafa'}/>
                    </TouchableOpacity>

                    {/*---play--*/}
                    <TouchableOpacity
                        onPress={togglePaused}
                        activeOpacity={0.8}
                        style={[tw`w-16 h-16 rounded-full bg-gray-500 items-center justify-center`]}>
                        <FontAwesome5 name={isPaused?'play' : 'pause'} size={20} color={'#fafafa'}/>
                    </TouchableOpacity>

                    {/* ---slider---*/}
                    <Box w={width} position={'absolute'} bottom={0}>
                        <SliderBar
                            onFullScreen={handleFullScreen}
                            onChange={(val)=>{
                                setIsPaused(true);
                                setIsSeeking(true);
                                setSeek(val)
                            }}
                            onChangeEnd={onChangeSeek}
                            duration={duration}
                            value={isSeeking ? seek : position}/>
                    </Box>
                </Center>
            </Pressable>
        }
    </Box>
}

export default DynamicVideo;