import React, {useState, useRef, useEffect} from "react";
import {
    NativeBaseProvider,
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    Icon,
    HStack,
    Center,
    Pressable,
    FlatList,
    Image
} from 'native-base';
import {Animated, View} from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useNavigation} from "@react-navigation/native";
// assets
import {Tutorial1, Tutorial2, Tutorial3} from "@assets/tutorials";
//
import {getSize} from "@utils/responsive";
import {getWidth, getHeight} from "@utils/dimensions";
import TrackPlayer from "react-native-track-player";

//Dimensions
const width = getWidth();
const height = getHeight();
const cardHeight = height*0.7;
//
const data = [
    {
        image: Tutorial1,
        text: "Tổng hợp 100+ cuốn sách với hơn 18 chủ đề",
    },
    {
        image: Tutorial2,
        text: "Chắt lọc những nội dung quan trọng",
    },
    {
        image: Tutorial3,
        text: "Nghe sách mọi nơi chỉ cần mang theo chiếc điện thoại được cài sẵn ứng dụng.",
    },
];

const strings = {
    start_1: "Hoàn toàn",
    free: "MIỄN PHÍ.",
    start_2: "Khám phá ngay!",
};


//--------->
const Tutorial =({})=>{
    const sliderRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    //
    const navigation = useNavigation();
    //
    const [itemCurrent, setItemCurrent] = useState(0);
    //

    //--listen event scroll
    useEffect(()=>{
        //-------
        scrollX.addListener(({value}) => {
            const val = Math.round(value / width);
            //
            setItemCurrent(val);
        });

        //--clean
        return () => {
            scrollX.removeAllListeners();
        };
    },[scrollX]);


    //--renderPage
    const renderPage =({item, index})=>{
        return <Animated.View>
        <Center w={width} h={cardHeight} px={4}>
            <Image alt={'Tutorial'} h={getSize.s(300)} source={item.image}/>
            <Center mt={4}>
                <Text textAlign={'center'}>{item?.text}</Text>
            </Center>
        </Center>
        </Animated.View>
    }

    //------------>RETURN
    return <Box flex={1} bg="white" safeAreaTop>
        <Center flex={1}>
           <Animated.FlatList
               ref={sliderRef}
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled
               scrollEventThrottle={16}
               keyExtractor={(_,index)=>index.toString()}
                data={data}
                renderItem={renderPage}
               onScroll={Animated.event(
                   [{nativeEvent: {contentOffset: {x: scrollX}}}],
                   {useNativeDriver: true},
               )}
           />
          {/* ---controls--*/}
          <VStack space={20} alignItems={'center'} w={'100%'} h={height-cardHeight}>
              {/*--dots--*/}
              <HStack space={3} alignItems={'center'}>
                  {
                      data.map((_,index)=>{
                      if(index === itemCurrent){
                          return <Center shadow={'2'} key={index.toString()} rounded={'full'} w={3} h={3} bg={'info.600'}/>
                      }else {
                          return <Center key={index.toString()} rounded={'full'} w={2} h={2} bg={'gray.400'}/>
                      }
                    })
                  }
              </HStack>
          {/*--button--*/}
            <Button
                onPress={()=>navigation.navigate('Login')}
                shadow={'2'} w={'80%'} rounded={'full'}
                variant={'ghost'} bg={'info.700'} colorScheme={'gray'}>
                <Text fontSize={'md'} color={'white'}>Khám phá ngay</Text>
            </Button>
          </VStack>
        </Center>
    </Box>
}


export default Tutorial