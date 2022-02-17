import React,{useState} from "react";
import {Box, Text, HStack, Center, ScrollView, Pressable} from "native-base";
import Fontisto from "react-native-vector-icons/Fontisto";


const CHIPS =[
    {name:'Chip 1', icon:'island'},
    {name:'Chip 2', icon:'cocktail'},
    {name:'Chip 3', icon:'holiday-village'},
    {name:'Chip 4', icon:'shopping-store'},
    {name:'Chip 5', icon:'sait-boat'},
];

const ChipList =()=>{
    //states
    const [chips, setChips] = useState(CHIPS);

    //------->
    return <ScrollView
        w={'100%'}
        position={'absolute'}
        top={24}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
    >
        {chips.map((item,index)=>{
         return <Pressable key={index.toString()} shadow={2} alignItems={'center'} mx={2} bg={'white'} px={3} rounded={'full'} py={1}>
                <HStack space={1}>
                    <Fontisto name={item.icon} size={24} color={'#212121'}/>
                    <Text color={'gray.600'}>{item.name}</Text>
                </HStack>
            </Pressable>
        })}
    </ScrollView>
}

export default ChipList;
