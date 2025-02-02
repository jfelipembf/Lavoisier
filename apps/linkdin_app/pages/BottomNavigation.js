import React from 'react';
import { Image, View, Text, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import Home from './Home/Home';
import MyNetwork from './MyNetwork/MyNetwork';
import Notifications from './Notifications/Notifications';
import Jobs from './Jobs/Jobs';

const Tab = createBottomTabNavigator();

const CreatePost = () => {
  return
}

const CustomTabBarButton = () => {

    const navigation = useNavigation();

    return(
        <View style={{flex:1.1,alignItems:'center'}}>
            <TouchableOpacity 
              activeOpacity={.95}
              onPress={() => navigation.navigate('CreatePost')}>
              <LinearGradient
                  colors={["#1A30FF","#7987FF"]}
                  style={{
                    height:55,
                    width:55,
                    borderRadius:55,
                    top:0,
                    alignItems:'center',
                    justifyContent:'center',
                  }}
                  >
                  <FeatherIcon color={COLORS.white} size={28} name='plus'/>
              </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const BottomNavigation = () => {

  const theme = useTheme();
    const {colors} = theme;

    return (
        <Tab.Navigator
            //tabBar={props => <CustomNavigation {...props} />}
            screenOptions={{
                headerShown:false,
                tabBarStyle:{
                    height:55,
                    borderTopWidth:0,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 4.65,
        
                    elevation: 8,
                },
            }}
            initialRouteName="Home"
        >
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    tabBarIconStyle:{
                      top: Platform.OS === 'ios' ?  12 : 0,
                    },
                    tabBarIcon:({focused}) => (
                      <View>
                        <Image
                          source={IMAGES.home1}
                          style={{
                            height:20,
                            width:20,
                            tintColor:focused ? theme.dark ? COLORS.white : COLORS.primary6 : theme.dark ? 'rgba(255,255,255,.5)' : colors.title,
                            marginTop:4,
                          }}
                        />
                      </View>
                    ),
                    tabBarLabel:({focused})=>(<Text style={{top:Platform.OS === 'ios' ? 28 : 0,...FONTS.fontXs,color:focused ? colors.title : colors.textLight,marginBottom:5}}>Home</Text>)
                }}
            />
            <Tab.Screen 
                name="MyNetwork"
                component={MyNetwork}
                options={{
                  tabBarIconStyle:{
                    top: Platform.OS === 'ios' ?  12 : 0,
                  },
                    tabBarIcon:({focused}) => (
                      <View>
                        <Image
                          source={IMAGES.network}
                          style={{
                            height:22,
                            width:22,
                            tintColor:focused ? theme.dark ? COLORS.white : COLORS.primary6 : theme.dark ? 'rgba(255,255,255,.5)' : colors.title,
                            marginTop:4,
                          }}
                        />
                      </View>
                    ),
                    tabBarLabel:({focused})=>(<Text style={{top:Platform.OS === 'ios' ? 28 : 0,...FONTS.fontXs,color:focused ? colors.title : colors.textLight,marginBottom:5}}>My Network</Text>)
                }}
            />
            <Tab.Screen 
                name="CreatePost2"
                component={CreatePost}
                options={{
                    tabBarButton: props => <CustomTabBarButton {...props} />
                }}
            />
            <Tab.Screen 
                name="Notifications"
                component={Notifications}
                options={{
                  tabBarIconStyle:{
                    top: Platform.OS === 'ios' ?  12 : 0,
                  },
                    tabBarIcon:({focused}) => (
                      <View>
                        <Image
                          source={IMAGES.bell}
                          style={{
                            height:20,
                            width:20,
                            tintColor:focused ? theme.dark ? COLORS.white : COLORS.primary6 : theme.dark ? 'rgba(255,255,255,.5)' : colors.title,
                            marginTop:4,
                          }}
                        />
                      </View>
                    ),
                    tabBarLabel:({focused})=>(<Text style={{top:Platform.OS === 'ios' ? 28 : 0,...FONTS.fontXs,color:focused ? colors.title : colors.textLight,marginBottom:5}}>Notifications</Text>)
                }}
            />
            <Tab.Screen 
                name="Jobs"
                component={Jobs}
                options={{
                  tabBarIconStyle:{
                    top: Platform.OS === 'ios' ?  12 : 0,
                  },
                    tabBarIcon:({focused}) => (
                      <View>
                        <Image
                          source={IMAGES.shootcase}
                          style={{
                            height:20,
                            width:20,
                            tintColor:focused ? theme.dark ? COLORS.white : COLORS.primary6 : theme.dark ? 'rgba(255,255,255,.5)' : colors.title,
                            marginTop:4,
                          }}
                        />
                      </View>
                    ),
                    tabBarLabel:({focused})=>(<Text style={{top:Platform.OS === 'ios' ? 28 : 0,...FONTS.fontXs,color:focused ? colors.title : colors.textLight,marginBottom:5}}>Jobs</Text>)
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;