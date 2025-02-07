import React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CardStyle1 from '../components/card/CardStyle1';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { COLORS, IMAGES } from '../constants/theme';
import Header from '../layout/Header';
import Schedule from './Schedule';

const Stack = createStackNavigator();

const PagesContent = (props) => {

    const { colors } = useTheme();

    const PagesData = [
        {
            color :  COLORS.primary6,
            icon  : IMAGES.suitcaseIco,
            title : "LinkdIn Pack",
            desc  : "Pages for Jobs & network",
            navigate : "LinkdinPage",
        },  
        {
            color :  COLORS.primary7,
            icon  : IMAGES.play,
            title : "Youtube Pack",
            desc  : "Pages for videos",
            navigate : "YoutubePage",
        },  
        {
            color :  COLORS.primary6,
            icon  : IMAGES.blog,
            title : "Task Manager",
            desc  : "Pages for Task Manager pack",
            navigate : "TaskManagerPage",
        },  
        {
            color :  COLORS.primary,
            icon  : IMAGES.fairtrade,
            title : "Social Network",
            desc  : "Pages for Social & network",
            navigate : "SocialNetworkPages",
        },  
        {
            color : "#4a89dc",
            icon  : IMAGES.blog,
            title : "News & Blog",
            desc  : "Pages for blog & news",
            navigate : "News&Blog",
        },  
        {
            color : "#656d77",
            icon  : IMAGES.book,
            title : "Education",
            desc  : "Learning , Course Pages for Education",
            navigate : "EduacationPage",
        },
        {
            color : "#e99331",
            icon  : IMAGES.restaurant,
            title : "Food Pack",
            desc  : "Pages for Food & Restaurant",
            navigate : "FoodPage",
        },
        {
            color : "#36c1ab",
            icon  : IMAGES.grocery,
            title : "Grocery",
            desc  : "Grocery store pages",
            navigate : "GroceryPage",
        },
        {
            color : "#f85c6f",
            icon  : IMAGES.heart,
            title : "Dating App",
            desc  : "Dating app pages",
            navigate : "DatingPage",
        },
        {
            color : "#7c58dd",
            icon  : IMAGES.scheme,
            title : "Classified App",
            desc  : "Pages for Classified app",
            navigate : "ClassifiedPage",
        },
        {
            color : COLORS.primary,
            icon  : IMAGES.wallet,
            title : "Financeiro",
            desc  : "Histórico de pagamentos",
            navigate : "Financeiro",
        },
        {
            color : COLORS.primary,
            icon  : IMAGES.schedule,
            title : "Schedule",
            desc  : "Schedule pages",
            navigate : "Schedule",
        },
    ]

    return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.card}}>
            <Header title={'Pages'} bgWhite leftIcon={'back'} />
            <ScrollView>
                <View style={GlobalStyleSheet.container}>
                    <View style={GlobalStyleSheet.row}>
                        {PagesData.map((data,index) => {
                            return(
                                <View key={index} style={GlobalStyleSheet.col50}>
                                    <CardStyle1
                                        onPress={() => props.navigation.navigate(data.navigate)}
                                        image={data.icon}
                                        title={data.title}
                                        desc={data.desc}
                                        color={data.color}
                                    />
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const Pages = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="PagesHome" component={PagesContent} />
            <Stack.Screen 
                name="Schedule" 
                component={Schedule}
                options={{
                    headerShown: true,
                    title: 'Agenda'
                }}
            />
        </Stack.Navigator>
    );
};

export default Pages;