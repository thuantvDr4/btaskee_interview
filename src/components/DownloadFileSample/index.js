import React,{useState, useRef} from "react";
import {Box, Text, Center, HStack, Pressable, ScrollView, Avatar, FlatList} from 'native-base';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {TouchableOpacity, Platform} from "react-native";
import tw from 'twrnc'
//
import {getWidth} from "@utils/dimensions";
//
import {AsyncImage, DynamicVideo, InViewPort} from "@components/common";
//Hooks
import {DownloadFileHook} from "@hooks/downloadFile.hook";
//Data
import PostsData from '../../localData/posts.json'
import Video from "react-native-video";

const ios = Platform.OS ==='ios'? true :false;
const width = getWidth();
//------------>

//-------->CardVideo
const CardVideo =({source})=>{
    const videoRef = useRef(null)
    const cardWidth= width;
    const [isPaused, setIsPaused] = useState(true);

    const  handlePausedVideo =(isVisible)=>{
        isVisible? setIsPaused(false): setIsPaused(true);
    }

    return <InViewPort onChange={handlePausedVideo}>
        <Pressable>
        <Video source={source}   // Can be a URL or a local file.
                // controls={true}
            //  fullscreen={isFullScreen}
               muted={true}
               resizeMode={'cover'}
               paused={isPaused}
               ref={videoRef}
               repeat={true}
               style={{width:width, height:cardWidth*0.6}} />
        </Pressable>
    </InViewPort>
}

//---------->React-icon
const ReactIcon =({onPress, iconName, label})=>{
    return <TouchableOpacity onPress={onPress}>
        <HStack alignItems={'flex-end'}>
            <Center rounded={'full'} bg={'white'} p={1}>
                <FontAwesome5 name={iconName} size={20} color={'#696969'}/>
            </Center>
            <Text color={'gray.500'} fontSize={'sm'}>{label}</Text>
        </HStack>

    </TouchableOpacity>
}
//------------>PostCard
const PostCard =({Post})=>{
    const cardWidth= width;
    return <Box space={5} py={4} mb={4} bg={'white'}>
        {/*--title-*/}
        <HStack px={1}>
            <Avatar
                size={'md'}
                bg="gray.400"
                source={{
                    uri:Post?.user?.imageUri,
                }}
            >
                GG
            </Avatar>
            {/*--user-*/}
            <Text fontWeight={'bold'}>@{Post?.user?.username}</Text>
        </HStack>
        {/*---caption--*/}
        <Text px={1} fontWeight={'normal'}>{Post?.description}</Text>

        {/*---cover--*/}
        {Post?.postType === 'image' &&
            <AsyncImage
                resizeMode={'cover'}
                source={{uri:Post?.postUrl}}
                style={{width:cardWidth, height: cardWidth*0.6}}/>
        }
        {Post?.postType === 'video' &&
            <CardVideo source={{uri:Post?.postUrl}}/>
        }
        {/*---*/}
        {/*----*/}
        <HStack space={6} alignItems={'center'} px={2} mt={3}>
            {/*--Like--*/}
            <ReactIcon iconName={'heart'} label={'like'}/>
            {/*---share--*/}
            <ReactIcon iconName={'share'} label={'share'}/>
            {/*--download--*/}
            <ReactIcon iconName={'download'} label={'download'} onPress={null}/>
            {/*---*/}
        </HStack>
    </Box>
}

//--------->
const DownloadFileSample =()=>{
    //
    const {downloadPdfFile,
        pdfFile,
        photoData,
        downloadPhoto
    } = DownloadFileHook();
    //---------->
    return <Box flex={'1'}>
        <FlatList
        data={PostsData}
        renderItem={({item, index})=><PostCard Post={item} downloadPost={null}/>}
        keyExtractor={(item, index) => `KEY: ${index}`}
        />
    </Box>
}

export default DownloadFileSample;