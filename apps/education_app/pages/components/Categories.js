import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';

const CategoryData = [
    {
        id : "1",
        icon : IMAGES.development,
        title : "Web Development",
        color : "#cee7e6",
    },
    {
        id : "2",
        icon : IMAGES.design,
        title : "Web Designing",
        color : "#eae3ef",
    },
    {
        id : "3",
        icon : IMAGES.promotion,
        title : "Digital Marketing",
        color : "#f2eee9",
    },
    {
        id : "4",
        icon : IMAGES.appdeveloper,
        title : "App Development",
        color : "#f3dfde",
    },
]

const Categories = () => {

    const navigation = useNavigation();

    const renderItem = ({item}) => {
        return(
            <View
                style={{
                    marginRight:10,
                    width:120,
                }}    
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Courses',{title : item.title, bgColor : item.color, catIcon : item.icon})}
                    style={{
                        paddingHorizontal:15,
                        paddingVertical:15,
                        backgroundColor:item.color,
                        borderRadius:15,
                        marginBottom:10,
                        flex:1,
                    }}
                >
                    
                    <Image
                        style={{
                            height:24,
                            width:24,
                            marginBottom:12,
                            marginTop:5,
                            tintColor:COLORS.title,
                        }}
                        source={item.icon}
                    />
                    <Text style={{...FONTS.font,...FONTS.fontBold}}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft:15,paddingBottom:10,paddingTop:12}}
                data={CategoryData}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </>
    );
};


export default Categories;