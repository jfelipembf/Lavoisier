import { useEffect, useRef, useState } from 'react';
import { Image, Platform, TouchableOpacity, View, Animated, Text, Dimensions } from 'react-native';
import { COLORS,  SIZES, FONTS,IMAGES } from '../constants/theme';
import { useTheme } from '@react-navigation/native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { GlobalStyleSheet } from '../constants/StyleSheet';


const CustomNavigation = ({ state, descriptors, navigation }) => {


    const theme = useTheme();
    const  colors  = theme;

    const [tabWidth, setWidth] = useState(wp('100%'));

    const tabWD =
        tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5;

    const circlePosition = useRef(
        new Animated.Value(0),
    ).current;

    Dimensions.addEventListener('change', val => {
        setWidth(val.window.width);
    });
    
    useEffect(() => {
        Animated.spring(circlePosition, {
            toValue: state.index * tabWD,
            useNativeDriver: true,
        }).start();
    },[state.index,tabWidth])


    const onTabPress = (index) => {
        const tabW =
            tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5; // Adjust this according to your tab width

        Animated.spring(circlePosition, {
            toValue: index * tabW,
            useNativeDriver: true,
        }).start();
    };


    return (
        <View
            style={[{
                shadowColor: "#1630C2",
                shadowOffset: {
                    width: 0,
                    height: -10,
                },
                shadowOpacity: .18,
                shadowRadius: 5,
                // backgroundColor:colors.card
            }]}
        >
            <View
                style={{
                    height:55,
                    borderTopLeftRadius:20,
                    borderTopRightRadius:20,
                    backgroundColor:colors.card
                }}
            >
                <View 
                    style={[GlobalStyleSheet.container,{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        borderTopLeftRadius:20,
                        borderTopRightRadius:20,
                        
                    }]}
                >
                    <Animated.View
                        style={{
                            transform: [{translateX: circlePosition}],
                            borderTopLeftRadius:15,
                            borderTopRightRadius:15,
                            height:55
                        }}
                    >
                        <View
                            style={{
                                height:55,
                                width: tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5,
                                position:'absolute',
                                backgroundColor:theme.dark ? COLORS.themeSecondary : COLORS.themePrimary,
                                zIndex:1,
                                left:0,
                                bottom:0,
                                borderTopLeftRadius:15,
                                borderTopRightRadius:15,
                            }}
                        ></View>
                    </Animated.View>
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;


                        const iconTranslateY = useRef(new Animated.Value(0)).current;
                        Animated.timing(iconTranslateY, {
                            toValue: isFocused ? -20 : 0,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate({ name: route.name, merge: true });
                                onTabPress(index);
                            }
                        };

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={onPress}
                                style={{
                                    flex: 1, 
                                    alignItems: 'center', 
                                    height: '100%', 
                                    justifyContent: 'center', 
                                    marginTop: 8, 
                                }}
                            >
                                <Image
                                    style={{ 
                                        height:22,
                                        width:22,
                                        resizeMode:'contain',
                                        marginBottom:4,
                                        tintColor : isFocused ? COLORS.white : theme.dark ? COLORS.white : null ,
                                    }}
                                    source={
                                        label === "Components" ? IMAGES.heart2 :
                                        label === "Media" ? IMAGES.Image :
                                        label === "Home" ? IMAGES.home3 :
                                        label === "Pages" ? IMAGES.Paper :
                                        label === "Settings" && IMAGES.Setting
                                    }

                                />
                                <Text style={{...FONTS.fontXs,color:isFocused ? COLORS.white : "#838FD4"}}>{label === "Components" ? "Features" : label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

export default CustomNavigation;