import {atom} from "recoil";

const atomColors = atom({
    key: 'useColors', // unique ID (with respect to other atoms/selectors)
    default: {
        'primary': '#ffffff',
        'secondary': '#4dabf5',
    }, // default value (aka initial value)
})


export {
    atomColors
}