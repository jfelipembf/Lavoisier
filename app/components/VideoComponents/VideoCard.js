import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation, useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../../constants/theme';

const VideoCard = ({posterImage,profileImage,title,views,duration,category,lastUpdate,videoId,postOption}) => {

    const {colors} = useTheme();
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('VideoScreen',{
                videoId : videoId,
                title : title,
                views : views,
                lastUpdate : lastUpdate,
                profileImage : profileImage,
            })}
            activeOpacity={.9}
            style={{
                paddingHorizontal:12,
                paddingVertical:15,
                borderBottomWidth:1,
                borderBottomColor:colors.borderColor,
            }}
        >
            <View
                style={{
                    marginBottom:10,
                }}
            >
                <Image
                    style={{
                        width:'100%',
                        height:undefined,
                        aspectRatio : 180 / 100,
                        borderRadius:6,
                    }}
                    source={posterImage}
                />
                <LinearGradient
                    colors={["rgba(0,0,0,.5)","rgba(0,0,0,0)","rgba(0,0,0,0)"]}
                    style={{
                        position:'absolute',
                        height:'100%',
                        width:'100%',
                        top:0,
                        left:0,
                        borderRadius:6,
                    }}
                >
                </LinearGradient>
                <View
                    style={{
                        position:'absolute',
                        top:10,
                        right:10,
                        flexDirection:'row',
                    }}
                >
                    <View
                        style={{
                            height:20,
                            paddingHorizontal:8,
                            backgroundColor:'rgba(255,255,255,.1)',
                            borderWidth:1,
                            borderColor:'rgba(255,255,255,.15)',
                            borderRadius:5,
                            flexDirection:'row',
                            alignItems:'center',
                            marginRight:6,
                        }}
                    >
                        <FeatherIcon name='eye' style={{marginRight:5}} color={COLORS.white}/>
                        <Text style={{...FONTS.fontXs,color:COLORS.white,top:1}}>{views}</Text>
                    </View>
                    <View
                        style={{
                            height:20,
                            paddingHorizontal:8,
                            backgroundColor:'rgba(255,255,255,.1)',
                            borderWidth:1,
                            borderColor:'rgba(255,255,255,.15)',
                            borderRadius:5,
                            flexDirection:'row',
                            alignItems:'center',
                        }}
                    >
                        <FeatherIcon name='clock' style={{marginRight:5}} color={COLORS.white}/>
                        <Text style={{...FONTS.fontXs,color:COLORS.white,top:1}}>{duration}</Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                }}
            >
                <Image  
                    style={{
                        height:45,
                        width:45,
                        borderRadius:45,
                        marginRight:10,
                    }}
                    source={profileImage}
                />
                <View style={{flex:1}}>
                    <Text numberOfLines={1} style={{...FONTS.font,...FONTS.fontBold,color:colors.title}}>{title}</Text>
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                        }}
                    >
                        <Text style={{...FONTS.fontSm,color:colors.text}}>{category}</Text>
                        <View
                            style={{
                                height:3,
                                width:3,
                                borderRadius:3,
                                backgroundColor:colors.textLight,
                                opacity:.5,
                                marginHorizontal:6,
                            }}
                        />
                        <Text style={{...FONTS.fontSm,color:colors.text}}>{lastUpdate}</Text>
                    </View>
                </View>
                <IconButton
                    onPress={() => {postOption.current.open()}}
                    icon={() => <FeatherIcon size={20} color={colors.title} name='more-vertical'/>}
                    style={{
                        marginRight:-5,
                    }}
                />
            </View>
        </TouchableOpacity>
    );
};

export default VideoCard;