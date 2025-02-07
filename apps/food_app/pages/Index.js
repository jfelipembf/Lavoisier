import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Items from './Items';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import DrawerNavigation from './DrawerNavigation';
import Components from '../Screens/components';
import OnBoarding from './OnBoarding';
import { SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';


const StackComponent = createStackNavigator();

const FoodPage = (props) => {

    const {colors} = useTheme();

    return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.card}}>
            <StackComponent.Navigator
                initialRouteName={"OnBoarding"}
                detachInactiveScreens={true}
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: "transparent" },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
                >
                <StackComponent.Screen name={"OnBoarding"} component={OnBoarding} />
                <StackComponent.Screen name={"DrawerNavigation"} component={DrawerNavigation} />
                <StackComponent.Screen name={"Items"} component={Items} />
                <StackComponent.Screen name={"ProductDetail"} component={ProductDetail} />
                <StackComponent.Screen name={"Cart"} component={Cart} />
                <StackComponent.Screen name={"Components"} component={Components} />
            </StackComponent.Navigator>
        </SafeAreaView>
    );

};


export default FoodPage;