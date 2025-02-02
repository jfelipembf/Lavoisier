import React, { useRef } from 'react';
import { Image, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { IconButton } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
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
        id : "shorts",
        data : [
            {
                id : '1',
                posterImage : IMAGES.poster7,
                profileImage : IMAGES.youtubeProfile3,
                title : "Demon Slayer",
                tags : "#gaming #anime",
                views : "2.5k",
            },
            {
                id : '2',
                posterImage : IMAGES.poster8,
                profileImage : IMAGES.youtubeProfile3,
                title : "Kakashi Hatake",
                tags : "#gaming #anime",
                views : "2.5k",
            },
            {
                id : '3',
                posterImage : IMAGES.poster9,
                profileImage : IMAGES.youtubeProfile3,
                title : "The Witcher",
                tags : "#gaming #anime",
                views : "2.5k",
            },
            {
                id : '4',
                posterImage : IMAGES.poster7,
                profileImage : IMAGES.youtubeProfile3,
                title : "Demon Slayer",
                tags : "#gaming #anime",
                views : "2.5k",
            },
            {
                id : '5',
                posterImage : IMAGES.poster8,
                profileImage : IMAGES.youtubeProfile3,
                title : "Kakashi Hatake",
                tags : "#gaming #anime",
                views : "2.5k",
            },
            {
                id : '6',
                posterImage : IMAGES.poster9,
                profileImage : IMAGES.youtubeProfile3,
                title : "The Witcher",
                tags : "#gaming #anime",
                views : "2.5k",
            },
        ]
    },
    {
        id : "3",
        videoId : "a9tq0aS5Zu8",
        posterImage : IMAGES.poster5,
        profileImage : IMAGES.youtubeProfile2,
        title : "Demon Slayer : Kimetsu no Yaiba Swordsmith Village Arc Trailer",
        category : "Playground",
        lastUpdate : "11 day ago",
        views : "2.5k",
        duration : "3:38",
    },
    {
        id : "2",
        videoId : "ASzOzrB-a9E",
        posterImage : IMAGES.poster2,
        profileImage : IMAGES.youtubeProfile1,
        title : "Battelfield 2042 Official Reveal Trailer",
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

const Home = ({navigation}) => {

    const theme = useTheme();
    const { colors } = theme;
    const postOption = useRef();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
   
   

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
                        borderBottomWidth:1,
                        borderBottomColor:colors.borderColor,
                        height:48,
                        flexDirection:'row',
                        alignItems:'center',
                        paddingHorizontal:5,
                    }}
                >
                    <IconButton
                        onPress={() => navigation.openDrawer()}
                        icon={() => <FeatherIcon name='menu' color={colors.title} size={20}/>}
                    />
                    <View
                        style={{
                            flex:1,
                        }}
                    >
                        <Image
                            style={{
                                height:25,
                                width:70,
                                resizeMode:'contain',
                            }}
                            source={theme.dark ? IMAGES.w3tubeWhite : IMAGES.w3tube}
                        />
                    </View>
                    {/* <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title,top:-1,flex:1}}>Home</Text> */}
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
                        paddingBottom:80,
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {VideoData.map((data,index) => {
                        if(data.id == "shorts"){
                            return(
                                <View
                                    key={index}
                                    style={{
                                        borderBottomWidth:1,
                                        paddingBottom:12,
                                        borderBottomColor:colors.borderColor,
                                    }}
                                >
                                    <ScrollView
                                        contentContainerStyle={{
                                            paddingHorizontal:8,
                                            paddingTop:10,
                                        }}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        {data.data.map((data,index) => {
                                            return(
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('Shorts')}
                                                    activeOpacity={.9}
                                                    key={index}
                                                    style={{
                                                        width:140,
                                                        marginHorizontal:5,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            width:'100%',
                                                            height:undefined,
                                                            aspectRatio : 65 / 100,
                                                            borderRadius:8,
                                                        }}
                                                        source={data.posterImage}
                                                    />
                                                    <LinearGradient
                                                        colors={["rgba(0,0,0,.4)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,.7)"]}
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
                                                        <FeatherIcon name='eye' style={{marginRight:5}} color={COLORS.white}/>
                                                        <Text style={{...FONTS.fontXs,color:COLORS.white,top:1}}>{data.views}</Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            position:'absolute',
                                                            bottom:0,
                                                            left:0,
                                                            width:'100%',
                                                            paddingHorizontal:10,
                                                            paddingVertical:10,
                                                        }}
                                                    >
                                                        <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:COLORS.white}} numberOfLines={1}>{data.title}</Text>
                                                        <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.8}}>{data.tags}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </ScrollView>
                                </View>
                            )
                        }{
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
                        }
                    })}
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Home;