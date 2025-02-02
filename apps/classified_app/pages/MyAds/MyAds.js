import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import AdsPage from './AdsPage';
import FavouritesPage from './FavouritesPage';
import { GlobalStyleSheet } from '../../constants/StyleSheet';


const Ads = () => (
    <AdsPage/>
);
  
const Favourites = () => (
    <FavouritesPage/>
);

  
const renderScene = SceneMap({
    first: Ads,
    second: Favourites,
});

const MyAds = () => {

    const {colors} = useTheme();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Ads' },
        { key: 'second', title: 'Favourites' },
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: COLORS.primary5,
                height:3,
            }}
            activeColor={colors.title}
            inactiveColor={colors.text}
            labelStyle={{
                ...FONTS.font,
                ...FONTS.fontBold,
            }}
            style={{ 
                backgroundColor: colors.cardBg, 
                //elevation:0,
                borderBottomWidth:1,
                borderColor:colors.borderColor,
            }}
        />  
    );

    return (
        <>
            <SafeAreaView
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    flex:1,
                    backgroundColor:colors.cardBg,
                }]}
            >
                <View
                    style={{
                        paddingHorizontal:15,
                        paddingVertical:10,
                    }}
                >
                    <Text style={{...FONTS.h5,color:colors.title}}>My Ads</Text>
                </View>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                    initialLayout={{ width: SIZES.width }}
                />
            </SafeAreaView>
        </>
    );
};

export default MyAds;