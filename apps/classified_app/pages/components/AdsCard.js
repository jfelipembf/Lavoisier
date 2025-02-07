import React from 'react';
import { Image, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const AdsCard = ({title,image,price,views,likes,dateFrom,dateTo,status}) => {

    const {colors} = useTheme();

    return (
        <View
            style={{
                backgroundColor:colors.cardBg,
                borderRadius:10,
                marginBottom:18,
                borderLeftWidth:4,
                borderColor:status === "Featured" ? COLORS.yellow : COLORS.primary5,
                ...GlobalStyleSheet.shadow,
            }}
        >
            <View
                style={{
                    paddingHorizontal:15,
                    paddingVertical:12,
                    borderBottomWidth:1,
                    borderColor:colors.borderColor,
                }}
            >
                <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:colors.textLight}}>From :
                    <Text style={{color:colors.text}}> {dateFrom} - </Text> 
                    To 
                    <Text style={{color:colors.text}}> {dateTo}</Text>
                </Text>
            </View>
            <View
                style={{
                    paddingHorizontal:15,
                    paddingVertical:15,
                    flexDirection:'row',
                }}
            >
                <Image
                    source={image}
                    style={{
                        height:80,
                        width:80,
                        marginRight:15,
                        borderRadius:10,
                    }}
                />
                <View style={{flex:1}}>
                    <Text style={{
                        ...FONTS.font,
                        fontSize:15,
                        ...FONTS.fontBold,
                        color:colors.title,
                        marginBottom:3,
                    }}>{title}</Text>
                    <Text style={{...FONTS.h6,color:COLORS.primary}}>{price}</Text>
                    <View
                        style={{
                            flexDirection:'row',
                            marginTop:5,
                            justifyContent:'space-between',
                        }}
                    >
                        <View
                            style={{
                                flexDirection:'row',
                            }}
                        >
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    borderRightWidth:1,
                                    borderColor:colors.borderColor,
                                    paddingRight:10,
                                    marginRight:10,
                                }}
                            >
                                <FeatherIcon style={{marginRight:4}} color={colors.text} size={14} name='eye'/>
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.text}}>{views}</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                }}
                            >
                                <FeatherIcon style={{marginRight:4}} color={colors.text} size={14} name='heart'/>
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.text}}>{likes}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                backgroundColor:status === "Featured" ? COLORS.yellow : COLORS.primary5,
                                paddingHorizontal:10,
                                borderRadius:20,
                                paddingBottom:4,
                                paddingTop:1,
                            }}
                        >
                            <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:COLORS.white}}>{status}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};


export default AdsCard;