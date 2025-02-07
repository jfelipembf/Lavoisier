import React,{useState, useEffect} from "react";
import { 
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from "react-native-svg";
import { FONTS, ICONS, IMAGES, SIZES } from "../../constants/theme";
import Header from "../../layout/Header";
import { GlobalStyleSheet } from "../../constants/StyleSheet";


const allUsers = [
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


const NewChat = (props) => {

    const {colors} = useTheme();
    const [search , setSearch] = useState('');


    return(
        <SafeAreaView style={[GlobalStyleSheet.container,{padding:0, flex:1}]}>
            <LinearGradient
                style={{flex:1}}
                colors={colors.bgGradient}
            >
                <Header title="Chat" leftIcon={'back'}/>
                <ScrollView contentContainerStyle={{paddingBottom:80}} showsHorizontalScrollIndicator={false}>
                    <View style={{paddingHorizontal:15,paddingTop:15}}>
                        <View>
                            <TouchableOpacity
                                style={{
                                    height:50,
                                    width:50,
                                    position:'absolute',
                                    zIndex:1,
                                    right:0,
                                    top:-1,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <SvgXml xml={ICONS.searchLight}/>
                            </TouchableOpacity>
                            <TextInput 
                                style={{
                                    height:50,
                                    backgroundColor:colors.card,
                                    borderWidth:1,
                                    borderColor: colors.borderColor,
                                    borderRadius:SIZES.radius,
                                    color:colors.title,
                                    paddingLeft:15,
                                }}
                                onChangeText={val => searchuser(val)}
                                value={search}
                                placeholder="Search.."
                                placeholderTextColor={colors.text}
                            />
                        </View>
                    </View>

                    {allUsers.map((data,index) => {
                        return(
                            <TouchableOpacity 
                                onPress={()=> {
                                    props.navigation.navigate('ChatScreen',{data : data})
                                }}
                                key={index}
                                style={{
                                    flexDirection:'row',
                                    paddingHorizontal:15,
                                    paddingVertical:12,
                                    borderBottomWidth:1,
                                    alignItems:'center',
                                    borderColor:colors.borderColor,
                                }}
                            >
                                <View>
                                    <Image
                                        style={{
                                            height:50,
                                            width:50,
                                            borderRadius:50,
                                        }}
                                        source={data.img ? {uri:data.img} : IMAGES.user}
                                    />
                                </View>
                                <View style={{flex:1,paddingLeft:10,paddingRight:15}}>
                                    <Text style={[FONTS.h6,{marginBottom:2,color:colors.title}]}>{data.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default NewChat;