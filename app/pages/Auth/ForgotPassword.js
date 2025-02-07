import React, { useState } from 'react';
import { 
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
import { useNavigation, useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { database } from '../../../firebaseConfig';

const ForgotPassword = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email) {
            alert('Por favor, insira seu email');
            return;
        }

        setLoading(true);
        try {
            const usersRef = ref(database, "users");
            const emailQuery = query(usersRef, orderByChild("emailId"), equalTo(email));
            const snapshot = await get(emailQuery);

            if (snapshot.exists()) {
                navigation.navigate('EnterCode', { email });
            } else {
                alert('Email não encontrado. Verifique se digitou corretamente.');
            }
        } catch (error) {
            alert('Erro ao processar sua solicitação. Tente novamente.');
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
                                Esqueceu sua senha?
                            </Text>
                            <Text style={[FONTS.font, { color: colors.text, textAlign: 'center', opacity: 0.7 }]}>
                                Digite seu email para receber o código de recuperação
                            </Text>
                        </View>

                        <View style={[GlobalStyleSheet.container, { width: '100%' }]}>
                            <View style={{ marginBottom: 15 }}>
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

                            <TouchableOpacity
                                onPress={handleSubmit}
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
                                        {loading ? 'Enviando...' : 'Enviar código'}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <View style={[styles.linkContainer, { marginTop: 10 }]}>
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate('SignIn')}
                                    style={{ 
                                        height: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={[FONTS.font, { color: COLORS.primary }]}>
                                        Voltar para o login
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
    gradient: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linkContainer: {
        marginTop: 20,
        paddingHorizontal: 10
    }
});

export default ForgotPassword;
