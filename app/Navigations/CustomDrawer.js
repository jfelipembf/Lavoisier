import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { COLORS, FONTS } from '../constants/theme';
import Auth from '../Service/Auth';

const CustomDrawer = props => {
    const [userData, setUserData] = React.useState(null);

    React.useEffect(() => {
        const loadUser = async () => {
            try {
                const accountData = await Auth.getAccount();
                if (accountData) {
                    setUserData(JSON.parse(accountData));
                }
            } catch (error) {
                console.error('Erro ao carregar usuário:', error);
            }
        };

        loadUser();
    }, []);

    const handleLogout = async () => {
        try {
            await Auth.logout();
            // Limpar a pilha de navegação e ir para a tela de login
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
            });
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.headerContainer}>
                    <View style={styles.userInfoContainer}>
                        <Image
                            source={require('../assets/images/user.png')}
                            style={styles.userImage}
                        />
                        <View>
                            <Text style={styles.userName}>
                                {userData?.name || 'Usuário'}
                            </Text>
                            <Text style={styles.userClass}>
                                {userData?.schoolYear} {userData?.class} - {userData?.shift}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.drawerListContainer}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>

            <View style={styles.logoutContainer}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        ...FONTS.h4,
        color: COLORS.black,
    },
    userClass: {
        ...FONTS.body4,
        color: COLORS.gray,
    },
    drawerListContainer: {
        flex: 1,
        paddingTop: 10,
    },
    logoutContainer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
    },
    logoutButton: {
        padding: 15,
        borderRadius: 5,
        backgroundColor: COLORS.danger,
    },
    logoutText: {
        ...FONTS.h4,
        color: COLORS.white,
        textAlign: 'center',
    },
});

export default CustomDrawer;
