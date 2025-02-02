import React from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import CardStyle4 from '../components/card/CardStyle4';
import CardStyle5 from '../components/card/CardStyle5';
import SearchBar2 from '../components/Search/SearchBar2';
import CategoryList from './components/CategoryList';
import BannerSlider from './components/BannerSlider';

const Home = (props) => {

    const {colors} = useTheme();

    const PopularItemData = [
        {
            id : "1",
            image : IMAGES.pomegranate ,
            title : "Pomegranate",
            size: "1KG",
            rate : "4.9",
            price : "14.60",
        },
        {
            id : "2",
            image : IMAGES.leaf ,
            title : "Lettuce Leaf",
            size: "1KG",
            rate : "4.5",
            price : "10.25",
        },
        {
            id : "3",
            image : IMAGES.strawberry ,
            title : "Strawberry",
            size: "1KG",
            rate : "4.9",
            price : "14.60",
        },
    ]

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
    ]


    const renderItem = ({item}) => {
        return(
            <View style={{marginRight:10}}>
                <CardStyle4
                    image={item.image}
                    title={item.title}
                    size={item.size}
                    price={item.price}
                    rate={item.rate}
                    navigate={'ItemDetail'}
                />
            </View>
        )
    }

    return (
        <>
            <SafeAreaView style={[GlobalStyleSheet.container,{padding:0,flex:1,backgroundColor:colors.background2}]}>
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        paddingHorizontal:15,
                        paddingVertical:5,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => props.navigation.openDrawer()}
                        style={{
                            height:48,
                            width:48,
                            marginRight:6,
                            marginLeft:-8,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <FeatherIcon style={{bottom:1}} color={colors.title} size={22} name='menu'/>
                    </TouchableOpacity>
                    <View style={{flex:1}}>
                        <Text style={{...FONTS.h4,color:colors.title}}>Home</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('ShoppingCart')}
                        style={{
                            height:48,
                            width:48,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <FeatherIcon color={colors.title} name={'shopping-cart'} size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height:48,
                            width:48,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <FontAwesome5 color={colors.title} name={'bell'} size={24} />
                        <View
                            style={{
                                position:'absolute',
                                top:15,
                                right:13,
                                height:10,
                                width:10,
                                borderRadius:10,
                                borderWidth:2,
                                borderColor:colors.background2,
                                backgroundColor:COLORS.primary2,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom:50}} showsHorizontalScrollIndicator={false}>
                    <View style={[GlobalStyleSheet.container,{paddingTop:10}]}>
                        <SearchBar2/>
                    </View>
                    
                    <CategoryList/>

                    <BannerSlider/>

                    <View style={[GlobalStyleSheet.container,{paddingBottom:0}]}>
                        <Text style={{...FONTS.h5,color:colors.title}}>Popular</Text>
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingLeft:15,paddingBottom:10,paddingTop:10}}
                        data={PopularItemData}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
                    <View style={[GlobalStyleSheet.container,{paddingBottom:0}]}>
                        <View
                            style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:12}}
                        >
                            <Text style={{...FONTS.h5,color:colors.title}}>Top item</Text>
                            <TouchableOpacity>
                                <Text style={{...FONTS.font,color:COLORS.primary2}}>See all</Text>
                            </TouchableOpacity>
                        </View>
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
            </SafeAreaView>
        </>
    );
};


export default Home;