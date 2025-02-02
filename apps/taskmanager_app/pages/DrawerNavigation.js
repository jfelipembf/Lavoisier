import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerMenu from '../layout/DrawerMenu';
import MainHome from './Home';
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
                drawerContent={() => <DrawerMenu homeNavigate={'Home'}/>}
                screenOptions={{
                    headerShown : false
                }}
            >
                <Drawer.Screen
                    name="Home"
                    component={MainHome} 
                />
            </Drawer.Navigator>
        </SafeAreaView>
    );
};


export default DrawerNavigation;