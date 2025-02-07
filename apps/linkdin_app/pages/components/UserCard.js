import React, {useState} from 'react';
import { Image, TouchableOpacity, View, Text, ToastAndroid } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';

const UserCard = ({item}) => {

    const {colors} = useTheme();
    const navigation = useNavigation();

    const [isFollow , setIsFollow] = useState(false);

    const handleFollow = () => {
        setIsFollow(!isFollow);
        if(!isFollow){
            ToastAndroid.show({
                text : `Invitation sent to ${item.name}`,
                backgroundColor:"#000",
            })
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={.95}
            onPress={() => navigation.navigate('Profile',{name : item.name, image : item.userImg})}
            style={{
                marginBottom:12,
                borderRadius:6,
                backgroundColor:colors.cardBg,
                borderWidth:1,
                borderColor:colors.borderColor,
            }}
        >
            <Image  
                style={{
                    width:'100%',
                    height:undefined,
                    aspectRatio : 260 / 100,
                    borderTopLeftRadius:6,
                    borderTopRightRadius:6,

                }}
                source={item.bgImage}
            />
            <View
                style={{
                    alignItems:'center',
                    paddingBottom:10,
                    paddingHorizontal:10,
                }}
            >
                <View
                    style={{
                        borderWidth:1,
                        borderColor:colors.borderColor,
                        padding:2,
                        borderRadius:75,
                        marginTop:-40,
                        marginBottom:10,
                    }}
                >
                    <Image
                        style={{
                            height:75,
                            width:75,
                            borderRadius:75,
                        }}
                        source={item.userImg}
                    />
                </View>
                <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:colors.title,marginBottom:4}}>{item.name}</Text>
                <Text style={{...FONTS.fontXs,color:colors.text}}>{item.subTitle}</Text>
                <TouchableOpacity
                    onPress={() => handleFollow()}
                    style={{
                        borderWidth:1,
                        width:'100%',
                        alignItems:'center',
                        paddingHorizontal:15,
                        paddingVertical:6,
                        borderRadius:6,
                        marginTop:12,
                        borderColor:COLORS.primary6,
                    }}
                >
                    <Text style={{...FONTS.fontSm,color:COLORS.primary6,top:-1}}>{isFollow ? "Request" : "Connect"}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default UserCard;