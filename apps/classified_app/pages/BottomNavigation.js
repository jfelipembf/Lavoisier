import React from "react";
import { Image, TouchableOpacity, View , Platform } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from "react-native-svg";
import { COLORS, ICONS, IMAGES } from "../constants/theme";
import Home from "./Home";
import Chats from "./Chats/Chats";
import CreatePost from "./CreatePost";
import MyAds from "./MyAds/MyAds";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();


const CustomTabBarButton = () => {
  
  const navigation = useNavigation();

  return(
    <View style={{flex:1.2,alignItems:'center'}}>
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Post"
        accessibilityHint="create the post"
        onPress={()=> navigation.navigate('CreatePost')}
        style={{
          height:55,
          width:55,
          top:0,
          borderRadius:50,
          alignItems:'center',
          justifyContent:'center',
          backgroundColor:COLORS.primary5,
        }}
        >
        <SvgXml
          height={20}
          width={20}
          xml={ICONS.plus}
        />
      </TouchableOpacity>
    </View>
  )
}

const BottomNavigation = () => {

  const theme = useTheme();
  const {colors} = theme;
  
 
  return (
    <>
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle:{
            height:55,
            position:'absolute',
            bottom:0,
            borderTopWidth:0,
            backgroundColor:  theme.dark ? 'rgba(75,91,157,1)' : '#fff',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,
            elevation: 8,
          }
        }}
      >
        <Tab.Screen 
          name="Home"
          component={Home}
          options={{
            tabBarIconStyle : {
              top: Platform.OS === 'ios' ?  12 : 0,
            },
            tabBarIcon:({focused}) => (
              <View>
                <Image
                  source={IMAGES.home}
                  style={{
                    height:22,
                    width:22,
                    tintColor:colors.title,
                    opacity: focused ? 1 : .4,
                  }}
                />
              </View>
            ),
            tabBarLabel:()=>(<></>)
          }}
        />
        <Tab.Screen
          name="Search"
          component={Chats} 
          options={{
            tabBarIconStyle : {
              top: Platform.OS === 'ios' ?  12 : 0,
            },
            tabBarIcon:({focused}) => (
              <View>
                <Image
                  source={IMAGES.chat}
                  style={{
                    height:22,
                    width:22,
                    tintColor:colors.title,
                    opacity: focused ? 1 : .4,
                  }}
                />
              </View>
            ),
            tabBarLabel:()=>(<></>)
          }}
        />
        <Tab.Screen
          name="Post"
          component={CreatePost} 
          options={{
            tabBarButton: props => <CustomTabBarButton {...props} />
          }}
        />
        <Tab.Screen 
          name="Chat"
          component={MyAds}
          options={{
            tabBarIconStyle : {
              top: Platform.OS === 'ios' ?  12 : 0,
            },
            tabBarIcon:({focused}) => (
              <View>
                <Image
                  source={IMAGES.like}
                  style={{
                    height:22,
                    width:22,
                    tintColor:colors.title,
                    opacity: focused ? 1 : .4,
                  }}
                />
              </View>
            ),
            tabBarLabel:()=>(<></>)
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={Profile} 
          options={{
            tabBarIconStyle : {
              top: Platform.OS === 'ios' ?  12 : 0,
            },
            tabBarIcon:({focused}) => (
              <View>
                <Image
                  source={IMAGES.profile}
                  style={{
                    height:22,
                    width:22,
                    tintColor:colors.title,
                    opacity: focused ? 1 : .4,
                  }}
                />
              </View>
            ),
            tabBarLabel:()=>(<></>)
          }}
        />
      </Tab.Navigator>
    </>
  );
};



export default BottomNavigation;
