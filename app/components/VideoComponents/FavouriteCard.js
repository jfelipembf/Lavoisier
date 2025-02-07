import React from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { COLORS, FONTS } from '../../constants/theme';

const FavouriteCard = ({image , price , title , address}) => {
    
    const {colors} = useTheme();

    return (
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
                marginBottom:12,
            }]}
        >
            <View
                style={[{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingHorizontal:8,
                    paddingVertical:8,
                    backgroundColor:colors.cardBg,
                    borderRadius:10,
                },Platform.OS === 'android' && {
                    marginBottom:12,
                }]}
            >
                <View style={{marginRight:15}}>
                    <Image
                        source={image}
                        style={{
                            height:100,
                            width:100,
                            borderRadius:8,
                        }}
                    />
                    <LinearGradient
                        end={{x: 0.0, y: 0.25}} 
                        start={{x: 0.5, y: 1.0}}
                        locations={[0,0.5,1]}
                        colors={['rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(0,0,0,.6)']}
                        style={{
                            position:'absolute',
                            height:'100%',
                            width:'100%',
                            borderRadius:10,
                            transform:[{rotateY: '180deg'}]
                        }}
                    >
                    </LinearGradient>
                    <TouchableOpacity
                        style={{
                            height:40,
                            width:40,
                            borderRadius:40,
                            position:'absolute',
                            top:5,
                            right:5,
                            alignItems:'center',
                            justifyContent:'center',
                            //backgroundColor:'rgba(255,255,255,.25)',
                        }}
                    >
                        <FontAwesome color={'#fd3667'} size={22} name='heart'/>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    <Text numberOfLines={1} style={{...FONTS.h6,color:colors.title}}>{title}</Text>
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            marginTop:5,
                            marginBottom:5,
                        }}
                    >
                        <FeatherIcon style={{marginRight:3}} color={colors.textLight} name='map-pin'/>
                        <Text numberOfLines={1} style={{...FONTS.fontSm,color:colors.textLight}}>{address}</Text>
                    </View>
                    <Text style={{...FONTS.h5,color:COLORS.primary}}>{price}</Text>
                </View>
            </View>
        </View>
    );
};


export default FavouriteCard;