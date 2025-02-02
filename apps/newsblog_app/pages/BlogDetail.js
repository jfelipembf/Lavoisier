import React from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import SocialIcon from '../components/Socials/SocialIcon';
import Divider from '../components/Dividers/Divider';


const BlogDetail = (props) => {

    const {colors} = useTheme();

    return (
        <>
            <SafeAreaView style={[GlobalStyleSheet.container,{flex:1,backgroundColor:colors.background2}]}>
                <ScrollView contentContainerStyle={{paddingBottom:40,flex:1}}>
                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={{
                            position:'absolute',
                            zIndex:1,
                            top:0,
                            left:0,
                            padding:15,
                        }}
                    >
                        <FeatherIcon color={COLORS.white} name={'arrow-left'} size={30}/>
                    </TouchableOpacity>
                    <View>
                        <ImageBackground
                            source={IMAGES.blogLarge1}
                            style={{
                                height:390,
                                borderBottomLeftRadius:30,
                                borderBottomRightRadius:30,
                                overflow:'hidden',
                            }}
                        >
                            <LinearGradient
                                style={{
                                    position:'absolute',
                                    height:'100%',
                                    width:'100%',
                                }}
                                colors={['rgba(0,0,0,0)','rgba(0,0,0,.6)']}
                            ></LinearGradient>
                            <View
                                style={{
                                    position:'absolute',
                                    width:'100%',
                                    bottom:0,
                                    paddingHorizontal:20,
                                    paddingBottom:50,
                                }}
                            >
                                <Text style={{...FONTS.h2,color:COLORS.white}}>Red Moon will once again rise tommorow</Text>
                                <View style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    marginTop:10,
                                }}>
                                    <Image
                                        style={{
                                            height:28,
                                            width:28,
                                            borderRadius:28,
                                            marginRight:8,
                                        }}
                                        source={IMAGES.user2}
                                    />
                                    <Text style={{...FONTS.font,color:COLORS.white}}>John Doe</Text>
                                    <View
                                        style={{
                                            height:4,
                                            width:4,
                                            borderRadius:4,
                                            backgroundColor: COLORS.white,
                                            opacity:.4,
                                            marginHorizontal:6,
                                            marginTop:2,
                                        }}
                                    />
                                    <Text style={{...FONTS.fontSm,color:colors.textLight}}>15 May, 2021</Text>
                                </View>
                            </View>
                        </ImageBackground>
                        <View
                            style={{
                                position:'absolute',
                                bottom:-25,
                                right:25,
                                flexDirection:'row',
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    height:50,
                                    width:50,
                                    borderRadius:50,
                                    marginRight:15,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    backgroundColor:colors.cardBg,
                                    shadowColor: "rgba(0,0,0,.6)",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.30,
                                    shadowRadius: 4.65,

                                    elevation: 8,
                                }}
                            >
                                <FontAwesome color={colors.textLight} size={20} name={'share'}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    height:50,
                                    width:50,
                                    borderRadius:50,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    backgroundColor: COLORS.primary,
                                    shadowColor: "rgba(0,0,0,.6)",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.30,
                                    shadowRadius: 4.65,

                                    elevation: 8,
                                }}
                            >
                                <FontAwesome color={COLORS.white} size={20} name={'bookmark'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={[GlobalStyleSheet.container,{paddingTop:40}]}>
                        <Text style={{...FONTS.font,color:colors.text,marginBottom:15}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',</Text>
                        <Text style={{...FONTS.font,color:colors.text,marginBottom:15}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',marginBottom:10}}>
                            <SocialIcon
                                rounded
                                color={'#3b5998'}
                                icon={<FontAwesome name='facebook' size={16} color={COLORS.white}/>}
                            />
                            <SocialIcon
                                rounded
                                color={'#007bb6'}
                                icon={<FontAwesome name='linkedin-square' size={16} color={COLORS.white}/>}
                            />
                            <SocialIcon
                                rounded
                                color={'#1da1f2'}
                                icon={<FontAwesome name='twitter' size={16} color={COLORS.white}/>}
                            />
                            <SocialIcon
                                rounded
                                color={'#25d366'}
                                icon={<FontAwesome name='whatsapp' size={16} color={COLORS.white}/>}
                            />
                            <SocialIcon
                                rounded
                                color={'#bd081c'}
                                icon={<FontAwesome name='pinterest' size={16} color={COLORS.white}/>}
                            />
                        </View>
                        <Divider/>
                        <Text style={{...FONTS.font,color:colors.text,marginBottom:15}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</Text>
                        <Image
                            style={{
                                width:'100%',
                                height:200,
                                marginBottom:15,
                            }}
                            source={IMAGES.post1}
                        />
                        <Text style={{...FONTS.font,color:colors.text,marginBottom:15}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};


export default BlogDetail;