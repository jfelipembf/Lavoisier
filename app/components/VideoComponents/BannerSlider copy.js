import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';

const BannerSlider = () => {
    
    return (
      
        <ScrollView
            horizontal
            contentContainerStyle={{paddingLeft:15,marginBottom: 5}}
            showsHorizontalScrollIndicator={false}
        >
            <LinearGradient
                start={{x: 0, y: 1}} end={{x: 0.5, y: 1.0}}
                colors={[COLORS.primary2,"#22cf96"]}
                style={{
                    width:330,
                    marginRight:15,
                    paddingRight:120,
                    paddingLeft:20,
                    paddingVertical:20,
                    borderRadius:15,
                }}
            >
                <View style={{alignItems:'flex-start'}}>
                    <Text style={{...FONTS.font,color:COLORS.white,marginBottom:10}}>Explore freshness</Text>
                    <Text style={{...FONTS.h3,color: '#f9f775',lineHeight:26,marginBottom:13}}>Freshly from the garden</Text>
                    <TouchableOpacity
                        style={{
                            paddingHorizontal:18,
                            paddingVertical:8,
                            backgroundColor:'rgba(0,0,0,0.3)',
                            borderRadius:20,
                        }}
                    >
                        <Text style={{...FONTS.font,color:COLORS.white,lineHeight:18}}>Browse</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        position:'absolute',
                        top:0,
                        right:12,
                    }}
                >
                    <Image
                        style={{
                            width:160,
                            resizeMode:'contain',
                            height:250,
                        }}
                        source={IMAGES.grBanner1}
                    />
                </View>
            </LinearGradient>
            <LinearGradient
                start={{x: 0, y: 1}} end={{x: 0.5, y: 1.0}}
                colors={["#eb8339","#f19757"]}
                style={{
                    width:330,
                    marginRight:15,
                    paddingRight:120,
                    paddingLeft:20,
                    paddingVertical:20,
                    borderRadius:15,
                }}
            >
                <View style={{alignItems:'flex-start'}}>
                    <Text style={{...FONTS.font,color:COLORS.white,marginBottom:10}}>Explore freshness</Text>
                    <Text style={{...FONTS.h3,color: '#f9f775',lineHeight:26,marginBottom:13}}>Freshly from the garden</Text>
                    <TouchableOpacity
                        style={{
                            paddingHorizontal:18,
                            paddingVertical:8,
                            backgroundColor:'rgba(0,0,0,0.3)',
                            borderRadius:20,
                        }}
                    >
                        <Text style={{...FONTS.font,color:COLORS.white,lineHeight:18}}>Browse</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        position:'absolute',
                        top:0,
                        right:5,
                    }}
                >
                    <Image
                        style={{
                            width:145,
                            resizeMode:'contain',
                            height:220,
                        }}
                        source={IMAGES.grBanner2}
                    />
                </View>
            </LinearGradient>
        </ScrollView>
    );
};





const styles = StyleSheet.create({

    
  
})


export default BannerSlider;