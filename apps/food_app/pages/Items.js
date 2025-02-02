import React from 'react';
import { ImageBackground, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';

import { GlobalStyleSheet } from '../constants/StyleSheet';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import ListItem from './components/ListItem';

const Items = ({route,navigation}) => {

    const theme = useTheme();
    const {colors} = theme;
    const { category } = route.params;

    const ItemData = [
        {
            image : IMAGES.foodItem3,
            title : "Chicken curry",
            duration : "45 min",
            servings : "3",
            price : "$35.45",
            rating : "4.6",
            isLike : false,
        },
        {
            image : IMAGES.foodItem4,
            title : "Chinese noodles",
            duration : "30 min",
            servings : "3",
            price : "$25.15",
            rating : "4.2",
            isLike : false,
        },
        {
            image : IMAGES.foodItem5,
            title : "Peanut cake",
            duration : "45 min",
            servings : "3",
            price : "$35.10",
            rating : "4.5",
            isLike : false,
        },
        {
            image : IMAGES.foodItem6,
            title : "Chicken curry",
            duration : "45 min",
            servings : "3",
            price : "$35.45",
            rating : "4.6",
            isLike : false,
        },
        {
            image : IMAGES.foodItem3,
            title : "Chicken curry",
            duration : "45 min",
            servings : "3",
            price : "$35.45",
            rating : "4.6",
            isLike : false,
        },
        {
            image : IMAGES.foodItem4,
            title : "Chinese noodles",
            duration : "30 min",
            servings : "3",
            price : "$25.15",
            rating : "4.2",
            isLike : false,
        },
        {
            image : IMAGES.foodItem5,
            title : "Peanut cake",
            duration : "45 min",
            servings : "3",
            price : "$35.10",
            rating : "4.5",
            isLike : false,
        },
        {
            image : IMAGES.foodItem6,
            title : "Chicken curry",
            duration : "45 min",
            servings : "3",
            price : "$35.45",
            rating : "4.6",
            isLike : false,
        },
    ]

    return (
        <>
            <SafeAreaView
                style={[GlobalStyleSheet.container, {padding:0, flex:1,backgroundColor:colors.background}]}
            >
                <View style={{paddingBottom:10}}>
                    <ImageBackground
                        source={theme.dark ? IMAGES.foodPattern2 : IMAGES.foodPattern1}
                        style={GlobalStyleSheet.headerArea}
                    >
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{
                                    height:45,
                                    width:45,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    marginRight:8,
                                    marginLeft:-10,
                                }}
                            >
                                <FeatherIcon size={22} color={COLORS.white} name='arrow-left'/>
                            </TouchableOpacity>
                            <View style={{flex:1}}>
                                <Text style={{...FONTS.h6,color:COLORS.white}}>{category}</Text>
                                <Text 
                                    numberOfLines={1} 
                                    style={{
                                        ...FONTS.font,
                                        color:COLORS.white,
                                        opacity:.75
                                    }}>64 items in {category}</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('Cart')}
                                style={GlobalStyleSheet.NotificationBtn} >
                                <FeatherIcon style={{marginLeft:-2}} size={22} color={COLORS.white} name={'shopping-cart'} />
                                <View style={GlobalStyleSheet.NotificationDot}>
                                    <Text style={{...FONTS.font,bottom:2,...FONTS.fontBold,fontSize:11,color:COLORS.white}}>2</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    <View style={{marginHorizontal:15,marginTop:-26}}>
                        <View
                            style={[{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 4,
                                },
                                shadowOpacity: .15,
                                shadowRadius: 5,
                            },Platform.OS === 'ios' && {
                                backgroundColor:colors.cardBg,
                                borderRadius : 10,
                            }]}
                        >
                            <TextInput
                                style={{
                                    ...GlobalStyleSheet.searchInput,
                                    backgroundColor:colors.cardBg,
                                    color:colors.title,
                                }}
                                placeholder={`Search items "${category}"`}
                                placeholderTextColor={colors.textLight}
                            />
                            <TouchableOpacity style={GlobalStyleSheet.searchInputIcon}>
                                <FeatherIcon color={colors.text} size={22} name='search'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        {ItemData.map((data,index) => {
                            return(
                                <ListItem
                                    key={index}
                                    image={data.image}
                                    title={data.title}
                                    duration={data.duration}
                                    servings={data.servings}
                                    price={data.price}
                                    rating={data.rating}
                                    isLike={data.isLike}
                                />
                            )
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Items;