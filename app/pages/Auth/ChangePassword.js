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

const ChangePassword = (props) => {  
    const [currentPasswordShow, setCurrentPasswordShow] = useState(true);
    const [newPasswordShow, setNewPasswordShow] = useState(true);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const changePassword = () => {
        // implement change password logic here
    }

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
                        }}
                        source={IMAGES.loginShape}
                    />
                </View>
                <View style={{backgroundColor:'#332A5E'}}>
                    <View style={[GlobalStyleSheet.container,{paddingTop:5}]}>
                        <View style={{marginBottom:25}}>
                            <Text style={[FONTS.h2,{textAlign:'center',color:COLORS.white}]}>Alterar Senha</Text>
                            <Text style={[FONTS.font,{textAlign:'center',color:COLORS.white,opacity:.7}]}>Digite sua nova senha</Text>
                        </View>

                        <View style={{marginBottom:15}}>
                            <Text style={[FONTS.font,{color:COLORS.white,marginBottom:8}]}>Senha Atual</Text>
                            <View style={{position:'relative'}}>
                                <View style={styles.inputIcon}>
                                    <FeatherIcon 
                                        name="lock" 
                                        size={20} 
                                        color={COLORS.white} 
                                        style={{opacity:0.6}}
                                    />
                                </View>
                                <TextInput
                                    secureTextEntry={currentPasswordShow}
                                    style={[styles.inputStyle,{
                                        backgroundColor:'rgba(255,255,255,.05)',
                                        borderColor:'rgba(255,255,255,.3)',
                                        color:COLORS.white,
                                    }]}
                                    placeholder="Digite sua senha atual"
                                    placeholderTextColor={'rgba(255,255,255,.6)'}
                                    onChangeText={(value)=> setCurrentPassword(value)}
                                    value={currentPassword}
                                />
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Show current password"
                                    accessibilityHint="Show current password"
                                    style={styles.eyeIcon}
                                    onPress={() => setCurrentPasswordShow(!currentPasswordShow)}
                                >
                                    <FeatherIcon 
                                        name={currentPasswordShow ? "eye-off" : "eye"} 
                                        size={20} 
                                        color={COLORS.white} 
                                        style={{opacity:0.6}}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{marginBottom:15}}>
                            <Text style={[FONTS.font,{color:COLORS.white,marginBottom:8}]}>Nova Senha</Text>
                            <View style={{position:'relative'}}>
                                <View style={styles.inputIcon}>
                                    <FeatherIcon 
                                        name="lock" 
                                        size={20} 
                                        color={COLORS.white} 
                                        style={{opacity:0.6}}
                                    />
                                </View>
                                <TextInput
                                    secureTextEntry={newPasswordShow}
                                    style={[styles.inputStyle,{
                                        backgroundColor:'rgba(255,255,255,.05)',
                                        borderColor:'rgba(255,255,255,.3)',
                                        color:COLORS.white,
                                    }]}
                                    placeholder="Digite sua nova senha"
                                    placeholderTextColor={'rgba(255,255,255,.6)'}
                                    onChangeText={(value)=> setNewPassword(value)}
                                    value={newPassword}
                                />
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Show new password"
                                    accessibilityHint="Show new password"
                                    style={styles.eyeIcon}
                                    onPress={() => setNewPasswordShow(!newPasswordShow)}
                                >
                                    <FeatherIcon 
                                        name={newPasswordShow ? "eye-off" : "eye"} 
                                        size={20} 
                                        color={COLORS.white} 
                                        style={{opacity:0.6}}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{marginBottom:25}}>
                            <Text style={[FONTS.font,{color:COLORS.white,marginBottom:8}]}>Confirmar Nova Senha</Text>
                            <View style={{position:'relative'}}>
                                <View style={styles.inputIcon}>
                                    <FeatherIcon 
                                        name="lock" 
                                        size={20} 
                                        color={COLORS.white} 
                                        style={{opacity:0.6}}
                                    />
                                </View>
                                <TextInput
                                    secureTextEntry={confirmPasswordShow}
                                    style={[styles.inputStyle,{
                                        backgroundColor:'rgba(255,255,255,.05)',
                                        borderColor:'rgba(255,255,255,.3)',
                                        color:COLORS.white,
                                    }]}
                                    placeholder="Confirme sua nova senha"
                                    placeholderTextColor={'rgba(255,255,255,.6)'}
                                    onChangeText={(value)=> setConfirmPassword(value)}
                                    value={confirmPassword}
                                />
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Show confirm password"
                                    accessibilityHint="Show confirm password"
                                    style={styles.eyeIcon}
                                    onPress={() => setConfirmPasswordShow(!confirmPasswordShow)}
                                >
                                    <FeatherIcon 
                                        name={confirmPasswordShow ? "eye-off" : "eye"} 
                                        size={20} 
                                        color={COLORS.white} 
                                        style={{opacity:0.6}}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{marginBottom:20}}>
                            <CustomButton 
                                onPress={changePassword}
                                title="Alterar Senha"
                            />
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
    },
    eyeIcon:{
        backgroundColor:'transparent',
        width:42,
        height:50,
        position:'absolute',
        right:0,
        top:0,
        zIndex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})

export default ChangePassword;
