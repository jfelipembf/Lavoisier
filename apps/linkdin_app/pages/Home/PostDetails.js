import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View, Image, Text, TextInput, TouchableOpacity, Modal, Share, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { List } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import Header from '../components/Header';
import PostLikes from '../components/PostLikes';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

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

const commentData = [
    {
        userImg : IMAGES.user1,
        userName : "Lucas Mokmana",
        desc : "React Native Developer",
        comment : "Amazing product and clean code.",
        replies : [
            {
                userImg : IMAGES.user4,
                userName : "Emilia Green",
                desc : "Web Developer at infosis.",
                comment : "Yes Right, I am install the app and find this is useful for all.",
            },
        ]
    },
    {
        userImg : IMAGES.user2,
        userName : "Richard Sigh",
        desc : "Human resource Executive.",
        comment : "Great app all are available in one.",
    },
    {
        userImg : IMAGES.user3,
        userName : "Hendri Lee",
        desc : "Career Coach",
        comment : "Clean and Optimized code helpful for developer.",
    },
]
const PostDetails = ({route}) => {

    const {
        postImg,
        userImg,
        userName,
        userInfo,
        desc,
        comment,
    } = route.params;

    const theme = useTheme();
    const {colors} = theme;

    const navigation = useNavigation();
    const shareSheet = useRef();
    const postOptionSheet = useRef();
    const inputRef = useRef();
    const [postLike , setPostLike] = useState(false);
    const [likesModal, setLikesModal] = useState(false);
    const [postSaved, setPostSaved] = useState(false);
    const [follow, setFollow] = useState(true);

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

    // const handlePostSend = (name) => {
    //     ToastAndroid.show({
    //         text:`Post Sent to ${name} successfully.`,
    //         backgroundColor:'#000',
    //     })
    // }

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
                <ScrollView>
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
                    backgroundColor:colors.cardBg,
                }]}
            >
                <Header
                    leftIcon={'back'}
                    rightIcon={'more'}
                    postOptionSheet={postOptionSheet}
                />
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View
                        style={{
                            paddingHorizontal:12,
                            paddingVertical:15,
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => navigation.navigate('Profile',{name : userName, image : userImg})}
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                marginBottom:15,
                            }}
                        >
                            <Image
                                style={{
                                    height:45,
                                    width:45,
                                    marginRight:10,
                                    borderRadius:40,
                                }}
                                source={userImg}
                            />
                            <View
                                style={{
                                    flex:1,
                                }}
                            >
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title,marginBottom:2}}>{userName}</Text>
                                <Text style={{...FONTS.fontSm,color:colors.textLight}}>{userInfo}</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={{...FONTS.font,color:colors.text}}>{desc}</Text>
                    </View>
                    <Image
                        style={{
                            width:'100%',
                            height: undefined,
                            aspectRatio : postImg && postImg.ratio,
                        }}
                        source={postImg.images[0]}
                    />

                    <TouchableOpacity
                        onPress={() => setLikesModal(true)}
                        activeOpacity={.7}
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            paddingHorizontal:15,
                            paddingVertical:12,
                            borderBottomWidth:1,
                            borderBottomColor:colors.borderColor,
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
                            <Text style={{...FONTS.fontXs,color:colors.text,marginLeft:6}}>82,135</Text>
                        </View>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                        >
                            <Text style={{...FONTS.fontXs,color:colors.text}}>50 Comments</Text>
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
                            <Text style={{...FONTS.fontXs,color:colors.text}}>10 Shares</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <View
                        style={{
                            flexDirection:'row',
                            marginBottom:8,
                        }}
                    >
                        <List.Item
                            onPress={() => setPostLike(!postLike)}
                            titleStyle={{
                                fontSize:14,
                                color:colors.title
                            }}
                            title="Like"
                            style={{
                                paddingVertical:4,
                                flex:1,
                                paddingHorizontal:18,
                            }}
                            left={() => 
                                postLike ?
                                <Image style={{height:22,width:22}} source={IMAGES.thumb} />
                                :
                                <FeatherIcon color={colors.textLight} size={18} style={{width:22,left:2}} name='thumbs-up'/>}
                        />
                        <List.Item
                            onPress={() => {inputRef.current.focus()}}
                            titleStyle={{
                                fontSize:14,
                                color:colors.title
                            }}
                            title="Comment"
                            style={{
                                paddingVertical:4,
                                flex:1.2,
                                paddingHorizontal:18,
                            }}
                            left={() => <FeatherIcon color={colors.textLight} size={18} name='message-circle'/>}
                        />
                        <List.Item
                            onPress={() => shareSheet.current.open()}
                            titleStyle={{
                                fontSize:14,
                                color:colors.title
                            }}
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

                    <View
                        style={{
                            paddingHorizontal:15,
                            paddingVertical:10,
                            borderTopWidth:1,
                            borderTopColor:colors.borderColor,
                        }}
                    >
                        <Text style={{...FONTS.h6,color:colors.title,marginBottom:15}}>Comments</Text>
                        
                        {commentData.map((data,index) => {
                            return(
                                <View
                                    key={index}
                                    style={{
                                        marginBottom:20,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection:'row',
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:40,
                                                width:40,
                                                borderRadius:40,
                                                marginRight:10,
                                            }}
                                            source={data.userImg}
                                        />
                                        <View style={{flex:1,alignItems:'flex-start'}}>
                                            <View
                                                style={{
                                                    backgroundColor:theme.dark ? 'rgba(255,255,255,.1)' : '#f2f2f2',
                                                    paddingHorizontal:12,
                                                    paddingVertical:10,
                                                    borderRadius:8,
                                                }}
                                            >
                                                <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title,marginBottom:3}}>{data.userName}</Text>
                                                <Text style={{...FONTS.fontXs,color:colors.textLight,marginBottom:4}}>{data.desc}</Text>
                                                <Text style={{...FONTS.font,color:colors.title}}>{data.comment}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{
                                        marginBottom:10
                                    }}>
                                        {data.replies && data.replies.map((data,index) => {
                                            return(
                                                <View
                                                    key={index}
                                                    style={{
                                                        paddingLeft:50,
                                                        flexDirection:'row',
                                                        marginTop:15,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            height:40,
                                                            width:40,
                                                            borderRadius:40,
                                                            marginRight:10,
                                                        }}
                                                        source={data.userImg}
                                                    />
                                                    <View style={{flex:1,alignItems:'flex-start'}}>
                                                        <View
                                                            style={{
                                                                backgroundColor:theme.dark ? 'rgba(255,255,255,.1)' : '#f2f2f2',
                                                                paddingHorizontal:12,
                                                                paddingVertical:10,
                                                                borderRadius:8,
                                                            }}
                                                        >
                                                            <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title,marginBottom:3}}>{data.userName}</Text>
                                                            <Text style={{...FONTS.fontXs,color:colors.textLight,marginBottom:4}}>{data.desc}</Text>
                                                            <Text style={{...FONTS.font,color:colors.title}}>{data.comment}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </View>
                            )
                        })}
                        
                    </View>


                </ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : ""}
                >
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            paddingHorizontal:15,
                            paddingVertical:4,
                            borderTopWidth:1,
                            borderTopColor:colors.borderColor,
                        }}
                    >
                        <Image
                            style={{
                                height:30,
                                width:30,
                                borderRadius:30,
                                marginRight:12,
                            }}
                            source={IMAGES.profile1}
                        />
                        <TextInput
                            autoFocus={comment}
                            ref={inputRef}
                            style={{
                                ...FONTS.font,
                                color:colors.title,
                                height:48,
                                flex:1,
                            }}
                            placeholder='Leave comment here...'
                            placeholderTextColor={colors.textLight}
                        />
                        <TouchableOpacity style={{padding:10}}>
                            <MaterialCommunityIcons color={COLORS.primary6} size={22} name='send'/>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
};

export default PostDetails;