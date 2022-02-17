import React, {useContext} from "react";
import {Box, Text, Avatar, VStack, Center, Pressable, Button} from "native-base";
import tw from "twrnc";
//HOCS
import {WithKeyBoardAwareScrollView} from "@HOC";
//
import {BaseTemplate} from "@components/TemplateType";
//context
import {AuthContext} from "@providers/AuthProvider";


//-------MAIN
function Profile() {
    const {user, signOut, isLoading} = useContext(AuthContext);

    const handleLogout = async ()=>{
        await signOut();
    }
    return (
        <BaseTemplate
            position={'right'}
            lineColor={'#14a37f'}
            HeadingText={'Tài Khoản'}
        >
            <Box style={tw`flex-1 bg-white mx-4 mt-6`}>
                {/*--info--*/}
                <VStack alignItems={'center'} space={1}>
                    {/*---avatar--*/}
                    <Avatar bg="pink.600" alignSelf="center" size="2xl" source={{
                        uri: user?.photoURL
                    }}>
                        GG
                    </Avatar>
                {/*-email--*/}
                    <Text>{user?.email}</Text>
                </VStack>
            {/*--body--*/}
             <Box flex={'1'}>

             </Box>
            {/*---footer--*/}
                <Center mb={2}>
                    <Button
                        _loading={{
                            bg: "info.800:alpha.90",
                            _text: {
                                color: "coolGray.100"
                            }
                        }} _spinner={{
                        color: "white"
                    }}
                        isLoadingText=". . ."
                        isLoading={isLoading}
                        py={2}
                        px={4}
                        rounded={'full'} bg={'info.600'} onPress={handleLogout}>
                        <Text fontSize={'md'} color={'white'}>Đăng xuất</Text>
                    </Button>
                </Center>
            </Box>
        </BaseTemplate>
    );
}

export default WithKeyBoardAwareScrollView(Profile,{useSafeTop:true, useSafeBottom:false});

