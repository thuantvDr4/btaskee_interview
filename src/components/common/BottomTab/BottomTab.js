import React, {useRef, useMemo} from 'react';
import {Box, Text,Center} from 'native-base';
import {TouchableOpacity, Dimensions,  View} from "react-native";
import tw from 'twrnc'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {getSize} from "@utils/responsive";
import * as Animatable from 'react-native-animatable';

// get Dimension
const { width, height } = Dimensions.get("window");

//-------->Main
const BottomTab =({state, descriptors, navigation})=>{

    const { top, bottom } = useSafeAreaInsets();

    //--renderItem
    const _renderItem=(route, index)=>{
        //
        const { options } = descriptors[route.key];
        //setting label
        const label =
            options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                    ? options.title
                    : route.name;
        //setting color
        const isFocused = state.index === index;
        const tabBarColor = isFocused ? tw.color('blue-600') : tw.color('gray-500');
        const textColor = isFocused ? tw.color('blue-800') : tw.color('gray-500');



        //setting tabbar-icon
        const tabBarIcon =
            options.tabBarIcon &&
            options.tabBarIcon({
                color: tabBarColor,
                focused: isFocused,
                size: getSize.m(24),
            });


        //--_onPress
        const _onPress = (key, routeName, isFocused) => {
            //
            const event = navigation.emit({
                type: "tabPress",
                target: key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(routeName);
            }
        };

        //----_onLongPress
        const _onLongPress = (key) => {
            navigation.emit({
                type: "tabLongPress",
                target: key,
            });
        };


        //--scale-out
        const zoomOut = {
            0: {
                opacity: 1,
                scale: 1.0,
            },
            0.5: {
                opacity: 1,
                scale: 0.6,
            },
            1: {
                opacity: 1,
                scale: 0.8,
            },
        };
        //-scale-in
        const zoomIn = {
            0: {
                opacity: 1,
                scale: 0.9,
            },
            0.5: {
                opacity: 1,
                scale: 0.8,
            },
            1: {
                opacity: 1,
                scale: 1,
            },
        };

        //-----Return
        return <TouchableOpacity
            key={route.key}
            activeOpacity={0.8}
            style={[]}
            onPress={() => _onPress(route.key, route.name, isFocused)}
            onLongPress={() => _onLongPress(route.key)}
        >
            <Animatable.View
                animation={isFocused? zoomIn : zoomOut}
                style={tw`items-center`}>
                {tabBarIcon}
                <Text style={[tw`text-sm tracking-wide`, {color: textColor}]}>{label}</Text>
            </Animatable.View>

        </TouchableOpacity>
    }

    //---RETURN
    return <Box bg={'white'} style={[tw`flex-row justify-around border-t border-gray-300 shadow-md h-20 py-2`]}>
        {state.routes.map(_renderItem)}
    </Box>
}

export default BottomTab;