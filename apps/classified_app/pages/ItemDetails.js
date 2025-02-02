import React from 'react';
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper'
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import ButtonSm from '../components/Button/ButtonSm';
import { COLORS, FONTS, IMAGES } from '../constants/theme';


const ItemDetails = (props) => {
    
    const {colors} = useTheme();
    
    const itemImages = [IMAGES.cfDetail1,IMAGES.cfDetail2,IMAGES.cfDetail3,IMAGES.cfDetail4,IMAGES.cfDetail5];

    return (
        <>
            <SafeAreaView
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    flex:1,
                    backgroundColor:colors.background2,
                }]}
            >
                <ScrollView>
                    <View>
                        {itemImages.length > 0 &&
                            <Swiper 
                                dotColor={'rgba(255,255,255,.15)'}
                                activeDotColor={'rgba(255,255,255,1)'}
                                style={{
                                    height : 300,
                                }}
                            >
                                {itemImages.map((data,index) => {
                                    return(
                                        <View
                                            key={index}
                                        >
                                            <LinearGradient
                                                colors={['rgba(0,0,0,0.6)','rgba(0,0,0,0)','rgba(0,0,0,0)']}
                                                locations={[0 , 0.4 ,1]}
                                                style={{
                                                    position:'absolute',
                                                    height:'100%',
                                                    width:'100%',
                                                    zIndex:1,
                                                }}
                                            >
                                            </LinearGradient>
                                            <Image
                                                style={{
                                                    height:'100%',
                                                    width:'100%',
                                                }}
                                                source={data}
                                            />
                                        </View>
                                    )
                                })}
                            </Swiper>
                        }
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
                        style={GlobalStyleSheet.container}
                    >
                        <View style={{
                            paddingTop:10,
                            flexDirection:'row',
                            marginBottom:20,
                        }}>
                            <View style={{flex:1}}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Mahindra Xuv500 (2022)</Text>
                                <Text style={{...FONTS.font,color:colors.textLight,marginBottom:8}}>1.6 Highline plus 16 Alloy</Text>
                            </View>
                            <Text style={{...FONTS.h4,color:COLORS.primary}}>$1558.95</Text>
                        </View>
                        <View
                            style={[{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 4,
                                    height: 4,
                                },
                                shadowOpacity: .15,
                                shadowRadius: 5,
                            }, Platform.OS === 'ios' && {
                                backgroundColor:colors.cardBg,
                                borderRadius:10,
                            }]}
                        >
                            <View
                                style={{
                                    backgroundColor:colors.cardBg,
                                    borderRadius:10,
                                    paddingHorizontal:15,
                                    paddingVertical:18,
                                }}
                                >
                                <View
                                    style={{
                                        flexDirection:'row',
                                        flexWrap:'wrap',
                                        justifyContent:'space-between',
                                        borderBottomWidth:1,
                                        borderColor:colors.borderColor,
                                        paddingBottom:15,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:20,
                                                width:20,
                                                marginRight:8,
                                                tintColor:colors.textLight
                                            }}
                                            source={IMAGES.fuel}
                                        />
                                        <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:colors.title}}>Diesel</Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:20,
                                                width:20,
                                                marginRight:8,
                                                tintColor:colors.textLight
                                            }}
                                            source={IMAGES.speedometer}
                                        />
                                        <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:colors.title}}>75000.0km</Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:18,
                                                width:18,
                                                marginRight:8,
                                                tintColor:colors.textLight
                                            }}
                                            source={IMAGES.gearbox}
                                        />
                                        <Text style={{...FONTS.fofontSmnt,...FONTS.fontBold,color:colors.title}}>Manual</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'space-between',
                                        paddingTop:15,
                                    }}
                                >
                                    <View style={{alignItems:'center'}}>
                                        <Text style={{...FONTS.fontSm,color:colors.text}}>Owner</Text>
                                        <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title}}>1st</Text>
                                        
                                    </View>
                                    <View style={{alignItems:'center'}}>
                                    
                                        <Text style={{...FONTS.fontSm,color:colors.text}}>Location</Text>
                                        <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title}}>kota</Text>
                                        
                                    </View>
                                    <View style={{alignItems:'center'}}>
                                    
                                        <Text style={{...FONTS.fontSm,color:colors.text}}>Posting date</Text>
                                        <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title}}>05-May-2022</Text>
                                    
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Text style={{...FONTS.h6,color:colors.title,marginTop:20,marginBottom:8}}>Description</Text>
                        <View
                            style={[{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 4,
                                    height: 4,
                                },
                                shadowOpacity: .15,
                                shadowRadius: 5,
                            },Platform.OS === 'ios' && {
                                backgroundColor:colors.cardBg,
                                borderRadius:10,
                            }]}
                        >
                            <View
                                style={[{
                                    backgroundColor:colors.cardBg,
                                    paddingHorizontal:15,
                                    paddingVertical:15,
                                    borderRadius:10,
                                },Platform.OS === 'android' && {
                                    marginBottom:20,
                                }]}
                            >
                                <View style={[styles.desList,{borderColor:colors.borderColor}]}>
                                    <Text style={[styles.listLabel,{color:colors.text}]}>ABS :</Text>
                                    <Text style={{...FONTS.font,color:colors.title}}>Yes</Text>
                                </View>
                                <View style={[styles.desList,{borderColor:colors.borderColor}]}>
                                    <Text style={[styles.listLabel,{color:colors.text}]}>Adjustable Steering :</Text>
                                    <Text style={{...FONTS.font,color:colors.title}}>Yes</Text>
                                </View>
                                <View style={[styles.desList,{borderColor:colors.borderColor}]}>
                                    <Text style={[styles.listLabel,{color:colors.text}]}>Alloy Wheels :</Text>
                                    <Text style={{...FONTS.font,color:colors.title}}>Yes</Text>
                                </View>
                                <View style={[styles.desList,{borderColor:colors.borderColor}]}>
                                    <Text style={[styles.listLabel,{color:colors.text}]}>Anti Theft Device :</Text>
                                    <Text style={{...FONTS.font,color:colors.title}}>Yes</Text>
                                </View>
                                <View style={[styles.desList,{borderColor:colors.borderColor}]}>
                                    <Text style={[styles.listLabel,{color:colors.text}]}>Aux Compatibility :</Text>
                                    <Text style={{...FONTS.font,color:colors.title}}>Yes</Text>
                                </View>
                                <View style={[styles.desList,{borderColor:colors.borderColor}]}>
                                    <Text style={[styles.listLabel,{color:colors.text}]}>Blutooth :</Text>
                                    <Text style={{...FONTS.font,color:colors.title}}>Yes</Text>
                                </View>
                                <View style={[styles.desList,{borderColor:colors.borderColor}]}>
                                    <Text style={[styles.listLabel,{color:colors.text}]}>Cruise Control :</Text>
                                    <Text style={{...FONTS.font,color:colors.title}}>Yes</Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={[{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 4,
                                    height: 4,
                                },
                                shadowOpacity: .15,
                                shadowRadius: 5,
                            },Platform.OS === 'ios' && {
                                backgroundColor:colors.cardBg,
                                borderRadius:10,
                            }]}
                        >
                            <View
                                style={{
                                    flexDirection:'row',
                                    borderRadius:10,
                                    paddingHorizontal:15,
                                    paddingVertical:15,
                                    backgroundColor:colors.cardBg,
                                }}
                            >
                                <Image
                                    source={IMAGES.user1}
                                    style={{
                                        height:70,
                                        width:70,
                                        borderRadius:70,
                                        marginRight:15,
                                    }}
                                />
                                <View style={{flex:1,alignItems:'flex-start'}}>
                                    <Text style={{...FONTS.font,color:colors.textLight}}>Posted by</Text>
                                    <Text style={{...FONTS.h6,color:colors.title,lineHeight:22}}>Car Bazar</Text>
                                    <Text style={{...FONTS.font,color:colors.textLight,marginBottom:10}}>Posted On : 05/04/2022</Text>
                                
                                    <ButtonSm title="See profile"/>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View
                    style={{
                        paddingHorizontal:15,
                        paddingVertical:10,
                        backgroundColor:colors.cardBg,
                        flexDirection:'row',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor:COLORS.primary5,
                            paddingHorizontal:15,
                            paddingVertical:12,
                            borderRadius:10,
                            flex:1,
                            flexDirection:'row',
                            justifyContent:'center',
                            alignItems:'center',
                            marginRight:5,
                        }}
                    >
                        <FeatherIcon style={{marginRight:6}} size={20} color={COLORS.white} name='message-circle'/>
                        <Text style={{...FONTS.h6,color:COLORS.white,lineHeight:24}}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor:COLORS.primary5,
                            paddingHorizontal:15,
                            paddingVertical:12,
                            borderRadius:10,
                            flex:1,
                            flexDirection:'row',
                            justifyContent:'center',
                            alignItems:'center',
                            marginLeft:5,
                        }}
                    >
                        <FeatherIcon style={{marginRight:8}} size={20} color={COLORS.white} name='phone-call'/>
                        <Text style={{...FONTS.h6,color:COLORS.white,lineHeight:24}}>Call</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
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
    },
    desList:{
        flexDirection:'row',
        paddingVertical:5,
        borderBottomWidth:1,
    },
    listLabel:{
        ...FONTS.font,
        width:180,
    },
})

export default ItemDetails;