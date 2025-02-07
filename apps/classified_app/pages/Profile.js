import React from 'react';
import { Image, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';

const Profile = () => {

    const {colors} = useTheme();

    const ProfileData = [
        {
            icon : IMAGES.blog,
            title : "My Orders",
        },
        {
            icon : IMAGES.file,
            title : "Invoices",
        },
        {
            icon : IMAGES.setting3,
            title : "Settings",
        },
        {
            icon : IMAGES.headphones,
            title : "Help & Support",
        },
        {
            icon : IMAGES.language,
            title : "Selct Language",
        },
        {
            icon : IMAGES.logout,
            title : "Log Out",
        },
    ]

    return (
        <>
            <SafeAreaView
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    flex:1,
                    backgroundColor:colors.background2,
                }]}
            >
                <ImageBackground
                    source={IMAGES.cfPattern1}
                    style={{
                        paddingHorizontal:15,
                        paddingVertical:20,
                        flexDirection:'row',
                    }}
                >   
                    <Image
                        source={IMAGES.user3}
                        style={{
                            height:80,
                            width:80,
                            borderRadius:80,
                            marginRight:15,
                        }}
                    />
                    <View style={{flex:1,paddingTop:10}}>
                        <TouchableOpacity
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                        >
                            <View style={{flex:1,alignItems:'flex-start'}}>
                                <Text style={{...FONTS.h6,color:COLORS.white,marginBottom:5}}>Gloria Mckinney</Text>
                                <View
                                    style={{
                                        paddingHorizontal:12,
                                        borderRadius:4,
                                        paddingBottom:5,
                                        paddingTop:2,
                                        backgroundColor:'rgba(255,255,255,.15)',
                                    }}
                                >
                                    <Text style={{...FONTS.font,color:COLORS.white}}>Bronze</Text>
                                </View>
                            </View>
                            <FeatherIcon size={22} color={COLORS.white} name="chevron-right"/>
                        </TouchableOpacity>
                        <View
                            style={{flexDirection:'row',marginTop:20,marginBottom:10}}
                        >
                            <View
                                style={{
                                    flexDirection:'row',
                                }}
                            >
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.white,marginRight:8}}>180</Text>
                                <Text style={{...FONTS.font,color:COLORS.white,opacity:.75}}>Following</Text>
                            </View>
                            <View
                                style={{
                                    height:20,
                                    width:1,
                                    marginHorizontal:15,
                                    top:1,
                                    backgroundColor:'rgba(255,255,255,.3)'
                                }}
                            />
                            <View
                                style={{
                                    flexDirection:'row',
                                }}
                            >
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.white,marginRight:8}}>255</Text>
                                <Text style={{...FONTS.font,color:COLORS.white,opacity:.75}}>Followers</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                {ProfileData.map((data,index) => {
                    return(
                        <TouchableOpacity 
                            key={index}
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                paddingHorizontal:15,
                            }}
                        >
                            <Image
                                source={data.icon}
                                style={{
                                    height:22,
                                    width:22,
                                    tintColor:colors.textLight,
                                    marginRight:12,
                                }}
                            />
                            <View style={{
                                flex:1,
                                borderBottomWidth:1,
                                borderColor:colors.borderColor,
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between',
                                paddingVertical:18,
                            }}>
                                <Text style={{...FONTS.font,fontSize:15,...FONTS.fontBold,color:colors.title}}>{data.title}</Text>
                                <FeatherIcon size={20} color={colors.title} name="chevron-right"/>
                            </View>
                        </TouchableOpacity>
                    )
                })}

            </SafeAreaView>
        </>
    );
};


export default Profile;