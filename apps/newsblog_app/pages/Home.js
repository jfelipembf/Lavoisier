import React from 'react';
import { Button, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import SearchBar from '../components/Search/SearchBar';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import CardStyle2 from '../components/card/CardStyle2';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import CardStyle3 from '../components/card/CardStyle3';
import HeaderStyle2 from '../components/Headers/HeaderStyle2';

const Home = ({navigation}) => {

    const {colors} = useTheme();
    
    const BlogData = [
        {
            id : "1",
            image : IMAGES.blog1,
            profile : IMAGES.user1,
            tags : ['Nature'],
            title : "Will organizing your desk make you more productive?",
            name : "John Doe",
            update : "26 min ago",
            bookmark : true,
        },
        {
            id : "2",
            image : IMAGES.blog2,
            profile : IMAGES.user2,
            tags : ['Nature'],
            title : "Will organizing your desk make you more productive?",
            name : "John Doe",
            update : "26 min ago",
            bookmark : false,
        },
        {
            id : "3",
            image : IMAGES.blog3,
            profile : IMAGES.user3,
            tags : ['Nature'],
            title : "Will organizing your desk make you more productive?",
            name : "John Doe",
            update : "26 min ago",
            bookmark : false,
        },
    ]

    const NewsData = [
        {
            image : IMAGES.blogSmall1,
            title : "Will organizing your desk make you more productive?",
            tags : ['Political'],
            update : "26 min ago",
        },
        {
            image : IMAGES.blogSmall2,
            title : "Will organizing your desk make you more productive?",
            tags : ['Political'],
            update : "26 min ago",
        },
        {
            image : IMAGES.blogSmall3,
            title : "Will organizing your desk make you more productive?",
            tags : ['Political'],
            update : "26 min ago",
        },
        {
            image : IMAGES.blogSmall4,
            title : "Will organizing your desk make you more productive?",
            tags : ['Political'],
            update : "26 min ago",
        },
        {
            image : IMAGES.blogSmall5,
            title : "Will organizing your desk make you more productive?",
            tags : ['Political'],
            update : "26 min ago",
        },
    ]

    const renderItem = ({item}) => (
        <View style={{marginRight:15}}>
            <CardStyle2
                image={item.image}
                title={item.title}
                name={item.name}
                update={item.update}
                tags={item.tags}
                profile={item.profile}
                bookmark={item.bookmark}
                navigate={'BlogDetail'}
            />
        </View>
    )

    return (
        <>
            <SafeAreaView style={[GlobalStyleSheet.container,{padding:0, flex:1,backgroundColor : colors.background2}]}>
                <HeaderStyle2 drawer={navigation.openDrawer} title="Home"/>

                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View style={[GlobalStyleSheet.container,{paddingBottom:5}]}>
                        <SearchBar/>
                    </View>
                    <FlatList
                        horizontal
                        contentContainerStyle={{paddingLeft:15,paddingTop:20,paddingBottom:20}}
                        showsHorizontalScrollIndicator={false}
                        data={BlogData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                    <View style={GlobalStyleSheet.container}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                            <Text style={{...FONTS.h6,color:colors.title}}>Top News</Text>
                            <TouchableOpacity>
                                <Text style={{...FONTS.font,color:COLORS.primary}}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        {NewsData.map((data,index) => {
                            return(
                                <TouchableOpacity
                                    activeOpacity={.9}
                                    onPress={() => navigation.navigate('BlogDetail')}
                                    key={index}
                                >
                                    <View style={{marginBottom:10}}>
                                        <CardStyle3
                                            title={data.title}
                                            image={data.image}
                                            tags={data.tags}
                                            update={data.update}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView> 
        </>
    );
};


export default Home;