import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import ChatListItem from '../components/ChatListItem';
import { IMAGES } from '../../constants/theme';

const SellingUsers = () => {

    const {colors} = useTheme();
    const ChatData = [
        {
            productImg : IMAGES.cfItem1,
            userImg : IMAGES.user1,
            userName : "Martin Guptil",
            productTitle : "Sony play station 4 Pro gaming",
            lastMsg : "Do you have more photos",
            date : "22 May 2022",
        },
        {
            productImg : IMAGES.cfItem2,
            userImg : IMAGES.user2,
            userName : "Martin Guptil",
            productTitle : "Sony play station 4 Pro gaming",
            lastMsg : "Do you have more photos",
            date : "22 May 2022",
        },
        {
            productImg : IMAGES.cfItem3,
            userImg : IMAGES.user3,
            userName : "Martin Guptil",
            productTitle : "Sony play station 4 Pro gaming",
            lastMsg : "Do you have more photos",
            date : "22 May 2022",
        },
        {
            productImg : IMAGES.cfItem4,
            userImg : IMAGES.user4,
            userName : "Martin Guptil",
            productTitle : "Sony play station 4 Pro gaming",
            lastMsg : "Do you have more photos",
            date : "22 May 2022",
        },
        {
            productImg : IMAGES.cfItem5,
            userImg : IMAGES.user5,
            userName : "Martin Guptil",
            productTitle : "Sony play station 4 Pro gaming",
            lastMsg : "Do you have more photos",
            date : "22 May 2022",
        },
    ]

    return (
        <>
            <View
                style={{
                    flex:1,
                    backgroundColor:colors.background2,
                }}
            >
                <ScrollView
                     showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom:75,
                    }}
                >
                    {ChatData.map((data,index) => {
                        return(
                            <ChatListItem
                            key={index}
                            userImg={data.userImg}
                            userName={data.userName}
                            productImg={data.productImg}
                            productTitle={data.productTitle}
                            lastMsg={data.lastMsg}
                            date={data.date}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        </>
    );
};


export default SellingUsers;