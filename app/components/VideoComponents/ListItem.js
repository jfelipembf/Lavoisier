import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';

const ListItem = ({image,title,duration,servings,rating,price,isLike}) => {
    
    const {colors} = useTheme();
    
    const navigation = useNavigation();

    return (
        <>
            <View
                style={{marginBottom:15,flexDirection:'row',alignItems:'center'}}
            >
                <View style={{marginRight:15}}>
                    <Image
                        style={{
                            height:123,
                            width:112,
                            borderRadius:15,
                        }}
                        source={image}
                    />
                    <LinearGradient
                        end={{x: 0.0, y: 0.25}} 
                        start={{x: 0.5, y: 1.0}}
                        locations={[0,0.6,1]}
                        colors={['rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(0,0,0,.6)']}
                        style={{
                            position:'absolute',
                            height:'100%',
                            width:'100%',
                            borderRadius:15,
                            transform:[{rotateY: '180deg'}]
                        }}
                    >
                    </LinearGradient>
                    <TouchableOpacity
                        style={[{
                            height:35,
                            width:35,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:8,
                            backgroundColor:'rgba(255,255,255,.25)',
                            position:'absolute',
                            top:10,
                            right:10,
                        }, isLike && {
                           // backgroundColor: ""
                        }]}
                    >
                        {isLike ?
                            <FontAwesome color={"#ff3751"} size={18} name={'heart'}/>
                            :
                            <FeatherIcon color={COLORS.white} size={18} name={'heart'}/>
                        }
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('ProductDetail')}
                    activeOpacity={.85}
                    style={{flex:1}}
                >
                    <Text style={{...FONTS.h6,color:colors.title,lineHeight:22}}>{title}</Text>
                    <View
                        style={{flexDirection:'row',alignItems:'center'}}
                    >
                        <Text style={{...FONTS.font,color:colors.text}}>{duration}</Text>
                        <View
                            style={{
                                height:10,
                                width:1,
                                backgroundColor:colors.text,
                                marginHorizontal:6,
                                marginTop:1,
                                opacity:.6,
                            }}
                        />
                        <Text style={{...FONTS.font,color:colors.text}}>{servings} servings</Text>
                    </View>
                    <View style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                        marginTop:12,
                    }}>
                        <Text style={{...FONTS.h5,color:colors.title}}>{price}</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image
                                source={IMAGES.star}
                                style={{
                                    height:18,
                                    width:18,
                                    tintColor:COLORS.primary,
                                    marginRight:3,
                                }}
                            />
                            <Text style={{...FONTS.h6,color:colors.title,lineHeight:22}}>{rating}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
};


export default ListItem;