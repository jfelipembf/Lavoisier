import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { FONTS, IMAGES } from '../../constants/theme';

const PopularSkillTest = () => {

    const {colors} = useTheme();

    const SkillData = [
        {
            icon : IMAGES.photoshop,
            title : "Photoshop Knowledge",
            question : "45",
            participants : "2.8k",
        },
        {
            icon : IMAGES.figma,
            title : "Figma Knowledge",
            question : "45",
            participants : "2.8k",
        },
        {
            icon : IMAGES.sketch,
            title : "Skech Writing",
            question : "45",
            participants : "2.8k",
        },
        {
            icon : IMAGES.colorCircle,
            title : "Colorgraphy",
            question : "45",
            participants : "2.8k",
        },
    ]

    return (
        <>
            <View style={[GlobalStyleSheet.container]}>
                {SkillData.map((data,index) => {
                    return(
                        <TouchableOpacity
                            key={index}
                            style={{
                                backgroundColor: colors.background2,
                                marginBottom:12,
                                paddingHorizontal:15,
                                paddingVertical:15,
                                borderRadius:10,
                                flexDirection:'row',
                                alignItems:'center'
                            }}
                        >
                            <View
                                style={{
                                    height:48,
                                    width:48,
                                    borderRadius:48,
                                    backgroundColor: colors.cardBg,
                                    marginRight:15,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    shadowColor: "rgba(0,0,0,.4)",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.30,
                                    shadowRadius: 4.65,

                                    elevation: 8,
                                }}
                            >
                                <Image
                                    style={{
                                        height:25,
                                        width:25,
                                    }}
                                    source={data.icon}
                                />
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{...FONTS.h6,color:colors.title,lineHeight:20,marginBottom:4}}>{data.title}</Text>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
                                        <FontAwesome style={{marginRight:4}} color={colors.text} name={'play'}/>
                                        <Text style={{...FONTS.font,color:colors.text}}>{data.question} questions</Text>
                                    </View>
                                    <View
                                        style={{
                                            height:3,
                                            width:3,
                                            borderRadius:5,
                                            backgroundColor:colors.text,
                                            opacity:.5,
                                            marginRight:10,
                                            marginTop:3,
                                        }}
                                    />
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <FontAwesome style={{marginRight:4}} color={colors.text} name={'user'}/>
                                        <Text style={{...FONTS.font,color:colors.text}}>{data.participants} questions</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </>
    );
};


export default PopularSkillTest;