import React, {useEffect} from "react";
import {Box, Text, Center, FlatList, Pressable, HStack} from 'native-base';
import {TouchableOpacity} from "react-native";
import {AsyncImage, AsyncVideo} from "@components/common";
import tw from 'twrnc'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useRecoilState} from "recoil";

//Utils
import {getWidth, getHeight} from "@utils/dimensions";
//Atoms
import {atomVideoDetail} from "../../recoil/atoms";
//Local-data
import videoData from '../../localData/video.json'


//------CONSTANT
const AUDIO_BOOKS = [
    {
        title: "Video 1",
        artist: "Powfu",
        artwork:"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564",
        id: 1,
        url: videoData[0],
    },
    {
        title: "Video 2",
        artist: "Imagine Dragons",
        artwork:
            "https://kbimages1-a.akamaihd.net/f16e3461-030b-41c0-aed5-03e1a54c3dea/1200/1200/False/design-a-book-cover.jpg",
        id: 2,
        url: videoData[1],
    },
    {
        title: "faded",
        artist: "Alan Walker",
        artwork:
            "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-fall-2019/large/bbcdune.jpg?1384968217",
        id: 3,
        url: videoData[2],
    },
    {
        title: "hate me",
        artist: "Ellie Goulding",
        artwork: "https://images-na.ssl-images-amazon.com/images/I/51foG2y04iL._SS400_.jpg",
        id: 4,
        url: videoData[3]
    },
    {
        title: "Solo",
        artist: "Clean Bandit",
        artwork:
            "https://marketplace.canva.com/EAD7WuSVrt0/1/0/1003w/canva-colorful-illustration-young-adult-book-cover-LVthABb24ik.jpg",
        id: 5,
        url: videoData[4],
    },
    {
        title: "without me",
        artist: "Halsey",
        artwork: "https://dw0i2gv3d32l1.cloudfront.net/uploads/stage/stage_image/37836/optimized_large_thumb_stage.jpg",
        id: 6,
        url: videoData[5],
    },
];

const cardWidth = getWidth()*0.3;
const imgWidth = cardWidth;
const imgHeight = cardWidth*0.8;
const bgColor ='#fafafa';
const maskColor = 'gray.200'
const width = getWidth();

//RenderCardItem
const RenderCardItem=({Data, itemOnPress})=>{
    return <TouchableOpacity
        onPress={itemOnPress}
        activeOpacity={0.8}>
    <Box w={'100%'} my={1} >
        <HStack space={2} bgColor={'gray.700'} p={2}>
            {/*---artWork--*/}
            <Box w={cardWidth}>
            <Center
                zIndex={10}
                width={cardWidth}
                height={cardWidth}
                // bg={bgColor}
                style={{elevation:5}}>
                <AsyncImage source={{uri: Data?.artwork,}}
                            style={[tw`rounded shadow`,{width: imgWidth, height: imgHeight}]}/>


                {/*--play-icon-*/}
                <Center
                    position={'absolute'}
                    zIndex={10}
                    style={[tw`rounded-full`,{elevation:5}]}>
                    <FontAwesome5 name={'play'} size={32} color={'#dbdbdb'}/>
                </Center>
            </Center>

                {/*--mask-shadow-*/}
                <Box  width={cardWidth} height={cardWidth} bg={maskColor}
                      style={[tw`absolute rounded-full left-0 right-0 z-0`,]}/>
            </Box>
            {/*---title--*/}
            <Box w={width-cardWidth -20} px={'2'}>
                <Text color={'gray.100'} fontSize={'sm'} >{Data?.title}</Text>
            </Box>
        </HStack>
    </Box>
    </TouchableOpacity>
}

const VideoPlayer =()=>{
    //
    const [atomVideo, setAtomVideo] = useRecoilState(atomVideoDetail);
    //
    useEffect(()=>{
        setAtomVideo(AUDIO_BOOKS[0])
    },[])

    //---------->
    return <Box flex={'1'}>
         {atomVideo && <AsyncVideo Data={atomVideo}/>}
            {/*---List-refer*/}
            <Box bg={'gray.800'} flex={'1'}>
                <FlatList
                data={AUDIO_BOOKS}
                keyExtractor={(item, index) => `KEY: ${index}`}
                renderItem={({item, index})=><RenderCardItem Data={item} itemOnPress={()=>setAtomVideo(item)}/>}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={()=><Box mt={4} mb={2} px={2}>
                    <Text fontWeight={'bold'} color={'gray.100'}>List video refer</Text>
                </Box>}
                ListFooterComponent={()=><Box my={8}/>}
                />

            </Box>
    </Box>
}

export default VideoPlayer;