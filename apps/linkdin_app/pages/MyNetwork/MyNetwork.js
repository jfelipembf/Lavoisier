import React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import Header from '../components/Header';
import PopularNetworkCard from '../components/PopularNetworkCard';
import UserCard from '../components/UserCard';

const popularNetwork = [
    {
        name : "Albert Roasen",
        follower : "165,185",
        subTitle : "Hr Proffessional",
        userImg : IMAGES.user1,
        bgImage : IMAGES.bg1,
    },
    {
        name : "David Bekam",
        follower : "165,185",
        subTitle : "Hr Proffessional",
        userImg : IMAGES.user2,
        bgImage : IMAGES.bg2,
    },
    {
        name : "Dons John",
        follower : "165,185",
        subTitle : "Hr Proffessional",
        userImg : IMAGES.user3,
        bgImage : IMAGES.bg3,
    },
    {
        name : "Eric Leew",
        follower : "165,185",
        subTitle : "Hr Proffessional",
        userImg : IMAGES.user4,
        bgImage : IMAGES.bg4,
    },
]

const connectionData = [
    {
        name : "Richard Sigh",
        subTitle : "Hr Proffessional",
        userImg : IMAGES.user2,
        bgImage : IMAGES.bg2,
    },
    {
        name : "Marquezz Silalahi",
        subTitle : "Web designer",
        userImg : IMAGES.user3,
        bgImage : IMAGES.bg3,
    },
    {
        name : "Andy Lee",
        subTitle : "Developer",
        userImg : IMAGES.user4,
        bgImage : IMAGES.bg4,
    },
    {
        name : "Lucas Mokmana",
        subTitle : "Android Developer",
        userImg : IMAGES.user5,
        bgImage : IMAGES.bg5,
    },
    {
        name : "Albert Roasen",
        subTitle : "Hr Proffessional",
        userImg : IMAGES.user2,
        bgImage : IMAGES.bg2,
    },
    {
        name : "Hendri Lee",
        subTitle : "Web designer",
        userImg : IMAGES.user3,
        bgImage : IMAGES.bg3,
    },
    {
        name : "Jasmine Silalahi",
        subTitle : "Developer",
        userImg : IMAGES.user4,
        bgImage : IMAGES.bg4,
    },
    {
        name : "Thomas Edison",
        subTitle : "Android Developer",
        userImg : IMAGES.user5,
        bgImage : IMAGES.bg5,
    },
]

const MyNetwork = ({navigation}) => {
    
    const {colors} = useTheme();

    return (
        <SafeAreaView
            style={[GlobalStyleSheet.container,{
                padding:0,
                flex:1,
                backgroundColor:colors.background2,
            }]}
        >
            <Header 
                leftIcon={'back'}
                title={'My Network'}
                rightIcon={'chat'}
            />
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={GlobalStyleSheet.container}>
                    <View style={[GlobalStyleSheet.row,{marginBottom:15}]}>
                        <View style={GlobalStyleSheet.col50}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Connections',{title : "Connections"})}
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    backgroundColor:colors.cardBg,
                                    borderWidth:1,
                                    borderColor:colors.borderColor,
                                    borderRadius:6,
                                    paddingVertical:12,
                                    paddingHorizontal:15,
                                    justifyContent:'center',
                                }}
                            >
                                <Image
                                    style={{
                                        height:20,
                                        width:20,
                                        marginRight:8,
                                        tintColor:colors.textLight,
                                    }}
                                    source={IMAGES.network}
                                />
                                <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:colors.title}}>Connections</Text>
                                <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:COLORS.primary6}}> (51)</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={GlobalStyleSheet.col50}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Connections',{title : "Pages"})}
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    backgroundColor:colors.cardBg,
                                    borderWidth:1,
                                    borderColor:colors.borderColor,
                                    borderRadius:6,
                                    paddingVertical:12,
                                    paddingHorizontal:15,
                                    justifyContent:'center',
                                }}
                            >
                                <Image
                                    style={{
                                        height:18,
                                        width:18,
                                        marginRight:8,
                                        tintColor:colors.textLight,
                                    }}
                                    source={IMAGES.list}
                                />
                                <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:colors.title}}>Pages</Text>
                                <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:COLORS.primary6}}> (4)</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title,marginBottom:10}}>Popular Networks</Text>
                    <View style={{marginHorizontal:-15,marginBottom:20}}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingLeft:15,
                            }}
                        >
                            {popularNetwork.map((data,index) => {
                                return(
                                    <PopularNetworkCard
                                        key={index}
                                        item={data}
                                    />
                                )
                            })}
                        </ScrollView>
                    </View>
                    <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title,marginBottom:10}}>More suggestions for you</Text>
                    <View style={GlobalStyleSheet.row}>
                        {connectionData.map((data,index) => {
                            return(
                                <View 
                                    key={index}
                                    style={GlobalStyleSheet.col50}>
                                    <UserCard
                                        item={data}
                                    />
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MyNetwork;