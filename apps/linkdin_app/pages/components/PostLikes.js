import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLORS, FONTS, IMAGES, SIZES } from '../../constants/theme';


const allReactionsData = [
    {
        userImg : IMAGES.user1,
        userName : "Olivia Johanson",
        desc : "Senior Web Designer at W3itexperts.",
        type : "heart",
    },
    {
        userImg : IMAGES.user2,
        userName : "Lucas Mokmana",
        desc : "React Native Developer",
        type : "like",
    },
    {
        userImg : IMAGES.user3,
        userName : "Emilia Green",
        desc : "Web Developer at infosis.",
        type : "like",
    },
    {
        userImg : IMAGES.user4,
        userName : "Richard Sigh",
        desc : "Human resource Executive.",
        type : "like",
    },
    {
        userImg : IMAGES.user5,
        userName : "Hendri Lee",
        desc : "Career Coach",
        type : "heart",
    },
    {
        userImg : IMAGES.user6,
        userName : "Brian Harahap",
        desc : "Senior Web Designer",
        type : "like",
    },
    {
        userImg : IMAGES.user7,
        userName : "Christian Hang",
        desc : "Senior Web Designer",
        type : "like",
    },
    {
        userImg : IMAGES.user8,
        userName : "David Bekam",
        desc : "Career Coach",
        type : "heart",
    },
    {
        userImg : IMAGES.user1,
        userName : "Olivia Johanson",
        desc : "Senior Web Designer at W3itexperts.",
        type : "heart",
    },
    {
        userImg : IMAGES.user2,
        userName : "Lucas Mokmana",
        desc : "React Native Developer",
        type : "like",
    },
    {
        userImg : IMAGES.user3,
        userName : "Emilia Green",
        desc : "Web Developer at infosis.",
        type : "like",
    },
    {
        userImg : IMAGES.user4,
        userName : "Richard Sigh",
        desc : "Human resource Executive.",
        type : "like",
    },
    {
        userImg : IMAGES.user5,
        userName : "Hendri Lee",
        desc : "Career Coach",
        type : "heart",
    },
    {
        userImg : IMAGES.user6,
        userName : "Brian Harahap",
        desc : "Senior Web Designer",
        type : "like",
    },
    {
        userImg : IMAGES.user7,
        userName : "Christian Hang",
        desc : "Senior Web Designer",
        type : "like",
    },
    {
        userImg : IMAGES.user8,
        userName : "David Bekam",
        desc : "Career Coach",
        type : "heart",
    },
]




