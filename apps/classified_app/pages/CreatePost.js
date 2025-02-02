import React from 'react';
import { Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { FONTS, IMAGES } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';

const CreatePost = (props) => {
    
    const {colors} = useTheme();
    
    return (
        <>
            <SafeAreaView
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    flex:1,
                    backgroundColor:colors.background2,
                }]}
            >
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
                            }}
                        >
                            <FeatherIcon color={colors.title} size={24} name="x"/>
                        </TouchableOpacity>
                        <Text style={{...FONTS.h6,color:colors.title}}>What are you offering?</Text>
                    </View>
                </View>
                
                <ScrollView>
                    <View
                        style={GlobalStyleSheet.container}
                    >
                        <View
                            style={{
                                flexDirection:'row',
                                flexWrap:'wrap',
                            }}
                        >
                            <View
                                style={{
                                    width:'50%',
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        borderBottomWidth:1,
                                        borderRightWidth:1,
                                        borderColor:colors.borderColor,
                                        alignItems:'center',
                                        paddingVertical:15,
                                    }}
                                >
                                    <Image
                                        source={IMAGES.car}
                                        style={{
                                            height:40,
                                            width:40,
                                            marginBottom:8,
                                        }}
                                        />
                                    <Text style={{...FONTS.font,fontSize:15,color:colors.title}}>Cars</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    width:'50%',
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        borderBottomWidth:1,
                                        borderColor:colors.borderColor,
                                        alignItems:'center',
                                        paddingVertical:15,
                                    }}
                                >
                                    <Image
                                        source={IMAGES.building}
                                        style={{
                                            height:40,
                                            width:40,
                                            marginBottom:8,
                                        }}
                                        />
                                    <Text style={{...FONTS.font,fontSize:15,color:colors.title}}>Properties</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    width:'50%',
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        borderBottomWidth:1,
                                        borderRightWidth:1,
                                        borderColor:colors.borderColor,
                                        alignItems:'center',
                                        paddingVertical:15,
                                    }}
                                >
                                    <Image
                                        source={IMAGES.iphone}
                                        style={{
                                            height:40,
                                            width:40,
                                            marginBottom:8,
                                        }}
                                        />
                                    <Text style={{...FONTS.font,fontSize:15,color:colors.title}}>Mobiles</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    width:'50%',
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        borderBottomWidth:1,
                                        borderColor:colors.borderColor,
                                        alignItems:'center',
                                        paddingVertical:15,
                                    }}
                                >
                                    <Image
                                        source={IMAGES.suitcase}
                                        style={{
                                            height:40,
                                            width:40,
                                            marginBottom:8,
                                        }}
                                        />
                                    <Text style={{...FONTS.font,fontSize:15,color:colors.title}}>Jobs</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    width:'50%',
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        borderBottomWidth:1,
                                        borderRightWidth:1,
                                        borderColor:colors.borderColor,
                                        alignItems:'center',
                                        paddingVertical:15,
                                    }}
                                >
                                    <Image
                                        source={IMAGES.motorbike}
                                        style={{
                                            height:40,
                                            width:40,
                                            marginBottom:8,
                                        }}
                                        />
                                    <Text style={{...FONTS.font,fontSize:15,color:colors.title}}>Bikes</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    width:'50%',
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        borderBottomWidth:1,
                                        borderColor:colors.borderColor,
                                        alignItems:'center',
                                        paddingVertical:15,
                                    }}
                                >
                                    <Image
                                        source={IMAGES.desktop}
                                        style={{
                                            height:40,
                                            width:40,
                                            marginBottom:8,
                                        }}
                                        />
                                    <Text style={{...FONTS.font,fontSize:15,color:colors.title}}>Electronics</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </SafeAreaView>
        </>
    );
};


export default CreatePost;