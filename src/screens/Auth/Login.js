import React, {useState, useContext} from "react";
import {Box, Center, Text, Image, Input, VStack, Button,
    Pressable, Icon, HStack, Divider,} from "native-base";
import {Keyboard} from "react-native";
import { useForm, useController } from "react-hook-form";
import {getWidth, getHeight} from "@utils/dimensions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useNavigation} from "@react-navigation/native";
//Contexts
import {AuthContext} from "@providers/AuthProvider";
//common
import {TemplateWithLoading} from "@components/TemplateType";

//
const width = getWidth();
const height = getHeight();

//--custom-input
const InputHook =({name,placeholder, control, rules,errorMsg, ...otherProps})=>{
    const {field} = useController({
        control,
        defaultValue:'',
        name,
        rules
    })

    return <VStack>
        <Input
            {...otherProps}
            autoCapitalize={'none'}
            autoCorrect={false}
            size={'xl'}
            variant="underlined"
            w={{
                base: "100%",
                md: "25%",
            }}
            value={field.value}
            onChangeText={field.onChange}
            placeholder={placeholder} />
        {/*--helper--*/}
        {errorMsg&& <Text mt={1} color={'red.600'}>* {errorMsg}</Text>}
    </VStack>
}
//-------------------->MAIN
const Login =()=>{
    const navigation = useNavigation();
    //
    const {register,control, handleSubmit, formState: { errors },} = useForm();
    //
    const {signIn,isLoading, googleLogin} = useContext(AuthContext);
    //
    const [showPass, setShowPass] = useState(false);


    //---onSubmit
    const onSubmit =async (data)=>{
        // console.log(JSON.stringify(data));
        //
        try {
            await signIn( data?.email, data?.password);
        }catch (e) {
            console.log('---login-err:',e)
        }

    }


    //----signInWithGG
    const signInWithGG =async ()=>{
        try {
            await googleLogin();
        }catch (e) {
            console.log(e)
        }
    }

    //------------->return
    return <TemplateWithLoading useSafeTop={true} useLoading={isLoading}>
    <Box flex={'1'}>
    <Pressable flex={'1'} bg={'white'} onPress={()=>Keyboard.dismiss()}>
        {/*---logo--*/}
        <Center h={height*0.2}>
            <Image
                rounded={'full'}
                source={{
                    uri: "https://wallpaperaccess.com/full/317501.jpg",
                }}
                alt="Alternate Text"
                size="xl"
            />
            <Text>Logo</Text>
        </Center>
        {/* --form--*/}
        <Box w={width} px={4} bg={'white'} mt={4}>
            <VStack w={'100%'} space={10}>
                {/*--email--*/}
                <InputHook
                    InputLeftElement={
                        <Icon
                            as={<MaterialIcons name="person" />}
                            size={6}
                            ml="2"
                            color="muted.400"
                        />
                    }

                    {...register("email", {
                        required: "vui lòng nhập email",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Email không hợp lệ"
                        }
                    })}
                    errorMsg={errors?.email? errors.email.message : undefined}

                    placeholder={'Email'} name={'email'} control={control}/>

                {/* --password--*/}
                <InputHook
                    InputLeftElement={
                        <Icon
                            as={<MaterialIcons name="lock" />}
                            size={6}
                            ml="2"
                            color="muted.400"
                        />
                    }

                    InputRightElement={
                        <Pressable onPress={()=>setShowPass(!showPass)}>
                            <Icon
                                as={<MaterialIcons name= {showPass? "visibility":"visibility-off"} />}
                                size={5}
                                mr="2"
                                color="muted.400"
                            />
                        </Pressable>
                    }
                    rules={{required: true,}}
                    errorMsg={errors?.password? 'vui lòng nhập mật khẩu' : undefined}
                    placeholder={'password'} name={'password'} control={control}
                    type={showPass? 'text' : 'password'}/>

                <VStack space={6} mt={6}>
                    {/*--login-email-pss--*/}
                    <Button
                        py={3}
                        rounded={'full'} bg={'cyan.500'}
                        onPress={handleSubmit(onSubmit)}>
                        <Text fontSize={'md'} color={'white'}>Đăng nhập</Text>
                    </Button>
                    {/* ---or--*/}
                    <Center>
                        <HStack space={2} alignItems={'center'}>
                            <Divider bg={'gray.300'} w={'30%'}/>
                            <Text color={'gray.600'} fontSize={'md'}>Hoặc</Text>
                            <Divider bg={'gray.300'} w={'30%'}/>
                        </HStack>
                    </Center>

                    {/*--login-GG--*/}
                    <Button rounded={'full'} bg={'red.500'}
                            onPress={signInWithGG}
                            py={3}
                            colorScheme={'rose'}
                            leftIcon={<Icon as={FontAwesome5} name="google" size="sm" />}
                    >
                        <Text fontSize={'md'} color={'white'}>Đăng nhập bằng Google</Text>
                    </Button>

                    {/*--login-FB--*/}
                    {/*<Button rounded={'full'} bg={'blue.700'}*/}
                    {/*        py={3}*/}
                    {/*        colorScheme={'darkBlue'}*/}
                    {/*        leftIcon={<Icon as={FontAwesome5} name="facebook" size="sm" />}*/}
                    {/*>*/}
                    {/*    <Text fontSize={'md'} color={'white'}>Login by Facebook</Text>*/}
                    {/*</Button>*/}

                </VStack>


            </VStack>
        </Box>
        {/*--controls-other--*/}
        <Center flex={'1'}>
            <HStack space={2}>
                <Text color={'gray.700'}>Bạn chưa có tài khoản?</Text>
                <Pressable onPress={()=>navigation.navigate('Signup')}>
                    <Text color={'red.500'} letterSpacing={'xl'} fontWeight={'bold'}>Tạo mới nào!</Text>
                </Pressable>
            </HStack>
        </Center>
    </Pressable>
    </Box>
    </TemplateWithLoading>
}

export default Login;