import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { FONTS, IMAGES } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import CardStyle5 from '../components/card/CardStyle5';

const Items = (props) => {

    const {colors} = useTheme();

    const ItemData = [
        {
            image : IMAGES.orange ,
            title : "Fresh Orange",
            size: "1KG",
            price : "14.60",
        },
        {
            image : IMAGES.cauliflower ,
            title : "Cauliflower",
            size: "1KG",
            price : "14.60",
        },
        {
            image : IMAGES.beef ,
            title : "Fresh Beef",
            size: "1KG",
            price : "14.60",
        },
        {
            image : IMAGES.strawberry ,
            title : "Strawberry",
            size: "1KG",
            price : "14.60",
        },
        {
            image : IMAGES.orange ,
            title : "Fresh Orange",
            size: "1KG",
            price : "14.60",
        },
        {
            image : IMAGES.cauliflower ,
            title : "Cauliflower",
            size: "1KG",
            price : "14.60",
        },
        {
            image : IMAGES.beef ,
            title : "Fresh Beef",
            size: "1KG",
            price : "14.60",
        },
        {
            image : IMAGES.strawberry ,
            title : "Strawberry",
            size: "1KG",
            price : "14.60",
        },
    ]

    return (
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
                    <Text style={{...FONTS.h5,color:colors.title}}>Fruits</Text>
                </View>
                
                <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>
                    <View style={[GlobalStyleSheet.container]}>
                        <View style={[GlobalStyleSheet.row]}>
                            {ItemData.map((data,index) => {
                                return(
                                    <View key={index} style={[GlobalStyleSheet.col50,{marginBottom:12}]}>
                                        <CardStyle5
                                            title={data.title}
                                            image={data.image}
                                            price={data.price}
                                            size={data.size}
                                            navigate={'ItemDetail'}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Items;