import React,{useState} from 'react';
import {Box, Spinner, Center} from 'native-base';
import FastImage from "react-native-fast-image";


const AsyncImage =({
                       resizeMode ='cover',
                        style,
                       placeholderColor,
                       source
                   })=>{


    const [loader, setLoader] = useState(false);

    return <Box style={style}>
        <FastImage
            style={[
                style,
                {
                    position: 'absolute',
                    resizeMode: 'contain'
                }
            ]}
            source={{
                ...source,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode[resizeMode]}
            onLoad={()=>setLoader(true)}
            onLoadEnd={()=>setLoader(false)}
        />
        {loader &&<Center style={[
            style,
            {
                backgroundColor: placeholderColor || '#90a4ae',
                position: 'absolute'
            }
        ]}>
            <Spinner size="lg" color={'white'} />
        </Center>

        }
    </Box>
}

export default AsyncImage;