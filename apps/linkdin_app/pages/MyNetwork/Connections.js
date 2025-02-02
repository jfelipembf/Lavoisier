import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FONTS, IMAGES } from '../../constants/theme';
import Header from '../components/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';


const userData = [
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
    {
        userImg : IMAGES.user7,
        userName : "Christian Hang",
        desc : "Senior Web Designer",
    },
    {
        userImg : IMAGES.user8,
        userName : "David Bekam",
        desc : "Career Coach",
    },
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
    {
        userImg : IMAGES.user7,
        userName : "Christian Hang",
        desc : "Senior Web Designer",
    },
    {
        userImg : IMAGES.user8,
        userName : "David Bekam",
        desc : "Career Coach",
    },
]

const Connections = ({route}) => {

    const { colors } = useTheme();

    const {title} = route.params

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
                title={title}
            />
            <ScrollView>
                {userData.map((data,index) => (
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
                        </View>
                        <View>
                            <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title,marginBottom:4}}>{data.userName}</Text>
                            <Text style={{...FONTS.fontSm,color:colors.textLight}}>{data.desc}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Connections;