import React from "react";
import {Box, Text, Pressable,Center, } from 'native-base';
import {Dimensions} from 'react-native'
import {AsyncImage} from "@components/common";
import tw from 'twrnc'
//
import {getSize} from "@utils/responsive";

const {width, height} = Dimensions.get('window');

const cardWidth = getSize.s(width*0.5)
const bookWidth = cardWidth*0.6;
const bookHeight = cardWidth*0.8;

const bgColor ='#fafafa';
const maskColor = 'gray.200'

//----------------->
const BookCard =({Data})=>{
    return <Pressable
        onPress={()=>alert(Data?.name)}
        width={cardWidth}
        bg={bgColor}
        style={tw`mr-8 items-center rounded border border-gray-100`}>


        {/*---*/}
        <Center
            zIndex={10}
            width={bookWidth}
            height={cardWidth}
            // bg={bgColor}
            style={{elevation:5}}
           >
            <AsyncImage source={{uri: Data?.url,}}
                        style={[tw`rounded shadow`,{width: bookWidth, height: bookHeight}]}/>
        </Center>

        {/*---title--*/}
        <Box style={tw`z-10`}>
            <Text color={'gray.600'} bold fontSize={'md'} style={[]}>{Data?.name}</Text>
        </Box>


        {/*--mask-shadow-*/}
        <Box
            position={'absolute'}
            zIndex={0}
            shadow={'2'}
            width={cardWidth} height={cardWidth} bg={maskColor}
            style={tw`rounded-full left-0 right-0`}/>


    </Pressable>
}

export default BookCard;