import React, {useEffect, useRef, useState} from "react";
import {Box, Text, Center,  Pressable, StatusBar, Image} from 'native-base';
import {Animated, FlatList} from "react-native";
import tw from 'twrnc'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useNavigation} from "@react-navigation/native";
//Template

//commons
import { AsyncTiktok} from "@components/common";
//Utils
import {getWidth, getHeight} from "@utils/dimensions";
//Images
//Local-data
import TIKTOK_LIST from '../../localData/tiktokList.json'
import {TouchableOpacity} from "react-native";


//------CONSTANT

const width = getWidth();
const height = getHeight();


const TiktokPlayer =()=>{
    //
    const navigation = useNavigation();
    //
    const scrollY = useRef(new Animated.Value(0)).current;
    const slider = useRef(null);
    //
     const [itemFocus, setItemFocus]=useState(0);


    //----------->listener-scrollEvent
    useEffect(()=>{
        scrollY.addListener(({value})=>{
            const val = Math.round(value/height);
            setItemFocus(val);
        });

        //clean
        return ()=>{
            scrollY.removeAllListeners();
        }

    },[scrollY])


    //--RenderCard
    const RenderCard =({item, index})=>{
        return <Animated.View>
            <AsyncTiktok Data={item} isFocus={index===itemFocus? true :false} />
        </Animated.View>
    }

    //---------->
    return  <Box flex={'1'} safeAreaTop safeAreaBottom bg={'gray.900'}>
        <StatusBar barStyle={'light-content'} backgroundColor={'black'}/>
        <Animated.FlatList
            ref={slider}
            data={TIKTOK_LIST}
            keyExtractor={(item, index) => `KEY: ${index}`}
            renderItem={RenderCard}
            showsVerticalScrollIndicator={false}
            snapToInterval={height}
            snapToAlignment={'start'}
            decelerationRate={'normal'}
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {useNativeDriver: true},
            )}
        />
    {/*--btn-home--*/}

        <Center position={'absolute'} bottom={4} w={width}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.goBack()}>
                <FontAwesome5 name={'home'} size={30} color={'#ffffff'}/>
            </TouchableOpacity>
        </Center>

    </Box>

}

export default TiktokPlayer ;