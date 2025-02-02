import React from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { IconButton } from 'react-native-paper';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import MsgComponent from '../components/MsgComponent';

const ChatScreen = (props) => {
    
    const {colors} = useTheme();
    
    const MsgData = [
        {
            msg : "Hi Richard , thanks for adding me",
            time : "08:35",
        },
        {
            msg : "Hi Miselia , your welcome , nice to meet you too",
            time : "08:35",
            sender : true,
        },
        {
            msg : "I look you're singer, can you sing for me",
            time : "08:35",
        },
        {
            msg : "Sure",
            time : "08:35",
            sender : true,
        },
        {
            msg : "Why not",
            time : "08:35",
            sender : true,
        },
    ]

    return (
        <>
            <SafeAreaView
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    flex:1,
                    backgroundColor:colors.background2,
                }]}
            >
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        paddingHorizontal:15,
                        paddingVertical:5,
                        backgroundColor:COLORS.primary6,
                    }}
                >
                    <IconButton
                        style={{marginLeft:-5,marginRight:10}}
                        icon={(props) => <FeatherIcon name='arrow-left' {...props}/>}
                        size={24}
                        iconColor={COLORS.white}
                        onPress={() => props.navigation.goBack()}
                    />
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            flex:1,
                        }}
                    >
                        <Image
                            style={{
                                height:40,
                                width:40,
                                borderRadius:40,
                                marginRight:15,
                            }}
                            source={IMAGES.user1}
                        />
                        <View>
                            <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.white,marginBottom:2}}>Misellia , 24</Text>
                            <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.7}}>Online 24m ago</Text>
                        </View>
                    </View>
                    <IconButton
                        icon={() => <FontAwesome5 name='phone-alt' color={COLORS.white} size={18}/>}
                        size={24}
                        iconColor={COLORS.white}
                        onPress={() => {}}
                    />
                    <IconButton
                        icon={() => <FontAwesome name='video-camera' color={COLORS.white} size={18} />}
                        size={24}
                        iconColor={COLORS.white}
                        onPress={() => {}}
                    />
                </View>
                <View 
                    style={{flex:1}}
                >
                    <ScrollView>
                        <View style={[GlobalStyleSheet.container,{paddingTop:30}]}>
                            {MsgData.map((data,index) => {
                                return(
                                    <MsgComponent
                                        key={index}
                                        sender={data.sender}
                                        item={data}
                                    />
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : ""}
                >
                    <View
                        style={GlobalStyleSheet.container}
                    >
                        <View>
                            <TextInput
                                style={{
                                    ...FONTS.font,
                                    backgroundColor:colors.cardBg,
                                    borderWidth:1,
                                    height:58,
                                    color:colors.title,
                                    borderColor:colors.borderColor,
                                    borderRadius:40,
                                    paddingHorizontal:20,
                                    paddingVertical:15,
                                    fontSize:15,
                                }}
                                placeholder='Send Messages'
                                placeholderTextColor={colors.textLight}
                            />
                            <TouchableOpacity
                                style={{
                                    height:50,
                                    width:50,
                                    borderRadius:40,
                                    position:'absolute',
                                    right:5,
                                    top:4,
                                    backgroundColor:COLORS.primary6,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <FeatherIcon color={COLORS.white} size={22} name='send'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
};

export default ChatScreen;