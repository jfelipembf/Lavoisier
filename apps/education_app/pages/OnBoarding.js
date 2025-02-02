import React from 'react';
import {
    SafeAreaView, 
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';

const OnBoarding = ({navigation}) => {

    return (
        <SafeAreaView
            style={[GlobalStyleSheet.container,{
                padding:0,
                flex:1,
            }]}
        >
            <LinearGradient
                colors={["#0539BE","#022685","#00215C"]}
                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                style={{
                    flex:1,
                }}
            >
                
                <LinearGradient
                    colors={["#1E5AF4","#00215C"]}
                    style={{
                        height:180,
                        width:180,
                        borderRadius:180,
                        position:'absolute',
                        bottom:'23%',
                        right:-70,
                    }}
                ></LinearGradient>

                <LinearGradient
                    colors={["#1152DE","#00215C"]}
                    style={{
                        height:132,
                        width:132,
                        borderRadius:132,
                        position:'absolute',
                        bottom:-25,
                        left:-30,
                    }}
                ></LinearGradient>
                <LinearGradient
                    colors={["#0539BE","#022685"]}
                    style={{
                        position:'absolute',
                        height:400,
                        width:600,
                        borderRadius:42,
                        left:-360,
                        top:50,
                        transform:[{rotate:"-35deg"}]
                    }}
                >
                </LinearGradient>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow:1,
                    }}
                >
                    <View style={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center',
                        paddingTop:70,
                        paddingBottom:40,
                    }}>
                        <Image
                            source={IMAGES.flyMan}
                            style={{
                                width:'100%',
                                height:230,
                                resizeMode:'contain',
                            }}
                        />
                    </View>
                    <View style={{
                        padding:25,
                    }}>
                        <View
                            style={{
                                backgroundColor:'rgba(255,255,255,.08)',
                                padding:30,
                                borderRadius:18,
                                alignItems:'flex-start',
                                position:'relative',
                                overflow:'hidden',
                            }}
                        >
                            {/* <BlurView
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    borderRadius:18,
                                }}
                                blurType="light"
                                overlayColor='transparent'
                                blurAmount={8}
                                blurRadius={10}
                            /> */}
                            <Text style={{...FONTS.h3,color:COLORS.white,marginBottom:2}}>Grow your creative skill with learn</Text>
                            <Text style={{...FONTS.font,fontSize:15,color:COLORS.white,opacity:.6,marginBottom:25}}>Here you can learn new  and most intresting things find now.</Text>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => navigation.navigate('DrawerNavigation')}
                                style={{
                                    backgroundColor:COLORS.white,
                                    height:55,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    borderRadius:30,
                                    paddingHorizontal:25,
                                    paddingRight:75,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize:18,
                                        fontFamily:"PoppinsMedium",
                                        color:"#000",
                                        top:1,
                                    }}
                                >Get Started</Text>
                                <LinearGradient
                                    colors={["#699EFF","#0459F5"]}
                                    style={{
                                        height:48,
                                        width:48,
                                        borderRadius:48,
                                        position:'absolute',
                                        right:4,
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }}
                                >
                                    <FeatherIcon 
                                        name={'arrow-right'}
                                        size={24}
                                        color={COLORS.white}
                                    />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default OnBoarding;