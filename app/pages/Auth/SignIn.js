import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    TextInput,
    StyleSheet,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Auth from '../../Service/Auth';

const SignIn = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        if (!email.includes('@')) {
            alert('Por favor, insira um email válido');
            return;
        }

        setLoading(true);
        try {
            const userData = await Auth.userLogin(email.toLowerCase().trim(), password);
            if (userData) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'DrawerNavigation' }],
                });
            }
        } catch (error) {
            alert(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
            console.error('Erro no login:', error);
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#FFFFFF'}]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 70}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 20
                    }}>
                        <View style={{
                            alignItems: 'center',
                            marginBottom: 40
                        }}>
                            <Image
                                style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'contain'
                                }}
                                source={IMAGES.appLogo}
                            />
                            <Text style={[FONTS.h3, { color: colors.title, textAlign: 'center', marginTop: 20 }]}>
                                Bem-vindo(a) de volta!
                            </Text>
                            <Text style={[FONTS.font, { color: colors.text, textAlign: 'center', opacity: 0.7 }]}>
                                Faça login para continuar
                            </Text>
                        </View>

                        <View style={[GlobalStyleSheet.container, { width: '100%' }]}>
                            <View style={{ marginBottom: 10 }}>
                                <TextInput
                                    style={[styles.inputStyle, { 
                                        backgroundColor: colors.card,
                                        borderColor: colors.borderColor,
                                        color: colors.text,
                                        height: 45
                                    }]}
                                    placeholder="Email"
                                    placeholderTextColor={colors.text}
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <TextInput
                                    style={[styles.inputStyle, { 
                                        backgroundColor: colors.card,
                                        borderColor: colors.borderColor,
                                        color: colors.text,
                                        height: 45
                                    }]}
                                    placeholder="Senha"
                                    placeholderTextColor={colors.text}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                            </View>

                            <TouchableOpacity
                                onPress={handleLogin}
                                disabled={loading}
                                style={{ opacity: loading ? 0.7 : 1 }}
                            >
                                <LinearGradient
                                    colors={[COLORS.primary, COLORS.secondary]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={[styles.button]}
                                >
                                    <Text style={[FONTS.h4, { 
                                        color: COLORS.white,
                                        lineHeight: 45,
                                        textAlignVertical: 'center'
                                    }]}>
                                        {loading ? 'Carregando...' : 'Entrar'}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <View style={[styles.linkContainer, { marginTop: 10 }]}>
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate('ForgotPassword')}
                                    style={{ 
                                        height: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={[FONTS.font, { color: COLORS.primary }]}>
                                        Esqueceu a senha?
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate('CreateAccount')}
                                    style={{ 
                                        height: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={[FONTS.font, { color: COLORS.primary }]}>
                                        Criar conta
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        ...FONTS.fontLg,
        height: 50,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 12,
    },
    button: {
        height: 45,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        overflow: 'hidden'
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 10
    }
});

export default SignIn;
