import React,{useEffect, useState} from "react";
import {Box, Text, Heading, FlatList, Button,Divider} from 'native-base';
import tw from 'twrnc'
//Utils
import {randomColor} from "@utils/randomColor";
//COMPONENTS
import CollectionCard from "@components/CollectionCard";

//----->
const TAGS =[
    {id:1, name:'Collection 1', url:'https://cdn.shopify.com/s/files/1/0095/9840/2656/products/age-9-14-the-selection-series-5-book-collection-by-kiera-cass-young-adult-paperback-1_1024x1024@2x.jpg?v=1625857320'},
    {id:2, name:'Collection 2', url:'https://images-na.ssl-images-amazon.com/images/I/71BkihisEAL.jpg'},
    {id:3, name:'Collection 3', url:'https://i.pinimg.com/originals/73/e8/35/73e835e8a652c35f4096a9d3ad1875d2.jpg'},
    {id:4, name:'Collection 4', url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1C3UH1up843L7E1L5onB7yEVVeJvP0qoTSGmmsTZXnV1Dkk2TUgUiU23TRjkNInEs3fM&usqp=CAU'},
    {id:5, name:'Collection 5', url:'https://sachngoaivan24h.com/wp-content/uploads/2020/05/7-9-roald-dahl-collection15-books-ages-7-9-paperback-1_982x1100.jpg'},
]
//------->MAIN
const Collection =()=>{
    const [collections, setCollections] = useState(TAGS);

    //
    useEffect(()=>{

    },[])


    //--------Return
    return <Box width='100%' style={tw`mx-4`}>
        {/*--heading--*/}
        <Heading size='md'>Collection</Heading>

        {/*---divider--*/}
        <Divider width={20} bg={'green.500'} thickness={3}/>

        {/* --list-items--*/}
        <Box mt={'4'}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={collections ? collections : [1, 2, 3]}
                renderItem={({item, index})=><CollectionCard Data={item}/>}
                keyExtractor={(item, index) => `KEY: ${index}`}
            />
        </Box>

    </Box>
}

export  default Collection;