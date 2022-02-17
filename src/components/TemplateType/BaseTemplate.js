import React from "react";
import {Box, Center, Container, Heading, Text} from 'native-base';
import tw from 'twrnc';
import {useSafeAreaInsets} from "react-native-safe-area-context";


//-------->MAIN
const BaseTemplate =({containerStyle,
                         headingStyle,
                         lineColor='#1769aa',
                         HeadingText ,
                         position='left',
                         useSafeTop,
                         useSafeBottom,
                         children})=>{

    const { top, bottom } = useSafeAreaInsets();

    const _position = position ==='right'? tw`items-end` : position ==='center'?  tw`items-center`: tw`items-start`

    return <Box safeAreaTop={useSafeTop} safeAreaBottom={useSafeBottom} style={[tw`bg-white flex-1`,containerStyle]}>
        {HeadingText &&
            <Box style={[tw`px-4`, _position]}>
                <Heading style={[headingStyle]}>
                    {HeadingText}
                </Heading>
                <Box style={[tw`h-1 rounded-full w-20`,{backgroundColor: lineColor}]}/>
            </Box>
        }
        {children}
    </Box>
}
export default BaseTemplate;