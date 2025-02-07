import React from 'react';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';

const BannerSlider = () => {
    return (
        <>
            <ScrollView
                horizontal
                contentContainerStyle={{paddingLeft:15,marginBottom:15,paddingTop:10}}
                showsHorizontalScrollIndicator={false}
            >
                <ImageBackground
                    source={IMAGES.eduPattern1}
                    style={{
                        width:330,
                        height:169,
                        marginRight:15,
                        borderRadius:15,
                        overflow:'hidden',
                        justifyContent:'center',
                        alignItems:'flex-start',
                        paddingLeft:20,
                        paddingVertical:20,
                        paddingRight:120,
                    }}
                >
                    <Text style={{...FONTS.font,fontSize:15,color:COLORS.white}}>40% OFF</Text>
                    <Text style={{...FONTS.h4,color:COLORS.white}}>Today's Special</Text>
                    <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.8,marginBottom:14}}>Get discount valid for today!</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor:'rgba(255,255,255,.25)',
                            paddingHorizontal:16,
                            paddingVertical:7,
                            borderRadius:8,
                        }}
                    >
                        <Text style={{...FONTS.font,marginBottom:2,...FONTS.fontBold,color:COLORS.white}}>Shop now</Text>
                    </TouchableOpacity>
                    <Image
                        style={{
                            width:125,
                            height:185,
                            resizeMode:'contain',
                            position:'absolute',
                            right:0,
                            top:0,
                        }}
                        source={IMAGES.eduBnr1}
                    />
                </ImageBackground>
                <ImageBackground
                    source={IMAGES.eduPattern3}
                    style={{
                        width:330,
                        height:169,
                        marginRight:15,
                        borderRadius:15,
                        overflow:'hidden',
                        justifyContent:'center',
                        alignItems:'flex-start',
                        paddingLeft:20,
                        paddingVertical:20,
                        paddingRight:120,
                    }}
                >
                    <Text style={{...FONTS.font,fontSize:15,color:COLORS.white}}>40% OFF</Text>
                    <Text style={{...FONTS.h4,color:COLORS.white}}>Today's Special</Text>
                    <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.8,marginBottom:14}}>Get discount valid for today!</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor:'rgba(255,255,255,.25)',
                            paddingHorizontal:16,
                            paddingVertical:7,
                            borderRadius:8,
                        }}
                    >
                        <Text style={{...FONTS.font,marginBottom:2,...FONTS.fontBold,color:COLORS.white}}>Shop now</Text>
                    </TouchableOpacity>
                    <Image
                        style={{
                            width:130,
                            height:200,
                            resizeMode:'contain',
                            position:'absolute',
                            right:0,
                            top:10,
                        }}
                        source={IMAGES.eduBnr2}
                    />
                </ImageBackground>
            </ScrollView>
        </>
    );
};

export default BannerSlider;