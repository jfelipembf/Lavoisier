import React from 'react';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import FavouriteCard from '../components/FavouriteCard';
import { IMAGES } from '../../constants/theme';

const FavouritesPage = (props) => {

    const {colors} = useTheme();

    const FavouriteData = [
        {
            image : IMAGES.cfItem1,
            price : "$45.90",
            title : "Sony play station 4 Pro gaming",
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem2,
            price : "$45.90",
            title : "Sony play station 4 Pro gaming",
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem3,
            price : "$45.90",
            title : "Sony play station 4 Pro gaming",
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem4,
            price : "$45.90",
            title : "Sony play station 4 Pro gaming",
            address : "Alderwood PA- 18944",
        },
        {
            image : IMAGES.cfItem5,
            price : "$45.90",
            title : "Sony play station 4 Pro gaming",
            address : "Alderwood PA- 18944",
        },
    ]

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background2,
            }}
        >
            <ScrollView contentContainerStyle={{paddingBottom:80}}  showsHorizontalScrollIndicator={false}>
                <View
                    style={GlobalStyleSheet.container}
                >
                    {FavouriteData.map((data,index) => {
                        return(
                            <FavouriteCard
                                key={index}
                                image={data.image}
                                title={data.title}
                                price={data.price}
                                address={data.address}
                            />
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


export default FavouritesPage;