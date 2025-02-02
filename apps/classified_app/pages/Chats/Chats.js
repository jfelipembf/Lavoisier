import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import AllUsers from './AllUsers';
import BuyingUsers from './BuyingUsers';
import SellingUsers from './SellingUsers';
import { GlobalStyleSheet } from '../../constants/StyleSheet';


const AllUser = () => (
    <AllUsers/>
);
  
const BuyingUser = () => (
    <BuyingUsers/>
);
const SellingUser = () => (
    <SellingUsers/>
);
  
const renderScene = SceneMap({
    first: AllUser,
    second: BuyingUser,
    third: SellingUser,
});

const Chats = (props) => {

    const {colors} = useTheme();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'All' },
        { key: 'second', title: 'Buying' },
        { key: 'third', title: 'Selling' },
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
                    <Text style={{...FONTS.h5,color:colors.title}}>Chats</Text>
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


export default Chats;