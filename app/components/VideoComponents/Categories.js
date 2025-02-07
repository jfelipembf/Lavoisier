import React from 'react';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const CategoriesData = [
    {
        id : "1",
        image : IMAGES.burger,
        name : "Burger",
    },
    {
        id : "2",
        image : IMAGES.pizza,
        name : "Pizza",
    },
    {
        id : "3",
        image : IMAGES.noodles,
        name : "Chinese",
    },
    {
        id : "4",
        image : IMAGES.cake,
        name : "Pastry",
    },
    {
        id : "5",
        image : IMAGES.meatloaf,
        name : "Meat",
    },
    {
        id : "6",
        image : IMAGES.drink,
        name : "Drinks",
    },
]

const Categories = () => {

    const {colors} = useTheme();
    const navigation = useNavigation();

    const renderItem = ({item}) => {
        return(
            <TouchableOpacity
                onPress={() => navigation.navigate('Items',{category : item.name})}
                activeOpacity={.8}
                style={{
                    backgroundColor:colors.cardBg,
                    borderRadius:10,
                    marginRight:12,
                    paddingHorizontal:10,
                    width:85,
                    paddingVertical:10,
                    alignItems:'center',
                    ...GlobalStyleSheet.shadow,
                }}
            >
                <Image
                    style={{
                        height:35,
                        width:35,
                        marginBottom:5,
                        marginTop:5,
                    }}
                    source={item.image}
                />
                <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft:15,
                    paddingBottom:25,
                    paddingTop:10,
                }}
                data={CategoriesData}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </>
    );
};

export default Categories;