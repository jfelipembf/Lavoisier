import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import Button from '../components/Button/Button';
import CartListItem from '../components/list/CartListItem';

const ShoppingCart = (props) => {

    const {colors} = useTheme();
    

    const ItemData = [
        {
            image : IMAGES.orange ,
            category : "Fruits",
            title : "Fresh Orange",
            size: 1,
            price : "14.60",
        },
        {
            image : IMAGES.cauliflower ,
            category : "Vegetables",
            title : "Cauliflower",
            size: 1,
            price : "14.60",
        },
        {
            image : IMAGES.beef ,
            category : "Meat",
            title : "Fresh Beef",
            size: 1,
            price : "14.60",
        },
        {
            image : IMAGES.strawberry ,
            category : "Fruits",
            title : "Strawberry",
            size: 1,
            price : "14.60",
        },
    ]

    return (
        <>
              <SafeAreaView style={[GlobalStyleSheet.container,{padding:0,flex:1,backgroundColor:colors.cardBg}]}>
                <View
                    style={{
                        flex:1,
                        backgroundColor:colors.background2,
                    }}
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
                        <Text style={{...FONTS.h5,color:colors.title}}>Shopping Cart</Text>
                    </View>
                    <View style={{flex:1}}>
                        <ScrollView showsHorizontalScrollIndicator={false}>
                            <View style={[GlobalStyleSheet.container]}>
                                {ItemData.map((data,index) => {
                                    return(
                                        <View style={{marginBottom:10}}>
                                            <CartListItem
                                                key={index}
                                                image={data.image}
                                                category={data.category}
                                                title={data.title}
                                                price={data.price}
                                                size={data.size}
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={[GlobalStyleSheet.container]}>
                        <Button 
                            onPress={() => props.navigation.navigate('CheckoutAddress')}
                            color={COLORS.primary2} 
                            title={'Checkout'}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};


export default ShoppingCart;