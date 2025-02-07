import React, {useRef} from 'react';
import { Image, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { IconButton, List } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import Header from '../components/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const NotificationData = [
    {
        logo : IMAGES.logo1,
        title : "W3itexperts info Solutions post a job.",
        desc : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    },
    {
        logo : IMAGES.logo2,
        title : "Send your resume in five days.",
        desc : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    },
    {
        logo : IMAGES.logo3,
        title : "Dexignzone liked your recent post.",
        desc : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    },
    {
        logo : IMAGES.logo4,
        title : "Your request accepted.",
        desc : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    },
    {
        logo : IMAGES.logo1,
        title : "W3itexperts info Solutions post a job.",
        desc : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    },
    {
        logo : IMAGES.logo2,
        title : "Send your resume in five days.",
        desc : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    },
    {
        logo : IMAGES.logo3,
        title : "Dexignzone liked your recent post.",
        desc : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    },
    {
        logo : IMAGES.logo4,
        title : "Your request accepted.",
        desc : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    },
    {
        logo : IMAGES.logo4,
        title : "Your request accepted.",
        desc : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    },
    {
        logo : IMAGES.logo1,
        title : "W3itexperts info Solutions post a job.",
        desc : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    },
    {
        logo : IMAGES.logo2,
        title : "Send your resume in five days.",
        desc : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    },
    {
        logo : IMAGES.logo3,
        title : "Dexignzone liked your recent post.",
        desc : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    },
    {
        logo : IMAGES.logo4,
        title : "Your request accepted.",
        desc : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    },
]

const Notifications = ({navigation}) => {

    const {colors} = useTheme();

    const sheetRef = useRef();

    return (
        <>


            <RBSheet
                ref={sheetRef}
                closeOnDragDown={true}
                height={150}
                customStyles={{
                    container:{
                        backgroundColor:colors.cardBg,
                    }
                }}
            >
                <List.Item
                    onPress={() => {sheetRef.current.close()}}
                    left={() => <FeatherIcon style={{width:35,left:10}} size={20} color={colors.title} name='share-2'/>}
                    titleStyle={{
                        ...FONTS.font,
                        fontSize:15,
                        color:colors.title,
                    }}
                    title="Share Notification"
                />
                <List.Item
                    onPress={() => {sheetRef.current.close()}}
                    left={() => <FeatherIcon style={{width:35,left:10}} size={20} color={COLORS.danger} name='alert-triangle'/>}
                    titleStyle={{
                        ...FONTS.font,
                        fontSize:15,
                        color:COLORS.danger,
                    }}
                    title="Report this"
                />
            </RBSheet>

            <SafeAreaView
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    flex:1,
                    backgroundColor: colors.background2,
                }]}
            >
                <Header
                    leftIcon={'back'}
                    title={'Notifications'}
                    rightIcon={'chat'}
                />
                <ScrollView showsHorizontalScrollIndicator={false}>
                    {NotificationData.map((data,index) => {
                        return(
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('PostDetails',{
                                        postImg : {ratio : 100 / 130 , images : [ IMAGES.postLinkdin4 ]},
                                        userImg: IMAGES.youtubeProfile2,
                                        userName: "Olivia Johanson",
                                        userInfo: "Full stack developer at w3itexperts.",
                                        desc: "It is a long established fact that a reader will be distracted by the readable content of a part",
                                    })
                                }}
                                activeOpacity={.8}
                                key={index}
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                    paddingVertical:15,
                                    paddingHorizontal:15,
                                }}
                            >
                                <Image
                                    style={{
                                        height:60,
                                        width:60,
                                        borderRadius:6,
                                        marginRight:12,
                                    }}
                                    source={data.logo}
                                />
                                <View
                                    style={{
                                        flex:1,
                                        marginRight:8,
                                    }}
                                >
                                    <Text numberOfLines={1} 
                                        style={{
                                            ...FONTS.font,
                                            ...FONTS.fontBold,
                                            color:colors.title,
                                            marginBottom:5,
                                        }}>{data.title}</Text>
                                    <Text numberOfLines={2} style={{...FONTS.fontSm,color:colors.text,lineHeight:16}}>{data.desc}</Text>
                                </View>
                                <IconButton
                                    onPress={() => sheetRef.current.open()}
                                    icon={(props) => <FeatherIcon name='more-vertical' {...props}/>}
                                    size={22}
                                    iconColor={colors.text}
                                    style={{marginRight:-5}}
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