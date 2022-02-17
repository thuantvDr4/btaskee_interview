import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Box } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
//
import { Explore, Library, Profile } from "@screens";
//
import {BottomTab} from "@components/common";

//create tab
const Tab = createBottomTabNavigator();

//---> options
const options = {
    headerShown: false,
    gestureEnabled: Platform.OS === "ios",
    cardStyle: {},
    // tabBarStyle: { backgroundColor: "white" },
    //   tabBarActiveTintColor: 'blue',
    // tabBarStyle: {
    //     // backgroundColor: '#ffe082'
    //     height: 60,
    //     paddingBottom: 10,
    // },
    // tabBarActiveTintColor: "#f57f17",
    // tabBarInactiveTintColor: "#000",
    // headerTintColor: "black",
    // headerShown: false,
    // tabBarIcon: () => null,
};

// render-TabItems
const getRootTab = (role = "Main") =>
    rootTabData[role].map((item) => {
        return (
            <Tab.Screen
                key={item.screenName}
                name={item.screenName}
                component={item.component}
                options={{
                    tabBarLabel: item.label,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Box>
                            <Icon name={item.iconName} size={size} color={color} />
                        </Box>
                    ),
                }}
            />
        );
    });

//-------->Main
const Tabs = () => {
    //

    //========>return
    return (
        <Tab.Navigator
            backBehavior="initialRoute"
            tabBar={(props) => <BottomTab {...props} />}
            screenOptions={options}
        >
            {getRootTab("Main")}
        </Tab.Navigator>
    );
};

export default Tabs;

//
//
const rootTabData = {
    Main: [
        {
            label: "Khám Phá",
            iconName: "home",
            screenName: "home",
            component: Explore,
        },
        {
            label: "Đã Lưu",
            iconName: "heart",
            screenName: "library",
            component: Library,
        },
        {
            label: "Tài Khoản",
            iconName: "user-circle",
            screenName: "account",
            component: Profile,
        },
    ],
};
