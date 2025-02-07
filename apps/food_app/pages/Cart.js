import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { FONTS, IMAGES } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import Button from '../components/Button/Button';
import CartListItem from './components/CartListItem';

const Cart = (props) => {

    const {colors} = useTheme();

    const ItemData = [
        {
            image : IMAGES.foodItem3 ,
            category : "Meat",
            title : "Chicken curry",
            size: 1,
            price : "14.60",
        },
        {
            image : IMAGES.foodItem4 ,
            category : "Chinese",
            title : "Chinese noodles",
            size: 1,
            price : "14.60",
        },
        {
            image : IMAGES.foodItem5 ,
            category : "Sweet",
            title : "Peanut cake",
            size: 1,
            price : "14.60",
        },
        {
            image : IMAGES.foodItem6,
            category : "Meat",
            title : "Chicken curry",
            size: 1,
            price : "14.60",
        },
    ]

    return (
        <>
            <SafeAreaView
                style={[GlobalStyleSheet.container,{padding:0,flex:1,backgroundColor:colors.background}]}
            >
                <View
                    style={{
                        height:55,
                        backgroundColor: colors.cardBg,
                        flexDirection:'row',
                        alignItems:'center',
                        ...GlobalStyleSheet.shadow,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={{
                            height:55,
                            width:55,
                            alignItems:'center',
                            justifyContent:'center',
                            marginRight:5,
                        }}
                    >
                        <FeatherIcon color={colors.title} name={'arrow-left'} size={22}/>
                    </TouchableOpacity>
                    <Text style={{...FONTS.h5,color:colors.title}}>Cart</Text>
                </View>

                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        {ItemData.map((data,index) => {
                            return(
                                <CartListItem
                                    key={index}
                                    title={data.title}
                                    image={data.image}
                                    category={data.category}
                                    price={data.price}
                                />
                            )
                        })}
                    </View>
                </ScrollView>
                <View style={GlobalStyleSheet.container}>
                    <Button title={"Checkout"}/>
                </View>
            </SafeAreaView>
        </>
    );
};

export default Cart;