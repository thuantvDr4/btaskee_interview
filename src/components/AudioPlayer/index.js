import React from "react";
import {Dimensions} from "react-native";
import {Box, Text, Center} from 'native-base';
import {AsyncTrackPlayer} from "@components/common";
import tw from 'twrnc'

const {width, height} = Dimensions.get('window');

//------CONSTANT
const AUDIO_BOOKS = [
    {
        title: "Muôn Kiếp Nhân Sinh 1",
        artist: "Powfu",
        artwork:"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564",
        id: 1,
        url: "https://samplesongs.netlify.app/Faded.mp3",
    },
    {
        title: "360 Câu Hỏi Trắc Nghiệm Vật Lý 9 - Có Đáp Án",
        artist: "Imagine Dragons",
        artwork:
            "https://kbimages1-a.akamaihd.net/f16e3461-030b-41c0-aed5-03e1a54c3dea/1200/1200/False/design-a-book-cover.jpg",
        id: 2,
        url: "https://samplesongs.netlify.app/Death%20Bed.mp3",
    },
    {
        title: "faded",
        artist: "Alan Walker",
        artwork:
            "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-fall-2019/large/bbcdune.jpg?1384968217",
        id: 3,
        url: "https://samplesongs.netlify.app/Faded.mp3",
    },
    {
        title: "hate me",
        artist: "Ellie Goulding",
        artwork: "https://images-na.ssl-images-amazon.com/images/I/51foG2y04iL._SS400_.jpg",
        id: 4,
        url: "https://samplesongs.netlify.app/Death%20Bed.mp3",
    },
    {
        title: "Solo",
        artist: "Clean Bandit",
        artwork:
            "https://marketplace.canva.com/EAD7WuSVrt0/1/0/1003w/canva-colorful-illustration-young-adult-book-cover-LVthABb24ik.jpg",
        id: 5,
        url: "https://samplesongs.netlify.app/Death%20Bed.mp3",
    },
    {
        title: "without me",
        artist: "Halsey",
        artwork: "https://dw0i2gv3d32l1.cloudfront.net/uploads/stage/stage_image/37836/optimized_large_thumb_stage.jpg",
        id: 6,
        url: "https://samplesongs.netlify.app/Faded.mp3",
    },
];

const AudioPlayer =()=>{
    return <Box flex={'1'} bg={'white'}>
        <AsyncTrackPlayer Data={AUDIO_BOOKS}/>
    </Box>
}

export default AudioPlayer;