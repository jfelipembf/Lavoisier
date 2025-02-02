import React, {useState, useCallback, useRef} from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView, StyleSheet, Share, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
// import YoutubePlayer from "react-native-youtube-iframe";
import { IconButton, List } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS, FONTS, IMAGES, SIZES } from '../../constants/theme';
import VideoCard from '../components/VideoCard';
import PostOptionSheet from '../components/PostOptionSheet';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const VideoData = [
    {
        id : "1",
        videoId : "K0u_kAWLJOA",
        posterImage : IMAGES.poster1,
        profileImage : IMAGES.youtubeProfile1,
        title : "God of War - Full Gameplay #01",
        category : "Playground",
        lastUpdate : "11 day ago",
        views : "2.5k",
        duration : "3:38",
    },
    {
        id : "2",
        videoId : "ASzOzrB-a9E",
        posterImage : IMAGES.poster2,
        profileImage : IMAGES.youtubeProfile2,
        title : "Battelfield 2042 Official Reveal Trailer",
        category : "Playground",
        lastUpdate : "11 day ago",
        views : "2.5k",
        duration : "3:38",
    },
    {
        id : "3",
        videoId : "a9tq0aS5Zu8",
        posterImage : IMAGES.poster5,
        profileImage : IMAGES.youtubeProfile1,
        title : "Demon Slayer : Kimetsu no Yaiba Swordsmith Village Arc Trailer",
        category : "Playground",
        lastUpdate : "11 day ago",
        views : "2.5k",
        duration : "3:38",
    },
    {
        id : "4",
        videoId : "WiONylGn8Xw",
        posterImage : IMAGES.poster4,
        profileImage : IMAGES.youtubeProfile4,
        title : "Dragon Ball Z : The Movie | Teaser(2022)",
        category : "Playground",
        lastUpdate : "11 day ago",
        views : "2.5k",
        duration : "3:38",
    },
    {
        id : "5",
        videoId : "dhYOPzcsbGM",
        posterImage : IMAGES.poster3,
        profileImage : IMAGES.youtubeProfile3,
        title : "Alan Walker, Sabrina - On My Way",
        category : "Playground",
        lastUpdate : "11 day ago",
        views : "2.5k",
        duration : "3:38",
    },
    {
        id : "6",
        videoId : "o3V-GvvzjE4",
        posterImage : IMAGES.poster6,
        profileImage : IMAGES.youtubeProfile2,
        title : "FIFA 23 Reveal Trailer | The World's Game",
        category : "Playground",
        lastUpdate : "11 day ago",
        views : "2.5k",
        duration : "3:38",
    },
]

const notificationOptionData = [
    {
        title : "All",
    },
    {
        title : "Personalized",
    },
    {
        title : "None",
    },
]

const commentData = [
    {
        userImg : IMAGES.youtubeProfile2,
        userName : "Lucas Mokmana",
        update : "2 day ago",
        comment : "Amazing product and clean code.",
        replies : [
            {
                userImg : IMAGES.youtubeProfile3,
                userName : "Emilia Green",
                update : "2 day ago",
                comment : "Yes Right, I am install the app and find this is useful for all.",
            },
        ]
    },
    {
        userImg : IMAGES.youtubeProfile4,
        userName : "Richard Sigh",
        update : "2 day ago",
        comment : "Great app all are available in one.",
    },
    {
        userImg : IMAGES.youtubeProfile1,
        userName : "Hendri Lee",
        update : "2 day ago",
        comment : "Clean and Optimized code helpful for developer.",
    },
]

