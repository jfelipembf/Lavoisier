import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../Screens/Home";
import Pages from "../Screens/pages";
import Components from "../Screens/components";
import Settings from "../Screens/Settings";
import Media from "../Screens/Media";
import Schedule from "../pages/Schedule/Schedule";

import CustomNavigation from "./CustomNavigation";
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import COLORS from '../constants/colors';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <>
      <Tab.Navigator
        tabBar={props => <CustomNavigation {...props} />}
        screenOptions={{
            headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Tab.Screen 
            name="Components"
            component={Components}
        />
        <Tab.Screen 
            name="Media"
            component={Media}
        />
        <Tab.Screen 
            name="Home"
            component={Home}
        />
        <Tab.Screen 
            name="Pages"
            component={Pages}
        />
        <Tab.Screen 
            name="Settings"
            component={Settings}
            options={{
                tabBarIcon: ({focused}) => {
                    return (
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <Feather 
                                name="settings" 
                                size={22} 
                                color={focused ? COLORS.primary : COLORS.text}
                            />
                        </View>
                    )
                }
            }}
        />
        <Tab.Screen 
            name="Schedule" 
            component={Schedule}
            options={{
                headerShown: true,
                title: 'Agenda'
            }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomNavigation;
