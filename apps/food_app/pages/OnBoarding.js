import React from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';

const OnBoarding = ({navigation}) => {

    return (
        <SafeAreaView
            style={[GlobalStyleSheet.container,{
                padding:0,
                flex:1,
            }]}
        >
            <ImageBackground
                source={IMAGES.foodPattern3}
                style={{
                    flex:1,
                }}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow:1,
                    }}
                >
                    <View
                        style={{
                            flex:1,
                            alignItems:'center',
                            justifyContent:'center',
                            paddingTop:60,
                            paddingBottom:20,
                        }}
                    >
                        <View
                            style={{
                                height:250,
                                width:250,
                                alignItems:'center',
                                justifyContent:'center',
                                borderWidth:1,
                                borderStyle:'dashed',
                                borderRadius:250,
                                borderColor:'rgba(255,255,255,.25)'
                            }}
                        >
                            <View
                                style={{
                                    position:'absolute',
                                    height:82,
                                    width:82,
                                    borderRadius:80,
                                    borderWidth:4,
                                    bottom:5,
                                    left:-20,
                                    backgroundColor:"#272727",
                                    borderColor:'rgba(255,255,255,.15)',
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <Image
                                    source={IMAGES.burger}
                                    style={{
                                        height:38,
                                        width:38,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    position:'absolute',
                                    height:64,
                                    width:64,
                                    borderRadius:64,
                                    borderWidth:4,
                                    bottom: -15,
                                    right: 25,
                                    backgroundColor:"#272727",
                                    borderColor:'rgba(255,255,255,.15)',
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <Image
                                    source={IMAGES.pizza}
                                    style={{
                                        height:30,
                                        width:30,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    position:'absolute',
                                    height:82,
                                    width:82,
                                    borderRadius:80,
                                    borderWidth:4,
                                    top:20,
                                    right:-25,
                                    backgroundColor:"#272727",
                                    borderColor:'rgba(255,255,255,.15)',
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <Image
                                    source={IMAGES.noodles}
                                    style={{
                                        height:38,
                                        width:38,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    position:'absolute',
                                    height:64,
                                    width:64,
                                    borderRadius:64,
                                    borderWidth:4,
                                    top: -20,
                                    left: 35,
                                    backgroundColor:"#272727",
                                    borderColor:'rgba(255,255,255,.15)',
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <Image
                                    source={IMAGES.drink}
                                    style={{
                                        height:30,
                                        width:30,
                                    }}
                                />
                            </View>
                            <Image
                                style={{
                                    height:70,
                                    width:70,
                                }}
                                source={IMAGES.foodLogo}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            padding:25,
                            marginBottom:30,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor:COLORS.white,
                                borderRadius:25,
                                paddingHorizontal:40,
                                paddingVertical:30,
                                alignItems:'center',
                            }}
                        >
                            <Text style={{...FONTS.h3,color:"#000",textAlign:'center',marginBottom:4}}>Food to make you Feel good</Text>
                            <Text style={{...FONTS.font,textAlign:'center',marginBottom:22}}>you will find the one who suits you among out specialists</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('DrawerNavigation')}
                                activeOpacity={.95}
                                style={{
                                    height:62,
                                    width:62,
                                    backgroundColor:COLORS.primary,
                                    borderRadius:62,
                                    borderWidth:5,
                                    borderColor:COLORS.white,
                                    marginBottom:-55,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <FeatherIcon size={22} color={COLORS.white} name={'arrow-right'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default OnBoarding;