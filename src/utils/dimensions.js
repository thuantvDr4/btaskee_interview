import {Dimensions} from "react-native";

const { width, height } = Dimensions.get("screen");

const getWidth =()=>width;

const getHeight =()=>height;


export {
    getWidth,
    getHeight,
}