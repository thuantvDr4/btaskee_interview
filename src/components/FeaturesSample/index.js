import React,{useEffect, useState} from "react";
import {Box, Text, Heading, FlatList, Button,Divider} from 'native-base';
import tw from 'twrnc'
//Utils
import {randomColor} from "@utils/randomColor";
//COMPONENTS
import FeatureCard from "@components/FeaturesSample/FeatureCard";
//----->
const featuresList =[
    {
        id:1,
        name:'Download and Realm DataBase',
        url:'https://static.cdn-cdpl.com/source/998b78e349061b4971c0a2b0e8d6be41/mobileDB.PNG',
        feature:'DownloadFileSample'
    },
    {
        id:2,
        name:'OffLine Mode',
        url:'https://i1.wp.com/blog.celtx.com/wp-content/uploads/2019/11/Blog-Offline-Mode.jpg?fit=750%2C499&ssl=1',
        feature: 'OfflineMode'
    },
    {
        id:3,
        name:'Payment with VNPay',
        url:'https://torchbankz.com/wp-content/uploads/2017/11/payment-gate.png',
        feature: null
    },
    {
        id:4,
        name:'Feature 4',
        url:'https://cdn.tgdd.vn/Files/2019/12/27/1228792/1_800x450.jpg'
    },
    {
        feature: null,
        id:5,
        name:'Feature 5',
        url:'https://sachngoaivan24h.com/wp-content/uploads/2020/05/7-9-roald-dahl-collection15-books-ages-7-9-paperback-1_982x1100.jpg'
    },
]
//------->MAIN
const FeaturesSample =()=>{
    const [features, setFeatures] = useState(featuresList);
    //
    useEffect(()=>{

    },[])

    //


    //--------Return
    return <Box width='100%' style={tw`mx-4`}>
        {/*--heading--*/}
        <Heading size='md'>Features sample</Heading>

        {/*---divider--*/}
        <Divider width={20} bg={'blue.500'} thickness={3}/>

        {/* --list-items--*/}
        <Box mt={'4'}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={features ? features : [1, 2, 3]}
                renderItem={({item, index})=><FeatureCard Data={item}/>}
                keyExtractor={(item, index) => `KEY: ${index}`}
            />
        </Box>

    </Box>
}

export  default FeaturesSample;