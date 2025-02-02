import React, { useState } from "react";
import { 
    Image,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { List } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { useFocusEffect, useNavigation, useTheme } from "@react-navigation/native";
import Ripple from 'react-native-material-ripple';
import ImageViewer from 'react-native-image-zoom-viewer';
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from "../../constants/theme";
import { MOTIVATIONAL_QUOTES } from "../../constants/MotivationalQuotes";
import Header from "../../layout/Header";
import Auth from "../../Service/Auth";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BackgroundGradient from '../../components/BackgroundGradient';
import { getAuth, signOut } from 'firebase/auth';
import { Alert } from 'react-native';

const postImages = [
    {
        url: '',
        props : {
            source : IMAGES.post3
        }
    },
    {
        url: '',
        props : {
            source : IMAGES.post4
        }
    },
    {
        url: '',
        props : {
            source : IMAGES.post5
        }
    },
    {
        url: '',
        props : {
            source : IMAGES.post6
        }
    },
    {
        url: '',
        props : {
            source : IMAGES.post2
        }
    },
    {
        url: '',
        props : {
            source : IMAGES.post3
        }
    },
    {
        url: '',
        props : {
            source : IMAGES.post4
        }
    },
    {
        url: '',
        props : {
            source : IMAGES.post5
        }
    },
]


const statsData = {
    questoesRespondidas: 150,
    acertos: 120,
    erros: 30,
    colocacao: 5,
    totalAlunos: 100,
    mediaPontos: 85,
};

const settingsOptions = [
    {
        title: 'Editar Perfil',
        icon: 'account-edit',
        color: COLORS.primary,
    },
    {
        title: 'Notificações',
        icon: 'bell-outline',
        color: COLORS.warning,
    },
    {
        title: 'Privacidade',
        icon: 'shield-check',
        color: COLORS.success,
    },
    {
        title: 'Ajuda e Suporte',
        icon: 'help-circle',
        color: COLORS.info,
    },
    {
        title: 'Sair',
        icon: 'logout',
        color: COLORS.danger,
    },
];

const Profile1 = () => {
    
    const {colors} = useTheme();
    const navigation = useNavigation();
    const refRBSheet = React.useRef();
    const RBSheetReport = React.useRef();
    const refSuccessSheet = React.useRef();
    const auth = getAuth();

    const [postModal , setPostModal] = useState(false);
    const [postView , setPostView] = useState('grid');
    const [postIndex , setPostIndex] = useState(0);
    const [email , setEmail] = useState('');
    const [name , setName] = useState('');
    const [imgUrl, setImageUrl] = useState(null);  
    const [schoolYear, setSchoolYear] = useState('');
    const [motivationalQuote, setMotivationalQuote] = useState({});

    const handleEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
            });
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível fazer logout. Tente novamente.');
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getUser();
            // Seleciona uma frase aleatória
            const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
            setMotivationalQuote(MOTIVATIONAL_QUOTES[randomIndex]);
          return () => {};
        }, [])
    );

    const getUser = async () => {

        let tempData = await Auth.getAccount();
        let data = JSON.parse(tempData);


        setEmail(data.emailId);
        setName(data.name);
        setImageUrl(data.img);
        setSchoolYear(data.schoolYear);
    }

    //console.log(imgUrl);

    const postOption = () => {
        return(
            <View>
                <List.Item
                    style={{paddingHorizontal:15}}
                    titleStyle={{...FONTS.font,fontSize:16,color:COLORS.danger}}
                    onPress={() => {RBSheetReport.current.open();refRBSheet.current.close()}}
                    title={"Report"}
                    left={() => 
                        <SvgXml
                            style={{
                                marginRight:5,
                            }}
                            height={20}
                            width={20}
                            fill={COLORS.danger}
                            xml={ICONS.info}
                        />
                    }
                />
                <List.Item
                    style={{paddingHorizontal:15}}
                    titleStyle={{...FONTS.font,fontSize:16,color:colors.title}}
                    onPress={() => {}}
                    title={"Share"}
                    left={() => 
                        <SvgXml
                            style={{
                                marginRight:5,
                            }}
                            height={20}
                            width={20}
                            stroke={colors.title}
                            xml={ICONS.share2}
                        />
                    }
                />
            </View>
        )
    }

    const reportData = [
        "It's spam",
        "Nudity or sexual activity",
        "Hate speech or symbols",
        "I just dont't like it",
        "Bullying or harassment",
        "False information",
        "Violence or dangerous organizations",
        "Scam or fraud",
        "Intellectual property violation",
        "Sale of illegal or regulated goods",
        "Suicide or self-injury",
        "Eating disorders",
        "Something else"
    ];


    return(
        <SafeAreaView style={{ flex: 1 }}>
            <BackgroundGradient>
                <RBSheet
                    ref={refSuccessSheet}
                    closeOnDragDown={true}
                    height={180}
                    openDuration={300}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'rgba(0,0,0,.3)',
                        },
                        container:{
                            backgroundColor:colors.card,
                            borderTopLeftRadius:15,
                            borderTopRightRadius:15,
                        },
                    }}
                >
                    <View style={{alignItems:'center',paddingTop:25}}>

                        <Image
                            source={IMAGES.check}
                            style={{
                                height:50,
                                width:50,
                                marginBottom:20,
                            }}
                        />
                        <Text style={{...FONTS.h5,color:colors.title}}>Thanks for letting us know</Text>
                    </View>
                    
                </RBSheet>

                <RBSheet    
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    height={170}
                    openDuration={300}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'rgba(0,0,0,.3)',
                        },
                        container:{
                            backgroundColor:colors.card,
                            borderTopLeftRadius:15,
                            borderTopRightRadius:15,
                        },
                    }}
                >
                    {postOption()}
                    
                </RBSheet>

                <RBSheet
                    ref={RBSheetReport}
                    closeOnDragDown={true}
                    height={600}
                    openDuration={300}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'rgba(0,0,0,.3)',
                        },
                        container:{
                            backgroundColor:colors.card,
                            borderTopLeftRadius:15,
                            borderTopRightRadius:15,
                        },
                    }}
                >
                    <View style={{alignItems:'center',borderBottomWidth:1,borderColor:colors.borderColor,paddingBottom:8,paddingTop:4}}>
                        <Text style={{...FONTS.h5,color:colors.title}}>Report</Text>
                    </View>
                    <View style={{padding:15}}>
                        <Text style={{...FONTS.h6,color:colors.title}}>Why are you reporting this post?</Text>
                        <Text style={{...FONTS.fontSm,color:colors.text}}>Your report is anonymous, except if you're reporting an intellectual property infirngement. If someone is in immediate danger, call the local emergency services - don't wait.</Text>
                    </View>
                    <ScrollView contentContainerStyle={{paddingBottom:20}}>
                        {reportData.map((data,index) => (
                            <List.Item
                                titleStyle={{color:colors.title}}
                                onPress={() => {refSuccessSheet.current.open();RBSheetReport.current.close()}}
                                key={index}
                                title={data}
                            />
                        ))}
                    </ScrollView>
                </RBSheet>

                <Header title="" />
                <ScrollView 
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: Platform.OS === 'ios' ? 50 : 20,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container}>
                        <View style={styles.profileHeader}>
                            <View style={[styles.profileImage, { backgroundColor: colors.cardBg }]}>
                                {imgUrl ? (
                                    <Image
                                        source={{ uri: imgUrl }}
                                        style={{ width: 80, height: 80, borderRadius: 40 }}
                                    />
                                ) : (
                                    <MaterialCommunityIcons
                                        name="account"
                                        size={40}
                                        color={COLORS.primary}
                                    />
                                )}
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={[styles.profileName, { color: colors.title }]}>
                                    {name}
                                </Text>
                                <Text style={[styles.profileSchool, { color: colors.text }]}>
                                    {email}
                                </Text>
                                <Text style={[styles.profileClass, { color: COLORS.primary }]}>
                                    {schoolYear}
                                </Text>
                            </View>
                        </View>

                        {/* Citação Motivacional */}
                        {motivationalQuote.quote && (
                            <View style={[styles.quoteCard, { backgroundColor: colors.cardBg }]}>
                                <MaterialCommunityIcons
                                    name="format-quote-open"
                                    size={24}
                                    color={COLORS.primary}
                                    style={styles.quoteIcon}
                                />
                                <Text style={[styles.quoteText, { color: colors.text }]}>
                                    "{motivationalQuote.quote}"
                                </Text>
                                <Text style={[styles.quoteAuthor, { color: colors.title }]}>
                                    - {motivationalQuote.author}
                                </Text>
                            </View>
                        )}

                        {/* Estatísticas Principais */}
                        <View style={styles.statsRow}>
                            <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
                                <MaterialCommunityIcons
                                    name="school"
                                    size={24}
                                    color={COLORS.primary}
                                />
                                <Text style={[styles.statValue, { color: colors.title }]}>
                                    {statsData.mediaPontos}
                                </Text>
                                <Text style={[styles.statLabel, { color: colors.text }]}>
                                    Média Geral
                                </Text>
                            </View>
                            <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
                                <MaterialCommunityIcons
                                    name="trophy"
                                    size={24}
                                    color={COLORS.warning}
                                />
                                <Text style={[styles.statValue, { color: colors.title }]}>
                                    {statsData.colocacao}º
                                </Text>
                                <Text style={[styles.statLabel, { color: colors.text }]}>
                                    Ranking
                                </Text>
                            </View>
                            <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
                                <MaterialCommunityIcons
                                    name="check-circle"
                                    size={24}
                                    color={COLORS.success}
                                />
                                <Text style={[styles.statValue, { color: colors.title }]}>
                                    {Math.round((statsData.acertos / statsData.questoesRespondidas) * 100)}%
                                </Text>
                                <Text style={[styles.statLabel, { color: colors.text }]}>
                                    Precisão
                                </Text>
                            </View>
                        </View>

                        {/* Estatísticas Detalhadas */}
                        <View style={[styles.detailsCard, { backgroundColor: colors.cardBg }]}>
                            <View style={styles.detailsHeader}>
                                <MaterialCommunityIcons
                                    name="chart-bar"
                                    size={24}
                                    color={COLORS.primary}
                                />
                                <Text style={[styles.detailsTitle, { color: colors.title }]}>
                                    Estatísticas Detalhadas
                                </Text>
                            </View>
                            <View style={styles.detailsGrid}>
                                <View style={styles.detailItem}>
                                    <Text style={[styles.detailValue, { color: colors.title }]}>
                                        {statsData.questoesRespondidas}
                                    </Text>
                                    <Text style={[styles.detailLabel, { color: colors.text }]}>
                                        Questões
                                    </Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={[styles.detailValue, { color: COLORS.success }]}>
                                        {statsData.acertos}
                                    </Text>
                                    <Text style={[styles.detailLabel, { color: colors.text }]}>
                                        Acertos
                                    </Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={[styles.detailValue, { color: COLORS.danger }]}>
                                        {statsData.erros}
                                    </Text>
                                    <Text style={[styles.detailLabel, { color: colors.text }]}>
                                        Erros
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Configurações */}
                        <View style={[styles.settingsCard, { backgroundColor: colors.cardBg }]}>
                            <View style={styles.settingsHeader}>
                                <MaterialCommunityIcons
                                    name="cog"
                                    size={24}
                                    color={COLORS.primary}
                                />
                                <Text style={[styles.settingsTitle, { color: colors.title }]}>
                                    Configurações
                                </Text>
                            </View>
                            {settingsOptions.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.settingsItem,
                                        index < settingsOptions.length - 1 && styles.settingsItemBorder
                                    ]}
                                    onPress={() => {
                                        if (option.title === 'Editar Perfil') {
                                            handleEditProfile();
                                        } else if (option.title === 'Sair') {
                                            handleLogout();
                                        }
                                    }}
                                >
                                    <View style={styles.settingsItemLeft}>
                                        <MaterialCommunityIcons
                                            name={option.icon}
                                            size={24}
                                            color={option.color}
                                            style={styles.settingsItemIcon}
                                        />
                                        <Text style={[styles.settingsItemText, { color: colors.title }]}>
                                            {option.title}
                                        </Text>
                                    </View>
                                    <MaterialCommunityIcons
                                        name="chevron-right"
                                        size={24}
                                        color={colors.text}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </BackgroundGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingBottom: Platform.OS === 'ios' ? 300 : 280,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        ...FONTS.h5,
        marginBottom: 4,
    },
    profileSchool: {
        ...FONTS.fontSm,
        marginBottom: 2,
    },
    profileClass: {
        ...FONTS.font,
        fontWeight: '600',
    },
    quoteCard: {
        padding: 15,
        borderRadius: SIZES.radius_sm,
        marginBottom: 15,
    },
    quoteIcon: {
        marginBottom: 10,
    },
    quoteText: {
        ...FONTS.font,
        fontStyle: 'italic',
        marginBottom: 10,
        lineHeight: 22,
    },
    quoteAuthor: {
        ...FONTS.fontSm,
        textAlign: 'right',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        borderRadius: SIZES.radius_sm,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 2.84,
        elevation: 3,
    },
    statValue: {
        ...FONTS.h5,
        fontWeight: '600',
        marginVertical: 8,
    },
    statLabel: {
        ...FONTS.fontXs,
    },
    detailsCard: {
        borderRadius: SIZES.radius_sm,
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 2.84,
        elevation: 3,
    },
    detailsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    detailsTitle: {
        ...FONTS.h6,
        marginLeft: 10,
    },
    detailsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailItem: {
        flex: 1,
        alignItems: 'center',
    },
    detailValue: {
        ...FONTS.h5,
        fontWeight: '600',
        marginBottom: 4,
    },
    detailLabel: {
        ...FONTS.fontSm,
    },
    settingsCard: {
        borderRadius: SIZES.radius_sm,
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 2.84,
        elevation: 3,
    },
    settingsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    settingsTitle: {
        ...FONTS.h6,
        marginLeft: 10,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    settingsItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    settingsItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsItemIcon: {
        marginRight: 12,
    },
    settingsItemText: {
        ...FONTS.font,
    },
});

export default Profile1;