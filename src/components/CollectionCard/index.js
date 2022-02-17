import React from "react";
import {Box, Text, Pressable,Center, ZStack} from 'native-base';
import {Dimensions} from 'react-native'
import {AsyncImage} from "@components/common";
import tw from 'twrnc'
//
import {getSize} from "@utils/responsive";

const {width, height} = Dimensions.get('window');

const cardWidth = getSize.s(width*0.6);
const collectWidth = cardWidth*0.8;

const bgColor ='#fafafa';
const maskColor = 'gray.200'

const CollectionCard =({Data})=>{
    return <Pressable
        onPress={()=>alert(Data?.name)}
        width={cardWidth}
        bg={bgColor}
        style={tw`mr-8 items-center rounded border border-gray-100`}>

        {/*---*/}
        <Box
            width={collectWidth}
            height={cardWidth}
            bg={bgColor}
            zIndex={10}
            style={[tw``]}>
            <AsyncImage source={{uri: Data?.url,}}
                        style={[tw`rounded shadow`,{width: collectWidth, height: collectWidth}]}/>

            <Text color={'gray.600'} bold fontSize={'md'} style={[tw`mt-1`]}>{Data?.name}</Text>
        </Box>

        {/*--mask-shadow-*/}
        <Box position="absolute" shaldow={'4'} zIndex={0} width={cardWidth} height={cardWidth} bg={maskColor}
             style={[tw`rounded-full left-0 right-0`,{}]}/>


    </Pressable>
}

export default CollectionCard;