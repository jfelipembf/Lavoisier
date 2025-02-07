import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Header from '../../layout/Header';
import { COLORS, FONTS } from '../../constants/theme';
import Video from './Video';
import Quiz from './Quiz/Quiz';

const Tab = createBottomTabNavigator();

const Learning = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View>
                <Header 
                    titleLeft
                    title={'Aprendizagem'}
                    bgWhite
                />
                <View style={{
                    borderBottomWidth: 1,
                    borderColor: colors.borderColor,
                    marginTop: -1
                }} />
            </View>
            
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarInactiveTintColor: COLORS.text,
                    tabBarLabelStyle: {
                        ...FONTS.font,
                        fontSize: 12,
                    },
                    tabBarStyle: {
                        backgroundColor: colors.card,
                        borderTopWidth: 0,
                    },
                    contentStyle: {
                        paddingBottom: 100
                    }
                }}
            >
                <Tab.Screen 
                    name="Video" 
                    component={Video}
                    options={{
                        title: 'Video Aulas',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons 
                                name="play-circle"
                                size={size} 
                                color={color} 
                            />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Quiz" 
                    component={Quiz}
                    options={{
                        title: 'Questões',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons 
                                name="clipboard-text"
                                size={size} 
                                color={color} 
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Learning;