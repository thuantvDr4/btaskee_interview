import React,{useEffect, useState, useCallback, useRef} from "react";
import {Box, Center, Pressable, Spinner,Text, HStack, VStack,Avatar } from 'native-base';
import Video from "react-native-video";
import tw from "twrnc";
import {TouchableOpacity} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import {useSafeAreaInsets} from "react-native-safe-area-context";
//
//utils
import {getHeight, getWidth} from "@utils/dimensions";
//
const URL ="https://v16-webapp.tiktok.com/8dc3979f1d7765a39376e87888a375f8/61cf2175/video/tos/useast2a/tos-useast2a-pve-0037-aiso/e477b65df18b4a2f9f8047b55d594864/?a=1988&br=1720&bt=860&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=Yu12_Fpckag3-I&l=202112310927390102440770740303F0C2&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=MzxtbGY6ZjgzODMzZjgzM0ApOWRpODw1NmVkNzk4PDZlZmcuMWRwcjRnbGhgLS1kL2Nzc19hL2IuNTIyYy8tYWJgX2M6Yw%3D%3D&vl=&vr="
const width =getWidth();
const height = getHeight();

//--Render-icon
const IconReact =({name, onPress,value})=>{
    return <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <VStack space={1} alignItems="center">
            <Fontisto name={name} size={26} color={'#ffffff'}/>
            <Text color={'#ffffff'}>{value}</Text>
        </VStack>
    </TouchableOpacity>
}


const AsyncTiktok =({Data, isFocus})=>{
    console.log(Data)
    //
    const { top, bottom } = useSafeAreaInsets();
    //
    const videoRef = useRef(null)
    //------------>states
    const [post, setPost] = useState(Data)
    const [loader, setLoader] = useState(true)
    const [showMaskCover, setShowMaskCover] = useState(false);
    const [isMuted, setIsMuted] = useState(true)
    const [isPaused, setIsPaused] = useState(false);

    //--->check focus
    useEffect(()=>{
        isFocus? setIsPaused(false) : setIsPaused(true);
    },[isFocus])

    //clear time-out
    useEffect(()=>{
        let _maskCover;
        if(showMaskCover){
          _maskCover =   setTimeout(()=>{
                setShowMaskCover(false);
            },2000)
        }
        //
        return ()=>{
            clearTimeout(_maskCover)
        }

    },[showMaskCover])

    //--->onStateChange
    const togglePaused =useCallback(()=>{
        setIsPaused(!isPaused)
    },[isPaused]);

    //----->togglePlaying
    const toggleMaskCover = useCallback(() => {
        setShowMaskCover((prev) => !prev);
    }, []);


    //---------------->
    return <Box bgColor={'gray.900'}>
        {/* ---List--*/}
        <Pressable onPress={toggleMaskCover}>
            <Center flex={'1'} w={'100%'} h={height}>
                <Video source={{uri:post?.videoUri}}   // Can be a URL or a local file.
                    // controls={true}
                    //  fullscreen={isFullScreen}
                       muted={isMuted}
                       resizeMode={'cover'}
                       paused={isPaused}
                       ref={videoRef}
                       repeat={true}
                       onLoad={({duration})=>{
                           setLoader(true);
                       }}
                       onReadyForDisplay={()=>setLoader(false)}
                       onError={(e)=>setLoader(false)}
                       style={{position:'absolute', top:0, bottom:0, left:0, right:0}} />
            </Center>
        </Pressable>

        {/* ---Loader--*/}
        {loader&&
            <Center w={width} h={height}
                    position={'absolute'}
                    style={tw`top-0, left-0 right-0 bottom-0`}
                   bgColor={'gray.900'} opacity={0.8}>
                <Spinner size={'lg'} color={'gray.100'}/>
            </Center>
        }
        {/* ---mask-cover -controlBar--*/}
        {showMaskCover &&
            <Pressable
                onPress={toggleMaskCover}
                position={'absolute'}
                style={tw`top-0, left-0 right-0 bottom-0`}
                w={width}
                h={height} >
                <Center w={width} h={height}>
                    {/* --muted--*/}
                    <TouchableOpacity
                        onPress={()=>setIsMuted(!isMuted)}
                        activeOpacity={0.8}
                        style={[tw`absolute top-1 right-1 w-12 h-12 
                        rounded-full
                        items-center 
                        justify-center`]}>
                        <FontAwesome5 name={isMuted?'volume-mute' : 'volume-up'} size={30} color={'#fafafa'}/>
                    </TouchableOpacity>

                    {/*---play--*/}
                    <TouchableOpacity
                        onPress={togglePaused}
                        activeOpacity={0.8}
                        style={[tw`w-20 h-20 rounded-full border border-gray-300 items-center justify-center`]}>
                        <FontAwesome5 name={isPaused?'play' : 'pause'} size={30} color={'#fafafa'}/>
                    </TouchableOpacity>
                </Center>
            </Pressable>
        }
        {/* ---user--*/}
        <Box position={'absolute'} bottom={20} left={2}>
            {/*---user--*/}
            <Text fontWeight={'bold'} fontSize={'md'} color={'#ffffff'}>@{post?.user?.username}</Text>
            {/*---comment--*/}
            <Text mt={2} fontWeight={'normal'} fontSize={'sm'} color={'#bdbdbd'}>{post?.description}</Text>
            {/*----*/}
            <HStack space={2} alignItems={'center'} my={2}>
                <FontAwesome5 name={'music'} size={16} color={'#ffffff'}/>
                <Text fontWeight={'bold'} color={'#ffffff'}>{post?.songName}</Text>
            </HStack>
        </Box>

        {/*---react-icon--*/}
        <Box position={'absolute'} bottom={20} right={1}>
            <VStack space={4} alignItems={'center'} my={2}>
                <Avatar
                    mb={3}
                    size={'md'}
                    bg="gray.400"
                    source={{
                        uri: post?.user?.imageUri,
                    }}
                >
                    GG
                </Avatar>
                <IconReact name={'heart'} value={post?.likes}/>
                <IconReact name={'commenting'} value={post?.comments}/>
                <IconReact name={'share-a'} value={post?.shares}/>
            </VStack>
        </Box>
    {/* -----*/}
    </Box>
}

export default AsyncTiktok;