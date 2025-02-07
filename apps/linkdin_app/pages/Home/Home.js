import React, { useRef, useState } from 'react';
import { Image, Modal, SafeAreaView, ScrollView, Share, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { IconButton, List } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import PostLikes from '../components/PostLikes';
import PostCard from '../components/PostCard';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const PostData = [
    {
        postImg : {ratio : 100 / 60 , images : [ IMAGES.postLinkdin2 ]},
        userImg : IMAGES.user1,
        userName : "Olivia Johanson",
        userInfo : "Full Stack developer at w3itexperts info solutions",
        desc : "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
        likes : "25,256",
        comments : "50",
        shares : "10",
        isLike : false,
    },
    {
        postImg : {ratio : 100 / 130 , images : [ IMAGES.postLinkdin4]},
        userImg : IMAGES.user2,
        userName : "Brian Harahap",
        userInfo : "Full Stack developer at w3itexperts info solutions",
        desc : "It is a long established fact that a reader will be distracted by the readable content of a part",
        likes : "25,256",
        comments : "50",
        shares : "10",
        isLike : false,
    },
    {
        postImg : {ratio : 100 / 80 , images : [ IMAGES.postLinkdin3 ]},
        userImg : IMAGES.user3,
        userName : "Christian Hang",
        userInfo : "Full Stack developer at w3itexperts info solutions",
        desc : "It is a long established fact that a reader will be distracted by the readable content of a part",
        likes : "25,256",
        comments : "50",
        shares : "10",
        isLike : false,
    },
    {
        postImg : {ratio : 100 / 60 , images : [ IMAGES.postLinkdin1 ]},
        userImg : IMAGES.user1,
        userName : "Chloe Mc. Jenskin",
        userInfo : "Full Stack developer at w3itexperts info solutions",
        desc : "It is a long established fact that a reader will be distracted by the readable content of a part",
        likes : "25,256",
        comments : "50",
        shares : "10",
        isLike : false,
    },
]

const shareUserList = [
    {
        userImg : IMAGES.user1,
        userName : "Olivia Johanson",
        desc : "Senior Web Designer at W3itexperts.",
    },
    {
        userImg : IMAGES.user2,
        userName : "Lucas Mokmana",
        desc : "React Native Developer",
    },
    {
        userImg : IMAGES.user3,
        userName : "Emilia Green",
        desc : "Web Developer at infosis.",
    },
    {
        userImg : IMAGES.user4,
        userName : "Richard Sigh",
        desc : "Human resource Executive.",
    },
    {
        userImg : IMAGES.user5,
        userName : "Hendri Lee",
        desc : "Career Coach",
    },
    {
        userImg : IMAGES.user6,
        userName : "Brian Harahap",
        desc : "Senior Web Designer",
    },
]


const Home = ({navigation}) => {

    const theme = useTheme();
    const {colors} = theme;
    const postOptionSheet = useRef();
    const shareSheet = useRef();
    const [postArry , setPostArry] = useState(PostData);
    const [postSaved, setPostSaved] = useState(false);
    const [follow, setFollow] = useState(true);
    const [likesModal, setLikesModal] = useState(false);

    const handlePostSave = () => {
        setPostSaved(!postSaved);
        if(postSaved){
            ToastAndroid.show({
                text : "Post unsaved successfully.",
                backgroundColor:'#000',
            })
        }else{
            ToastAndroid.show({
                text : "Post saved successfully.",
                backgroundColor:'#000',
            })
        }
    }
    
    const handlePostSend = (name) => {
        ToastAndroid.show({
            text:`Post Sent to ${name} successfully.`,
            backgroundColor:'#000',
        })
    }

    const onShare = async () => {
        try {
          const result = await Share.share({
                message:
                'Multipurpose react native application.\nDownload : https://play.google.com/store/apps/details?id=com.AppZilla \n Best application for every developer.',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    };

    return (
        <>

            <Modal
                visible={likesModal}
                animationType={'slide'}
                transparent={true}
            >
                <PostLikes
                    likesModal={setLikesModal}
                />
            </Modal>

            <RBSheet
                ref={shareSheet}
                closeOnDragDown={true}
                height={450}
                customStyles={{
                    container : {
                        backgroundColor:colors.cardBg,
                    }
                }}
            >
                <View
                    style={{
                        paddingHorizontal:15,
                        paddingBottom:10,
                    }}
                >
                    <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>New Message</Text>
                    <View>
                        <TextInput
                            style={{
                                backgroundColor: theme.dark ? 'rgba(255,255,255,.08)' : '#eee',
                                borderRadius:8,
                                paddingHorizontal:18,
                                paddingVertical:10,
                                height:48,
                                color:colors.title,
                            }}
                            placeholder='Search here...'
                            placeholderTextColor={colors.textLight}
                        />
                        <FeatherIcon
                            size={20}
                            color={colors.textLight}
                            style={{
                                position:'absolute',
                                right:15,
                                top:12,
                            }}
                            name='search'
                        />
                    </View>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity activeOpacity={1}>
                        {shareUserList.map((data,index) => {
                            return(
                                <View
                                    key={index}
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        paddingHorizontal:15,
                                        paddingVertical:10,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:50,
                                            width:50,
                                            borderRadius:50,
                                            marginRight:12,
                                        }}
                                        source={data.userImg}
                                    />
                                    <View style={{flex:1,marginRight:15}}>
                                        <Text numberOfLines={1} style={{...FONTS.font,...FONTS.fontBold,color:colors.title,marginBottom:4}}>{data.userName}</Text>
                                        <Text numberOfLines={1} style={{...FONTS.fontSm,color:colors.textLight}}>{data.desc}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => handlePostSend(data.userName)}
                                        style={{
                                            backgroundColor:COLORS.primary6,
                                            height:30,
                                            paddingHorizontal:15,
                                            borderRadius:4,
                                            justifyContent:'center',
                                        }}
                                    >
                                        <Text style={{...FONTS.font,color:COLORS.white,top:-1}}>Send</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </TouchableOpacity>
                </ScrollView>
            </RBSheet>
            
            <RBSheet
                ref={postOptionSheet}
                closeOnDragDown={true}
                height={250}
                customStyles={{
                    container:{
                        backgroundColor:colors.cardBg,
                    }
                }}
            >
                <List.Item
                    onPress={() => handlePostSave()}
                    left={() => <FontAwesome style={{width:35,left:12}} size={20} color={colors.title} name={postSaved ? 'bookmark' : 'bookmark-o'}/>}
                    titleStyle={{
                        ...FONTS.font,
                        fontSize:15,
                        color:colors.title,
                    }}
                    title={postSaved ? "Unsave this post" : "Save this post"}
                />
                <List.Item
                    onPress={() => {onShare()}}
                    left={() => <FeatherIcon style={{width:35,left:10}} size={20} color={colors.title} name='share-2'/>}
                    titleStyle={{
                        ...FONTS.font,
                        fontSize:15,
                        color:colors.title,
                    }}
                    title="Share the post"
                />
                <List.Item
                    onPress={() => {setFollow(!follow)}}
                    left={() => <FeatherIcon style={{width:35,left:10}} size={20} color={colors.title} name={follow ? 'user-minus' : 'user-plus'}/>}
                    titleStyle={{
                        ...FONTS.font,
                        fontSize:15,
                        color:colors.title,
                    }}
                    title={follow ? "Unfollow Shubham Gaur" : "Follow Shubham Gaur"}
                />
                <List.Item
                    onPress={() => {postOptionSheet.current.close()}}
                    left={() => <FeatherIcon style={{width:35,left:10}} size={20} color={COLORS.danger} name='alert-triangle'/>}
                    titleStyle={{
                        ...FONTS.font,
                        fontSize:15,
                        color:COLORS.danger,
                    }}
                    title="Report the post"
                />
            </RBSheet>

            <SafeAreaView
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    flex:1,
                    backgroundColor: colors.background2,
                }]}
            >
                <View
                    style={{
                        backgroundColor: COLORS.primary6,
                        flexDirection:'row',
                        alignItems:'center',
                        paddingRight:15,
                    }}
                >
                    <IconButton
                        icon={(props) => <FeatherIcon name='menu' {...props}/>}
                        size={24}
                        iconColor={COLORS.white}
                        onPress={() => navigation.openDrawer()}
                    />
                    <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.white,marginBottom:1,flex:1,marginLeft:5}}>Home</Text>
                    <IconButton
                        icon={(props) => <FeatherIcon name='search' {...props}/>}
                        size={24}
                        iconColor={COLORS.white}
                        onPress={() => navigation.navigate('Search')}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Profile',{name : "Hariom Rathore", image : IMAGES.user7})}
                        style={{
                            borderWidth:1,
                            borderColor:COLORS.white,
                            borderRadius:28,
                            marginLeft:15,
                        }}
                    >
                        <Image
                            style={{
                                height:28,
                                width:28,
                                borderRadius:28,
                            }}
                            source={IMAGES.user7}
                        />
                        <View
                            style={{
                                height:10,
                                width:10,
                                borderWidth:1,
                                borderColor:COLORS.primary6,
                                position:'absolute',
                                bottom:-1,
                                right:-1,
                                backgroundColor:COLORS.success,
                                borderRadius:10,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View
                        style={{paddingHorizontal:12,paddingVertical:15}}
                    >
                        {postArry.map((data,index) => {
                            return(
                                <PostCard
                                    key={index}
                                    postImg={data.postImg}
                                    userImg={data.userImg}
                                    userName={data.userName}
                                    userInfo={data.userInfo}
                                    desc={data.desc}
                                    likes={data.likes}
                                    comments={data.comments}
                                    shares={data.shares}
                                    postOptionSheet={postOptionSheet}
                                    shareSheet={shareSheet}
                                    isLike={data.isLike}
                                    postArry={postArry}
                                    setPostArry={setPostArry}
                                    likesModal={setLikesModal}
                                    id={index}
                                    PostData
                                />
                            )
                        })}
                    </View>
                </ScrollView>

            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    
})

export default Home;