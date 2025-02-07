import React from 'react';
import { ImageBackground, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { GlobalStyleSheet } from '../constants/StyleSheet';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import OrderListItem from './components/OrderListItem';

const Orders = (props) => {

    const theme = useTheme();
    const {colors} = theme;

    const Data = [
        {
            title : "All",
        },
        {
            title : "On Delivery",
        },
        {
            title : "Completed",
        },
        {
            title : "Fulltime",
        },
    ]

    const OrderData = [
        {
            image : IMAGES.foodItem3,
            title : "Vanilla Sweet Cream Cold",
            price : "$ 5.0",
            oldPrice : "$ 8.9",
            quantity : "2x",
        },
        {
            image : IMAGES.foodItem4,
            title : "Mily Cream Ice Coffee",
            price : "$ 5.0",
            oldPrice : "$ 8.9",
            quantity : "2x",
        },
        {
            image : IMAGES.foodItem5,
            title : "Deluxe Burger Spicy",
            price : "$ 5.0",
            oldPrice : "$ 8.9",
            quantity : "2x",
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
                            }}
                        >
                            <View style={{flex:1}}>
                                <Text style={{...FONTS.h6,color:COLORS.white}}>Your Orders</Text>
                                <Text 
                                    numberOfLines={1} 
                                    style={{
                                        ...FONTS.font,
                                        color:COLORS.white,
                                        opacity:.75
                                    }}>Check your all Orders</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('Cart')}
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
                                borderRadius:10,
                            }]}
                        >
                            <TextInput
                                style={{
                                    ...GlobalStyleSheet.searchInput,
                                    backgroundColor:colors.cardBg,
                                    color:colors.title,
                                }}
                                placeholder='Search favourite items'
                                placeholderTextColor={colors.textLight}
                            />
                            <TouchableOpacity style={GlobalStyleSheet.searchInputIcon}>
                                <FeatherIcon color={colors.text} size={22} name='search'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
                
                <ScrollView contentContainerStyle={{paddingBottom:100}} showsHorizontalScrollIndicator={false}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingLeft:15,paddingTop:8,paddingBottom:15}}
                    >
                        {Data.map((data,index) => {
                            return(
                                <TouchableOpacity 
                                    key={index}
                                    style={{
                                        paddingHorizontal:18,
                                        paddingVertical:10,
                                        borderWidth:1,
                                        borderColor:colors.borderColor,
                                        borderRadius:30,
                                        marginRight:12,
                                    }}
                                >
                                    <Text style={{...FONTS.font,fontSize:15,color:colors.title}}>{data.title}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    <View style={[GlobalStyleSheet.container,GlobalStyleSheet.shadow,
                        {
                            backgroundColor:colors.card,
                            marginBottom:10,
                        }]}>
                        <Text style={{...FONTS.h5,color:colors.title}}>Order ID #0012345</Text>
                        <View style={{flexDirection:'row',alignItems:'center',marginBottom:18}}>
                            <View
                                style={{
                                    height:8,
                                    width:8,
                                    marginRight:6,
                                    borderRadius:8,
                                    backgroundColor:COLORS.danger,
                                }}
                            />
                            <Text style={{...FONTS.fontSm,color:COLORS.danger}}>ON DELIVERY</Text>
                        </View>
                        
                        {OrderData.map((data,index) => {
                            return(
                                <OrderListItem
                                    key={index}
                                    image={data.image}
                                    title={data.title}
                                    price={data.price}
                                    oldPrice={data.oldPrice}
                                    quantity={data.quantity}
                                />
                            )
                        })}

                    </View>
                    
                    <View style={[GlobalStyleSheet.container,GlobalStyleSheet.shadow,
                        {
                            backgroundColor:colors.card,
                        }]}>
                        <Text style={{...FONTS.h5,color:colors.title}}>Order ID #0012345</Text>
                        <View style={{flexDirection:'row',alignItems:'center',marginBottom:18}}>
                            <View
                                style={{
                                    height:8,
                                    width:8,
                                    marginRight:6,
                                    borderRadius:8,
                                    backgroundColor:COLORS.success,
                                }}
                            />
                            <Text style={{...FONTS.fontSm,color:COLORS.success}}>DONE</Text>
                        </View>
                        
                        {OrderData.map((data,index) => {
                            return(
                                <OrderListItem
                                    key={index}
                                    image={data.image}
                                    title={data.title}
                                    price={data.price}
                                    oldPrice={data.oldPrice}
                                    quantity={data.quantity}
                                />
                            )
                        })}

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Orders;