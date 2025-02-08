// SignIn.js
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
  Alert
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';
import CustomButton from '../../../components/CustomButton';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import { COLORS, FONTS, SIZES, IMAGES, ICONS } from '../../../constants/theme';
import Header from '../../../layout/Header';
import { login } from '../../../Service/Auth';

const SignIn = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(true);

  const handleShowPassword = () => setPasswordShow(!passwordShow);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha email e senha.');
      return;
    }
    const account = await login(email, password);
    if (account) {
      // Exemplo: navega para a tela "Home" após login bem-sucedido
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header transparent leftIcon="back" />
        <LinearGradient style={{ flex: 1 }} colors={['#FFCD90', '#FE9063']}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/images/global/icons/inteli_icon.png')}
              style={styles.logoImage}
            />
            <Image
              style={[styles.bgShape, { tintColor: colors.backgroundColor }]}
              source={IMAGES.bgShape}
            />
          </View>
          <View style={{ backgroundColor: colors.backgroundColor }}>
            <View style={GlobalStyleSheet.container}>
              <View style={{ marginBottom: 20 }}>
                <Text style={[FONTS.h2, { textAlign: 'center', color: colors.title }]}>
                  Sign in
                </Text>
                <Text style={[FONTS.font, { textAlign: 'center', color: colors.text }]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                </Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                <View style={styles.inputIcon}>
                  <SvgXml xml={ICONS.user} />
                </View>
                <TextInput
                  style={[styles.inputStyle, { borderColor: colors.borderColor, color: colors.title }]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor={colors.text}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={{ marginBottom: 15 }}>
                <View style={styles.inputIcon}>
                  <SvgXml xml={ICONS.lock} />
                </View>
                <TextInput
                  secureTextEntry={passwordShow}
                  style={[styles.inputStyle, { borderColor: colors.borderColor, color: colors.title }]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor={colors.text}
                />
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Password"
                  accessibilityHint="Show/Hide password"
                  onPress={handleShowPassword}
                  style={styles.eyeIcon}
                >
                  <SvgXml xml={passwordShow ? ICONS.eyeClose : ICONS.eyeOpen} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'flex-end', marginBottom: 15 }}>
                <TouchableOpacity style={{ marginLeft: 5 }}>
                  <Text style={[FONTS.fontLg, { color: COLORS.primary, textDecorationLine: 'underline' }]}>
                    Forgot Password
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ paddingBottom: 10 }}>
                <CustomButton title="SIGN IN" onPress={handleSignIn} />
              </View>
              <Text style={[FONTS.font, { textAlign: 'center', color: colors.text }]}>
                Or sign in with
              </Text>
              <View style={styles.socialContainer}>
                <TouchableOpacity style={{ marginHorizontal: 10 }}>
                  <Image style={styles.socialIcon} source={IMAGES.google} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 10 }}>
                  <Image style={styles.socialIcon} source={IMAGES.facebook} />
                </TouchableOpacity>
              </View>
              <View style={styles.signupContainer}>
                <Text style={[FONTS.font, { color: colors.text }]}>Don’t have an account?</Text>
                <TouchableOpacity style={{ marginLeft: 5 }}>
                  <Text style={[FONTS.fontLg, { color: COLORS.primary, textDecorationLine: 'underline' }]}>
                    Signup here
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  logoImage: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  bgShape: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    resizeMode: 'stretch',
    height: 80,
  },
  inputStyle: {
    ...FONTS.fontLg,
    height: 50,
    paddingLeft: 60,
    borderWidth: 1,
    borderRadius: SIZES.radius,
  },
  inputIcon: {
    backgroundColor: COLORS.yellow,
    height: 40,
    width: 40,
    borderRadius: 10,
    position: 'absolute',
    left: 5,
    top: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    zIndex: 1,
    top: 0,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  socialIcon: {
    height: 36,
    width: 36,
    resizeMode: 'contain',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  }
});

export default SignIn;
