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
    ActivityIndicator,
    Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, IMAGES, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomButton from '../../components/CustomButton';
import uuid from 'react-native-uuid';
import Auth from '../../Service/Auth';
import { useNavigation } from '@react-navigation/native';

const CreateAccount = (props) => {

    const navigation = useNavigation();
    const { colors } = useTheme();

    const [passwordShow, setPasswordShow] = useState(true);
    const [loading, setLoading] = useState(false);
    const [name, setname] = useState('');
    const [emailId, setEmailId] = useState('');
    const [pass, setpass] = useState('');

    const handndleShowPassword = () => {
        setPasswordShow(!passwordShow);
    }

    const registerUser = async () => {

        let token = Platform.OS === 'android' ? '': '';

        if(name == "" || emailId == "" || pass == ""){
            setLoading(false);
            {Platform.OS === 'android' ?
                ToastAndroid.show('Fill in all the fields!' , ToastAndroid.LONG)
              :
                Alert.alert('Fill in all the fields!')
            }
            return false;
        }
        setLoading(true);
        let data = {
            id : uuid.v4(),
            name : name,
            emailId : emailId,
            password : pass,
            img : '',
            tokenId : token ,
        }

        Auth.registerUser(name, emailId, pass, data)
        .then((response) => {
            if (response.success) {
                navigation.navigate('SignIn');
                setname('');
                setEmailId('');
                setpass('');
                setLoading(false);
            } else {
                console.log(response.message);
                setLoading(false);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }

    return (
        <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1,backgroundColor:'#fff'}]}>
            {loading ?
                <View
                    style={{
                        position:'absolute',
                        zIndex:1,
                        height:'100%',
                        width:'100%',
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'rgba(0,0,0,.3)',
                    }}
                >
                    <ActivityIndicator size={'large'} color={COLORS.white}/>
                </View>
                :
                null
            }
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
                        <View style={{marginBottom:30}}>
                            <Text style={[FONTS.h2,{textAlign:'center',color:COLORS.white}]}>Criar Conta</Text>
                            <Text style={[FONTS.font,{textAlign:'center',color:COLORS.white,opacity:.7}]}>Preencha os dados para criar sua conta</Text>
                        </View>

                        <View style={{marginBottom:15}}>
                            <View style={{position:'relative'}}>
                                <View style={styles.inputIcon}>
                                    <FeatherIcon 
                                        name="user" 
                                        size={20} 
                                        color={COLORS.white} 
                                        style={{opacity:0.6}}
                                    />
                                </View>
                                <TextInput
                                    style={[styles.inputStyle]}
                                    placeholder="Digite seu nome"
                                    placeholderTextColor={'rgba(255,255,255,.6)'}
                                    onChangeText={(value)=> setname(value)}
                                    value={name}
                                />
                            </View>
                        </View>

                        <View style={{marginBottom:15}}>
                            <Text style={{...FONTS.font,marginBottom:8,color:colors.title}}>E-mail</Text>
                            <TextInput
                                style={{
                                    ...styles.inputStyle,
                                    backgroundColor:colors.cardBg,
                                    color:colors.title,
                                    borderColor:colors.borderColor,
                                }}
                                placeholder="Digite seu e-mail"
                                placeholderTextColor={colors.text}
                                value={emailId}
                                onChangeText={(text) => setEmailId(text)}
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={{marginBottom:15}}>
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
                                    secureTextEntry={passwordShow}
                                    style={[styles.inputStyle]}
                                    placeholder="Digite sua senha"
                                    placeholderTextColor={'rgba(255,255,255,.6)'}
                                    onChangeText={(value)=> setpass(value)}
                                    value={pass}
                                />
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Show password"
                                    accessibilityHint="Show password"
                                    style={styles.eyeIcon}
                                    onPress={() => setPasswordShow(!passwordShow)}
                                >
                                    <FeatherIcon 
                                        name={passwordShow ? "eye-off" : "eye"} 
                                        size={20} 
                                        color={COLORS.white} 
                                        style={{opacity:0.6}}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{paddingBottom:10}}>
                            <CustomButton 
                                onPress={registerUser}
                                title="Criar Conta"
                            />
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:15}}>
                            <Text style={[FONTS.font,{color:COLORS.white,opacity:.7}]}>Já tem uma conta? </Text>
                            <TouchableOpacity 
                                style={{marginLeft:5}}
                                onPress={() => navigation.navigate('SignIn')}
                            >
                                <Text style={[FONTS.fontLg,{color:COLORS.primary}]}>Entrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputStyle:{
        ...FONTS.fontLg,
        height:50,
        paddingLeft:60,
        borderWidth:1,
        borderRadius:SIZES.radius,
        backgroundColor:'rgba(255,255,255,.05)',
        borderColor:'rgba(255,255,255,.3)',
        color:COLORS.white,
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

export default CreateAccount;
