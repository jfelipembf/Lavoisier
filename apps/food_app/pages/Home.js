import React from 'react';
import { ImageBackground, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { GlobalStyleSheet } from '../constants/StyleSheet';
import {COLORS, FONTS, IMAGES} from '../constants/theme';
import Categories from './components/Categories';
import BannerSlider from './components/BannerSlider';
import PopularItems from './components/PopularItems';
import ListItem from './components/ListItem';

const Home = (props) => {
    
    const theme = useTheme();
    const {colors} = theme;

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
            title : "Pancake stack",
            duration : "45 min",
            servings : "3",
            price : "$35.45",
            rating : "4.6",
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
            title : "Pancake stack",
            duration : "45 min",
            servings : "3",
            price : "$35.45",
            rating : "4.6",
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
            <SafeAreaView style={[GlobalStyleSheet.container,{padding:0, flex:1}]}>
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
                            <FeatherIcon style={{marginRight:12}} size={22} color={COLORS.white} name={'map-pin'} />
                            <View style={{flex:1}}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{...FONTS.h6,lineHeight:18,color:COLORS.white}}>Work</Text>
                                    <FeatherIcon style={{marginLeft:2}} size={20} color={COLORS.white} name={'chevron-down'} />
                                </View>
                                <Text 
                                    numberOfLines={1} 
                                    style={{
                                        ...FONTS.font,
                                        color:COLORS.white,
                                        opacity:.75
                                    }}>Rkpuram sector-b near chawla circle...</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => props.navigation.openDrawer()}
                                style={GlobalStyleSheet.NotificationBtn} >
                                <FeatherIcon style={{marginLeft:-2}} size={22} color={COLORS.white} name={'grid'} />
                                {/* <View style={GlobalStyleSheet.NotificationDot}>
                                    <Text style={{...FONTS.font,bottom:2,...FONTS.fontBold,fontSize:11,color:COLORS.white}}>2</Text>
                                </View> */}
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
                                placeholder='Search for restaurant,item & more'
                                placeholderTextColor={colors.textLight}
                            />
                            <TouchableOpacity
                                style={{
                                    position:'absolute',
                                    right:5,
                                    height:45,
                                    width:45,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <FeatherIcon color={colors.text} size={22} name='search'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom:80,
                    }}
                >
                    <Categories/>
                    <View style={[GlobalStyleSheet.container,{paddingTop:0,paddingBottom:10}]}>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between',
                            }}
                        >
                            <Text style={{...FONTS.h5,color:colors.title}}>Offers for you</Text>
                            <TouchableOpacity>
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.primary}}>See all</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <BannerSlider/>
                    <View style={[GlobalStyleSheet.container,{paddingBottom:10}]}>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between',
                            }}
                        >
                            <Text style={{...FONTS.h5,color:colors.title}}>Popular items</Text>
                            <TouchableOpacity>
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.primary}}>See all</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <PopularItems/>
                    <View style={[GlobalStyleSheet.container]}>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between',
                                marginBottom:15,
                                marginTop:12,
                            }}
                        >
                            <Text style={{...FONTS.h5,color:colors.title}}>Recomended  for you</Text>
                        </View>
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

export default Home;