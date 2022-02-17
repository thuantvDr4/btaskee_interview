import React, {useEffect, useState} from "react";
import {Box, Text, Center, FlatList, Pressable, HStack} from 'native-base';
import {TouchableOpacity} from "react-native";
import {AsyncImage, AsyncYoutube} from "@components/common";
import tw from 'twrnc'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useRecoilState} from "recoil";

//Utils
import {getWidth, getHeight} from "@utils/dimensions";
//Atoms
import {atomVideoDetail} from "../../recoil/atoms";
//Local-data
import youtubeList from '../../localData/YoutubeList.json'


//------CONSTANT

const cardWidth = getWidth()*1;
const cardHeight = cardWidth * 0.5;
const imgWidth = cardWidth;
const imgHeight = cardWidth*0.5;
const maskRadius = imgHeight +20;
const bgColor ='#fafafa';
const maskColor = 'gray.200'
const width = getWidth();
const height = getHeight();


//RenderCardItem
const RenderCardItem=({Data, itemOnPress})=>{
    return <TouchableOpacity
        onPress={itemOnPress}
        activeOpacity={0.8}>
        <Box w={'100%'} my={1} py={6} bgColor={'gray.800'}>
            {/*---cover--*/}
            <Center
                zIndex={10}
                width={'100%'}
                height={cardHeight}
                // bg={bgColor}
                style={{elevation:5}}>
                <AsyncImage source={{uri: Data?.artwork,}}
                            style={[tw`rounded shadow`,{width: cardWidth, height: cardHeight}]}/>


                {/*--play-icon-*/}
                <Center
                    position={'absolute'}
                    zIndex={10}
                    style={[tw`rounded-full`,{elevation:5}]}>
                    <FontAwesome5 name={'youtube'} size={32} color={'#d32f2f'}/>
                </Center>
            </Center>

            {/*--title--*/}
            <Box px={2}>
                <Text color={'gray.100'} fontSize={'sm'} >{Data?.title}</Text>
            </Box>

        </Box>
    </TouchableOpacity>
}

const YoutubePlayer =()=>{
    //
    const [videoPlay, setVideoPlay] = useState(null);
    //
    useEffect(()=>{
        setVideoPlay(youtubeList[0])
    },[])

    //---------->
    return <Box flex={'1'} safeAreaTop>
        {/*--player--*/}
        <Center h={height*0.3} bg={'gray.900'}>
            {videoPlay && <AsyncYoutube youtubeId={videoPlay?.videoId} height={height*0.3}/>}
        </Center>
        {/*---List-refer*/}
        <Box bg={'gray.700'} h={height*0.6}>
            <FlatList
                data={youtubeList}
                keyExtractor={(item, index) => `KEY: ${index}`}
                renderItem={({item, index})=><RenderCardItem Data={item} itemOnPress={()=>setVideoPlay(item)}/>}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={()=><Box mt={4} mb={2} px={2}>
                    <Text fontWeight={'bold'} color={'gray.100'}>List video refer</Text>
                </Box>}
                ListFooterComponent={()=><Box my={8}/>}
            />
        </Box>
    </Box>
}

export default YoutubePlayer;