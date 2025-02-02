import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/theme';

import Home from './Home/Home';
import Agenda from './Home/Agenda';
import Grades from './Study/Grades';
import Study from './Study/Study';
import Financial from './Financial/Financial';
import Profile1 from './Profile/Profile1';
import Quiz from './Study/Quiz';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: Platform.OS === 'ios' ? 88 : 68,
                    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
                    paddingTop: 10,
                    backgroundColor: colors.cardBg,
                    position: 'absolute',
                    borderTopWidth: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                    marginTop: -10,
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: colors.text,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Study"
                component={Study}
                options={{
                    tabBarLabel: 'Estudar',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="book-open-variant" color={color} size={24} />
                    ),
                    unmountOnBlur: true,
                }}
            />
            <Tab.Screen
                name="Quiz"
                component={Quiz}
                options={{ 
                    tabBarButton: () => null
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate('Study');
                    },
                })}
            />
            <Tab.Screen
                name="Grades"
                component={Grades}
                options={{
                    tabBarLabel: 'Notas',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="chart-line" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Financial"
                component={Financial}
                options={{
                    tabBarLabel: 'Financeiro',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="wallet" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile1}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Agenda"
                component={Agenda}
                options={{
                    tabBarButton: () => null,
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;