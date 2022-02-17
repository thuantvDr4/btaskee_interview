import React,{useState} from "react";
import {Box, Center,Input, HStack,Icon} from "native-base";
import {StyleSheet} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
//custom-component
import CustomCallout from "@components/Maps/CustomCallout";
import ChipList from "@components/Maps/ChipList";
import BannerPlace from "@components/Maps/BannerPlace";

//----->styles
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
//-------->
const MARKERS =[
    {coordinate:{
            latitude: 22.6293867,
            longitude: 88.4354486,
        },
        image: 'https://www.aleenta.com/files/3515/8678/5204/Natai_Beach_Restaurants.jpg',
        title: 'Title 1',
        description: 'more description 1....',
        rating: 4,
        reviews: 99,
    },
    {coordinate:{
            latitude: 22.6345648,
            longitude: 88.4377279,
        },
        image: 'https://a.cdn-hotels.com/gdcs/production193/d660/4e1723eb-4760-451f-a0ea-a6ad5af4353d.jpg',
        title: 'Title 2',
        description: 'more description 2....',
        rating: 5,
        reviews: 102,
    },
    {coordinate:{
            latitude: 22.6292757,
            longitude: 88.444781,
        },
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/7f/64/de/restaurant-on-the-beach.jpg',
        title: 'Title 3',
        description: 'more description 3....',
        rating: 4.5,
        reviews: 110,
    },
    {coordinate:{
            latitude: 22.6341137,
            longitude: 88.4497463,
        },
        image: 'https://www.ocregister.com/wp-content/uploads/migration/lh3/lh30a6-lh302rlagunabeachrestaurantinfo.jpg',
        title: 'Title 4',
        description: 'more description 4....',
        rating: 4,
        reviews: 88,
    },
];

const Maps =()=>{
    //
    const [markers, setMarkers] = useState(MARKERS)
    const [markerIndex, setMarkerIndex] = useState(0)
    //
    return <Box style={styles.container}>
        <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
                latitude: 22.62938671242907,
                longitude: 88.4354486029795,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068,
            }}
        >
            {markers.map((marker,index)=>{
                return <Marker
                    onPress={()=>setMarkerIndex(index)}
                    key={index.toString()}
                    coordinate={marker?.coordinate}
                    image={require('../../assets/icons/location.png')}
                    title='Title..'
                    description= 'more info...'
                >
                    <CustomCallout data={marker} onPress={()=>setMarkerIndex(index)}/>
                </Marker>
            })}
        </MapView>
    {/*---search-bar---*/}
        <Center position={'absolute'} top={10} w={'100%'}>
            <Input
                size={'lg'}
                bg={'white'}
                w={{
                base: "90%",
                md: "25%"
            }}
                   InputRightElement={<Icon as={<FontAwesome5 name="search" />} size={5} mr="2" color="muted.400" />}
                   placeholder="Search..." />

        </Center>
    {/*--Chip-list--*/}
        <ChipList/>

    {/*--banner-places--*/}
        <BannerPlace data={markers} markerIndex={markerIndex}/>

    </Box>
}

export default Maps;