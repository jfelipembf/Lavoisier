import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import SearchBar3 from '../components/Search/SearchBar3';
import { COLORS, FONTS } from '../constants/theme';
import BannerSlider from './components/BannerSlider';
import Categories from './components/Categories';
import PopularCourses from './components/PopularCourses';
import PopularSkillTest from './components/PopularSkillTest';

const Home = ({navigation}) => {
    
    const {colors} = useTheme();
   
    return (
        <>
            <SafeAreaView style={[GlobalStyleSheet.container,{padding:0,flex:1,backgroundColor:colors.background2}]}>
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        paddingHorizontal:15,
                        paddingVertical:15,
                        paddingBottom:12,
                    }}
                >
                    <View style={{flex:1}}>
                        <Text style={{...FONTS.h4,color:colors.title}}>Welcome back!</Text>
                        <Text style={{...FONTS.font,color:colors.textLight,lineHeight:17}}>John Doe</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        style={{
                            height:48,
                            width:48,
                            borderWidth:1,
                            borderColor:colors.borderColor,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:10,
                        }}
                    >
                        <FeatherIcon color={colors.title} size={22} name={'grid'}/> 
                    </TouchableOpacity>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View style={[GlobalStyleSheet.container,{paddingTop:8}]}>
                        <SearchBar3/>
                    </View>
                    <BannerSlider/>
                    <View style={[GlobalStyleSheet.container,{paddingBottom:0}]}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={{...FONTS.h4,color:colors.title}}>Categories</Text>
                            <TouchableOpacity>
                                <Text style={{...FONTS.font,color:COLORS.primary3}}>View all</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Categories/>
                    <View style={{
                        backgroundColor:colors.cardBg,
                        paddingBottom:30,
                        paddingTop:12,
                        borderTopLeftRadius:20,
                        borderTopRightRadius:20,
                        marginTop:10,
                        shadowColor: "rgba(0,0,0,.4)",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.30,
                        shadowRadius: 4.65,

                        elevation: 8,
                    }}>
                        <View style={[GlobalStyleSheet.container,{paddingBottom:0,paddingTop:8}]}>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <Text style={{...FONTS.h4,color:colors.title}}>Popular Courses</Text>
                                <TouchableOpacity>
                                    <Text style={{...FONTS.font,color:COLORS.primary3}}>View all</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <PopularCourses/>

                        <View style={[GlobalStyleSheet.container,{paddingBottom:0,paddingTop:8}]}>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <Text style={{...FONTS.h4,color:colors.title}}>Popular Skill Tests</Text>
                                <TouchableOpacity>
                                    <Text style={{...FONTS.font,color:COLORS.primary3}}>View all</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <PopularSkillTest/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};


export default Home;