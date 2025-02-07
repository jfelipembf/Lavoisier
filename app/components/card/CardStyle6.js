import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const CardStyle6 = ({image,title,duration,lesson,tags,onPress}) => {
    const theme = useTheme();
    const {colors} = theme;

    return (
        <>
            <View
                style={{
                    width:280,
                    marginRight:15,
                    backgroundColor: colors.cardBg,
                    padding:8,
                    borderRadius:15,
                    borderWidth:1,
                    borderColor:colors.borderColor,
                }}
            >
                <View style={{position:'relative'}}>
                    <Image
                        style={{
                            width:'100%',
                            height:150,
                            borderRadius:10,
                        }} 
                        source={image}
                    />
                    <LinearGradient
                        colors={['rgba(0,0,0,0)','rgba(0,0,0,.6)']}
                        style={{
                            height:'100%',
                            width:'100%',
                            position:'absolute',
                            borderRadius:10,
                        }}
                    >
                    </LinearGradient>
                    <TouchableOpacity
                        style={{
                            position:'absolute',
                            bottom:10,
                            left:10,
                            backgroundColor:'rgba(255,255,255,.15)',
                            paddingHorizontal:10,
                            paddingVertical:2,
                            borderRadius:6,
                            flexDirection:'row',
                            alignItems:'center',
                        }}
                    >
                        <FeatherIcon style={{marginRight:5}} color={COLORS.white} name={'clock'}/>
                        <Text style={{...FONTS.font,color:COLORS.white,marginBottom:1}}>{duration}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            position:'absolute',
                            bottom:10,
                            right:10,
                            backgroundColor:'rgba(255,255,255,.15)',
                            paddingHorizontal:10,
                            paddingVertical:2,
                            borderRadius:6,
                            flexDirection:'row',
                            alignItems:'center',
                        }}
                    >
                        <FeatherIcon style={{marginRight:5}} color={COLORS.white} name={'file-text'}/>
                        <Text style={{...FONTS.font,color:COLORS.white,marginBottom:1}}>{lesson}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{paddingHorizontal:12,paddingTop:15,paddingBottom:12}}>
                    <View
                        style={{
                            flexDirection:'row',
                            marginBottom:10,
                        }}
                    >
                        {tags && tags.map((data,index) => (
                            <TouchableOpacity 
                                key={index}
                                style={{
                                    backgroundColor:theme.dark ? 'rgba(255,255,255,.1)' : '#eee',
                                    marginRight:10,
                                    paddingHorizontal:10,
                                    paddingVertical:4,
                                    borderRadius:6,
                                }}
                            >
                                <Text style={{...FONTS.fontSm,color:colors.title}}>{data}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={{...FONTS.h6,color:colors.title,marginBottom:15}}>{title}</Text>
                    <TouchableOpacity
                        onPress={onPress}
                        style={{
                            backgroundColor:COLORS.primary3,
                            paddingVertical:10,
                            paddingHorizontal:15,
                            borderRadius:8,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent: 'center',
                            width: '100%'
                        }}
                    >
                        <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.white,marginBottom:1}}>Inscrever-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default CardStyle6;