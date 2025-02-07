import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import AdsCard from '../components/AdsCard';
import { IMAGES } from '../../constants/theme';

const AdsPage = () => {
    
    const {colors} = useTheme();

    const AdsData = [
        {
            image : IMAGES.cfItem1,
            title : "Sony play station 4 Pro gaming",
            price : "$45.90",
            views : "470",
            likes : "81",
            dateFrom : "18 Feb 2020",
            dateTo : "21 May 2022",
            status : "Active",
        },
        {
            image : IMAGES.cfItem2,
            title : "Sony play station 4 Pro gaming",
            price : "$45.90",
            views : "470",
            likes : "81",
            dateFrom : "18 Feb 2020",
            dateTo : "21 May 2022",
            status : "Featured",
        },
        {
            image : IMAGES.cfItem3,
            title : "Sony play station 4 Pro gaming",
            price : "$45.90",
            views : "470",
            likes : "81",
            dateFrom : "18 Feb 2020",
            dateTo : "21 May 2022",
            status : "Active",
        },
        {
            image : IMAGES.cfItem4,
            title : "Sony play station 4 Pro gaming",
            price : "$45.90",
            views : "470",
            likes : "81",
            dateFrom : "18 Feb 2020",
            dateTo : "21 May 2022",
            status : "Active",
        },
        {
            image : IMAGES.cfItem5,
            title : "Sony play station 4 Pro gaming",
            price : "$45.90",
            views : "470",
            likes : "81",
            dateFrom : "18 Feb 2020",
            dateTo : "21 May 2022",
            status : "Active",
        },
    ]


    return (
        <View
            style={{
                flex:1,
                backgroundColor:colors.background2,
            }}
        >   
            <ScrollView contentContainerStyle={{paddingBottom:80,paddingTop:10}} showsHorizontalScrollIndicator={false}>
                <View
                    style={GlobalStyleSheet.container}
                >   
                    {AdsData.map((data,index) => {
                        return(
                            <AdsCard
                                key={index}
                                image={data.image}
                                title={data.title}
                                price={data.price}
                                dateFrom={data.dateFrom}
                                dateTo={data.dateTo}
                                views={data.views}
                                likes={data.likes}
                                status={data.status}
                            />
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

export default AdsPage;