import React, { useState } from 'react';
import { 
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
} from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/CustomButton';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES, IMAGES, ICONS } from '../../constants/theme';
import Auth from '../../Service/Auth';
import { useNavigation } from '@react-navigation/native';
import { setUser } from '../../Redux/reducer/user';


const SignIn = (props) => {

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const [passwordShow , setPasswordShow ] = useState(true);
    const [loading , setLoading ] = useState(false);
    
    const handndleShowPassword = () => {
        setPasswordShow(!passwordShow);
    }

    const [emailId , setEmailId] = useState('');
    const [pass , setpass] = useState('');

    const loginUser = async () => {
        try{
            if(emailId == "" || pass == ""){
                setLoading(false);
                {Platform.OS === 'android' ?
                    ToastAndroid.show('Fill in all the fields!' , ToastAndroid.LONG)
                  :
                    Alert.alert('Fill in all the fields!')
                }
                return false;
            }
            setLoading(true);

            Auth.userLogin(emailId, pass)
            .then((user) => {
                if (user) {
                    
                    dispatch(setUser(user));
                    Auth.setAccount(user);

                    navigation.navigate('DrawerNavigation',{screen : 'Home'})
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })
            .catch((error) => {
              console.error("Error during login:", error);
              setLoading(false);
            });

        }
        catch(e){
            console.log(e);
        }

    }


    return (
    <>
      <SafeAreaView style={[GlobalStyleSheet.container,{padding:0, flex:1,backgroundColor:'#fff'}]}>

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
                            <Text style={[FONTS.h2,{textAlign:'center',color:COLORS.white}]}>Bem-vindo de volta!</Text>
                            <Text style={[FONTS.font,{textAlign:'center',color:COLORS.white , opacity:.7}]}>Entre com seu email e senha para continuar</Text>
                        </View>

                        <View style={{marginBottom:15}}>
                            <Text style={[FONTS.font,{color:COLORS.white,marginBottom:8}]}>E-mail</Text>
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
                                    style={[styles.inputStyle,{
                                        backgroundColor:'rgba(255,255,255,.05)',
                                        borderColor:'rgba(255,255,255,.3)',
                                        color:COLORS.white,
                                    }]}
                                    placeholder="Digite seu e-mail"
                                    placeholderTextColor={'rgba(255,255,255,.6)'}
                                    value={emailId}
                                    onChangeText={(text) => setEmailId(text)}
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>
                        <View style={{marginBottom:25}}>
                            <Text style={[FONTS.font,{color:COLORS.white,marginBottom:8}]}>Senha</Text>
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
                                    style={[styles.inputStyle,{
                                        backgroundColor:'rgba(255,255,255,.05)',
                                        borderColor:'rgba(255,255,255,.3)',
                                        color:COLORS.white,
                                    }]}
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

                        <TouchableOpacity 
                            onPress={() => props.navigation.navigate('ForgotPassword')}
                            style={{
                                alignItems:'flex-end',
                                marginBottom: 20
                            }}
                        >
                            <Text style={[FONTS.font,{color:COLORS.primary}]}>Esqueceu sua senha?</Text>
                        </TouchableOpacity>

                        <View style={{marginBottom:25}}>
                            <CustomButton 
                                onPress={loginUser}
                                title="Entrar"
                            />
                        </View>

                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                marginBottom:20,
                            }}
                        >
                            <View
                                style={{
                                    height:1,
                                    flex:1,
                                    backgroundColor:'rgba(255,255,255,.15)',
                                }}
                            />
                            <Text style={[FONTS.font,{textAlign:'center',color:COLORS.white,opacity:.7,paddingHorizontal:15}]}>Ou entre com</Text>
                            <View
                                style={{
                                    height:1,
                                    flex:1,
                                    backgroundColor:'rgba(255,255,255,.15)',
                                }}
                            />
                        </View>

                        <View style={{marginBottom:25}}>
                            <TouchableOpacity
                                style={{
                                    flexDirection:'row',
                                    backgroundColor:'#fff',
                                    borderRadius:SIZES.radius,
                                    height:45,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    paddingHorizontal:18,
                                }}
                            >
                                <Image style={{height:20,width:20,marginRight:12,resizeMode:'contain'}} source={IMAGES.google}/>
                                <Text style={{...FONTS.fontLg}}>Google</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'center',marginBottom:15}}>
                            <Text style={[FONTS.font,{color:COLORS.white,opacity:.7}]}>Não tem uma conta? </Text>
                            <TouchableOpacity 
                                onPress={() => props.navigation.navigate('CreateAccount')}
                            >
                                <Text style={[FONTS.fontLg,{color:COLORS.primary}]}>Cadastre-se</Text>
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


export default SignIn;
