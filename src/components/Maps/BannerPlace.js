import React,{useState, useRef, useEffect} from "react";
import {Box, Text, HStack,Image, Center,
    Pressable,AspectRatio,Stack, Heading, Button} from "native-base";
import Fontisto from "react-native-vector-icons/Fontisto";
import {Animated,FlatList } from "react-native";
//
import {getWidth, getHeight} from "@utils/dimensions";


// dimension
const width = getWidth();
const height = getHeight();
const cardWidth = width*0.7
//

const BannerPlace =({data, markerIndex=0})=>{
    //
    const slider = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    //states
      const [itemCurrent, setItemCurrent] = useState(0);



    //---listen event scroll
    useEffect(()=>{
        scrollX.addListener(({value})=>{
            const val = Math.round(value / cardWidth);
            //
            setItemCurrent(val);
        })
        //---clear& clean
        return ()=> scrollX.removeAllListeners();
    },[scrollX])


    //---listen-marker onPress
    useEffect(()=>{
        slider.current.scrollToOffset({
            offset: (markerIndex) * cardWidth,
        })
    },[markerIndex])

    //--BannerItem
    const BannerItem =({item, index})=>{
        return <Box alignItems="center" mx={2} >
            <Box maxW={cardWidth} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}>
                <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                        <Image source={{
                            uri: item?.image
                        }} alt="image" />
                    </AspectRatio>
                    <Center bg="violet.500" _dark={{
                        bg: "violet.400"
                    }} _text={{
                        color: "warmGray.50",
                        fontWeight: "700",
                        fontSize: "xs"
                    }} position="absolute" bottom="0" px="3" py="1.5">
                        PHOTOS
                    </Center>
                </Box>
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1">
                            {item?.title}
                        </Heading>
                        <Text fontSize="xs" _light={{
                            color: "violet.500"
                        }} _dark={{
                            color: "violet.400"
                        }} fontWeight="500" ml="-0.5" mt="-1">
                            short description.
                        </Text>
                    </Stack>
                    <Text fontWeight="400">
                        {item?.description}
                    </Text>
                    <HStack alignItems="center" space={4} justifyContent="space-between">
                        <HStack alignItems="center">
                            {/*--rating--*/}
                            <Text color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }} fontWeight="400">
                                {item.rating}
                            </Text>
                            <Fontisto color={'#eab308'} name={'star'}/>

                            {/*--reviews--*/}
                            <Text mx={1} color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }} fontWeight="400">
                                {`(${item.reviews})`}
                            </Text>
                        </HStack>
                    </HStack>

                    <Button>
                        <Text>Order Now</Text>
                    </Button>
                </Stack>
            </Box>
        </Box>
    }

    //------->
    return <Center
        w={'100%'}
        position={'absolute'}
        bottom={2}
    >
        <Animated.FlatList
            ref={slider}
            keyExtractor={(_, index)=>index.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={data}
            renderItem={BannerItem}
            onScroll={Animated.event([{nativeEvent:{contentOffset:{x: scrollX}}}],{useNativeDriver:true})}
        />
    </Center>
}

export default BannerPlace;
