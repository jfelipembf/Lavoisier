import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Components from '../Screens/components';
import DrawerNavigation from './DrawerNavigation';
import ChatList from './Chat/ChatList';
import ChatScreen from './Chat/Chats';
import Profile from './Profile/Profile';
import JobDetails from './Jobs/JobDetails';
import CreatePost from './CreatePost/CreatePost';
import PostDetails from './Home/PostDetails';
import Connections from './MyNetwork/Connections';
import Search from './Home/Search';

const StackComponent = createStackNavigator();

const LinkdinPage = () => {
    return (
        <StackComponent.Navigator
            initialRouteName={"DrawerNavigation"}
            detachInactiveScreens={true}
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: "transparent" },
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            >
            <StackComponent.Screen name={"DrawerNavigation"} component={DrawerNavigation} />
            <StackComponent.Screen name={"ChatList"} component={ChatList} />
            <StackComponent.Screen name={"ChatScreen"} component={ChatScreen} />
            <StackComponent.Screen name={"Profile"} component={Profile} />
            <StackComponent.Screen name={"JobDetails"} component={JobDetails} />
            <StackComponent.Screen name={"PostDetails"} component={PostDetails} />
            <StackComponent.Screen name={"CreatePost"} component={CreatePost} />
            <StackComponent.Screen name={"Connections"} component={Connections} />
            <StackComponent.Screen name={"Search"} component={Search} />
            <StackComponent.Screen name={"Components"} component={Components} />
        </StackComponent.Navigator>
    );
};

export default LinkdinPage;