import React, { useState } from 'react';
import { Image, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';

const PopularNetworkCard = ({item}) => {
    
    const {colors} = useTheme();
    const navigation = useNavigation();
    const [isFollow , setIsFollow] = useState(false);

    const handleFollow = () => {
        setIsFollow(!isFollow);
        if(isFollow){
            ToastAndroid.show({
                text : `You Unfollow ${item.name}`,
                backgroundColor:"#000",
            })
        }else{
            ToastAndroid.show({
                text : `You start following ${item.name}`,
                backgroundColor:"#000",
            })
        }
    }

    // Verificando se item e suas propriedades estão definidos
    if (!item || !item.bgImage || !item.userImg || !item.name || !item.subTitle || !item.follower) {
        return null; // ou um componente de placeholder
    }

    return (
        <TouchableOpacity
            activeOpacity={.95}
            onPress={() => navigation.navigate('Profile',{name : item.name, image : item.userImg})}
            style={{
                width:280,
                backgroundColor: colors.cardBg,
                borderRadius:6,
                borderWidth:1,
                marginRight:12,
                borderColor:colors.borderColor,
            }}
        >
            <View>
                <Image
                    style={{
                        width:'100%',
                        height: undefined,
                        aspectRatio : 320 / 100,
                        borderTopLeftRadius : 6,
                        borderTopRightRadius : 6,
                    }}
                    source={item.bgImage}
                />
                <View
                    style={{
                        borderWidth:1,
                        borderColor:colors.borderColor,
                        borderRadius:68,
                        position:'absolute',
                        padding:3,
                        right:15,
                        bottom:-28,
                    }}
                >
                    <Image
                        style={{
                            height:68,
                            width:68,
                            borderRadius:68,
                        }}
                        source={item.userImg}
                    />
                </View>
            </View>
            <View
                style={{
                    paddingHorizontal:15,
                    paddingVertical:14,
                }}
            >
                <Text style={{...FONTS.fontSm,color:colors.text,marginBottom:3}}>{item.subTitle}</Text>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                }}>
                    <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title}}>{item.name}</Text>
                    <View
                        style={{
                            height:3,
                            width:3,
                            backgroundColor:colors.textLight,
                            marginHorizontal:6,
                            borderRadius:3,
                            top:1,
                        }}
                    />
                    <Text style={{...FONTS.fontXs,color:colors.text,top:2}}>{item.follower} followers</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => handleFollow()}
                style={{
                    alignItems:'center',
                    paddingHorizontal:15,
                    paddingVertical:10,
                    borderTopWidth:1,
                    borderColor:colors.borderColor,
                }}
            >
                <Text style={{...FONTS.font,color:COLORS.primary6,top:-1}}>{isFollow ? "Following" : "Follow"}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default PopularNetworkCard;