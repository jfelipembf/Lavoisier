import React from 'react';
import { 
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../constants/theme';

const DrawerMenu = (props) => {
    const {colors} = useTheme();

    return (
        <View style={{flex:1}}>
            <View style={[styles.headerArea, {backgroundColor: '#fff'}]}>
                <Image 
                    source={require('../assets/images/global/Lavoisier.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>
            
            <View style={{flex:1,backgroundColor: colors.card}}>
                <View style={{paddingBottom:30,paddingHorizontal:15,paddingTop:20}}>
                    <TouchableOpacity
                        onPress={()=> props.navigation.navigate('Home')}
                        style={styles.menuItem}
                    >
                        <Text style={[styles.menuText,{color:colors.text}]}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=> props.navigation.navigate('Profile')}
                        style={styles.menuItem}
                    >
                        <Text style={[styles.menuText,{color:colors.text}]}>Perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=> props.navigation.navigate('Evaluation')}
                        style={styles.menuItem}
                    >
                        <Text style={[styles.menuText,{color:colors.text}]}>Avaliações</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=> props.navigation.navigate('Settings')}
                        style={styles.menuItem}
                    >
                        <Text style={[styles.menuText,{color:colors.text}]}>Configurações</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerContent}>
                        <Image 
                            source={require('../assets/images/global/inteli_icon.png')}
                            style={styles.footerLogo}
                            resizeMode="contain"
                        />
                        <View style={styles.footerTexts}>
                            <Text style={[styles.footerText, {color: colors.text}]}>InteliTec-Tecnologia</Text>
                            <Text style={[styles.footerSubText, {color: colors.text}]}>CNPJ: XX.XXX.XXX/0001-XX</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerArea: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        alignItems: 'flex-start',
        marginTop: -4,
    },
    logoImage: {
        height: 40,
        width: 120,
        marginTop: -4,
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginBottom: 5,
    },
    menuText: {
        ...FONTS.font,
        ...FONTS.fontBold,
        fontSize: 15,
    },
    footer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        marginTop: 'auto',
    },
    footerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerLogo: {
        height: 25,
        width: 25,
        marginRight: 10,
    },
    footerTexts: {
        flex: 1,
    },
    footerText: {
        ...FONTS.fontSm,
        fontSize: 12,
        marginBottom: 2,
    },
    footerSubText: {
        ...FONTS.fontSm,
        fontSize: 10,
        opacity: 0.7,
    },
});

export default DrawerMenu;