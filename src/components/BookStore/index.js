import React,{useEffect, useState} from "react";
import {Box, Text, Heading, FlatList, Button,Divider} from 'native-base';
import tw from 'twrnc'
//Utils
import {randomColor} from "@utils/randomColor";
//COMPONENTS
import BookCard from "@components/BookCard";

//----->
const TAGS =[
    {id:1, name:'book 1', url:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564'},
    {id:2, name:'book 2', url:'https://kbimages1-a.akamaihd.net/f16e3461-030b-41c0-aed5-03e1a54c3dea/1200/1200/False/design-a-book-cover.jpg'},
    {id:3, name:'book 3', url:'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-fall-2019/large/bbcdune.jpg?1384968217'},
    {id:4, name:'book 4', url:'https://images-na.ssl-images-amazon.com/images/I/51foG2y04iL._SS400_.jpg'},
    {id:5, name:'book 5', url:'https://marketplace.canva.com/EAD7WuSVrt0/1/0/1003w/canva-colorful-illustration-young-adult-book-cover-LVthABb24ik.jpg'},
    {id:6, name:'book 6', url:'https://dw0i2gv3d32l1.cloudfront.net/uploads/stage/stage_image/37836/optimized_large_thumb_stage.jpg'},
    {id:7, name:'book 7', url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHvXFCWk4Ue714CXrldrMhGwxAMg5QILyMVg&usqp=CAU'},
    {id:8, name:'book 8', url:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564'},
    {id:9, name:'book 9', url: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564'},
]
//------->MAIN
const BookStore =()=>{
    const [collections, setCollections] = useState(TAGS);

    //
    useEffect(()=>{

    },[])


    //--------Return
    return <Box width='100%' style={tw`mx-4`}>
        {/*--heading--*/}
        <Heading size='md'>Book Store</Heading>

        {/*---divider--*/}
        <Divider width={20} bg={'pink.500'} thickness={3}/>

        {/* --list-items--*/}
        <Box mt={'4'}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={collections ? collections : [1, 2, 3]}
                renderItem={({item, index})=><BookCard Data={item}/>}
                keyExtractor={(item, index) => `KEY: ${index}`}
            />
        </Box>

    </Box>
}

export  default BookStore;