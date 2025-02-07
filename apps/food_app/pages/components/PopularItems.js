import React from 'react';
import { FlatList, View } from 'react-native';
import CardStyle7 from '../../components/card/CardStyle7';
import { IMAGES } from '../../constants/theme';

const PopularItems = (props) => {

    const PopularData = [
        {
            id : "1",
            image : IMAGES.foodItem1,
            title : "Egg Sandwitch",
            duration : "30min",
            servings : "2",
            isLike : false,
        },
        {
            id : "2",
            image : IMAGES.foodItem2,
            title : "Cheese Burger",
            duration : "30min",
            servings : "2",
            isLike : false,
        },
        {
            id : "3",
            image : IMAGES.foodItem1,
            title : "Egg Sandwitch",
            duration : "30min",
            servings : "2",
            isLike : false,
        },
        {
            id : "4",
            image : IMAGES.foodItem2,
            title : "Cheese Burger",
            duration : "30min",
            servings : "2",
            isLike : false,
        },
    ]

    const renderItem = ({item}) => {
        return(
            <View style={{width:170,marginRight:12}}>
                <CardStyle7
                    image={item.image}
                    title={item.title}
                    duration={item.duration}
                    servings={item.servings}
                    isLike={item.isLike}
                />
            </View>
        )
    }

    return (
        <>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft:15}}
                data={PopularData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </>
    );
};


export default PopularItems;