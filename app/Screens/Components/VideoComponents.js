import React from 'react';
import { View } from 'react-native';
import PostOptionSheet from '../../components/VideoComponents/PostOptionSheet';
import VideoCard from '../../components/VideoComponents/VideoCard';
import AdsCard from '../../components/VideoComponents/AdsCard';
import CartListItem from '../../components/VideoComponents/CartListItem';
import PopularItems from '../../components/VideoComponents/PopularItems';
import CategoryList from '../../components/VideoComponents/CategoryList';
import EmptyCard from '../../components/VideoComponents/EmptyCard';
import UserCard from '../../components/VideoComponents/UserCard';
import PopularNetworkCard from '../../components/VideoComponents/PopularNetworkCard';
import OrderListItem from '../../components/VideoComponents/OrderListItem';
import MainSlider from '../../components/VideoComponents/MainSlider';
import FavouriteCard from '../../components/VideoComponents/FavouriteCard';
import MsgComponent from '../../components/VideoComponents/MsgComponent';
import ChatListItem from '../../components/VideoComponents/ChatListItem';
import GradientBtn from '../../components/VideoComponents/GradientBtn';
import JobCard from '../../components/VideoComponents/JobCard';
import PostCard from '../../components/VideoComponents/PostCard';
import PostLikes from '../../components/VideoComponents/PostLikes';
import PulseAnimation from '../../components/VideoComponents/PulseAnimation';

const VideoComponents = () => {
    return (
        <View>
            <PostOptionSheet />
            <VideoCard />
            <AdsCard />
            <CartListItem />
            <PopularItems />
            <CategoryList />
            <EmptyCard />
            <UserCard />
            <PopularNetworkCard />
            <OrderListItem />
            <FavouriteCard />
            <MsgComponent />
            <ChatListItem />
            <GradientBtn />
            <JobCard />
            <PostCard 
                postImg={somePostImage} 
                userImg={someUserImage} 
                userName="Nome do Usuário"
                userInfo="Informações do Usuário"
                desc="Descrição do Post"
                likes={10}
                comments={5}
                shares={2}
                postOptionSheet={someOptionSheet}
                isLike={false}
                id={postId}
                postArry={postArray}
                setPostArry={setPostArrayFunction}
                shareSheet={someShareSheet}
                likesModal={someLikesModal}
            />
            <PostLikes />
            <PulseAnimation />

        </View>
    );
};

export default VideoComponents;
