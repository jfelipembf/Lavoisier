import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { IconButton, List } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { FONTS, IMAGES } from '../../constants/theme';

const PostCard = (
    {postImg,
    userImg,
    userName,
    userInfo,
    desc,likes,
    comments,
    shares,
    postOptionSheet,
    isLike,
    id,
    postArry,
    setPostArry,
    shareSheet,
    likesModal,
}) => {

    const {colors} = useTheme();

    const navigation = useNavigation();

    const handlePostLike = (val) => {
        let temp = postArry.map((data,index) => {
            if (val === index) {
                return { ...data, isLike: !data.isLike };
            }
            return data;
        });
        setPostArry(temp);
    }

    return (
        <View
            style={{
                backgroundColor: colors.cardBg,
                marginBottom:12,
                marginHorizontal:-12,
            }}
        >
            <View
                style={{
                    paddingHorizontal:15,
                    paddingVertical:15,
                }}
            >
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => navigation.navigate('Profile',{name : userName, image : userImg})}
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        marginBottom:10,
                    }}
                >
                    <Image
                        style={{
                            height:45,
                            width:45,
                            borderRadius:45,
                            marginRight:12,
                        }}
                        source={userImg}
                    />
                    <View style={{flex:1}}>
                        <Text style={{...FONTS.h6,color:colors.title}}>{userName}</Text>
                        <Text numberOfLines={1} style={{...FONTS.fontXs,color:colors.textLight}}>{userInfo}</Text>
                    </View>
                    <IconButton
                        icon={(props) => <FeatherIcon name='more-vertical' {...props}/>}
                        size={24}
                        iconColor={colors.title}
                        style={{marginRight:-5}}
                        onPress={() => {postOptionSheet.current.open()}}
                    />
                </TouchableOpacity>
                <Text numberOfLines={2} style={{...FONTS.font,color:colors.title}}>{desc}</Text>
            </View>
            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => 
                    navigation.navigate('PostDetails',{
                        postImg : postImg,
                        userImg: userImg,
                        userName: userName,
                        userInfo: userInfo,
                        desc: desc,
                    })
                }
            >
                <Image
                    style={{
                        width:'100%',
                        height: undefined,
                        aspectRatio : postImg && postImg.ratio,
                    }}
                    source={postImg && postImg.images[0]}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => likesModal(true)}
                activeOpacity={.7}
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingHorizontal:15,
                    paddingVertical:12,
                }}
            >
                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                    <View
                        style={{
                            flexDirection:'row',
                            paddingLeft:6,
                        }}
                    >
                        <View
                            style={{
                                borderWidth:1,
                                borderColor:colors.cardBg,
                                borderRadius:10,
                                marginLeft:-6,
                            }}
                        >
                            <Image
                                style={{
                                    height:15,
                                    width:15,
                                }}
                                source={IMAGES.likes}
                            />
                        </View>
                        <View
                            style={{
                                borderWidth:1,
                                borderColor:colors.cardBg,
                                borderRadius:10,
                                marginLeft:-6,
                            }}
                        >
                            <Image
                                style={{
                                    height:15,
                                    width:15,
                                }}
                                source={IMAGES.love}
                            />
                        </View>
                    </View>
                    <Text style={{...FONTS.fontXs,color:colors.text,marginLeft:6}}>{likes}</Text>
                </View>
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                    }}
                >
                    <Text style={{...FONTS.fontXs,color:colors.text}}>{comments} Comments</Text>
                    <View
                        style={{
                            height:3,
                            width:3,
                            backgroundColor:colors.textLight,
                            borderRadius:3,
                            marginHorizontal:8,
                            top:-1,
                        }}
                    />
                    <Text style={{...FONTS.fontXs,color:colors.text}}>{shares} Shares</Text>
                </View>
            </TouchableOpacity>
            <View
                style={{
                    flexDirection:'row',
                    marginBottom:8,
                }}
            >
                <List.Item
                    titleStyle={{
                        fontSize:14,
                        color:colors.title
                    }}
                    onPress={() => handlePostLike(id)}
                    title="Like"
                    style={{
                        paddingVertical:4,
                        flex:1,
                        paddingHorizontal:18,
                    }}
                    left={() => 
                        isLike ?
                        <Image style={{height:22,width:22}} source={IMAGES.thumb} />
                        :
                        <FeatherIcon color={colors.textLight} size={18} style={{width:22,left:2}} name='thumbs-up'/>}
                />
                <List.Item
                    titleStyle={{
                        fontSize:14,
                        color:colors.title
                    }}
                    onPress={() => 
                        navigation.navigate('PostDetails',{
                            postImg : postImg,
                            userImg: userImg,
                            userName: userName,
                            userInfo: userInfo,
                            desc: desc,
                            comment : true,
                        })
                    }
                    title="Comment"
                    style={{
                        paddingVertical:4,
                        flex:1.2,
                        paddingHorizontal:18,
                    }}
                    left={() => <FeatherIcon color={colors.textLight} size={18} name='message-circle'/>}
                />
                <List.Item
                    titleStyle={{
                        fontSize:14,
                        color:colors.title
                    }}
                    onPress={() => shareSheet.current.open()}
                    title="Share"
                    style={{
                        flex:1,
                        paddingVertical:4,
                        paddingHorizontal:18,
                    }}
                    left={() => <MaterialCommunityIcons color={colors.textLight} size={22}
                    name='share-outline'/>}
                />
            </View>
        </View>
    );
};

export default PostCard;