import React, {useState, useRef, useContext} from "react";
import {Box, Center, Text, Image, Input, VStack, Button,
    Pressable, Icon, HStack, Divider} from "native-base";
import { useForm, useController } from "react-hook-form";
import {getWidth, getHeight} from "@utils/dimensions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useNavigation} from "@react-navigation/native";
//
import {WithKeyBoardAwareScrollView} from "@HOC";
import {AuthContext} from "@providers/AuthProvider";
//common
import {TemplateWithLoading} from "@components/TemplateType";
//
const width = getWidth();
const height = getHeight();

//--custom-input
const InputHook =({name,placeholder, control, errorMsg, ...otherProps})=>{
    const {field} = useController({
        control,
        defaultValue:'',
        name,
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
//-------------------->
const Signup =()=>{
    const navigation = useNavigation();
    //
    const {watch,register, control, handleSubmit, formState: { errors },} = useForm();
    //
    const {createNewUser,isLoading } = useContext(AuthContext);
    //
    const password = useRef({});
    //
    password.current = watch("password", "");
    //
    const [showPass, setShowPass] = useState(false);
    //---onSubmit
    const onSubmit =async (data)=>{
        // console.log(JSON.stringify(data));
        await createNewUser(data?.email, data?.password, data?.phone);
    }

    //------------->return
    return <TemplateWithLoading useLoading={isLoading}>

    <Box flex={'1'} bg={'white'} safeAreaTop={true}>
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
        <Box w={width} px={4} bg={'white'} mt={4} flex={'1'}>

            <VStack w={'100%'} space={10}>
                {/*--email--*/}
                <InputHook
                    InputLeftElement={
                        <Icon
                            as={<MaterialIcons name="email" />}
                            size={6}
                            ml="2"
                            color="muted.400"
                        />
                    }
                    name={'email'}
                    {...register("email", {
                        required: "vui l??ng nh???p email",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Email kh??ng h???p l???"
                        }
                    })}
                    errorMsg={errors?.email? errors.email.message : undefined}
                    placeholder={'Email'}
                    keyboardType={'email-address'}

                    control={control}/>

                {/*--Phone--*/}
                <InputHook
                    InputLeftElement={
                        <Icon
                            as={<MaterialIcons name="phone" />}
                            size={6}
                            ml="2"
                            color="muted.400"
                        />
                    }
                    name={'phone'}
                    {...register("phone", {
                        required: "vui l??ng nh???p s??? ??i???n tho???i",
                        minLength: {
                            value: 5,
                            message: "s??? ??i???n tho???i kh??ng h???p l???"
                        },
                        maxLength: {
                            value: 13,
                            message: "s??? ??i???n tho???i kh??ng h???p l???"
                        }
                    })}
                    errorMsg={errors?.phone? errors.phone.message : undefined}
                    placeholder={'Phone number'}
                    keyboardType={'phone-pad'}
                    control={control}/>

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
                    {...register("password", {
                        required: "vui l??ng nh???p m???t kh???u",
                        minLength: {
                            value: 6,
                            message: "M???t kh???u qu?? ng???n"
                        },
                    })}
                    errorMsg={errors?.password? errors.password.message : undefined}
                    placeholder={'password'}
                    name={'password'}
                    control={control}
                    type={showPass? 'text' : 'password'}/>

                {/* --confirm-password--*/}
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
                    name={'confirmPassword'}

                    {...register("confirmPassword", {
                        required: "vui l??ng nh???p l???i m???t kh???u",
                        validate: value =>
                            value === password.current || "X??c nh???n m???t kh???u kh??ng ????ng"
                    })}
                    errorMsg={errors?.confirmPassword? errors.confirmPassword.message : undefined}
                    placeholder={'Confirm password'}
                    control={control}
                    type={showPass? 'text' : 'password'}/>

                <VStack space={6} mt={4}>
                    {/*--login-email-pss--*/}
                    <Button
                        py={3}
                        rounded={'full'} bg={'info.600'}
                        onPress={handleSubmit(onSubmit)}>
                        <Text fontSize={'md'} color={'white'}>T???o t??i kho???n</Text>
                    </Button>

                </VStack>

            </VStack>
        </Box>
        {/*--controls-other--*/}
        <Center flex={'1'} py={4}>
            <HStack space={2}>
                <Text color={'gray.700'}>B???n ???? c?? t??i kho???n?</Text>
                <Pressable onPress={()=>navigation.navigate('Login')}>
                    <Text color={'red.500'} letterSpacing={'xl'} fontWeight={'bold'}>????ng nh???p n??o!</Text>
                </Pressable>
            </HStack>
        </Center>
    </Box>
    </TemplateWithLoading>
}

export default WithKeyBoardAwareScrollView(Signup,{useSafeTop:false, useSafeBottom:true});