const PostLikes = ({likesModal}) => {
    
    const {colors} = useTheme();
    
    const allReaction = () => (
        <ScrollView>
            {allReactionsData.map((data,index) => {
                return(
                    <View 
                        key={index}
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            paddingHorizontal:15,
                            paddingVertical:12,
                            borderBottomWidth:1,
                            borderBottomColor:colors.borderColor,
                        }}
                    >
                        <View
                            style={{
                                marginRight:10,
                            }}
                        >
                            <Image
                                style={{
                                    height:50,
                                    width:50,
                                    borderRadius:50,
                                }}
                                source={data.userImg}
                            /> 
                            {data.type == 'like' ?
                                <View
                                    style={{
                                        position:'absolute',
                                        bottom:0,
                                        right:0,
                                        padding:1,
                                        borderRadius:15,
                                        backgroundColor:colors.cardBg,
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
                                :
                            data.type == 'heart' &&
                                <View
                                    style={{
                                        position:'absolute',
                                        bottom:0,
                                        right:0,
                                        padding:1,
                                        borderRadius:15,
                                        backgroundColor:colors.cardBg,
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
                            }   
                        </View>
                        <View>
                            <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title,marginBottom:4}}>{data.userName}</Text>
                            <Text style={{...FONTS.fontSm,color:colors.textLight}}>{data.desc}</Text>
                        </View>
                    </View>
                )
            })}
        </ScrollView>
    );
    
    const likeReactions = () => (
        <ScrollView>
            {allReactionsData.map((data,index) => {
                if(data.type == "like")
                    return(
                        <View 
                            key={index}
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                paddingHorizontal:15,
                                paddingVertical:12,
                                borderBottomWidth:1,
                                borderBottomColor:colors.borderColor,
                            }}
                        >
                            <View
                                style={{
                                    marginRight:10,
                                }}
                            >
                                <Image
                                    style={{
                                        height:50,
                                        width:50,
                                        borderRadius:50,
                                    }}
                                    source={data.userImg}
                                /> 
                                {data.type == 'like' ?
                                    <View
                                        style={{
                                            position:'absolute',
                                            bottom:0,
                                            right:0,
                                            padding:1,
                                            borderRadius:15,
                                            backgroundColor:colors.cardBg,
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
                                    :
                                data.type == 'heart' &&
                                    <View
                                        style={{
                                            position:'absolute',
                                            bottom:0,
                                            right:0,
                                            padding:1,
                                            borderRadius:15,
                                            backgroundColor:colors.cardBg,
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
                                }   
                            </View>
                            <View>
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title,marginBottom:4}}>{data.userName}</Text>
                                <Text style={{...FONTS.fontSm,color:colors.textLight}}>{data.desc}</Text>
                            </View>
                        </View>
                    )
            })}
        </ScrollView>
    );
    
    const heartReactions = () => (
        <ScrollView>
            {allReactionsData.map((data,index) => {
                if(data.type == "heart")
                    return(
                        <View 
                            key={index}
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                paddingHorizontal:15,
                                paddingVertical:12,
                                borderBottomWidth:1,
                                borderBottomColor:colors.borderColor,
                            }}
                        >
                            <View
                                style={{
                                    marginRight:10,
                                }}
                            >
                                <Image
                                    style={{
                                        height:50,
                                        width:50,
                                        borderRadius:50,
                                    }}
                                    source={data.userImg}
                                /> 
                                {data.type == 'like' ?
                                    <View
                                        style={{
                                            position:'absolute',
                                            bottom:0,
                                            right:0,
                                            padding:1,
                                            borderRadius:15,
                                            backgroundColor:colors.cardBg,
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
                                    :
                                data.type == 'heart' &&
                                    <View
                                        style={{
                                            position:'absolute',
                                            bottom:0,
                                            right:0,
                                            padding:1,
                                            borderRadius:15,
                                            backgroundColor:colors.cardBg,
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
                                }   
                            </View>
                            <View>
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title,marginBottom:4}}>{data.userName}</Text>
                                <Text style={{...FONTS.fontSm,color:colors.textLight}}>{data.desc}</Text>
                            </View>
                        </View>
                    )
            })}
        </ScrollView>
    );
    
    const renderScene = SceneMap({
        all: allReaction,
        like: likeReactions,
        heart: heartReactions,
    });

    
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'all', title: 'All 115' },
        { key: 'like', title : 'like' },
        { key: 'heart', title : 'heart' },
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: COLORS.primary6 }}
            renderLabel={(label) => {
                if(label.route.key == "all"){
                    return <Text style={{...FONTS.font,...FONTS.fontBold,color: label.focused ? colors.title : colors.text}}>All 115</Text>
                }else if(label.route.key == "like"){
                    return <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image
                            style={{
                                height:20,
                                width:20,
                                marginRight:6,
                            }}
                            source={IMAGES.likes}
                        />
                        <Text style={{...FONTS.font,...FONTS.fontBold,color: label.focused ? colors.title : colors.text}}>95</Text>
                    </View>
                }
                else if(label.route.key == "heart"){
                        return <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image
                                style={{
                                    height:20,
                                    width:20,
                                    marginRight:6,
                                }}
                                source={IMAGES.love}
                            />
                            <Text style={{...FONTS.font,...FONTS.fontBold,color: label.focused ? colors.title : colors.text}}>20</Text>
                        </View>
                }
            }}
            style={{ backgroundColor: colors.cardBg }}
        />
    )

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.cardBg,
            }}
        >
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingHorizontal:5,
                    paddingVertical:2,
                }}
            >
                <IconButton
                    style={{marginRight:10}}
                    onPress={() => likesModal(false)}
                    icon={() => <FeatherIcon size={20} color={colors.title} name='arrow-left'/>}
                />
                <Text style={{...FONTS.h6,color:colors.title,top:1}}>Reactions</Text>
            </View>
            
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={{ width: SIZES.width }}
            />

        </SafeAreaView>
    );
};

export default PostLikes;