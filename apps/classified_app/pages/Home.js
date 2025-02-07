import React, { useRef } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { DrawerLayout } from 'react-native-gesture-handler';
import DrawerMenu from '../layout/DrawerMenu';
import CardStyle8 from '../components/card/CardStyle8';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import SearchBar3 from '../components/Search/SearchBar3';
import { GlobalStyleSheet } from '../constants/StyleSheet';


const Home = (props) => {
    
    const {colors} = useTheme();
    const drawerRef = useRef();

    const CategoryData = [
        {
            icon : IMAGES.iphone,
            name : "Mobiles",
            color : "#a156e5",
        },
        {
            icon : IMAGES.car,
            name : "Cars",
            color : "#fdaf61",
        },
        {
            icon : IMAGES.furniture,
            name : "Furniture",
            color : "#f86c6a",
        },
        {
            icon : IMAGES.motorbike,
            name : "Bike",
            color : "#72b0ec",
        },
        {
            icon : IMAGES.dress,
            name : "Fashion",
            color : "#2ccaa9",
        },
        {
            icon : IMAGES.suitcase,
            name : "Jobs",
            color : "#ff68b7",
        },
        {
            icon : IMAGES.building,
            name : "Properties",
            color : "#5acae8",
        },
        {
            icon : IMAGES.desktop,
            name : "Electronics",
            color : "#63cad0",
        },
    ]

    const ItemData = [
        {
            image : IMAGES.cfItem1,
            price  : "$45.20",
            title : "Sony PlayStation 4 Pro Gaming Console", 
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem2,
            price  : "$1250.51",
            title : "Sony PlayStation 4 Pro Gaming Console", 
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem3,
            price  : "$35.10",
            title : "Sony PlayStation 4 Pro Gaming Console", 
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem4,
            price  : "$170.68",
            title : "Sony PlayStation 4 Pro Gaming Console", 
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem5,
            price  : "$12.15",
            title : "Sony PlayStation 4 Pro Gaming Console", 
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem6,
            price  : "$4000",
            title : "Sony PlayStation 4 Pro Gaming Console", 
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem7,
            price  : "$45.20",
            title : "Sony PlayStation 4 Pro Gaming Console", 
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem8,
            price  : "$25.80",
            title : "Sony PlayStation 4 Pro Gaming Console", 
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem9,
            price  : "$71.20",
            title : "Sony PlayStation 4 Pro Gaming Console", 
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem10,
            price  : "$195.81",
            title : "Sony PlayStation 4 Pro Gaming Console", 
            address : "Alderwood PA- 18944",
        },
    ]
    
    return (
        <>
            <DrawerLayout
                ref={drawerRef}
                drawerWidth={280}
                drawerPosition={DrawerLayout.positions.Left}
                drawerType="front"
                drawerBackgroundColor="#ddd"
                renderNavigationView={() => <DrawerMenu drawer={drawerRef}/>}
            >
                <SafeAreaView
                    style={[GlobalStyleSheet.container,{
                        padding:0,
                        flex:1,
                        backgroundColor:colors.background2,
                    }]}
                >
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
                                padding:12,
                                marginRight:5,
                                marginLeft:-8,
                            }}
                        >
                            <FeatherIcon size={20} color={colors.title} name='menu'/>
                        </TouchableOpacity>
                        <Text style={{...FONTS.h5,color:colors.title,flex:1,top:1}}>Home</Text>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                width:140,
                            }}
                        >
                            <FeatherIcon style={{marginRight:4}} size={14} color={colors.text} name='map-pin'/>
                            <Text style={{...FONTS.font,color:colors.text}} numberOfLines={1}>Rama krishnaPuram sector-b</Text>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:15,paddingVertical:5}}>
                        <SearchBar3/>
                    </View>
                    <ScrollView contentContainerStyle={{paddingBottom:80}} showsHorizontalScrollIndicator={false}>
                        <View
                            style={GlobalStyleSheet.container}
                        >
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                    marginBottom:15,
                                }}
                                >
                                <Text style={{...FONTS.h6,color:colors.title}}>Browse categories</Text>
                                <TouchableOpacity>
                                    <Text style={{...FONTS.font,color:COLORS.primary5}}>See all</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    flexDirection:'row',
                                    flexWrap:'wrap',
                                    
                                }}
                            >
                                {CategoryData.map((data,index) => {
                                    return(
                                        <View
                                            key={index}
                                            style={{
                                                width:'25%',
                                                alignItems:'center',
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={() => props.navigation.navigate('Items')}
                                                style={{
                                                    alignItems:'center',
                                                    marginBottom:15,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        height:60,
                                                        width:60,
                                                        borderRadius:22,
                                                        //backgroundColor:data.color,
                                                        backgroundColor: colors.cardBg,
                                                        marginBottom:4,
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                        borderWidth:1,
                                                        borderColor:colors.borderColor,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            height:30,
                                                            width:30,
                                                        }}
                                                        source={data.icon}
                                                    />
                                                </View>
                                                <Text style={{...FONTS.font,color:colors.text}}>{data.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                        <View style={GlobalStyleSheet.container}>
                            <View
                                style={{
                                    marginBottom:15,
                                }}
                                >
                                <Text style={{...FONTS.h6,color:colors.title}}>Fresh recommendations</Text>
                            </View>
                            <View
                                style={{marginHorizontal:-8,flexDirection:'row',flexWrap:'wrap'}}
                            >
                                {ItemData.map((data,index) => {
                                    return(
                                        <View
                                            key={index}
                                            style={{
                                                width:'50%',
                                                paddingHorizontal: 8,
                                            }}
                                        >
                                            <CardStyle8
                                                image={data.image}
                                                title={data.title}
                                                price={data.price}
                                                address={data.address}
                                                navigate={'ItemDetails'}
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </DrawerLayout>
        </>
    );
};


export default Home;