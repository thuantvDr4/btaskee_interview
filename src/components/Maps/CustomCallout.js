import React from "react";
import {Box, Center, Text, HStack, Image} from "native-base";
import {StyleSheet, View} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';


const styles = StyleSheet.create({
    arrow:{
        borderTopWidth: 16,
        borderRightWidth: 16,
        borderBottomWidth: 0,
        borderLeftWidth: 16,
        borderTopColor: "#fcd34d",
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    }
})

const CustomCallout =({data, onPress})=>{
    return <Callout tooltip onPress={onPress}>
        <Center  bg={'transparent'}>
        <Box bg={'amber.100'} borderWidth={1} borderColor={'gray.300'}>
           <HStack space={2}>
               <Box maxW={80}  p={1}>
                   <Text>{data?.title}</Text>
                   <Text>{data?.description}</Text>
               </Box>
               <Image source={{
                   uri: data?.image
               }} alt="Alternate Text" size="md" />
           </HStack>
        </Box>
            <Center w={2} style={styles.arrow}/>
        </Center>
    </Callout>
}

export default CustomCallout