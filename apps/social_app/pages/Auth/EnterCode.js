import React, { useState } from 'react';
import { 
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';
import OTPTextInput from 'react-native-otp-textinput';
import CustomButton from '../../components/CustomButton';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES, ICONS, IMAGES } from '../../constants/theme';

const EnterCode = (props) => {

    const [otpValue , setOtpValue] = useState(true);
   
    return (
    <>
      <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1,backgroundColor:'#fff'}]}>
        <KeyboardAvoidingView
            style={{
                flex:1
            }}
            behavior={Platform.OS === "ios" ? "padding" : ""}
        >
        <ScrollView contentContainerStyle={{flexGrow:1}}>
           
            <View style={{
                flex:1,
                alignItems:'center',
                justifyContent:'center',
                minHeight:200,
            }}>
                <LinearGradient
                    colors={['#F7F5FF','rgba(255,255,255,0)']}
                    style={{
                        height:135,
                        width:135,
                        borderRadius:135,
                        position:'absolute',
                        top:20,
                        right:-50,
                        transform:[{rotate:'-120deg'}]
                    }}
                ></LinearGradient>
                <LinearGradient
                    colors={['#F7F5FF','rgba(255,255,255,0)']}
                    style={{
                        height:135,
                        width:135,
                        borderRadius:135,
                        position:'absolute',
                        bottom:0,
                        left:-50,
                        transform:[{rotate:'120deg'}]
                    }}
                ></LinearGradient>
                <Image
                    style={{
                        width:100,
                        height:100,
                        marginBottom:40,
                        resizeMode:'contain',
                    }}
                    source={IMAGES.appLogo}
                />
                <Image 
                    style={{
                        position:'absolute',
                        bottom:0,
                        width:'100%',
                        resizeMode:'stretch',
                        height:65,
                        //tintColor:colors.backgroundColor,
                    }}
                    source={IMAGES.loginShape}
                />
            </View>
            <View style={{backgroundColor:'#332A5E'}}>
                <View style={[GlobalStyleSheet.container,{paddingTop:5}]}>
                    <View>
                        <Text style={[FONTS.h2,{textAlign:'center',color:COLORS.white}]}>Enter Code</Text>
                        <Text style={[FONTS.font,{textAlign:'center',color:COLORS.white,opacity:.7}]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </Text>
                    </View>
                    
                    <View style={{alignItems:'center'}}>
                        <OTPTextInput 
                            tintColor={COLORS.primary}
                            textInputStyle={{
                                borderBottomWidth : 2,
                                color :COLORS.title,
                            }}
                            containerStyle={{
                                width : 300,
                                marginVertical:20
                            }}
                            
                        />
                    </View>
                    <View style={{paddingBottom:10,flexDirection:'row'}}>
                        <TouchableOpacity
                            onPress={()=> props.navigation.navigate('ForgotPassword')}
                            style={{
                                backgroundColor:'rgba(255,255,255,.1)',
                                width:50,
                                borderRadius:SIZES.radius,
                                alignItems:'center',
                                justifyContent:'center',
                                marginRight:10,
                            }}
                        >
                            <SvgXml
                                style={{marginLeft:6}}
                                xml={ICONS.back}
                            />
                        </TouchableOpacity>
                        <View style={{flex:1}}>
                            <CustomButton
                                onPress={()=> props.navigation.navigate('ChangePassword')}
                                // disabled={otpValue}
                                title="NEXT"
                            />
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:15,marginTop:5}}>
                        <Text style={[FONTS.font,{color:COLORS.white,opacity:.7}]}>Didn’t you received any code?</Text>
                        <TouchableOpacity 
                            style={{marginLeft:5}}>
                            <Text style={[FONTS.fontLg,{color:COLORS.primary,textDecorationLine:'underline'}]}>Resend</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};



const styles = StyleSheet.create({

    inputStyle:{
        height:50,
        padding:5,
        paddingHorizontal:15,
        borderWidth : 1,
        borderColor : COLORS.borderColor,
        borderRadius: SIZES.radius,
        marginBottom:15,
        flexDirection:'row',
        alignItems:'center',
    },
    
})


export default EnterCode;
