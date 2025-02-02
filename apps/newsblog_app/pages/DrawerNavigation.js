import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import DrawerMenu from '../layout/DrawerMenu';
import { SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

    const {colors} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.cardBg,
            }}
        >
            <Drawer.Navigator
                initialRouteName='Home'
                drawerContent={() => <DrawerMenu homeNavigate={'Home'}/>}
                screenOptions={{
                    headerShown : false
                }}
            >
                <Drawer.Screen
                    name="Home"
                    component={Home} 
                />
            </Drawer.Navigator>
        </SafeAreaView>
    );
};


export default DrawerNavigation;