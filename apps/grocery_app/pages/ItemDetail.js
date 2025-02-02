import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { COLORS, FONTS, IMAGES } from '../constants/theme';

const ItemDetail = (props) => {
    
    const {colors} = useTheme();
    const [num , setNum] = useState(1);

    return (
        <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1,backgroundColor:colors.background2}]}>
            <ScrollView contentContainerStyle={{paddingBottom:100}}>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={{
                        height:48,
                        width:48,
                        borderWidth:1,
                        borderRadius:15,
                        borderColor:colors.borderColor,
                        alignItems:'center',
                        justifyContent:'center',
                        marginRight:5,
                        position:'absolute',
                        top:15,
                        left:15,
                        zIndex:1,
                    }}
                >
                    <FeatherIcon color={colors.title} name={'arrow-left'} size={22}/>
                </TouchableOpacity>
                
                <View
                    style={{
                        backgroundColor:colors.cardBg,
                        paddingTop:60,
                        paddingBottom:25,
                        alignItems:'center',
                        borderBottomLeftRadius:30,
                        borderBottomRightRadius:30,
                        ...GlobalStyleSheet.shadow,
                    }}
                >
                    <Image
                        style={{
                            width:250,
                            height:250,
                            resizeMode:'contain',
                        }}
                        source={IMAGES.pomegranate}
                    />
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            height:55,
                            width:55,
                            // borderWidth:1,
                            // borderColor:colors.borderColor,
                            backgroundColor:colors.cardBg,
                            borderRadius:30,
                            alignItems:'center',
                            justifyContent:'center',
                            position:'absolute',
                            bottom:-25,
                            right:35,
                            shadowColor: "rgba(0,0,0,.4)",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.30,
                            shadowRadius: 4.65,

                            elevation: 8,
                        }}
                    >
                        <FontAwesome size={22} color={colors.textLight} name={'heart'} />
                    </TouchableOpacity>
                </View>

                <View style={[GlobalStyleSheet.container,{paddingTop:25}]}>
                    <View
                        style={{
                            flexDirection:'row',
                        }}
                    >
                        <View style={{marginBottom:10}}>
                            <Text style={{...FONTS.font,color:colors.text}}>FRUITS</Text>
                            <Text style={{...FONTS.h4,fontSize:22,color:colors.title}}>Pomegranate</Text>
                        </View>
                    </View>
                    
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            marginBottom:20
                        }}
                    >
                        <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
                            <Image 
                                style={{height:22,width:22,resizeMode:'contain',marginRight:5}}
                                source={IMAGES.star}
                            />
                            <Text style={{...FONTS.font,fontSize:18,lineHeight:25,...FONTS.fontBold,color:colors.title}}>4.8</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor:COLORS.primayLight2,
                                paddingHorizontal:12,
                                paddingVertical:4,
                                borderRadius:20,
                                marginRight:'auto',
                            }}
                        >
                            <Text style={{...FONTS.font,color:COLORS.primary2,marginBottom:2}}>128 reviews</Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    if(num > 1){
                                        setNum(num - 1)
                                    }
                                }}
                            >
                                <LinearGradient
                                    colors={[COLORS.primary2,'#22cf96']}
                                    style={{
                                        height:35,
                                        width:35,
                                        borderRadius:8,
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }}
                                >
                                    <FeatherIcon color={COLORS.white} name={'minus'} size={18} />
                                </LinearGradient>
                            </TouchableOpacity>
                            <Text style={{...FONTS.font,width:40,textAlign:'center',fontSize:16,...FONTS.fontBold,color:colors.title}}>{num}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setNum(num + 1)
                                }}
                            >
                                <LinearGradient
                                        colors={[COLORS.primary2,'#22cf96']}
                                        style={{
                                            height:35,
                                            width:35,
                                            borderRadius:8,
                                            alignItems:'center',
                                            justifyContent:'center',
                                        }}
                                    >
                                    <FeatherIcon color={COLORS.white} name={'plus'} size={18} />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <Text style={{...FONTS.font,fontSize:15,lineHeight:22,color:colors.text,marginBottom:15}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
                    <Text style={{...FONTS.font,fontSize:15,lineHeight:22,color:colors.text}}>eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</Text>
                </View>

            </ScrollView>
            <LinearGradient
                colors={[COLORS.primary2,'#22cf96']}
                style={{
                    position:'absolute',
                    bottom:15,
                    paddingVertical:10,
                    paddingRight:10,
                    left:15,
                    right:15,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    borderRadius:40,
                    paddingLeft:15
                }}
            >
                <Text style={{...FONTS.h3,lineHeight:32,color:COLORS.white}}>$45.10</Text>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('ShoppingCart')}
                    style={{
                        height:46,
                        alignItems:'center',
                        flexDirection:'row',
                        paddingRight:18,
                        borderRadius:30,
                        paddingLeft:52,
                        backgroundColor:'rgba(255,255,255,.2)',
                    }}
                    >
                    <View
                        style={{
                            position:'absolute',
                            height:38,
                            width:38,
                            paddingRight:3,
                            left:4,
                            borderRadius:30,
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'rgba(255,255,255,.2)',
                        }}
                    >
                        <FeatherIcon color={COLORS.white} name={'shopping-cart'} size={18} />
                    </View>
                    <Text style={{...FONTS.font,...FONTS.fontBold,fontSize:16,color:COLORS.white}}>Add to Cart</Text>
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    );
};


export default ItemDetail;