const VideoScreen = ({route,navigation}) => {

    const { videoId, title, views, lastUpdate, profileImage } = route.params;

    const theme = useTheme();
    const {colors} = theme;
    const postOption = useRef();
    const commentSheet = useRef();
    const notificationSheet = useRef();

    const [playing, setPlaying] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [isFollow, setIsFollow] = useState(false);
    const [notification, setNotification] = useState(notificationOptionData[1].title);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
          setPlaying(false);
          Alert.alert("video has finished playing!");
        }
    }, []);

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
            <RBSheet
                ref={commentSheet}
                closeOnDragDown={true}
                height={480}
                customStyles={{
                    container:{
                        borderTopLeftRadius:20,
                        borderTopRightRadius:20,
                        backgroundColor:colors.cardBg,
                    }
                }}
            >
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        paddingHorizontal:15,
                        borderBottomWidth:1,
                        borderBottomColor:colors.borderColor,
                        paddingBottom:5,
                    }}
                >
                    <Text style={{...FONTS.h6,color:colors.title,flex:1}}>Comments</Text>
                    <IconButton
                        onPress={() => commentSheet.current.close()}
                        icon={() => <FeatherIcon color={colors.title} size={22} name='x'/>}
                    />
                </View>
                <ScrollView>
                    <TouchableOpacity
                        activeOpacity={1}
                    >
                        <View
                            style={{
                                flexDirection:'row',
                                paddingHorizontal:15,
                                paddingVertical:10,
                                borderBottomWidth:1,
                                borderBottomColor:colors.borderColor,
                                alignItems:'center',
                            }}
                        >
                            <Image
                                source={IMAGES.youtubeProfile1}
                                style={{
                                    height:45,
                                    width:45,
                                    borderRadius:35,
                                }}
                            />
                            <TextInput
                                style={{
                                    ...FONTS.font,
                                    color:colors.title,
                                    paddingHorizontal:15,
                                    flex:1,
                                    height:48,
                                }}
                                placeholder='Add a comment...'
                                placeholderTextColor={colors.textLight}
                            />
                            <TouchableOpacity  style={{padding:5,top:1}}>
                                <Text style={{...FONTS.h6,color:COLORS.primary7}}>Post</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View>
                            {commentData.map((data,index) => {
                                return(
                                    <View
                                        key={index}
                                    >
                                        <View
                                            style={{
                                                flexDirection:'row',
                                                paddingHorizontal:15,
                                                paddingVertical:12,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    height:30,
                                                    width:30,
                                                    borderRadius:30,
                                                    marginRight:10,
                                                    marginTop:4,
                                                }}
                                                source={data.userImg}
                                            />
                                            <View style={{flex:1}}>
                                                <View
                                                    style={{
                                                        flexDirection:'row',
                                                        alignItems:'center',
                                                    }}
                                                >
                                                    <Text style={{...FONTS.fontSm,color:colors.text}}>{data.userName}</Text>
                                                    <View
                                                        style={{
                                                            height:3,
                                                            width:3,
                                                            borderRadius:3,
                                                            backgroundColor:colors.textLight,
                                                            opacity:.5,
                                                            marginHorizontal:6,
                                                            top:1,
                                                        }}
                                                    />
                                                    <Text style={{...FONTS.fontXs,color:colors.textLight,top:2}}>{data.update}</Text>
                                                </View>
                                                <Text style={{...FONTS.font,color:colors.title}}>{data.comment}</Text>
                                                <View
                                                    style={{
                                                        flexDirection:'row',
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        style={{
                                                            flexDirection:'row',
                                                            alignItems:'center',
                                                            paddingVertical:3,
                                                            paddingHorizontal:3,
                                                            marginRight:8,
                                                        }}
                                                    >
                                                        <AntDesign style={{marginRight:4}} color={colors.textLight} size={14} name='like2'/>
                                                        <Text style={{...FONTS.font,color:colors.text}}>2</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={{
                                                            flexDirection:'row',
                                                            alignItems:'center',
                                                            paddingVertical:3,
                                                            paddingHorizontal:3,
                                                        }}
                                                    >
                                                        <AntDesign style={{marginRight:4}} color={colors.textLight} size={14} name='dislike2'/>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{paddingLeft:38,marginBottom:5}}>
                                            {data.replies && data.replies.map((data,index) => {
                                                return(
                                                    <View
                                                        key={index}
                                                        style={{
                                                            flexDirection:'row',
                                                            paddingHorizontal:15,
                                                            paddingVertical:8,
                                                        }}
                                                    >
                                                        <Image
                                                            style={{
                                                                height:30,
                                                                width:30,
                                                                borderRadius:30,
                                                                marginRight:10,
                                                                marginTop:4,
                                                            }}
                                                            source={data.userImg}
                                                        />
                                                        <View  style={{flex:1}}>
                                                            <View
                                                                style={{
                                                                    flexDirection:'row',
                                                                    alignItems:'center',
                                                                }}
                                                            >
                                                                <Text style={{...FONTS.fontSm,color:colors.text}}>{data.userName}</Text>
                                                                <View
                                                                    style={{
                                                                        height:3,
                                                                        width:3,
                                                                        borderRadius:3,
                                                                        backgroundColor:colors.textLight,
                                                                        opacity:.5,
                                                                        marginHorizontal:6,
                                                                        top:1,
                                                                    }}
                                                                />
                                                                <Text style={{...FONTS.fontXs,color:colors.textLight,top:2}}>{data.update}</Text>
                                                            </View>
                                                            <Text style={{...FONTS.font,color:colors.title}}>{data.comment}</Text>
                                                            <View
                                                                style={{
                                                                    flexDirection:'row',
                                                                }}
                                                            >
                                                                <TouchableOpacity
                                                                    style={{
                                                                        flexDirection:'row',
                                                                        alignItems:'center',
                                                                        paddingVertical:3,
                                                                        paddingHorizontal:3,
                                                                        marginRight:8,
                                                                    }}
                                                                >
                                                                    <AntDesign style={{marginRight:4}} color={colors.textLight} size={14} name='like2'/>
                                                                    <Text style={{...FONTS.font,color:colors.text}}>2</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                    style={{
                                                                        flexDirection:'row',
                                                                        alignItems:'center',
                                                                        paddingVertical:3,
                                                                        paddingHorizontal:3,
                                                                    }}
                                                                >
                                                                    <AntDesign style={{marginRight:4}} color={colors.textLight} size={14} name='dislike2'/>
                                                                </TouchableOpacity>
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

                    </TouchableOpacity>
                </ScrollView>
            </RBSheet>
            <RBSheet
                ref={notificationSheet}
                closeOnDragDown={true}
                height={200}
                customStyles={{
                    container:{
                        backgroundColor:colors.cardBg,
                    }
                }}
            >
                {notificationOptionData.map((data,index) => {
                    return(
                        <List.Item
                            onPress={() => {setNotification(data.title);notificationSheet.current.close()}}
                            titleStyle={{color : colors.title}}
                            key={index}
                            title={data.title}
                            left={() => 
                                <View
                                    style={[{
                                        height:16,
                                        width:16,
                                        borderRadius:14,
                                        borderWidth:1.5,
                                        top:3,
                                        marginLeft:10,
                                        marginRight:5,
                                        borderColor:colors.textLight,
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }, data.title == notification && {
                                        borderColor:COLORS.primary7,
                                    }]}
                                >   
                                    {notification == data.title &&
                                        <View
                                            style={{
                                                height:9,
                                                width:9,
                                                borderRadius:8,
                                                backgroundColor:COLORS.primary7,
                                            }}
                                        />
                                    }
                                </View>
                            }
                        />
                    )
                })}
            </RBSheet>
            <RBSheet
                ref={postOption}
                closeOnDragDown={true}
                height={250}
                customStyles={{
                    container:{
                        backgroundColor:colors.cardBg,
                    }
                }}
            >
                <PostOptionSheet
                    postOption={postOption}
                />
            </RBSheet>
            <SafeAreaView
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    flex:1,
                    backgroundColor:colors.cardBg,
                }]}
            >
                <View
                    style={{
                        height:50,
                        flexDirection:'row',
                        alignItems:'center',
                        paddingHorizontal:5,
                        backgroundColor: COLORS.primary7,
                    }}
                >
                    <IconButton
                        onPress={() => navigation.goBack()}
                        icon={() => <FeatherIcon size={20} color={COLORS.white} name='arrow-left'/>}
                    />
                    <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.white,top:-1,flex:1,marginRight:10}} numberOfLines={1}>{title}</Text>
                </View>
                <View>
                    {/* <YoutubePlayer
                        height={SIZES.width / 1.75}
                        play={playing}
                        videoId={videoId}
                        onChangeState={onStateChange}
                    /> */}
                </View>
                <View style={{flex:1}}>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View style={{padding:15, borderBottomWidth:1,borderBottomColor:colors.borderColor}}>
                        <Text style={{...FONTS.font,...FONTS.fontBold,fontSize:15,color:colors.title,marginBottom:3}}>{title}</Text>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                        >
                            <FeatherIcon style={{marginRight:4,top:1}} name='eye' color={colors.text}/>
                            <Text style={{...FONTS.fontSm,color:colors.text}}>{views}</Text>
                            <View
                                style={{
                                    height:3,
                                    width:3,
                                    borderRadius:3,
                                    marginHorizontal:8,
                                    opacity:.6,
                                    backgroundColor:colors.textLight,
                                }}
                            />
                            <Text style={{...FONTS.fontSm,color:colors.text}}>{lastUpdate}</Text>
                        </View>
                        
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                marginBottom:18,
                                marginTop:12,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setIsLike(!isLike)}
                                style={{
                                    ...styles.actionBtn,
                                    borderColor:colors.borderColor,
                                }}
                            >
                                <AntDesign color={isLike ? colors.title : colors.textLight} style={{marginRight:5,top:-1}} size={16} name={isLike ? 'like1' : 'like2'}/>
                                <Text style={{...FONTS.font,color:colors.title,top:-1}}>{isLike ? 153 : 152}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => commentSheet.current.open()}
                                style={{
                                    ...styles.actionBtn,
                                    borderColor:colors.borderColor,
                                }}
                            >
                                <FeatherIcon color={colors.textLight} style={{marginRight:5,top:-1}} size={16} name='message-circle'/>
                                <Text style={{...FONTS.font,color:colors.title,top:-1}}>Comments <Text style={{color:colors.textLight}}>(50)</Text></Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => onShare()}
                                style={{
                                    ...styles.actionBtn,
                                    borderColor:colors.borderColor,
                                }}
                            >
                                <FeatherIcon color={colors.textLight} style={{marginRight:5,top:-1}} size={16} name='share-2'/>
                                <Text style={{...FONTS.font,color:colors.title,top:-1}}>Share</Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                flexDirection:'row',
                                marginHorizontal:-8,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    backgroundColor:theme.dark ? 'rgba(255,255,255,.1)' : '#eee',
                                    borderRadius:40,
                                    paddingHorizontal:8,
                                    paddingVertical:8,
                                    flex:1,
                                }}
                            >
                                <Image
                                    style={{
                                        height:38,
                                        width:38,
                                        borderRadius:38,
                                        marginRight:8,
                                    }}
                                    source={profileImage}
                                />
                                <View style={{flex:1}}>
                                    <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title}}>Shroud</Text>
                                    <Text style={{...FONTS.fontSm,color:colors.text}}>10m Followers</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => setIsFollow(!isFollow)}
                                    style={[{
                                        backgroundColor:COLORS.primary7,
                                        paddingHorizontal:16,
                                        paddingVertical:8,
                                        borderRadius:20,
                                    }, isFollow  && {
                                        backgroundColor:'transparent',
                                        borderWidth:1,
                                        borderColor:COLORS.primary7,
                                    }]}
                                >
                                    <Text style={[{...FONTS.font,color:COLORS.white,top:-1},
                                        isFollow && {color: COLORS.primary7}]}>{isFollow ? "Following" : "Follow"}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => notificationSheet.current.open()}
                                style={{
                                    height:50,
                                    width:50,
                                    borderRadius:50,
                                    marginLeft:12,
                                    backgroundColor:theme.dark ? 'rgba(255,255,255,.1)' : '#eee',
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}
                            >
                                <FeatherIcon size={20} color={colors.title} name='bell'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {VideoData.map((data,index) => {
                        return(
                            <VideoCard
                                key={index}
                                posterImage={data.posterImage}
                                profileImage={data.profileImage}
                                title={data.title}
                                views={data.views}
                                duration={data.duration}
                                category={data.category}
                                lastUpdate={data.lastUpdate}
                                videoId={data.videoId}
                                postOption={postOption}
                            />
                        )
                    })}
                </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    actionBtn : {
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        borderRadius:30,
        paddingHorizontal:15,
        paddingVertical:5,
        marginRight:5,
    }
})

export default VideoScreen;