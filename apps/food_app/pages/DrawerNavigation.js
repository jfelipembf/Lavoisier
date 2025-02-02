import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigation';
import DrawerMenu from '../layout/DrawerMenu';

const Drawer = createDrawerNavigator();

const DrawerNavigation = (props) => {
    return (
        <>
            <Drawer.Navigator
                drawerContent={() => <DrawerMenu homeNavigate={'BottomNavigation'}/>}
                screenOptions={{
                    headerShown : false
                }}
            >
                <Drawer.Screen
                    name="BottomNavigation"
                    component={BottomNavigation} 
                />
            </Drawer.Navigator>
        </>
    );
};


export default DrawerNavigation;