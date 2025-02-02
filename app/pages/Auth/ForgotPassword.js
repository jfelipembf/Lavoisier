import React, { useState } from 'react';
import { 
    Image,
    SafeAreaView,
    ScrollView, 
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, IMAGES, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomButton from '../../components/CustomButton';

const ForgotPassword = (props) => {
    const {colors} = useTheme();
    const [email, setemail] = useState('');

    const resetPassword = () => {
        // implement reset password logic here
    };

    return (
    <>
      <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1,backgroundColor:'#fff'}]}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            
                <View style={{
                    flex:1,
                    alignItems:'center',
                    justifyContent:'center',
                    minHeight:250,
                    paddingHorizontal: 20,
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
                            width:120,
                            height:120,
                            marginBottom:20,
                            resizeMode: 'contain'
                        }}
                        source={require('../../assets/images/global/Lavoisier.png')}
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
                        <View style={{marginBottom:25}}>
                            <Text style={[FONTS.h2,{textAlign:'center',color:COLORS.white}]}>Esqueceu sua senha?</Text>
                            <Text style={[FONTS.font,{textAlign:'center',color:COLORS.white,opacity:.7}]}>Digite seu email para recuperar sua senha</Text>
                        </View>

                        <View style={{marginBottom:15}}>
                            <Text style={[FONTS.font,{color:COLORS.white,marginBottom:8}]}>Email</Text>
                            <View style={{position:'relative'}}>
                                <View style={styles.inputIcon}>
                                    <FeatherIcon 
                                        name="mail" 
                                        size={20} 
                                        color={COLORS.white} 
                                        style={{opacity:0.6}}
                                    />
                                </View>
                                <TextInput
                                    style={[styles.inputStyle,{
                                        backgroundColor:'rgba(255,255,255,.05)',
                                        borderColor:'rgba(255,255,255,.3)',
                                        color:COLORS.white,
                                    }]}
                                    placeholder="Digite seu email"
                                    placeholderTextColor={'rgba(255,255,255,.6)'}
                                    onChangeText={(value)=> setemail(value)}
                                    value={email}
                                />
                            </View>
                        </View>

                        <View style={{marginBottom:20}}>
                            <CustomButton 
                                onPress={resetPassword}
                                title="Recuperar Senha"
                            />
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'center',marginBottom:20}}>
                            <Text style={[FONTS.font,{color:COLORS.white,opacity:.7}]}>Lembrou sua senha? </Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
                                <Text style={[FONTS.fontLg,{color:COLORS.primary}]}>Entrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
    inputStyle:{
        height:50,
        paddingLeft:45,
        paddingRight:45,
        fontSize:16,
        borderWidth:1,
        borderRadius:SIZES.radius,
    },
    inputIcon:{
        backgroundColor:'transparent',
        width:42,
        height:50,
        position:'absolute',
        left:0,
        top:0,
        zIndex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})

export default ForgotPassword;
