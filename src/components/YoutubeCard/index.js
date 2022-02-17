import React from "react";
import {Box, Text, Pressable,Center, } from 'native-base';
import {Dimensions} from 'react-native'
import {AsyncImage} from "@components/common";
import tw from 'twrnc'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useNavigation} from "@react-navigation/native";
//
import {getSize} from "@utils/responsive";

const {width, height} = Dimensions.get('window');

const cardWidth = getSize.s(width*0.6)
const bookWidth = cardWidth*1;
const bookHeight = cardWidth*0.8;

const bgColor ='#fafafa';
const maskColor = 'gray.200'

const YoutubeCard =({Data})=>{

    const navigation = useNavigation();

    return <Pressable
        onPress={()=>navigation.navigate('YoutubePlayer')}
        width={cardWidth}
        bg={bgColor}
        style={tw`mr-8 items-center rounded border border-gray-100`}>

        {/*---*/}
        <Center
            zIndex={10}
            width={cardWidth}
            height={cardWidth}
            // bg={bgColor}
            style={{elevation:5}}>
            <AsyncImage source={{uri: Data?.artwork,}}
                        style={[tw`rounded shadow`,{width: bookWidth, height: bookHeight}]}/>


            {/*--play-icon-*/}
            <Center
                position={'absolute'}
                zIndex={10}
                style={[tw`rounded-full`,{elevation:5}]}>
                <FontAwesome5 name={'youtube'} size={40} color={'#d32f2f'}/>
            </Center>

        </Center>

        {/*---title--*/}
        <Box style={tw`z-10`}>
            <Text color={'gray.600'} bold fontSize={'md'} style={[]}>{Data?.title}</Text>
        </Box>

        {/*--mask-shadow-*/}
        <Box  width={cardWidth} height={cardWidth} bg={maskColor}
              style={[tw`absolute rounded-full left-0 right-0 shadow z-0`,]}/>


    </Pressable>
}

export default YoutubeCard;