import React from "react";
import {
    VStack,
    Input,
    Icon,
    HStack,
    Button,
    Text,
    Pressable, Box
} from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import tw from 'twrnc'
import {} from 'react-native'



//-------->
const SearchBarComp =({
                          placeholder= 'Search People & Places'
                      })=>{
    return  <Pressable
        onPress={()=>alert('Search')}
        width='100%'
        bg='gray.100'
        style={tw`rounded border shadow border-gray-300`}
    >
        <HStack space={2} alignItems="center" bgColor={'red'}>
            <Box>
                <Icon
                    m="2"
                    ml="3"
                    size="6"
                    color="gray.500"
                    as={<MaterialIcons name="search" />}
                />
            </Box>
            <Box>
                <Text color='gray.400'>{placeholder}</Text>
            </Box>

        </HStack>
    </Pressable>

}

export default SearchBarComp;