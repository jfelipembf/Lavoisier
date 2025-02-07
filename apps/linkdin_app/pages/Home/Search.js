import React from 'react';
import { Image, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { IconButton } from 'react-native-paper';
import { FONTS, IMAGES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const userData = [
    {
        userImg : IMAGES.user1,
        userName : "Olivia Johanson",
    },
    {
        userImg : IMAGES.user2,
        userName : "Lucas Mokmana",
    },
    {
        userImg : IMAGES.user3,
        userName : "Emilia Green",
    },
    {
        userImg : IMAGES.user4,
        userName : "Richard Sigh",
    },
]

const searchData = [
    "React Developer",
    "React Native Developer",
    "Frontend Developer",
    "Backend Developer",
    "Python Developer",
    "Web designer",
]

const Search = ({navigation}) => {
    
    const {colors} = useTheme();

    return (
        <SafeAreaView
            style={[GlobalStyleSheet.container,{
                padding:0,
                flex:1,
                backgroundColor:colors.cardBg,
            }]}
        >
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    borderBottomWidth:1,
                    borderBottomColor:colors.borderColor,
                }}
            >
                <IconButton
                    onPress={() => navigation.goBack()}
                    icon={() => <FeatherIcon size={22} color={colors.title} name='arrow-left' />}
                />
                <TextInput
                    autoFocus={true}
                    style={{
                        ...FONTS.font,
                        flex:1,
                        paddingHorizontal:10,
                        color:colors.title,
                    }}
                    placeholder='Search here..'
                    placeholderTextColor={colors.textLight}
                />
            </View>
            <ScrollView>
                <View
                    style={{
                        paddingHorizontal:15,
                        marginBottom:4,
                        marginTop:15,
                    }}
                >
                    <Text style={{...FONTS.h6,color:colors.title}}>Recent</Text>
                </View>
                <View>
                    {userData.map((data,index) => {
                        return(
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Profile',{name : data.userName, image : data.userImg})}
                                key={index}
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    paddingHorizontal:15,
                                    paddingVertical:6,
                                }}
                            >
                                <Image
                                    style={{
                                        height:35,
                                        width:35,
                                        borderRadius:25,
                                        marginRight:10,
                                    }}
                                    source={data.userImg}
                                />
                                <Text style={{...FONTS.font,color:colors.title,flex:1}}>{data.userName}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View
                    style={{
                        paddingHorizontal:15,
                        marginBottom:4,
                        marginTop:20,
                    }}
                >
                    <Text style={{...FONTS.h6,color:colors.title}}>Try searching for</Text>
                </View>
                <View>
                    {searchData.map((data,index) => {
                        return(
                            <TouchableOpacity
                            key={index}
                            style={{
                                paddingHorizontal:15,
                                flexDirection:'row',
                                alignItems:'center',
                                paddingVertical:12,
                            }}
                            >
                                <FeatherIcon size={18} color={colors.textLight} style={{marginRight:8}} name='search'/>
                                <Text style={{...FONTS.font,color:colors.title,flex:1}}>{data}</Text>
                                <FeatherIcon size={18} color={colors.textLight} style={{marginLeft:8}} name='arrow-up-left'/>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Search;