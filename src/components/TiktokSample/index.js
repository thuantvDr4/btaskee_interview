import React,{useEffect, useState} from "react";
import {Box, Text, Heading, FlatList, Button,Divider} from 'native-base';
import tw from 'twrnc'
//Utils
//COMPONENTS
import TiktokCard from "@components/TiktokCard";
import YOUTUBE_LIST from '../../localData/YoutubeList.json'

//------CONSTANT


//------->MAIN
const TiktokSample =()=>{
    const [books, setBooks] = useState(YOUTUBE_LIST);

    //
    useEffect(()=>{

    },[])


    //--------Return
    return <Box width='100%' style={tw`mx-4`}>
        {/*--heading--*/}
        <Heading size='md'>Tiktok Sample</Heading>

        {/*---divider--*/}
        <Divider width={20} bg={'red.500'} thickness={3}/>

        {/* --list-items--*/}
        <Box mt={'4'}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={books ? books : [1, 2, 3]}
                renderItem={({item, index})=><TiktokCard Data={item}/>}
                keyExtractor={(item, index) => `KEY: ${index}`}
            />
        </Box>

    </Box>
}

export  default TiktokSample;