import React, { useState } from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import Divider from '../components/Dividers/Divider';

const ProductDetail = (props) => {
    
    const theme = useTheme();
    const {colors} = theme;
    const [num , setNum] = useState(1);

    return (
        <>
            <SafeAreaView
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    flex:1,
                    backgroundColor:colors.background,
                }]}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow:1,
                    }}
                >
                    <View>
                        <Image
                            style={{
                                width:'100%',
                                height:300,
                            }}
                            source={IMAGES.foodDetailImg}
                        />
                        <LinearGradient
                            colors={['rgba(0,0,0,0.4)','rgba(0,0,0,.05)']}
                            style={{
                                position:'absolute',
                                height:'100%',
                                width:'100%',
                            }}
                        >
                        </LinearGradient>
                        <View
                            style={styles.headerArea}
                        >
                            <TouchableOpacity
                                onPress={() => props.navigation.goBack()}
                                style={styles.headBtn}
                            >
                                <FeatherIcon style={{right:1}} color={COLORS.white} size={26} name='chevron-left'/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.headBtn}
                            >
                                <FeatherIcon color={COLORS.white} size={22} name='heart'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={[GlobalStyleSheet.container,{
                            backgroundColor:colors.card,
                            flex:1,
                            paddingHorizontal:20,
                            paddingBottom:120,
                        }]}
                    >
                        <View
                            style={{paddingTop:10,marginBottom:20}}
                        >
                            <Text style={{...FONTS.h4,color:colors.title}}>Pancake Stack</Text>
                            <Text style={{...FONTS.font,color:colors.text}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <View
                                style={{
                                    flexDirection:'row',
                                }}
                            >
                                <Image
                                    style={{
                                        height:22,
                                        width:22,
                                        marginRight:4,
                                    }}
                                    source={IMAGES.star}
                                />
                                <Text style={{...FONTS.h6,color:colors.title}}>4.5</Text>
                            </View>
                            <View style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'center',
                                borderLeftWidth:1,
                                borderRightWidth:1,
                                borderColor:colors.borderColor,
                                paddingHorizontal:15,
                            }}>
                                <FeatherIcon style={{marginBottom:2,marginRight:5}} size={18} color={colors.text} name={'clock'}/>
                                <Text style={{...FONTS.h6,color:colors.text}}>6-7 Min</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <FontAwesome5 style={{marginRight:5}} size={14} color={COLORS.success} name='truck'/>
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.success}}>FREE DELIVERY</Text>
                            </View>
                        </View>
                        
                        <View style={{marginTop:25,flexDirection:'row',justifyContent:'space-between'}}>
                            <View>
                                <Text style={{...FONTS.font,color:colors.text,marginBottom:4}}>Price</Text>
                                <Text style={{...FONTS.h5,color:colors.title}}>$45.15</Text>
                            </View>
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
                                    <View
                                        style={{
                                            height:35,
                                            width:35,
                                            borderRadius:8,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            borderWidth:1,
                                            borderColor:colors.borderColor,
                                        }}
                                    >
                                        <FeatherIcon color={colors.title} name={'minus'} size={18} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={{...FONTS.font,width:40,textAlign:'center',fontSize:16,...FONTS.fontBold,color:colors.title}}>{num}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setNum(num + 1)
                                    }}
                                >
                                    <View  
                                        style={{
                                            height:35,
                                            width:35,
                                            borderRadius:8,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            borderWidth:1,
                                            borderColor:colors.borderColor,
                                        }}
                                    >
                                        <FeatherIcon color={colors.title} name={'plus'} size={18} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Divider dashed style={{marginBottom:5}} />
                        <View
                            style={{
                                paddingTop:12,
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'center',
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor:COLORS.danger,
                                    paddingHorizontal:12,
                                    paddingVertical:3,
                                    borderRadius:6,
                                }}
                            >
                                <Text style={{...FONTS.fontSm,color:COLORS.white}}>20% OFF DISCOUNT</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title}}>Apply promo code</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
                <ImageBackground
                    source={theme.dark ? IMAGES.foodPattern2 : IMAGES.foodPattern1}
                    style={{
                        ...styles.footerDesc,
                    }}
                >
                    <Text style={{...FONTS.h3,lineHeight:32,color:COLORS.white}}>$45.10</Text>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Cart')}
                        style={styles.addBtn}
                    >
                        <View
                            style={styles.addBtnIcon}
                        >
                            <FeatherIcon color={COLORS.white} name={'shopping-cart'} size={18} />
                        </View>
                        <Text style={{...FONTS.font,...FONTS.fontBold,fontSize:16,color:COLORS.white}}>Add to Cart</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    footerDesc : {
        position:'absolute',
        bottom:10,
        left:10,
        right:10,
        paddingHorizontal:20,
        paddingVertical:10,
        paddingRight:10,
        borderRadius:25,
        overflow:'hidden',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    addBtn : {
        height:46,
        alignItems:'center',
        flexDirection:'row',
        paddingRight:18,
        borderRadius:30,
        paddingLeft:52,
        backgroundColor:'rgba(255,255,255,.2)',
    },
    addBtnIcon :{
        position:'absolute',
        height:38,
        width:38,
        paddingRight:3,
        left:4,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(255,255,255,.2)',
    },
    headerArea: {
        paddingHorizontal:15,
        paddingVertical:15,
        flexDirection:'row',
        position:'absolute',
        top:0,
        left:0,
        right:0,
        justifyContent:'space-between',
    },
    headBtn : {
        height:48,
        width:48,
        borderRadius:48,
        backgroundColor:'rgba(255,255,255,.15)',
        alignItems:'center',
        justifyContent:'center',
    }
})

export default ProductDetail;