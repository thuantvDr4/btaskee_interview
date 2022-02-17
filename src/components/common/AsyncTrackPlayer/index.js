import React, {useState, useRef, useEffect} from "react";
import {Animated, View} from 'react-native'
import {Box, Text, Center, FlatList, HStack} from 'native-base';
import TrackPlayer, {
    Event,
    Capability,
    usePlaybackState,
    TrackPlayerEvents,
    IOSCategory,
    IOSCategoryMode
} from 'react-native-track-player';
import AsyncImage from "@components/common/AsyncImage";
import tw from 'twrnc'

//utils
import {getWidth, getHeight} from "@utils/dimensions";
import ControlBar from "./ControlBar";
import SliderBar from "./SliderBar";
//
const cardWidth = getWidth();
const width = getWidth();

//OPTS
const TRACK_PLAYER_CONTROLS_OPTS = {
    waitforBuffer: true,
    stopWithApp: false,
    alwaysPauseOnInterruption: true,

    compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
    ],
    capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
    ],
};

//------------------------------>Main
const AsyncTrackPlayer =({Data})=>{
    const scrollX = useRef(new Animated.Value(0)).current;
    const slider = useRef(null);
    const index = useRef(0);
    const isPlayerReady = useRef(false);
    const isItFromUser = useRef(true);

    //States
    const [itemCurrent, setItemCurrent] = useState(0);
    const playbackState = usePlaybackState();

    //------>setupTrackPlayer
    const setupTrackPlayer = async ()=>{
        TrackPlayer.setupPlayer({
            iosCategory: IOSCategory.Playback,
            // iosCategoryOptions:
            iosCategoryMode: IOSCategoryMode.Default,
        }).then(async () => {
            // The player is ready to be used
            console.log('Player ready');
            // add the array of songs in the playlist
            await TrackPlayer.reset();
            await TrackPlayer.add(Data);

            //----auto-play
           // await TrackPlayer.play();
            isPlayerReady.current = true;

            await TrackPlayer.updateOptions(TRACK_PLAYER_CONTROLS_OPTS);

            //add listener on track change
            TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async e => {
                console.log('song ended', e);
                //{"nextTrack": 2, "position": 173.29632653061225, "track": 1} = e

                const trackId = (await TrackPlayer.getCurrentTrack()) - 1; //get the current id

                console.log('track id', trackId, 'index', index.current);

                if (trackId !== index.current) {
                    setItemCurrent(trackId);
                    isItFromUser.current = false;

                    if (trackId > index.current) {
                        goNext();
                    } else {
                        goPrev();
                    }
                    setTimeout(() => {
                        isItFromUser.current = true;
                    }, 300);
                }

                // isPlayerReady.current = true;
            });

            // monitor intterupt when other apps start playing music
            TrackPlayer.addEventListener(Event.RemoteDuck, e => {
                // console.log(e);
                if (e.paused) {
                    // if pause true we need to pause the music
                    TrackPlayer.pause();
                } else {
                    TrackPlayer.play();
                }
            });
        });

    }



    //--listen event scroll
    useEffect(()=>{
        //-------
        scrollX.addListener(({value}) => {
            const val = Math.round(value / width);
            //
            setItemCurrent(val);
        });

        //---setup-trackplayer
        // setupPlayer();
        setupTrackPlayer();


        //--clean
        return () => {
            scrollX.removeAllListeners();
            TrackPlayer.destroy();
            // exitPlayer();
        };
    },[scrollX]);


    // change the song when index changes
    useEffect(() => {
        if (isPlayerReady.current && isItFromUser.current) {
            TrackPlayer.skip(Data[itemCurrent].id)
                .then(_ => {
                    console.log('changed track');
                })
                .catch(e => console.log('error in changing track ', e));
        }
        //
        index.current = itemCurrent;
        //
    }, [itemCurrent]);


    //--RenderCard
    const RenderArtWork =({item, index})=>{

        return <Animated.View>
            <AsyncImage
                resizeMode={'contain'}
                style={[{width:cardWidth, height: cardWidth}, tw`rounded-lg z-10`]}
                source={{uri: item?.artwork}}/>

            {/*----mask-cover--*/}
            <Box width={cardWidth} height={cardWidth} bg={'gray.200'}
                 style={tw`absolute rounded-full left-0 right-0`}/>

        </Animated.View>
    }


    //--goNext
    const goNext = async ()=>{
        slider.current.scrollToOffset({
            offset: (index.current + 1) * width,
        });
        //
        await TrackPlayer.play();
    }

    //-----goPrev
    const goPrev = async ()=>{
        slider.current.scrollToOffset({
            offset: (index.current - 1) * width,
        });
        //
        await TrackPlayer.play();
    }

    //----------------->MAIN
    return <Box>
            {/*---list--*/}
            <Animated.FlatList
                ref={slider}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                data={Data}
                renderItem={RenderArtWork}
                keyExtractor={(_,index) =>index.toString() }
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: true},
                )}
            />

    {/*--number---*/}
        <Center mt={'2'}>
            <HStack style={tw`items-center justify-center rounded-full`} w={'30%'} bg={'gray.500'}>
                <Text fontSize={'md'} color={'gray.100'} bold>{itemCurrent+1}</Text>
                <Text fontSize={'md'} color={'gray.100'} bold>{' / '}</Text>
                <Text fontSize={'md'} color={'gray.100'} bold>{Data.length}</Text>
            </HStack>
        </Center>

    {/* --slider---*/}
            <SliderBar/>
    {/*--control-bar--*/}
        <Box mt={'8'}>
            <ControlBar onNextTo={goNext} onPrevTo={goPrev}/>
        </Box>

    </Box>
}


export default AsyncTrackPlayer;