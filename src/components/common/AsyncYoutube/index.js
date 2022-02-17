import React,{useEffect, useState, useCallback} from "react";
import {Box, Center, Spinner} from 'native-base';
import YoutubePlayer from "react-native-youtube-iframe";
import {useNavigation} from "@react-navigation/native";


const AsyncYoutube =({youtubeId, height})=>{
    //
    const navigation = useNavigation();
    //------------>
    const [playing, setPlaying] = useState(true);
    const [loader, setLoader] = useState(true)

    //--->onStateChange
    const onStateChange =useCallback((state)=>{
        if (state === "ended") {
            setPlaying(false);
        }
    },[]);

    //----->togglePlaying
    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    //---------------->
    return<Box w={'100%'} h={'100%'}>
        <YoutubePlayer
            height={height}
            play={playing}
            videoId={youtubeId}
            onReady={()=>setLoader(false)}
            onError={()=>setLoader(false)}
            onChangeState={onStateChange}
            webViewProps={{
                injectedJavaScript: `
            var element = document.getElementsByClassName('container')[0];
            element.style.position = 'unset';
            element.style.paddingBottom = 'unset';
            true;
          `,
            }}
        />
        {loader &&
            <Center w={'100%'} h={'100%'} position={'absolute'} bg={'gray.800'}>
                <Spinner size={'lg'} color={'gray.100'}/>
            </Center>

        }
    </Box>
}

export default AsyncYoutube;