import React from 'react';
import { 
    SafeAreaView, ScrollView, Text, TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FONTS } from '../../constants/theme';
import Header from '../../layout/Header';
import { removeUser } from '../../Redux/reducer/user';
import Auth from '../../Service/Auth';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const SettingsData = [
    {
        title : 'Profile Layout',
        icon  : 'layout',
        navigate : 'ProfileLayout',
    },
    {
        title : 'Notification',
        icon  : 'bell',
        navigate : 'PushNotification',
    },
    {
        title : 'Security',
        icon  : 'shield-check',
        navigate : 'Security',
    },
    {
        title : 'Account',
        icon  : 'user',
        navigate : 'Account',
    },
    {
        title : 'About',
        icon  : 'info',
        navigate : 'About',
    },
    {
        title : 'Theme',
        icon  : 'color-palette-outline',
        navigate : 'theme',
    },
    {
        title : 'Log out',
        icon  : 'logout',
        action : 'logout',
    },
    
]


const Settings = (props) => {
    const {colors} = useTheme();
    const dispatch = useDispatch();
    const navigation = props.navigation;

    const handleLogout = async () => {
        try {
            await Auth.logout();
            // Limpar a pilha de navegação e ir para a tela de login
            navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
            });
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            if (Platform.OS === 'android') {
                ToastAndroid.show('Erro ao fazer logout', ToastAndroid.LONG);
            } else {
                Alert.alert('Erro', 'Não foi possível completar o logout');
            }
        }
    }
    
    return (
        <SafeAreaView style={[GlobalStyleSheet.container,{flex:1,backgroundColor:colors.background,padding:0}]}>
            <Header title={'Settings'} leftIcon={'back'}/>
            <ScrollView contentContainerStyle={{paddingVertical:15}} showsHorizontalScrollIndicator={false}>
                {SettingsData.map((data,index) => {
                    return(
                        <TouchableOpacity 
                            onPress={()=> data.action ? handleLogout() : props.navigation.navigate(data.navigate)}
                            key={index}
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                marginHorizontal:15,
                                paddingVertical:12,
                                borderBottomWidth:1,
                                borderColor:colors.borderColor,
                            }}
                        >
                            {data.icon === "logout" ?
                                <MaterialIcons style={{marginRight:10}} name={data.icon} color={colors.title} size={21}/>
                                :
                            data.icon === "shield-check" ?
                                <Octicons style={{marginRight:10}} name={data.icon} color={colors.title} size={20}/>    
                                :   
                            data.icon === "color-palette-outline" ?
                                <Ionicons style={{marginRight:10}} name={data.icon} color={colors.title} size={20}/>    
                                :   
                                <FeatherIcon style={{marginRight:10}} name={data.icon} color={colors.title} size={20}/>
                            }

                            <Text style={{...FONTS.font,fontSize:16,fontFamily:'PoppinsMedium',color:colors.title,flex:1}}>{data.title}</Text>
                         
                            <FeatherIcon name='chevron-right' color={colors.title} size={24}/>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );
};



export default Settings;