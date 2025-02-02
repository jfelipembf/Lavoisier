import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import BlogDetail from './BlogDetail';
import DrawerNavigation from './DrawerNavigation';
import Components from '../Screens/components';


const StackComponent = createStackNavigator();

const Index = () => {

    return (
        <>
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
                <StackComponent.Screen name={"BlogDetail"} component={BlogDetail} />
                <StackComponent.Screen name={"Components"} component={Components} />
            </StackComponent.Navigator>
        </>
    );

};


export default Index;