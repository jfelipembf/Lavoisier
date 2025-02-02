import React, {useState} from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Header from '../components/Header';

const networkData = [
    {
        image : IMAGES.user1,
        title : "Marquezz Silalahi",
        subTitle : "Web Developer",
    },
    {
        image : IMAGES.user2,
        title : "Marquezz Silalahi",
        subTitle : "Web Developer",
    },
    {
        image : IMAGES.user3,
        title : "Marquezz Silalahi",
        subTitle : "Web Developer",
    },
    {
        image : IMAGES.user4,
        title : "Marquezz Silalahi",
        subTitle : "Web Developer",
    },
]

const Profile = ({route}) => {

    const {colors} = useTheme();

    const { name, image } = route.params;

    const [isFollow , setIsFollow] = useState(false);

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
                title={name}
            />   
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View>
                    <Image
                        style={{
                            width:'100%',
                            height:180,
                        }}
                        source={IMAGES.bg4}
                    />
                    <LinearGradient
                        colors={["rgba(0,0,0,0)","rgba(0,0,0,.7)","rgba(0,0,0,1)"]}
                        style={{
                            position:'absolute',
                            height:'100%',
                            width:'100%',
                            top:0,
                            left:0,
                        }}
                    >

                    </LinearGradient>
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            position:'absolute',
                            bottom:0,
                            left:0,
                            width:'100%',
                            paddingHorizontal:15,
                            paddingVertical:15,
                        }}
                    >
                        <View
                            style={{
                                borderWidth:1,
                                borderColor:colors.borderColor,
                                padding:3,
                                borderRadius:75,
                                marginRight:12,
                            }}
                        >
                            <Image
                                style={{
                                    height:75,
                                    width:75,
                                    borderRadius:75,
                                }}
                                source={image}
                            />
                        </View>
                        <View style={{flex:1}}>
                            <Text style={[FONTS.h6,{color:COLORS.white}]}>{name}</Text>
                            <Text style={[FONTS.fontSm,{color:COLORS.white,opacity:.75}]}>React developer at w3itexperts.</Text>
                        </View>
                    </View>
                </View>
                <View style={GlobalStyleSheet.container}>
                    <View
                        style={{
                            flexDirection:'row',
                            paddingTop:5,
                            borderBottomWidth:1,
                            borderBottomColor:colors.borderColor,
                            paddingBottom:15,
                            marginBottom:15,
                            alignItems:'flex-start',
                        }}
                    >
                        <View
                            style={{flex:1}}
                        >
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    marginBottom:10,
                                }}
                            >
                                <FeatherIcon style={{marginRight:8,top:1}} color={colors.textLight} size={14} name='map-pin'/>
                                <Text style={[FONTS.fontSm,{color:colors.title}]}>kota, Rajasthan, India</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                }}
                            >
                                <FeatherIcon style={{marginRight:8,top:1}} color={colors.textLight} size={14} name='user'/>
                                <Text style={[FONTS.fontSm,{color:colors.title}]}>141 Followers</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => setIsFollow(!isFollow)}
                            style={{
                                borderWidth:1,
                                borderColor:COLORS.primary6,
                                paddingHorizontal:15,
                                paddingVertical:6,
                                borderRadius:6,
                            }}
                        >
                            <Text style={[FONTS.font,{color:COLORS.primary6,bottom:1}]}>{isFollow ? "Following" : "Follow"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            borderBottomWidth:1,
                            borderBottomColor:colors.borderColor,
                            paddingBottom:18,
                            marginBottom:15,
                        }}
                    >
                        <Text style={[FONTS.h6,{color:colors.title}]}>Activity</Text>
                        <Text style={[FONTS.fontSm,{color:colors.text}]}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</Text>
                    </View>
                    <View
                        style={{
                            borderBottomWidth:1,
                            borderBottomColor:colors.borderColor,
                            paddingBottom:18,
                            marginBottom:15,
                        }}
                    >
                        <Text style={[FONTS.h6,{color:colors.title,marginBottom:6}]}>Experience</Text>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                        >
                            <Image
                                style={{
                                    height:60,
                                    width:60,
                                    borderRadius:6,
                                    marginRight:10,
                                }}
                                source={IMAGES.logo1}
                            />
                            <View style={{flex:1}}>
                                <Text style={[FONTS.font,FONTS.fontBold,{color:colors.title,marginBottom:6}]}>React Developer</Text>
                                <View
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                    }}
                                >
                                    <Text style={[FONTS.fontXs,{color:colors.text}]}>W3itexperts</Text>
                                    <View
                                        style={{
                                            height:3,
                                            width:3,
                                            borderRadius:3,
                                            backgroundColor:colors.textLight,
                                            marginHorizontal:8,
                                        }}
                                    />
                                    <Text style={[FONTS.fontXs,{color:colors.text}]}>Full-Time</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            paddingBottom:18,
                            marginBottom:15,
                        }}
                    >
                        <Text style={[FONTS.h6,{color:colors.title,marginBottom:5}]}>People also viewed</Text>
                        {networkData.map((data,index) => {
                            return(
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:48,
                                            width:48,
                                            borderRadius:48,
                                            marginRight:12,
                                        }}
                                        source={data.image}
                                    />
                                    <View
                                        style={{
                                            flex:1,
                                            flexDirection:'row',
                                            paddingVertical:12,
                                            alignItems:'center',
                                            borderBottomWidth:1,
                                            borderBottomColor:colors.borderColor,
                                        }}
                                    >
                                        <View style={{flex:1}}>
                                            <Text style={[FONTS.font,FONTS.fontBold,{color:colors.title,marginBottom:5}]}>{data.title}</Text>
                                            <Text style={[FONTS.fontXs,{color:colors.text,marginBottom:2}]}>{data.subTitle}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={{padding:10}}
                                        >
                                            <FeatherIcon color={COLORS.primary6} size={20} name='user-plus'/>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;