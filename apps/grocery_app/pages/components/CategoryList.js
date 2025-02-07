import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { IMAGES, FONTS } from '../../constants/theme';

const CategoryList = (props) => {

    const {colors} = useTheme();
    
    const navigation = useNavigation();

    const CategoryData = [
        {
            id : "1",
            image : IMAGES.grCat1,
            title : "Fruits",
        },
        {
            id : "2",
            image : IMAGES.grCat2,
            title : "Vegetables",
        },
        {
            id : "3",
            image : IMAGES.grCat3,
            title : "Drink",
        },
        {
            id : "4",
            image : IMAGES.grCat4,
            title : "Fresh Nuts",
        },
        {
            id : "5",
            image : IMAGES.grCat5,
            title : "Spices",
        },
    ]

    const renderItem = ({item}) => {
        return(
            <TouchableOpacity
                onPress={() => navigation.navigate('Items')}
                style={{
                    alignItems:'center',
                    marginRight:16,
                }}
            >
                <View
                    style={{
                        backgroundColor: colors.cardBg,
                        padding:3,
                        borderRadius:35,
                        marginBottom:7,
                    }}
                >
                    <Image
                        style={{
                            height:60,
                            width:60,
                            borderRadius:30,
                        }}
                        source={item.image}
                    />
                </View>
                <Text style={{...FONTS.font,fontSize:15,color:colors.title}}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft:15,marginBottom:20}}
                data={CategoryData}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </>
    );
};


export default CategoryList;