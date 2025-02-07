import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import Pages from '../Screens/pages';
import Learning from '../pages/Learning';

const Stack = createStackNavigator();

const DrawerNavigation = () => {
    const { colors } = useTheme();
    
    return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.card}}>
            <Stack.Navigator 
                initialRouteName="Main"
                screenOptions={{
                    headerShown: false,
                    presentation: 'card'
                }}
            >
                <Stack.Screen name="Main" component={BottomNavigation} />
                <Stack.Screen name="Pages" component={Pages} />
                <Stack.Screen name="Learning" component={Learning} />
            </Stack.Navigator>
        </SafeAreaView>
    );
}

export default DrawerNavigation;
