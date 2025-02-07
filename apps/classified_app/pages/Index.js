import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import CreatePost from './CreatePost';
import ItemDetails from './ItemDetails';
import ChatScreen from './Chats/ChatScreen';
import Items from './Items';
import DrawerNavigation from './DrawerNavigation';
import Components from '../Screens/components';

const StackComponent = createStackNavigator();

const ClassifiedPage = () => {

    return (
        <>
            <StackComponent.Navigator
                initialRouteName={"BootomNavigation"}
                detachInactiveScreens={true}
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: "transparent" },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
                >
                <StackComponent.Screen name={"DrawerNavigation"} component={DrawerNavigation} />
                <StackComponent.Screen name={"CreatePost"} component={CreatePost} />
                <StackComponent.Screen name={"ItemDetails"} component={ItemDetails} />
                <StackComponent.Screen name={"ChatScreen"} component={ChatScreen} />
                <StackComponent.Screen name={"Items"} component={Items} />
                <StackComponent.Screen name={"Components"} component={Components} />
            </StackComponent.Navigator>
        </>
    );

};


export default ClassifiedPage;