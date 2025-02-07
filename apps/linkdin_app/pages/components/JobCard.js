import React from 'react';
import { Image, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../../constants/theme';

const JobCard = ({
    id,
    item,
    handleJobSave
}) => {
    
    const theme = useTheme();
    const {colors} = theme;
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={() => navigation.navigate('JobDetails')}
            style={{
                backgroundColor : colors.cardBg,
                marginBottom:15,
                borderWidth:1,
                borderRadius:6,
                borderColor:colors.borderColor,
                paddingHorizontal:12,
                paddingVertical:12,
            }}
        >
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    marginBottom:10,
                }}
            >
                <Image
                    style={{
                        height:60,
                        width:60,
                        borderRadius:8,
                        marginRight:12,
                    }}
                    source={item.logoImg}
                />
                <View style={{flex:1}}>
                    <Text style={{...FONTS.font,color:colors.text}}>{item.company}</Text>
                    <Text style={{...FONTS.h6,color:colors.title}}>{item.title}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        handleJobSave(id);
                        // if(item.isBookmark){
                        //     ToastAndroid.show({
                        //         text : "You unsaved the post.",
                        //         backgroundColor:"#000",
                        //     })
                        // }else{
                        //     ToastAndroid.show({
                        //         text : "Post Saved Successfully.",
                        //         backgroundColor:"#000",
                        //     })
                        // }
                    }}
                    style={{
                        height:38,
                        width:38,
                        borderWidth:1,
                        borderRadius:35,
                        alignItems:'center',
                        justifyContent:'center',
                        borderColor:colors.borderColor,
                    }}
                >
                    <FontAwesome color={COLORS.primary6} size={18} name={item.isBookmark ? 'bookmark' : 'bookmark-o'}/>
                </TouchableOpacity>
            </View>
            <Text numberOfLines={2} style={{...FONTS.font,color:colors.text,marginBottom:12}}>{item.desc}</Text>
            <View
                style={{
                    flexDirection:'row',
                }}
            >
                <View
                    style={{
                        paddingHorizontal:12,
                        paddingVertical:6,
                        borderRadius:6,
                        backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : '#eee',
                        marginRight:10,
                    }}
                >
                    <Text style={{...FONTS.font,color:colors.title}}>{item.jobType}</Text>
                </View>
                <View
                    style={{
                        paddingHorizontal:12,
                        paddingVertical:6,
                        borderRadius:6,
                        backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : '#eee',
                    }}
                >
                    <Text style={{...FONTS.font,color:colors.title}}>{item.salary}</Text>
                </View>
            </View>
            <View
                style={{
                    borderTopWidth:1,
                    borderColor:colors.borderColor,
                    marginTop:12,
                    flexDirection:'row',
                    paddingTop:8,
                }}
            >
                <View
                    style={{
                        flexDirection:'row',
                        flex:1,
                        alignItems:'center',
                    }}
                >
                    <FeatherIcon style={{marginRight:5,top:1}} color={colors.text} name='map-pin'/>
                    <Text style={{...FONTS.font,color:colors.text}}>{item.location}</Text>
                </View>
                <Text style={{...FONTS.fontSm,color:colors.text}}>{item.updateDate}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default JobCard;