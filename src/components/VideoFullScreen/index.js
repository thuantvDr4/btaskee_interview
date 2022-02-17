import React, {useState, useRef, useEffect, useMemo} from 'react';
import {Animated, TouchableOpacity} from 'react-native'
import {Box, Text, Center, FlatList, HStack, Pressable, Spinner, Modal} from 'native-base';
import tw from 'twrnc'
import Video from "react-native-video";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useNavigation} from "@react-navigation/native";
import {useRecoilValue} from "recoil";
import {atomVideoDetail} from "../../recoil/atoms";

//--Components
import SliderBar from "@components/common/AsyncVideo/SliderBar";

//utils
import {getHeight, getWidth} from "@utils/dimensions";


//Constant
const width = getWidth();
const height = getHeight();
const VIDEO ='https://v16-webapp.tiktok.com/d218bd6a0e77212f8bb3d3765f0200f0/61cd5d8e/video/tos/useast5/tos-useast5-ve-0068c002-tx/2b76802c23f34d898302669b24703f71/?a=1988&br=2720&bt=1360&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=Yu12_Fpckag3-I&l=2021123001193301024502205517FB918A&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=ajZ4Nzk6ZmZmOjMzZzczNEApPDQzOzs3Z2Q5N2c5OmkzNmdyb2UvcjQwbS5gLS1kMS9zc2ItLjVfMmE1NjFiMmEzYWI6Yw%3D%3D&vl=&vr='

//----------------->Main
const VideoFullScreen =({url})=>{
    //
    const videoDetail = useRecoilValue(atomVideoDetail);
    //
    const navigation = useNavigation();
    //refs
    const videoRef = useRef(null);
    //
    const [isPaused, setIsPaused] = useState(false);
    const [showMaskCover, setShowMaskCover] = useState(false);
    const [videoUrl, setVideoUrl] = useState(VIDEO)
    const [loader, setLoader] = useState(false);
    const [isSeeking, setIsSeeking] =useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [seek, setSeek] = useState(0);
    const [isMuted, setIsMuted] = useState(false)

    //--->listen event scroll

    useEffect(()=>{
        if(showMaskCover){
            setTimeout(()=>{
                setShowMaskCover(false)
            },3000)
        }
        //
        return ()=>clearTimeout();
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
        setTimeout(async () => {
            setIsSeeking(false);
        }, 1000);
    }

    // handleCloseFullMode
    const handleCloseFullMode =()=>{
        setIsPaused(true)
        setShowMaskCover(false);
        navigation.goBack();
    }

    //-------------->Return
    return <Box bgColor={'gray.900'} flex={'1'}>
        {/* ---List--*/}
        <Center w={width} position={'absolute'} top={0} bottom={0} left={0} right={0}>
            <Pressable onPress={toggleControlBar}>
                <Video source={{uri: videoDetail?.url}}   // Can be a URL or a local file.
                    // controls={true}
                    //  fullscreen={isFullScreen}
                       muted={isMuted}
                       resizeMode={'contain'}
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
        {loader &&
            <Center w={width} h={height}  position={'absolute'} style={tw`top-0, left-0 right-0 bottom-0`}
                    w={width} h={height} bgColor={'gray.900'} opacity={0.8}>
                <Spinner size={'lg'} color={'gray.100'}/>
            </Center>
        }

        {/* ---mask-cover -controlBar--*/}
        {showMaskCover &&
            <Pressable onPress={toggleControlBar} position={'absolute'}
                       style={tw`top-0, left-0 right-0 bottom-0`}  w={width} h={height} >
                <Center w={width} h={height}>
                    {/* --close--*/}
                    <TouchableOpacity
                        onPress={handleCloseFullMode}
                        activeOpacity={0.8}
                        style={[tw`absolute top-10 left-1 w-10 h-10 
                        rounded-full bg-gray-600
                        items-center 
                        justify-center`]}>
                        <FontAwesome5 name={'times'} size={18} color={'#fafafa'}/>
                    </TouchableOpacity>

                    {/* --muted--*/}
                    <TouchableOpacity
                        onPress={()=>setIsMuted(!isMuted)}
                        activeOpacity={0.8}
                        style={[tw`absolute top-10 right-1 w-10 h-10 
                        rounded-full bg-gray-600
                        items-center 
                        justify-center`]}>
                        <FontAwesome5 name={isMuted?'volume-mute' : 'volume-up'} size={18} color={'#fafafa'}/>
                    </TouchableOpacity>

                    {/*---play--*/}
                    <TouchableOpacity
                        onPress={togglePaused}
                        activeOpacity={0.8}
                        style={[tw`w-16 h-16 rounded-full bg-gray-500 items-center justify-center`]}>
                        <FontAwesome5 name={isPaused?'play' : 'pause'} size={20} color={'#fafafa'}/>
                    </TouchableOpacity>

                    {/* ---slider---*/}
                    <Box w={width} position={'absolute'} bottom={height*0.2}>
                        <SliderBar
                            onFullScreen={handleCloseFullMode}
                            onChange={(val)=>{
                                setIsPaused(true);
                                setIsSeeking(true);
                                setSeek(val)
                            }}
                            onChangeEnd={onChangeSeek}
                            duration={duration}
                            value={isSeeking ? seek : position}/>
                    </Box>

                {/* --title-*/}
                    <Center position={'absolute'} bottom={height*0.12} _text={{color:'white'}}>
                        Title
                    </Center>
                </Center>
            </Pressable>
        }
    </Box>
}

export default VideoFullScreen;