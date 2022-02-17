import React from "react";
import {Box, Text, Pressable,Center,Image } from 'native-base';
import {Dimensions} from 'react-native'
import {AsyncImage} from "@components/common";
import tw from 'twrnc'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useNavigation} from "@react-navigation/native";
//icon
import iconTiktok from '../../assets/icons/tiktok.png'

//
import {getSize} from "@utils/responsive";

const {width, height} = Dimensions.get('window');

const cardWidth = getSize.s(width*0.6)
const bookWidth = cardWidth*1;
const bookHeight = cardWidth*0.8;

const bgColor ='#fafafa';
const maskColor = 'gray.200'

const TiktokCard =({Data})=>{

    const navigation = useNavigation();

    return <Pressable
        onPress={()=>navigation.navigate('TiktokPlayer')}
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
                <Image alt={'tiktok'} w={10} h={10} source={iconTiktok} resizeMode={'contain'}/>
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

export default TiktokCard;