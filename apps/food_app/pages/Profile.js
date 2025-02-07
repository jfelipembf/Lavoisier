import React from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { COLORS, FONTS, IMAGES } from '../constants/theme';

const Profile = () => {

    const {colors} = useTheme();
    const RewardData = [
        {
            id : "1",
            title : "Order 10 packs French Fries Deluxe",
            lastUpdate : "4 days ago",
            points : 145,
        },
        {
            id : "2",
            title : "Order 10 packs French Fries Deluxe",
            lastUpdate : "4 days ago",
            points : 145,
        },
        {
            id : "3",
            title : "Order 10 packs French Fries Deluxe",
            lastUpdate : "4 days ago",
            points : 145,
        },
    ]


    const renderItem = ({item}) => {
        return(
            <View
                style={{
                    backgroundColor:COLORS.primary,
                    marginRight:12,
                    borderRadius:10,
                    flexDirection:'row',
                    alignItems:'center',
                    paddingHorizontal:15,
                    paddingVertical:15,
                    width:300,
                }}
            >
                <View style={{flex:1,paddingRight:10}}>
                    <Text style={{...FONTS.h6,fontSize:15,color:COLORS.white}}>{item.title}</Text>
                    <Text style={{...FONTS.font,color:COLORS.white}}>{item.lastUpdate}</Text>
                </View>
                <View
                    style={{
                        backgroundColor:COLORS.white,
                        width:70,
                        alignItems:'center',
                        borderRadius:10,
                        paddingVertical:12,
                    }}
                >
                    <Text style={{...FONTS.h5,lineHeight:22}}>{item.points}</Text>
                    <Text style={{...FONTS.font}}>Pts</Text>
                </View>
            </View>
        )
    }


    return (
        <>
            <SafeAreaView
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    flex:1,
                }]}
            >
                <View style={{
                    alignItems:'center',
                    justifyContent:'center',
                    height:50,
                    backgroundColor:colors.card,
                    ...GlobalStyleSheet.shadow,
                }}>
                    <Text style={{...FONTS.h6,color:colors.title}}>Profile</Text>
                </View>

                <ScrollView contentContainerStyle={{paddingBottom:100}}>
                    <View style={GlobalStyleSheet.container}>
                        <View
                            style={{alignItems:'center',paddingVertical:10,marginBottom:5}}
                        >
                            <Image
                                style={{
                                    height:100,
                                    width:100,
                                    borderRadius:100,
                                    marginBottom:15,
                                }}
                                source={IMAGES.user1}
                            />
                            <Text style={{...FONTS.h5,color:colors.title}}>James Hawkins</Text>
                            <Text style={{...FONTS.text,color:COLORS.primary}}>Gold member</Text>
                        </View>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between',
                                marginBottom:15,
                            }}
                        >
                            <Text style={{...FONTS.h5,color:colors.title}}>Contacts</Text>
                            <TouchableOpacity>
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.primary}}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                marginBottom:20,
                            }}
                        >
                            <View
                                style={{
                                    height:50,
                                    width:50,
                                    backgroundColor:colors.card,
                                    borderRadius:50,
                                    marginRight:15,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    shadowColor: "rgba(0,0,0,.4)",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.30,
                                    shadowRadius: 4.65,

                                    elevation: 8,
                                }}
                            >
                                <FontAwesome5 color={colors.title} size={20} name={'phone-alt'}/>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{...FONTS.font,color:colors.text,marginBottom:5}}>Mobile Phone</Text>
                                <Text style={{...FONTS.font,...FONTS.fontBold,fontSize:15,color:colors.title}}>+12 3456 789</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                marginBottom:20,
                            }}
                        >
                            <View
                                style={{
                                    height:50,
                                    width:50,
                                    backgroundColor:colors.card,
                                    borderRadius:50,
                                    marginRight:15,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    shadowColor: "rgba(0,0,0,.4)",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.30,
                                    shadowRadius: 4.65,

                                    elevation: 8,
                                }}
                            >
                                <FontAwesome color={colors.title} size={20} name={'envelope'}/>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{...FONTS.font,color:colors.text,marginBottom:5}}>Email Address</Text>
                                <Text style={{...FONTS.font,...FONTS.fontBold,fontSize:15,color:colors.title}}>jameshawkins@mail.com</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                marginBottom:20,
                            }}
                        >
                            <View
                                style={{
                                    height:50,
                                    width:50,
                                    backgroundColor:colors.card,
                                    borderRadius:50,
                                    marginRight:15,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    shadowColor: "rgba(0,0,0,.4)",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.30,
                                    shadowRadius: 4.65,

                                    elevation: 8,
                                }}
                            >
                                <FontAwesome5 color={colors.title} size={20} name={'map-marker-alt'}/>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{...FONTS.font,color:colors.text,marginBottom:5}}>Address</Text>
                                <Text style={{...FONTS.font,...FONTS.fontBold,lineHeight:22,fontSize:15,color:colors.title}}>Franklin Avenue, Corner St.London, 24125151</Text>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between',
                                marginTop:15,
                            }}
                        >
                            <Text style={{...FONTS.h5,color:colors.title}}>Your Reward 🏆</Text>
                            <TouchableOpacity>
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.primary}}>History</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingLeft:15}}
                        data={RewardData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />
                </ScrollView>

            </SafeAreaView>
        </>
    );
};

export default Profile;