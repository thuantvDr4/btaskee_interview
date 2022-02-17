import React,{useEffect, useState} from "react";
import {Box, Text, Heading, FlatList, Button} from 'native-base';
import tw from 'twrnc'
//Utils
import {randomColor} from "@utils/randomColor";

//----->
const TAGS =[
    {id:1, name:'Tag 1'},
    {id:2, name:'Tag 2'},
    {id:3, name:'Tag 3'},
    {id:4, name:'Tag 4'},
    {id:5, name:'Tag 5'},
    {id:6, name:'Tag 6'},
    {id:7, name:'Tag 7'},
    {id:8, name:'Tag 8'},
    {id:9, name:'Tag 9'},
]
//------->MAIN
const Category =()=>{
    const [row1, setRow1] = useState([]);
    const [row2, setRow2] = useState([]);

    //
    useEffect(()=>{
        if(TAGS.length >5){
            const _row1 = TAGS.filter((tag, index)=> index %2 ===0);
            const _row2 = TAGS.filter((tag, index)=> index %2 !==0);

            setRow1(_row1);
            setRow2(_row2);
        }else {
            setRow1(TAGS)
            setRow2([])
        }
    },[])

    //---TAGS
    const Tag =({item, index})=>{
        return <Button mx={'4'} style={[tw`w-24 rounded-full`]} bg={randomColor()} >
            <Text>{item.name}</Text>
        </Button>
    }

    //--------Return
    return <Box width='100%' style={tw`mx-4`}>
        <Heading size='md'>Danh mục</Heading>
    {/* --row-1--*/}
        <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={row1 ? row1 : [1, 2, 3]}
            renderItem={row1 ? Tag : null}
            keyExtractor={(item, index) => `KEY: ${index}`}
        />
    {/* ---space---*/}
        <Box height={2}/>
    {/* ---row-2---*/}
        <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={row2 ? row2 : [1, 2, 3]}
            renderItem={row2 ? Tag : null}
            keyExtractor={(item, index) => `KEY: ${index}`}
        />
    </Box>
}

export  default Category;