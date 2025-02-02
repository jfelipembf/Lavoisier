import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import DrawerNavigation from './DrawerNavigation';
import VideoScreen from './VideoScreen/VideoScreen';
import CreatePost from './CreatePost/CreatePost';
import Search from './Home/Search';
import Notifications from './Home/Notifications';
import Components from '../Screens/components';

const StackComponent = createStackNavigator();

const YoutubePage = () => {

    const {colors} = useTheme();
    
    return (
        <StackComponent.Navigator
            initialRouteName={"DrawerNavigation"}
            detachInactiveScreens={true}
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: colors.cardBg },
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            >
            <StackComponent.Screen name={"DrawerNavigation"} component={DrawerNavigation} />
            <StackComponent.Screen name={"VideoScreen"} component={VideoScreen} />
            <StackComponent.Screen name={"CreatePost"} component={CreatePost} />
            <StackComponent.Screen name={"Search"} component={Search} />
            <StackComponent.Screen name={"Notifications"} component={Notifications} />
            <StackComponent.Screen name={"Components"} component={Components} />
        </StackComponent.Navigator>
    );
};

export default YoutubePage;