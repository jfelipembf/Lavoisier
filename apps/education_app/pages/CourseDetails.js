import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';

const CourseDetails = (props) => {

    const {colors} = useTheme();

    const LessonsData = [
        {
            title : "UI/UX Design Introduction",
            duration : "01:45",
        },
        {
            title : "UI/UX Design Principle",
            duration : "15:10",
        },
        {
            title : "Prototyping",
            duration : "09:55",
        },
        {
            title : "Typography",
            duration : "20:45",
        },
        {
            title : "UI/UX Design Introduction",
            duration : "02:10",
        },
        {
            title : "UI/UX Design Principle",
            duration : "15:10",
        },
        {
            title : "Prototyping",
            duration : "09:55",
        },
        {
            title : "Typography",
            duration : "20:45",
        },
    ]

    return (
        <>
            <SafeAreaView style={[GlobalStyleSheet.container,{padding:0,flex:1,backgroundColor:colors.background2}]}>
                <ScrollView>
                    <View>
                        <View
                            style={{
                                //backgroundColor:COLORS.primary3,
                                position:'absolute',
                                zIndex:1,
                                bottom:25,
                                right:20,
                                flexDirection:'row',
                            }}
                        >
                            <Text style={{...FONTS.h3,color:COLORS.white,lineHeight:26}}>$135</Text>
                            {/* <Text style={{...FONTS.font,color:COLORS.white,opacity:.75}}> / month</Text> */}
                        </View>
                        <Image
                            style={{
                                width:'100%',
                                height:300,
                                borderBottomLeftRadius:20,
                                borderBottomRightRadius:20,
                            }}
                            source={IMAGES.eduCourse1}
                        />
                        <LinearGradient
                            colors={['rgba(0,0,0,0)','rgba(0,0,0,.7)']}
                            style={{
                                height:'100%',
                                width:'100%',
                                position:'absolute',
                                borderRadius:20,
                            }}
                        >
                        </LinearGradient>
                        
                        <TouchableOpacity
                            onPress={() => props.navigation.goBack()}
                            style={{
                                height:50,
                                width:50,
                                position:'absolute',
                                top:5,
                                left:5,
                                alignItems:'center',
                                justifyContent:'center',
                                //backgroundColor:'rgba(255,255,255,.15)',
                                borderRadius:30,
                            }}
                        >
                            <FeatherIcon color={COLORS.white} name={'arrow-left'} size={22}/>
                        </TouchableOpacity>

                        <View 
                            style={{
                                position:'absolute',
                                bottom:0,
                                width:'100%',
                                left:0,
                                paddingHorizontal:20,
                                paddingVertical:25,
                            }}
                        >
                            <Text style={{...FONTS.h5,color:COLORS.white}}>UX Design Fundamentals</Text>
                            <View style={{flexDirection:'row',alignItems:'center',marginBottom:8,opacity:.7}}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <FeatherIcon style={{marginRight:3}} color={COLORS.white} name={'clock'} />
                                    <Text style={{...FONTS.font,color:COLORS.white}}>3 hrs</Text>
                                </View>
                                <View
                                    style={{
                                        height:3,
                                        width:3,
                                        borderRadius:3,
                                        backgroundColor:COLORS.white,
                                        marginHorizontal:8,
                                        opacity:.4,
                                        marginTop:2,
                                    }}
                                />
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <FeatherIcon style={{marginRight:3}} color={COLORS.white} name={'file-text'} />
                                    <Text style={{...FONTS.font,color:COLORS.white}}>25 lessons</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[GlobalStyleSheet.container,{paddingTop:20}]}>
                        <View style={{marginBottom:20}}>
                            <Text style={{...FONTS.h6,color:colors.title}}>Descriptions</Text>
                            <Text style={{...FONTS.font,color:colors.text}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </Text>
                        </View>
                        <Text style={{...FONTS.h6,color:colors.title,marginBottom:10}}>Lessons</Text>
                        {LessonsData.map((data,index) => {
                            return(
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        backgroundColor:colors.cardBg,
                                        marginBottom:10,
                                        borderRadius:8,
                                        paddingHorizontal:15,
                                        paddingVertical:14,
                                        flexDirection:'row',
                                        alignItems:'center',
                                        ...GlobalStyleSheet.shadow,
                                    }}
                                >
                                    <View
                                        style={{
                                            height:28,
                                            width:28,
                                            backgroundColor:COLORS.primary3,
                                            borderRadius:30,
                                            marginRight:15,
                                            alignItems:'center',
                                            justifyContent:'center',
                                        }}
                                    >
                                        <FontAwesome5 size={10} color={COLORS.white} name={'play'}/>
                                    </View>
                                    <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.text,flex:1}}>{index + 1}. {data.title}</Text>
                                    <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title}}>{data.duration}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
};


export default CourseDetails;