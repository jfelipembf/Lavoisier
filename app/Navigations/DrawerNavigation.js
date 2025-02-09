import React from 'react';
import { SafeAreaView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import Pages from '../Screens/pages';
import Learning from '../pages/Learning';
import Timetable from '../pages/Timetable/Timetable';
import CustomDrawer from './CustomDrawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    const { colors } = useTheme();
    
    return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.card}}>
            <Drawer.Navigator
                initialRouteName="Main"
                screenOptions={{
                    headerShown: false,
                }}
                drawerContent={props => <CustomDrawer {...props} />}
            >
                <Drawer.Screen name="Main" component={BottomNavigation} />
                <Drawer.Screen name="Pages" component={Pages} />
                <Drawer.Screen name="Learning" component={Learning} />
                <Drawer.Screen 
                    name="Timetable" 
                    component={Timetable}
                    options={{
                        drawerIcon: ({color}) => (
                            <FontAwesome name="calendar" size={22} color={color} />
                        ),
                        drawerLabel: 'Grade Horária'
                    }}
                />
            </Drawer.Navigator>
        </SafeAreaView>
    );
}

export default DrawerNavigation;
