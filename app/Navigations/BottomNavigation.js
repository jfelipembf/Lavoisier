import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../Screens/Home";
import Pages from "../Screens/pages";
import Components from "../Screens/components";
import Settings from "../Screens/Settings";
import Media from "../Screens/Media";


import CustomNavigation from "./CustomNavigation";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {

  return (
    <>
      <Tab.Navigator
        tabBar={props => <CustomNavigation {...props} />}
        screenOptions={{
            headerShown:false,
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
        />
    </Tab.Navigator>
    </>
  );
};



export default BottomNavigation;
