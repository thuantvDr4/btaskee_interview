import React from "react";
import {Box, Text, Pressable,Center, HStack} from 'native-base';
import {Dimensions} from 'react-native'
import {AsyncImage} from "@components/common";
import tw from 'twrnc'
//
import {getSize} from "@utils/responsive";

const {width, height} = Dimensions.get('window');

const avatarWidth = getSize.s(80);
const bgColor ='#f5f5f5';

const UserCard =({Data})=>{
    return <Pressable
        bg={bgColor}
        my={1}
        mx={2}
      >
        <HStack space={2}>
           {/* ---avatar---*/}
           <Box>
               <AsyncImage source={{uri: Data?.photo,}}
                           style={[tw`rounded shadow`,{width: avatarWidth, height: avatarWidth, borderRadius:avatarWidth}]}/>
           </Box>
            {/*---info---*/}
            <Box>
                <Text>{Data?.name}</Text>
                <Text>{Data?.email}</Text>
            </Box>
        </HStack>

    </Pressable>
}

export default UserCard;