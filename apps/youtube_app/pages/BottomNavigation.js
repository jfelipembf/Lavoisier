import React from 'react';
import { Image, View, Text, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import Home from './Home/Home';
import Shorts from './Shorts/Shorts';
import Subscribes from './Subscribes/Subscribes';
import Library from './Library/Library';

const Tab = createBottomTabNavigator();

const CreatePost = () => {
  return
}

const CustomTabBarButton = () => {

    const navigation = useNavigation();

    return(
        <View style={{flex:1.1,alignItems:'center'}}>
            <TouchableOpacity 
              activeOpacity={.9}
              onPress={() => navigation.navigate('CreatePost')}
            >
              <LinearGradient
                  colors={["#00AB8C","#0BE1BA"]}
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

    const {colors} = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown:false,
                tabBarStyle:{
                    height:55,
                    borderTopWidth:1,
                    borderTopColor:colors.borderColor,
                    position:'absolute',
                    bottom:0,
                    elevation: 0,
                    left:0,
                    right:0,
                },
            }}
            initialRouteName="Home"
        >
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    tabBarIconStyle:{
                      top:Platform.OS === 'ios' ? 12 : 0,
                    },
                    tabBarIcon:({focused}) => (
                      <View>
                        <Image
                          source={IMAGES.home1}
                          style={{
                            height:20,
                            width:20,
                            tintColor:focused ? COLORS.primary7 : colors.title,
                            marginTop:4,
                          }}
                        />
                      </View>
                    ),
                    tabBarLabel:({focused})=>(<Text style={{top:Platform.OS === 'ios' ? 28 : 0,...FONTS.fontXs,color:colors.title,marginBottom:5}}>Home</Text>)
                }}
            />
            <Tab.Screen 
                name="Shorts"
                component={Shorts}
                options={{
                  tabBarIconStyle:{
                    top: Platform.OS === 'ios' ? 12 : 0,
                  },
                    tabBarIcon:({focused}) => (
                      <View>
                        <Image
                          source={IMAGES.reels}
                          style={{
                            height:18,
                            width:18,
                            tintColor:focused ? COLORS.primary7 : colors.title,
                            marginTop:4,
                          }}
                        />
                      </View>
                    ),
                    tabBarLabel:({focused})=>(<Text style={{top:Platform.OS === 'ios' ? 28 : 0,...FONTS.fontXs,color:colors.title,marginBottom:5}}>Shorts</Text>)
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
                name="Subscribes"
                component={Subscribes}
                options={{
                  tabBarIconStyle:{
                    top:Platform.OS === 'ios' ? 12 : 0,
                  },
                    tabBarIcon:({focused}) => (
                      <View>
                        <Image
                          source={IMAGES.subscribes}
                          style={{
                            height:20,
                            width:20,
                            tintColor:focused ? COLORS.primary7 : colors.title,
                            marginTop:4,
                          }}
                        />
                      </View>
                    ),
                    tabBarLabel:({focused})=>(<Text style={{top:Platform.OS === 'ios' ? 28 : 0,...FONTS.fontXs,color:colors.title,marginBottom:5}}>Subscribes</Text>)
                }}
            />
            <Tab.Screen 
                name="Library"
                component={Library}
                options={{
                  tabBarIconStyle:{
                    top:Platform.OS === 'ios' ? 12 : 0,
                  },
                    tabBarIcon:({focused}) => (
                      <View>
                        <Image
                          source={IMAGES.library}
                          style={{
                            height:20,
                            width:20,
                            tintColor:focused ? COLORS.primary7 : colors.title,
                            marginTop:4,
                          }}
                        />
                      </View>
                    ),
                    tabBarLabel:({focused})=>(<Text style={{top:Platform.OS === 'ios' ? 28 : 0,...FONTS.fontXs,color:colors.title,marginBottom:5}}>Library</Text>)
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;