import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { COLORS, FONTS, IMAGES } from '../constants/theme';

const Courses = (props) => {

    const {colors} = useTheme();
    
    const { title , bgColor , catIcon } = props.route.params;

    const CourseData = [
        {
            image : IMAGES.eduPic1,
            title : "Java Programming",
            duration : "3 hrs",
            lessons : "26",
            rate : "4.5",
        },
        {
            image : IMAGES.eduPic2,
            title : "Javascript Array Functions",
            duration : "3 hrs",
            lessons : "26",
            rate : "4.5",
        },
        {
            image : IMAGES.eduPic3,
            title : "PHP Lopps",
            duration : "3 hrs",
            lessons : "26",
            rate : "4.5",
        },
        {
            image : IMAGES.eduPic4,
            title : "Python Programming",
            duration : "3 hrs",
            lessons : "26",
            rate : "4.5",
        },
        {
            image : IMAGES.eduPic5,
            title : "Html Basics",
            duration : "3 hrs",
            lessons : "26",
            rate : "4.5",
        },
        {
            image : IMAGES.eduPic1,
            title : "Java Programming",
            duration : "3 hrs",
            lessons : "26",
            rate : "4.5",
        },
    ]

    return (
        <>
            <SafeAreaView style={[GlobalStyleSheet.container,{padding:0,flex:1,backgroundColor:colors.background2}]}>
                <View style={{
                    backgroundColor: bgColor,
                    borderBottomLeftRadius:20,
                    borderBottomRightRadius:20,
                    overflow:'hidden',
                }}>
                    <Image
                        style={{
                            position:'absolute',
                            height:'100%',
                            width:'100%',
                            zIndex:-1,
                            opacity:.1,
                        }}
                        source={IMAGES.eduPattern2}
                    />
                    <View
                        style={{
                            paddingHorizontal:15,
                            paddingBottom:15,
                            paddingTop:15,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => props.navigation.goBack()}
                            style={{
                                height:55,
                                width:55,
                                alignItems:'center',
                                justifyContent:'center',
                                marginLeft:-15,
                                marginTop:-15,
                                marginBottom:5,
                            }}
                        >
                            <FeatherIcon color={COLORS.title} name={'arrow-left'} size={24}/>
                        </TouchableOpacity>
                        <Text style={{...FONTS.h5,color:COLORS.title}}>{title}</Text>
                        <Image
                            style={{
                                height:50,
                                width:50,
                                position:'absolute',
                                top:15,
                                right:15,
                                opacity:.2,
                            }}
                            source={catIcon}
                        />
                    </View>
                </View>
                
                <ScrollView contentContainerStyle={{paddingTop:15}}>
                    <View style={[GlobalStyleSheet.container]}>
                        {CourseData.map((data,index) => {
                            return(
                                
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => props.navigation.navigate('CourseDetails')}
                                    style={{
                                        flexDirection:'row',
                                        backgroundColor:colors.cardBg,
                                        borderRadius:10,
                                        marginBottom:15,
                                        padding:8,
                                        ...GlobalStyleSheet.shadow,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:90,
                                            width:90,
                                            borderRadius:8,
                                            marginRight:12,
                                        }}
                                        source={data.image}
                                    />
                                    <View style={{flex:1,paddingVertical:5}}>
                                        <Text numberOfLines={1} style={{...FONTS.h6,color:colors.title}}>{data.title}</Text>
                                        <View style={{flexDirection:'row',alignItems:'center',marginBottom:8}}>
                                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                                <FeatherIcon style={{marginRight:3}} color={colors.textLight} name={'clock'} />
                                                <Text style={{...FONTS.font,color:colors.textLight}}>{data.duration}</Text>
                                            </View>
                                            <View
                                                style={{
                                                    height:3,
                                                    width:3,
                                                    borderRadius:3,
                                                    backgroundColor:colors.textLight,
                                                    marginHorizontal:8,
                                                    opacity:.4,
                                                    marginTop:2,
                                                }}
                                            />
                                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                                <FeatherIcon style={{marginRight:3}} color={colors.textLight} name={'file-text'} />
                                                <Text style={{...FONTS.font,color:colors.textLight}}>{data.lessons} lessons</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Image 
                                                style={{height:18,width:18,resizeMode:'contain',marginRight:5}}
                                                source={IMAGES.star}
                                            />
                                            <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:colors.title}}>{data.rate}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>

            </SafeAreaView>
        </>
    );
};

export default Courses;