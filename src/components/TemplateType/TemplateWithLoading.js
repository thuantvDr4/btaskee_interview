import React,{useState} from "react";
import {Box, Center, Container, Heading, Text,Button, Modal, Spinner} from 'native-base';
import tw from 'twrnc';
import {useSafeAreaInsets} from "react-native-safe-area-context";


//-------->MAIN
const TemplateWithLoading =({containerStyle,
                         useSafeTop,
                         useSafeBottom,
                         useLoading= false,
                         children})=>{

    const { top, bottom } = useSafeAreaInsets();

    return <Box pt={useSafeTop?top : 0} pb={useSafeBottom?bottom:0} style={[tw`bg-white flex-1`,containerStyle]}>
        {children}

        {/*--show loading--*/}
        {useLoading &&
            <Modal isOpen={true}>
                <Spinner color="warning.400" size="lg"/>
            </Modal>
        }

    </Box>
}
export default TemplateWithLoading;