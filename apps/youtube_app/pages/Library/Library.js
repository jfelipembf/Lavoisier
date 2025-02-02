import React, { useRef } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import PostOptionSheet from '../components/PostOptionSheet';
import { GlobalStyleSheet } from '../../constants/StyleSheet';


const VideoData = [
    {
        id : "1",
        videoId : "K0u_kAWLJOA",
        posterImage : IMAGES.poster1,
        profileImage : IMAGES.youtubeProfile1,
        title : "God of War - Full Gameplay #01",
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
        lastUpdate : "11 day ago",
        views : "2.5k",
        duration : "3:38",
    },
]

const Library = ({navigation}) => {

    const { colors } = useTheme();
    const postOption = useRef();

    return (
        <>
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
            <SafeAreaView style={[GlobalStyleSheet.container,{
                padding:0,
                flex:1,
                backgroundColor:colors.cardBg,
            }]}>
                <View
                    style={{
                        height:48,
                        borderBottomWidth:1,
                        borderBottomColor:colors.borderColor,
                        flexDirection:'row',
                        alignItems:'center',
                        paddingHorizontal:15,
                    }}
                >
                    <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title,top:-1,flex:1}}>History</Text>
                    <IconButton
                        onPress={() => {navigation.navigate('Notifications')}}
                        icon={() => <FeatherIcon name='bell' color={colors.title} size={20}/>}
                    />
                    <IconButton
                        onPress={() => {navigation.navigate('Search')}}
                        icon={() => <FeatherIcon name='search' color={colors.title} size={20}/>}
                    />
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom:90,
                    }}
                >
                    {VideoData.map((data,index) => {
                        return(
                            <TouchableOpacity
                                onPress={() => navigation.navigate('VideoScreen',{
                                    videoId : data.videoId,
                                    title : data.title,
                                    views : data.views,
                                    lastUpdate : data.lastUpdate,
                                    profileImage : data.profileImage,
                                })}
                                activeOpacity={.9}
                                key={index}
                                style={{
                                    paddingHorizontal:12,
                                    paddingVertical:12,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                    flexDirection:'row',
                                    alignItems:'center',
                                }}
                            >
                                <View
                                    style={{
                                        marginRight:12,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:95,
                                            width:150,
                                            borderRadius:8,
                                        }}
                                        source={data.posterImage}
                                    />
                                    <LinearGradient
                                        colors={["rgba(0,0,0,.8)","rgba(0,0,0,0.2)","rgba(0,0,0,0)"]}
                                        style={{
                                            position:'absolute',
                                            height:'100%',
                                            width:'100%',
                                            top:0,
                                            left:0,
                                            borderRadius:8,
                                        }}
                                    >
                                    </LinearGradient>
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
                                            position:'absolute',
                                            top:8,
                                            right:5,
                                        }}
                                    >
                                        <FeatherIcon name='clock' style={{marginRight:5,marginLeft:-1}} color={COLORS.white}/>
                                        <Text style={{...FONTS.fontXs,color:COLORS.white,top:1}}>{data.duration}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title,marginBottom:3}}>{data.title}</Text>
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                        }}
                                    >
                                        <Text style={{...FONTS.fontSm,color:colors.text}}>{data.views} Views</Text>
                                        <View
                                            style={{
                                                height:3,
                                                width:3,
                                                borderRadius:3,
                                                backgroundColor:colors.textLight,
                                                opacity:.7,
                                                marginHorizontal:6,
                                                top:1,
                                            }}
                                        />
                                        <Text style={{...FONTS.fontSm,color:colors.text}}>{data.lastUpdate}</Text>
                                    </View>
                                </View>
                                <IconButton
                                    style={{marginRight:-5}}
                                    onPress={() => {postOption.current.open()}}
                                    icon={() => <FeatherIcon size={18} color={colors.title} name='more-vertical'/>}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Library;