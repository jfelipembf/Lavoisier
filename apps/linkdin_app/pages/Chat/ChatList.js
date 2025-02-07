import React from 'react';
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View, Text ,TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { SvgXml } from 'react-native-svg';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, ICONS, IMAGES } from '../../constants/theme';
import Header from '../components/Header';


const chatData = [
    {
        id : '1',
        personImage : IMAGES.user1,
        name : 'Lucas Mokmana',
        message : 'Hey bro, let’s meetup at centre point corner',
        date : '2m ago',
        active : true,
        messageSeen : true,
        messageSent : true,
    },
    {
        id : '2',
        personImage : IMAGES.user2,
        name : 'Emilia Green',
        message : 'Can you share your current location now sis',
        date : '2m ago',
        active : true,
        messageSeen : false,
        messageSent : true,
    },
    {
        id : '3',
        personImage : IMAGES.user3,
        name : 'Richard Sigh',
        message : 'Cmon dude! make it fast, let’s go',
        date : '2m ago',
        messageReceivedSeen : false,
    },
    {
        id : '4',
        personImage : IMAGES.user4,
        name : 'Hendri Lee',
        message : 'Did you tell him about your new car?',
        date : '2m ago',
        messageSeen : true,
        messageSent : true,
    },
    {
        id : '5',
        personImage : IMAGES.user5,
        name : 'Lucas Mokmana',
        message : 'Hey bro, let’s meetup at centre point corner',
        date : '2m ago',
        active : true,
        messageSeen : true,
        messageSent : true,
    },
    {
        id : '6',
        personImage : IMAGES.user6,
        name : 'Emilia Green',
        message : 'Can you share your current location now sis',
        date : '2m ago',
        active : true,
        messageSeen : false,
        messageSent : true,
    },
    {
        id : '7',
        personImage : IMAGES.user7,
        name : 'Richard Sigh',
        message : 'Cmon dude! make it fast, let’s go',
        date : '2m ago',
        messageReceivedSeen : false,
    },
    {
        id : '8',
        personImage : IMAGES.user8,
        name : 'Hendri Lee',
        message : 'Did you tell him about your new car?',
        date : '2m ago',
        messageSeen : true,
        messageSent : true,
    },
    {
        id : '9',
        personImage : IMAGES.user6,
        name : 'Emilia Green',
        message : 'Can you share your current location now sis',
        date : '2m ago',
        active : true,
        messageSeen : false,
        messageSent : true,
    },
    {
        id : '10',
        personImage : IMAGES.user7,
        name : 'Richard Sigh',
        message : 'Cmon dude! make it fast, let’s go',
        date : '2m ago',
        messageReceivedSeen : false,
    },
    {
        id : '11',
        personImage : IMAGES.user8,
        name : 'Hendri Lee',
        message : 'Did you tell him about your new car?',
        date : '2m ago',
        messageSeen : true,
        messageSent : true,
    },
]

const ChatList = (props) => {

    const {colors} = useTheme();

    return (
        <SafeAreaView
            style={[GlobalStyleSheet.container,{
                padding:0,
                flex:1,
                backgroundColor:colors.cardBg,
            }]}
        >
            <Header
                leftIcon={'back'}
                title={'Chats'}
            />
            <View style={GlobalStyleSheet.container}>
                <View>
                    <TextInput
                        style={{
                            ...FONTS.font,
                            color:colors.title,
                            backgroundColor:colors.cardBg,
                            borderWidth:1,
                            borderColor:colors.borderColor,
                            borderRadius:6,
                            height:45,
                            paddingHorizontal:15,
                            paddingLeft:50,
                        }}
                        placeholder='Search Jobs..'
                        placeholderTextColor={colors.text}
                    />
                    <TouchableOpacity
                        style={{
                            position:'absolute',
                            top:0,
                            left:5,
                            height:45,
                            width:45,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <FeatherIcon color={colors.text} size={20} name='search'/>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}>
                {chatData.map((data,index) => {
                    return(
                        <TouchableOpacity 
                            onPress={()=> props.navigation.navigate('ChatScreen')}
                            //onPress={()=> createChatList(data)}
                            key={index}
                            style={{
                                flexDirection:'row',
                                paddingHorizontal:15,
                                paddingVertical:12,
                                borderBottomWidth:1,
                                borderColor:colors.borderColor,
                            }}
                        >
                            <View>
                                {data.active && 
                                    <View
                                        style={{
                                            height:14,
                                            width:14,
                                            borderRadius:9,
                                            backgroundColor:COLORS.success,
                                            position:'absolute',
                                            zIndex:1,
                                            bottom:-3,
                                            left: 4,
                                            borderWidth:2,
                                            borderColor:'#FEF6F0',
                                        }}
                                    />
                                }
                                <Image
                                    style={{
                                        height:50,
                                        width:50,
                                        borderRadius:50,
                                    }}
                                    source={data.personImage ? data.personImage : IMAGES.user}
                                />
                            </View>
                            <View style={{flex:1,paddingLeft:10,paddingRight:15,alignSelf:'center'}}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text style={[FONTS.font,FONTS.fontBold,{fontSize:15,color:colors.title,marginBottom:6}]}>{data.name}</Text>
                                </View>
                                <Text numberOfLines={1} style={[FONTS.fontXs,{color:colors.text}]}>{data.message ? data.message : 'Lorem ipsum sit amet is the dummy text'}</Text>
                            </View>
                            <View style={{alignItems:'flex-end'}}>
                                <Text style={{...FONTS.fontXs,color:colors.textLight,marginBottom:8}}>{data.date ? data.date : '2m ago'}</Text>
                                { data.messageSent &&

                                    <View
                                        style={[{
                                            height:18,
                                            width:18,
                                            borderRadius:12,
                                            borderWidth:1,
                                            borderColor:colors.textLight,
                                            alignItems:'center',
                                            justifyContent:'center',
                                        },data.messageSeen === true && {
                                            backgroundColor:COLORS.secondary,
                                            borderColor:COLORS.secondary,
                                        } ]}
                                    >
                                        <SvgXml height={12} width={12} stroke={data.messageSeen ? COLORS.white : colors.textLight} xml={ICONS.check}/>
                                    </View>
                                }

                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ChatList;