import React from 'react';
import { Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

import { GlobalStyleSheet } from '../constants/StyleSheet';
import { COLORS, FONTS, IMAGES } from '../constants/theme';

const Items = (props) => {
    
    const {colors} = useTheme();

    const ItemData = [
        {
            image : IMAGES.cfItem1,
            price  : "$5000.15",
            title : "Two bedroom, two bathrooom Docklands E16 flat for Sale",
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem2,
            price  : "$5000.15",
            title : "Two bedroom, two bathrooom Docklands E16 flat for Sale",
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem3,
            price  : "$5000.15",
            title : "Two bedroom, two bathrooom Docklands E16 flat for Sale",
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem4,
            price  : "$5000.15",
            title : "Two bedroom, two bathrooom Docklands E16 flat for Sale",
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem5,
            price  : "$5000.15",
            title : "Two bedroom, two bathrooom Docklands E16 flat for Sale",
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem6,
            price  : "$5000.15",
            title : "Two bedroom, two bathrooom Docklands E16 flat for Sale",
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem7,
            price  : "$5000.15",
            title : "Two bedroom, two bathrooom Docklands E16 flat for Sale",
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem8,
            price  : "$5000.15",
            title : "Two bedroom, two bathrooom Docklands E16 flat for Sale",
            address : "Alderwood PA- 18944",
        },
    ]


    return (
        <>
            <SafeAreaView
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    flex:1,
                    backgroundColor:colors.cardBg,
                }]}
            >
                <View style={{
                    flex:1,
                    backgroundColor:colors.background2,
                }}>
                    <View
                        style={[{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 4,
                                height: 4,
                            },
                            shadowOpacity: .1,
                            shadowRadius: 5,
                        },Platform.OS === 'ios' && {
                            backgroundColor:colors.cardBg,
                        }]}
                    >
                        <View
                            style={{
                                paddingHorizontal:15,
                                paddingVertical:8,
                                backgroundColor:colors.cardBg,
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => props.navigation.goBack()}
                                style={{
                                    padding:10,
                                    marginRight:5,
                                    bottom:1,
                                }}
                            >
                                <FeatherIcon color={colors.title} size={24} name="arrow-left"/>
                            </TouchableOpacity>
                            <Text style={{...FONTS.h6,color:colors.title}}>Properties</Text>
                        </View>
                    </View>
                    <ScrollView>
                        <View
                            style={GlobalStyleSheet.container}
                        >
                            {ItemData.map((data,index) => {
                                return(
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => props.navigation.navigate('ItemDetails')}
                                        key={index}
                                        style={{
                                            flexDirection:'row',
                                            paddingBottom:12,
                                            marginBottom:12,
                                            borderBottomWidth:1,
                                            borderColor:colors.borderColor,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex:1,
                                                paddingVertical:8,
                                            }}
                                        >
                                            <Text numberOfLines={2} style={{...FONTS.h6,fontSize:15,marginBottom:5,color:colors.title}}>{data.title}</Text>
                                            <View
                                                style={{
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    marginBottom:5,
                                                }}
                                            >
                                                <FeatherIcon style={{marginRight:4,top:1}} color={colors.textLight} name='map-pin'/>
                                                <Text style={{...FONTS.font,color:colors.textLight}}>{data.address}</Text>
                                            </View>
                                            <Text style={{...FONTS.h5,color:COLORS.primary5}}>{data.price}</Text>
                                        </View>
                                        <View
                                            style={{
                                                marginLeft:15,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    height:120,
                                                    width:120,
                                                    borderRadius:10,
                                                }}
                                                source={data.image}
                                            />
                                            <LinearGradient
                                                end={{x: 0.0, y: 0.25}} 
                                                start={{x: 0.5, y: 1.0}}
                                                locations={[0,0.6,1]}
                                                colors={['rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(0,0,0,.5)']}
                                                style={{
                                                    position:'absolute',
                                                    height:'100%',
                                                    width:'100%',
                                                    borderRadius:15,
                                                    transform:[{rotateY: '180deg'}]
                                                }}
                                            >
                                            </LinearGradient>
                                            <TouchableOpacity
                                                style={{
                                                    height:40,
                                                    width:40,
                                                    borderRadius:40,
                                                    position:'absolute',
                                                    top:10,
                                                    right:10,
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                    backgroundColor:'rgba(255,255,255,.25)',
                                                }}
                                            >
                                                <FeatherIcon color={COLORS.white} size={18} name='heart'/>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
};


export default Items;