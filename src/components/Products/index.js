import React,{useEffect, useState, useRef} from "react";
import {Box, Text, Heading, FlatList, Button, Divider, Center, Spinner} from 'native-base';
import {ImageBackground, Animated} from "react-native";
import tw from 'twrnc';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import {useNetInfo} from "@react-native-community/netinfo";
//Utils
import Request from "@utils/request";
//COMPONENTS
import UserCard from "@components/UserCard";
//storage
import {deleteAllList, insertNewList, queryAllList} from "../../storage/userSchemas";
import realm from '../../storage/userSchemas'



//--api: //https://randomuser.me/api/?page=3&results=10

const AnimatedImageBackGround = Animated.createAnimatedComponent(ImageBackground);


//------->MAIN
const Products =()=>{
    //
    const netInfo = useNetInfo();
    //
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    //
    const scrollY = useRef(new Animated.Value(0)).current;


    //------->clear cache
    useEffect(()=>{
        ;(async function (){
            if(netInfo?.isConnected){
                await deleteAllList();
            }else {
                //--get-data
                queryAllList()
                    .then( async (res)=>{
                        //----
                        setUsers(res)
                    })
                    .catch((err)=>{console.log(err)})
                //---------
            }
        })()
    },[]);

    //--load-data
    useEffect(()=>{
        ;(async function (){
           await getUsers();
        })();
    },[currentPage]);


    //----function get users
    const getUsers =async ()=>{
        //---check network
        if(!netInfo?.isConnected){
            return
        }
        //-----
        setIsLoading(true);
        try {

            const res = await Request.get(`/?page=${currentPage}&results=10`);
            // console.log('---get api:', res.results)
            //
            let _users =[];
            //
            for (const user of res?.results) {
                const {name, picture, email} = user;
                const _mixUser ={
                    _id: uuidv4(),
                    name: `${name?.title} ${name?.first} ${name?.last}`,
                    email: email,
                    photo: picture?.large,
                };
                //update item
                _users.push(_mixUser);
                //---set limit items caching
                try {
                    // neu items >200 thi reset cache
                    if(users.length > 200){
                        await deleteAllList();
                    }
                    await insertNewList(_mixUser);
                }catch (err) {
                    console.log(err)
                }
            }
            //
            setUsers([...users, ..._users]);
            //
        }
        catch (e) {
            console.log(e)
        }
        //
        setIsLoading(false);
    }

    //---function loadMoreItem
    const loadMoreItem =()=>{
        // console.log('loadMoreItem')
        setCurrentPage(currentPage + 1)
    }

    //---renderHeader
    const renderHeader =()=>{
        return (
            <AnimatedImageBackGround
                style={{height: 100,
                    justifyContent:'flex-end',
                    position:'absolute',
                    top:0,
                    left:0,right:0,
                    zIndex:10,
                    opacity: scrollY.interpolate({
                        inputRange:[180,200],
                        outputRange:[0,1]
                    }),
                    transform:[{
                    translateY: scrollY.interpolate({
                        inputRange:[110,120],
                        outputRange:[40,0],
                        extrapolate:'clamp'
                    })
                    }]
                }}
                source={{uri:'https://wallpaperaccess.com/full/2097747.jpg'}}>
                <Center mb={4}>
                    <Heading color={'gray.800'} size='md'>Khám phá</Heading>
                    {/*---divider--*/}
                    <Divider width={24} bg={'red.500'} thickness={3}/>
                </Center>
            </AnimatedImageBackGround>
        )
    }

    //---renderBanner
    const renderBanner =()=>{
        return (
            <AnimatedImageBackGround
                style={{height: 280,
                    justifyContent:'flex-end',
                    transform:[{
                    scale: scrollY.interpolate({
                        inputRange:[-200,0],
                        outputRange:[5,1],
                        extrapolateLeft:'extend',
                        extrapolateRight:'clamp'
                    })
                    }]
                }}
                source={{uri:'https://tl360.b-cdn.net/wp-content/uploads/2019/08/automatic-wallpaper-changer-apps-for-Android-1200x720.jpg'}}>
                <Box mb={4}>
                    <Heading mt={10} color={'gray.100'} size='2xl'>Khám phá</Heading>
                    {/*---divider--*/}
                    <Divider width={24} bg={'green.500'} thickness={3}/>
                </Box>
            </AnimatedImageBackGround>
        )
    }

    //----renderLoader
    const renderLoader =()=> {
        return (isLoading? <Center py={4}>
            <Spinner size={'large'} color={'info.600'}/>
        </Center>: null)
    }


    //--------Return
    return <Box width='100%'>
        {/*--renderHeader--*/}
        {renderHeader()}
        {/* --list-items--*/}
        <Box>
            <Animated.FlatList
                showsHorizontalScrollIndicator={false}
                data={users ? users : [1, 2, 3]}
                renderItem={({item, index})=><UserCard Data={item}/>}
                keyExtractor={(item, index) => `KEY: ${index}`}
                ListHeaderComponent={renderBanner}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItem}
                onEndReachedThreshold={0.4}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: true},
                )}
            />
        </Box>

    </Box>
}

export  default Products;