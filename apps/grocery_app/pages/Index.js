import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import Items from './Items';
import ItemDetail from './ItemDetail';
import ShoppingCart from './Cart';
import Address from './Checkout/Address';
import Payment from './Checkout/Payment';
import Review from './Checkout/Review';
import Components from '../Screens/components';


const StackComponent = createStackNavigator();

const GroceryPage = () => {

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
                <StackComponent.Screen name={"Items"} component={Items} />
                <StackComponent.Screen name={"ItemDetail"} component={ItemDetail} />
                <StackComponent.Screen name={"ShoppingCart"} component={ShoppingCart} />
                <StackComponent.Screen name={"CheckoutAddress"} component={Address} />
                <StackComponent.Screen name={"CheckoutPayment"} component={Payment} />
                <StackComponent.Screen name={"CheckoutReview"} component={Review} />
                <StackComponent.Screen name={"Components"} component={Components} />
            </StackComponent.Navigator>
        </>
    );

};


export default GroceryPage;