import React, {useRef} from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FONTS, IMAGES } from '../../constants/theme';
import PostOptionSheet from '../components/PostOptionSheet';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const notificationData = [
    {
        userImg : IMAGES.youtubeProfile1,
        posterImg : IMAGES.poster1,
        notification : "your comment got like from dhakdhakindia.",
        update : "5 hour ago",
    },
    {
        userImg : IMAGES.youtubeProfile2,
        posterImg : IMAGES.poster2,
        notification : "your comment got like from dhakdhakindia.",
        update : "3 day ago",
    },
    {
        userImg : IMAGES.youtubeProfile3,
        posterImg : IMAGES.poster3,
        notification : "your comment got like from dhakdhakindia.",
        update : "3 day ago",
    },
    {
        userImg : IMAGES.youtubeProfile4,
        posterImg : IMAGES.poster4,
        notification : "your comment got like from dhakdhakindia.",
        update : "3 day ago",
    },
    {
        userImg : IMAGES.youtubeProfile4,
        posterImg : IMAGES.poster5,
        notification : "your comment got like from dhakdhakindia.",
        update : "3 day ago",
    },
    {
        userImg : IMAGES.youtubeProfile2,
        posterImg : IMAGES.poster6,
        notification : "your comment got like from dhakdhakindia.",
        update : "3 day ago",
    },
    {
        userImg : IMAGES.youtubeProfile1,
        posterImg : IMAGES.poster1,
        notification : "your comment got like from dhakdhakindia.",
        update : "5 hour ago",
    },
    {
        userImg : IMAGES.youtubeProfile2,
        posterImg : IMAGES.poster2,
        notification : "your comment got like from dhakdhakindia.",
        update : "3 day ago",
    },
    {
        userImg : IMAGES.youtubeProfile3,
        posterImg : IMAGES.poster3,
        notification : "your comment got like from dhakdhakindia.",
        update : "3 day ago",
    },
    {
        userImg : IMAGES.youtubeProfile4,
        posterImg : IMAGES.poster4,
        notification : "your comment got like from dhakdhakindia.",
        update : "3 day ago",
    },
    {
        userImg : IMAGES.youtubeProfile4,
        posterImg : IMAGES.poster5,
        notification : "your comment got like from dhakdhakindia.",
        update : "3 day ago",
    },
    {
        userImg : IMAGES.youtubeProfile2,
        posterImg : IMAGES.poster6,
        notification : "your comment got like from dhakdhakindia.",
        update : "3 day ago",
    },
]

const Notifications = ({navigation}) => {
    
    const {colors} = useTheme();
    const postOption = useRef();

    return (
        <>

            <RBSheet
                ref={postOption}
                closeOnDragDown={true}
                height={250}
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
                        flexDirection:'row',
                        alignItems:'center',
                        borderBottomWidth:1,
                        borderBottomColor:colors.borderColor,
                    }}
                >
                    <IconButton
                        onPress={() => navigation.goBack()}
                        icon={() => <FeatherIcon size={22} color={colors.title} name='arrow-left'/>}
                    />
                    <Text style={{...FONTS.h6,color:colors.title}}>Notifications</Text>
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom:20,
                    }}
                >
                    {notificationData.map((data,index) => {
                        return(
                            <TouchableOpacity
                                onPress={() => navigation.navigate('VideoScreen',{
                                    videoId : "ASzOzrB-a9E",
                                    title : "Battelfield 2042 Official Reveal Trailer",
                                    views : "2.5k",
                                    lastUpdate : "5 day ago",
                                    profileImage : IMAGES.youtubeProfile2,
                                })}
                                key={index}
                                style={{
                                    flexDirection:'row',
                                    paddingHorizontal:15,
                                    paddingVertical:12,
                                    alignItems:'center',
                                }}
                            >
                                <View
                                    style={{
                                        marginRight:20,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:70,
                                            width:100,
                                            borderRadius:4,
                                        }}
                                        source={data.posterImg}
                                    />
                                    <View
                                        style={{
                                            position:'absolute',
                                            bottom:-8,
                                            right:-8,
                                            padding:2,
                                            borderRadius:30,
                                            backgroundColor:colors.cardBg,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:28,
                                                width:28,
                                                borderRadius:30,
                                            }}
                                            source={data.userImg}
                                        />
                                    </View>
                                </View>
                                <View style={{flex:1,marginRight:12}}>
                                    <Text style={{...FONTS.font,fontSize:15,color:colors.title,marginBottom:2}}>{data.notification}</Text>
                                    <Text style={{...FONTS.fontSm,color:colors.textLight}}>{data.update}</Text>
                                </View>
                                <IconButton
                                    onPress={() => {postOption.current.open()}}
                                    style={{
                                        marginRight:-5,
                                    }}
                                    icon={() => <FeatherIcon color={colors.title} size={20} name='more-vertical'/>}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Notifications;