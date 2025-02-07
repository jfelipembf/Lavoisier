import React, { useState, useEffect } from "react";
import { 
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from "react-native-svg";
import { useFocusEffect, useNavigation, useTheme } from "@react-navigation/native";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS, FONTS, ICONS, IMAGES } from "../../constants/theme";
import Header from "../../layout/Header";
import Auth from "../../Service/Auth";
import useUser from "../../hooks/useUser";
import StudentStats from "../../components/StudentStats/StudentStats";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Profile1 = () => {
    const user = useUser();
    const {colors} = useTheme();
    const navigation = useNavigation();
    const [email , setEmail] = useState('');
    const [name , setName] = useState('');
    const [userId, setUserId] = useState(null);
    const [imgUrl, setImageUrl] = useState(null);  
    const [studentStats, setStudentStats] = useState({
        totalQuestions: 150,
        correctAnswers: 120,
        wrongAnswers: 30,
        totalClasses: 100,
        attendanceCount: 95,
        totalAssignments: 50,
        completedAssignments: 48,
        overallGrade: 8.5
    });

    useEffect(() => {
        const fetchUser = async () => {
            const account = await Auth.getAccount();
            if (account) {
                const parsedAccount = JSON.parse(account);
                setUserId(parsedAccount.id); 
            }
        };

        fetchUser();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getUser();
          return () => {};
        }, [])
    );
  
    const getUser = async () => {
        let tempData = await Auth.getAccount();
        let data = JSON.parse(tempData);

        setEmail(data.emailId);
        setName(data.name);
        setImageUrl(data.img);
    }

    const handleLogout = () => {
        Alert.alert(
            "Sair",
            "Tem certeza que deseja sair?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: async () => {
                        await Auth.logout();
                        navigation.replace('SignIn');
                    }
                }
            ]
        );
    };

    return(
        <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#FFFFFF'}]}>
            <View>
                <Header 
                    title={'Perfil'} 
                    titleLeft 
                    bgWhite
                />
                <View style={{
                    position: 'absolute',
                    right: 15,
                    top: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: '100%'
                }}>
                   
                    <TouchableOpacity
                        onPress={handleLogout}
                        style={{
                            height: 45,
                            width: 45,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <MaterialIcons name="logout" size={24} color={colors.title} />
                    </TouchableOpacity>
                </View>
            </View>
            
            <ScrollView style={{backgroundColor: '#FFFFFF'}} contentContainerStyle={{paddingBottom: 100}}>
                <View style={{flex:1, backgroundColor: '#FFFFFF'}}>
                    <View style={GlobalStyleSheet.container}>
                        <View style={{marginBottom:15,flexDirection:'row',alignItems:'center'}}>
                            <View style={{flex:1}}>
                                <Text style={[FONTS.font,{marginBottom:2,color:colors.text}]}>{email}</Text>
                                <Text style={[FONTS.h4,{marginBottom:2,color:colors.title}]}>{name}</Text>
                                {user && <Text style={[FONTS.fontSm,{color:colors.text}]}>{user.schoolYear}</Text>}
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={()=> navigation.navigate('EditProfile')}
                                    activeOpacity={.9}
                                    style={{
                                        height:35,
                                        width:35,
                                        borderRadius:10,
                                        backgroundColor:COLORS.primary,
                                        position:'absolute',
                                        zIndex:1,
                                        bottom:-4,
                                        left:-4,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        shadowColor: COLORS.primary,
                                        shadowOffset: {
                                            width: 0,
                                            height: 5,
                                        },
                                        shadowOpacity: 0.34,
                                        shadowRadius: 6.27,
                                        elevation: 10,
                                    }}
                                >
                                    <SvgXml height={16} width={16} fill={COLORS.white} xml={ICONS.edit}/>
                                </TouchableOpacity>
                                <LinearGradient
                                    colors={['#FE9063', '#704FFE']}
                                    style={{
                                        height:100,
                                        width:100,
                                        borderRadius:30,
                                        padding:2,
                                    }}
                                >
                                    <View style={{padding:6,backgroundColor:colors.background,borderRadius:30}}>
                                        <Image
                                            style={{
                                                height:'100%',
                                                width:'100%',
                                                borderRadius:22,
                                            }}
                                            source={imgUrl ? {uri : imgUrl} : IMAGES.user}
                                        />
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>

                        {/* Componente de estatísticas do aluno */}
                        <StudentStats stats={studentStats} />

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile1;