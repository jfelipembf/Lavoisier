import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { FONTS } from '../../constants/theme';

const ChatListItem = ({productImg,userImg,userName,productTitle,lastMsg,date}) => {

    const {colors} = useTheme();
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('ChatScreen')}
            style={{
                flexDirection:'row',
                paddingHorizontal:15,
                paddingVertical:18,
                borderBottomWidth:1,
                borderColor:colors.borderColor,
            }}
        >
            <View
                style={{
                    marginRight:12,
                    paddingRight:12,
                }}
            >
                <Image
                    style={{
                        height:50,
                        width:50,
                        borderRadius:6,
                    }}
                    source={productImg}
                />
                <Image
                    source={userImg}
                    style={{
                        height:32,
                        width:32,
                        borderRadius:30,
                        position:'absolute',
                        bottom:0,
                        right:0,
                        borderWidth:2,
                        borderColor:colors.cardBg,
                    }}
                />
            </View>
            <View
                style={{
                    flex:1,
                }}
            >
                <View
                    style={{
                        flexDirection:'row',
                    }}
                >
                    <Text numberOfLines={1} style={{...FONTS.h6,flex:1,lineHeight:22,color:colors.title}}>{userName}</Text>
                    <Text style={{...FONTS.fontSm,color:colors.textLight}}>{date}</Text>
                </View>
                <Text numberOfLines={1} style={{...FONTS.font,...FONTS.fontBold,color:colors.text,marginBottom:3}}>{productTitle}</Text>
                <Text numberOfLines={1} style={{...FONTS.fontSm,color:colors.textLight}}>{lastMsg}</Text>
            </View>
        </TouchableOpacity>
    );
};


export default ChatListItem;