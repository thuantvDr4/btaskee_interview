import React, {useState} from "react";
import { Box , Text, FlatList, Center} from "native-base";
import tw from "twrnc";
//HOCS

//
import {BaseTemplate} from "@components/TemplateType";
//Components
import Maps from "@components/Maps";
//Utils
import {getWidth, getHeight} from "@utils/dimensions";
//Local-data
import {WithKeyBoardAwareScrollView} from "@HOC";

//

//-------MAIN
function Library() {
    return (
        <Box flex={'1'}>
            <Maps/>
        </Box>
    );
}

export default Library;
