import React from 'react';
import { useTheme } from '@react-navigation/native';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CardStyle1 from '../../components/card/CardStyle1';
import { IMAGES } from '../../constants/theme';
import CardStyle2 from '../../components/card/CardStyle2';
import CardStyle3 from '../../components/card/CardStyle3';
import CardStyle4 from '../../components/card/CardStyle4';
import CardStyle5 from '../../components/card/CardStyle5';
import CardStyle6 from '../../components/card/CardStyle6';
import CardStyle7 from '../../components/card/CardStyle7';
import CardStyle8 from '../../components/card/CardStyle8';
import TitleArea from '../../components/TitleArea';
import BannerSlider from '../../components/Edu_Components/BannerSlider'; 
import Categories from '../../components/Edu_Components/Categories';
import PopularCourses from '../../components/Edu_Components/PopularCourses';
import PopularSkillTest from '../../components/Edu_Components/PopularSkillTest';
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
import PostCard from '../../components/VideoComponents/PostCard';
import PostLikes from '../../components/VideoComponents/PostLikes';
import PulseAnimation from '../../components/VideoComponents/PulseAnimation';
import JobCard from '../../components/VideoComponents/JobCard';

const Cards = (props) => {
  const { colors } = useTheme();

  const handlePress = () => {
    // ação desejada
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
      {/* Header fixo */}
      <Header title={'Cards'} bgWhite leftIcon={'back'} />

      {/* Conteúdo rolável */}
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 40,
          backgroundColor: colors.background,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Seção Edu Components */}
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Banner Slider'} />
          <BannerSlider />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Categories'} />
          <Categories />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Popular Courses'} />
          <PopularCourses />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Popular Skill Test'} />
          <PopularSkillTest />
        </View>

        {/* Seção Video Components */}
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Chat List Item'} />
          <ChatListItem />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Gradient Button'} />
          <GradientBtn title="Clique aqui" onPress={handlePress} />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Post Card'} />
          <PostCard title="Título do Post" image={IMAGES.post1} onPress={handlePress} />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Post Likes'} />
          <PostLikes likes={100} />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Video Card'} />
          <VideoCard />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Ads Card'} />
          <AdsCard />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Cart List Item'} />
          <CartListItem />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Popular Items'} />
          <PopularItems />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Category List'} />
          <CategoryList />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Empty Card'} />
          <EmptyCard />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'User Card'} />
          <UserCard />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Popular Network Card'} />
          <PopularNetworkCard />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Order List Item'} />
          <OrderListItem />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Main Slider'} />
          <MainSlider />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Favourite Card'} />
          <FavouriteCard />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Msg Component'} />
          <MsgComponent />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Job Card'} />
          <JobCard />
        </View>
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <TitleArea title={'Post Option Sheet'} />
          <PostOptionSheet />
        </View>

        {/* Área com os Card Styles */}
        <View style={GlobalStyleSheet.container}>
          {/* Card Style 1 */}
          <View style={{ marginBottom: 40 }}>
            <TitleArea title={'Card Style 1: Dating App'} />
            <CardStyle1
              iconColor={'#f85c6f'}
              icon={
                <Image
                  source={IMAGES.heart}
                  style={{
                    height: 30,
                    width: 30,
                    resizeMode: 'contain',
                    tintColor: '#f85c6f',
                  }}
                />
              }
              title="Dating App"
              desc="Pages for dating app"
            />
          </View>

          {/* Card Style 2 */}
          <View style={{ marginBottom: 40, alignItems: 'center' }}>
            <TitleArea title={'Card Style 2: Productivity'} />
            <CardStyle2
              image={IMAGES.post1}
              title="Desk Productivity"
              name="John Doe"
              update="26 min ago"
              tags={['Nature']}
              profile={IMAGES.user1}
              bookmark={true}
            />
          </View>

          {/* Card Style 3 */}
          <View style={{ marginBottom: 40 }}>
            <TitleArea title={'Card Style 3: Organization Tips'} />
            <CardStyle3
              title="Desk Organization Tips"
              image={IMAGES.post5}
              tags={['Political']}
              update="26 min ago"
            />
          </View>

          {/* Card Style 4 */}
          <View style={{ marginBottom: 40, alignItems: 'center' }}>
            <TitleArea title={'Card Style 4: Product Detail'} />
            <CardStyle4
              image={IMAGES.post20}
              title="Pomegranate"
              size="1KG"
              price="4.9"
              rate="14.60"
            />
          </View>

          {/* Card Style 5 */}
          <View style={{ marginBottom: 40 }}>
            <TitleArea title={'Card Style 5: Product Grid'} />
            <View style={GlobalStyleSheet.row}>
              <View style={GlobalStyleSheet.col50}>
                <CardStyle5
                  title="Pomegranate"
                  image={IMAGES.post20}
                  price="14.60"
                  size="1KG"
                />
              </View>
              <View style={GlobalStyleSheet.col50}>
                <CardStyle5
                  title="Strawberry"
                  image={IMAGES.post21}
                  price="14.60"
                  size="1KG"
                />
              </View>
            </View>
          </View>

          {/* Card Style 6 */}
          <View style={{ marginBottom: 40, alignItems: 'center' }}>
            <TitleArea title={'Card Style 6: Course Info'} />
            <CardStyle6
              image={IMAGES.post10}
              title="UX Design Fundamentals"
              duration="3 hrs"
              lesson="25"
              tags={['Ui Design', 'Development']}
            />
          </View>

          {/* Card Style 7 */}
          <View style={{ marginBottom: 40 }}>
            <TitleArea title={'Card Style 7: Recipe Card'} />
            <View style={GlobalStyleSheet.row}>
              <View style={GlobalStyleSheet.col50}>
                <CardStyle7
                  image={IMAGES.post13}
                  title="Egg Sandwich"
                  duration="30min"
                  servings="2"
                  isLike={false}
                />
              </View>
              <View style={GlobalStyleSheet.col50}>
                <CardStyle7
                  image={IMAGES.post14}
                  title="Egg Sandwich"
                  duration="30min"
                  servings="2"
                  isLike={false}
                />
              </View>
            </View>
          </View>

          {/* Card Style 8 */}
          <View style={{ marginBottom: 40 }}>
            <TitleArea title={'Card Style 8: Product Listing'} />
            <View style={GlobalStyleSheet.row}>
              <View style={GlobalStyleSheet.col50}>
                <CardStyle8
                  image={IMAGES.post18}
                  price="$45.20"
                  title="Sony PS4 Pro Console"
                  address="Alderwood PA-18944"
                />
              </View>
              <View style={GlobalStyleSheet.col50}>
                <CardStyle8
                  image={IMAGES.post19}
                  price="$45.20"
                  title="Sony PS4 Pro Console"
                  address="Alderwood PA-18944"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cards;
