import React, { useState, useEffect } from 'react';
import { 
    ActivityIndicator, 
    Image, 
    Platform, 
    SafeAreaView, 
    ScrollView, 
    Text, 
    TouchableOpacity, 
    View, 
    Alert,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/Input/CustomInput';
import StudentStats from '../../components/StudentStats/StudentStats';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from '../../constants/theme';
import Header from '../../layout/Header';
import Auth from '../../Service/Auth';
import { database } from '../../../firebaseConfig';
import { ref, update } from 'firebase/database';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import useUser from '../../hooks/useUser';
import OptionBar from '../../components/Modal/OptionBar';

const schoolYears = [
    "Maternal I",
    "Maternal II",
    "Maternal III",
    "Jardim I",
    "Jardim II",
    "1º Ano",
    "2º Ano",
    "3º Ano",
    "4º Ano",
    "5º Ano",
    "6º Ano",
    "7º Ano",
    "8º Ano",
    "9º Ano",
    "1º Ano - Médio",
    "2º Ano - Médio",
    "3º Ano - Médio"
];

const genderOptions = [
    "Masculino",
    "Feminino",
    "Outro",
    "Prefiro não informar"
];

const EditProfile = () => {
    const {colors} = useTheme();
    const dispatch = useDispatch();
    const { user: userData, loading: userLoading, error: userError, refreshUser } = useUser();
    
    // Estados do formulário
    const [imgUrl, setImgUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [schoolYear, setSchoolYear] = useState('');
    const [address, setAddress] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [bio, setBio] = useState('');
    const [userId, setUserId] = useState(null);

    // Mock de dados de estatísticas do aluno (substitua por dados reais do banco)
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

    // Estados do modal
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(''); // 'gender' ou 'schoolYear'

    // Atualiza os estados quando os dados do usuário são carregados
    useEffect(() => {
        if (userData) {
            console.log('==== DADOS DO USUÁRIO NO EDITPROFILE ====');
            console.log('Dados brutos do hook:', userData);
            
            // Remove o sufixo "- Fundamental" se existir
            const normalizedSchoolYear = userData.schoolYear ? userData.schoolYear.replace(' - Fundamental', '') : '';
            console.log('Série normalizada:', normalizedSchoolYear);
            console.log('A série normalizada está na lista?', schoolYears.includes(normalizedSchoolYear));
            
            setImgUrl(userData.img || '');
            setName(userData.name || '');
            setEmail(userData.emailId || '');
            setPhone(userData.phone || '');
            setBio(userData.bio || '');
            setUserId(userData.id || '');
            setBirthDate(userData.birthDate || '');
            setGender(userData.gender || '');
            setSchoolYear(normalizedSchoolYear);
            setAddress(userData.address || '');
            setNeighborhood(userData.neighborhood || '');
            setCity(userData.city || '');
            setZipCode(userData.cep || '');
        }
    }, [userData]);

    // Handler para o input de telefone
    const handlePhoneChange = (value) => {
        // Remove qualquer caractere não numérico
        const numericValue = value.replace(/\D/g, '');
        // Converte para número
        setPhone(numericValue ? parseInt(numericValue, 10) : 0);
    };

    const handleProfileImage = async () => {
        if (Platform.OS === 'android') {
            try {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access media library is required!');
                    return;
                }
    
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
    
                if (!result.canceled) {
                    setImgUrl(result.assets[0].uri);
                }
            } catch (e) {
                console.error('Error selecting image:', e);
            }
        }
    };

    const openModal = (type) => {
        setModalType(type);
        setModalVisible(true);
        Keyboard.dismiss();
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleSelect = (value) => {
        if (modalType === 'gender') {
            setGender(value);
        } else if (modalType === 'schoolYear') {
            setSchoolYear(value);
        }
    };

    const getModalOptions = () => {
        if (modalType === 'gender') {
            return ['Masculino', 'Feminino', 'Outro'];
        } else if (modalType === 'schoolYear') {
            return schoolYears;
        }
        return [];
    };

    const getModalTitle = () => {
        if (modalType === 'gender') {
            return 'Selecione o Sexo';
        } else if (modalType === 'schoolYear') {
            return 'Selecione o Ano Escolar';
        }
        return '';
    };

    const handleSaveProfile = async () => {
        try {
            setLoading(true);
            console.log('Iniciando salvamento do perfil...');

            // Validações básicas
            if (!userId) {
                console.error('userId não encontrado!');
                Alert.alert('Erro', 'ID do usuário não encontrado');
                setLoading(false);
                return;
            }

            if (!name.trim()) {
                Alert.alert('Erro', 'O nome é obrigatório');
                setLoading(false);
                return;
            }

            if (!email.trim()) {
                Alert.alert('Erro', 'O email é obrigatório');
                setLoading(false);
                return;
            }

            // Prepara os dados atualizados
            const updatedUserData = {
                ...userData, // Mantém outros campos que possam existir
                id: userId,
                name: name.trim(),
                emailId: email.trim(),
                phone: phone || 0,
                bio: bio?.trim(),
                img: imgUrl,
                birthDate: birthDate?.trim(),
                gender,
                schoolYear,
                address: address?.trim(),
                neighborhood: neighborhood?.trim(),
                city: city?.trim(),
                cep: zipCode?.trim(),
                updatedAt: new Date().toISOString()
            };

            console.log('Dados a serem salvos:', updatedUserData);

            // Atualiza no Realtime Database
            const userRef = ref(database, `users/${userId}`);
            await update(userRef, updatedUserData);
            console.log('Dados atualizados no Realtime Database');

            // Atualiza no AsyncStorage
            await Auth.setAccount(updatedUserData);
            console.log('Dados atualizados no AsyncStorage');

            // Atualiza os dados no hook
            await refreshUser();
            console.log('Dados atualizados no hook');

            Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
            setLoading(false);
        } catch (error) {
            console.error('Erro ao salvar perfil:', error);
            console.error('Código do erro:', error.code);
            console.error('Mensagem do erro:', error.message);
            Alert.alert('Erro', 'Falha ao atualizar perfil. Por favor, tente novamente.');
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
            <OptionBar 
                visible={modalVisible}
                onClose={closeModal}
                title={getModalTitle()}
                options={getModalOptions()}
                onSelect={handleSelect}
                selectedValue={modalType === 'gender' ? gender : schoolYear}
            />
            {(loading || userLoading) && (
                <View style={{position:'absolute', zIndex:1, height:'100%', width:'100%', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,0,0,.3)'}}>
                    <ActivityIndicator size={'large'} color={COLORS.white}/>
                </View>
            )}

            {userError && (
                <View style={{padding: 20}}>
                    <Text style={{color: 'red'}}>Erro ao carregar dados do usuário</Text>
                </View>
            )}

            <Header title={'Editar perfil'} leftIcon={'back'} />

            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex: 1}}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
                enabled
            >
                <ScrollView 
                    style={{backgroundColor: '#FFFFFF'}} 
                    contentContainerStyle={{paddingBottom: 100}}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={GlobalStyleSheet.container}>
                            <View style={{alignItems:'center',marginBottom:20}}>
                                <View>
                                    <TouchableOpacity
                                        onPress={handleProfileImage}
                                        style={{
                                            height:35,
                                            width:35,
                                            position:'absolute',
                                            bottom:0,
                                            right:0,
                                            backgroundColor:COLORS.primary,
                                            borderRadius:30,
                                            zIndex:1,
                                            alignItems:'center',
                                            justifyContent:'center',
                                        }}
                                    >
                                        <SvgXml
                                            xml={ICONS.camera}
                                            height={16}
                                            width={16}
                                            fill={COLORS.white}
                                        />
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            height:100,
                                            width:100,
                                            borderRadius:50,
                                            backgroundColor:colors.cardBg,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:'100%',
                                                width:'100%',
                                                borderRadius:50,
                                            }}
                                            source={imgUrl ? {uri: imgUrl} : IMAGES.user}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>Nome</Text>
                                <CustomInput
                                    icon={<FontAwesome name={'user'} size={20} color={colors.textLight}/>}
                                    value={name}
                                    placeholder="Digite seu nome"
                                    onChangeText={setName}
                                />
                            </View>

                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>Email</Text>
                                <CustomInput
                                    icon={<MaterialIcon name={'email'} size={20} color={colors.textLight}/>}
                                    value={email}
                                    placeholder="Digite seu email"
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                />
                            </View>

                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>Telefone</Text>
                                <CustomInput
                                    icon={<FontAwesome name={'phone'} size={20} color={colors.textLight}/>}
                                    value={phone ? phone.toString() : ''} 
                                    placeholder="Digite seu telefone"
                                    onChangeText={handlePhoneChange}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>Data de Nascimento</Text>
                                <CustomInput
                                    icon={<FontAwesome name={'calendar'} size={20} color={colors.textLight}/>}
                                    value={birthDate}
                                    placeholder="DD/MM/AAAA"
                                    onChangeText={setBirthDate}
                                />
                            </View>

                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>Sexo</Text>
                                <TouchableOpacity
                                    onPress={() => openModal('gender')}
                                    style={{
                                        height: 50,
                                        borderRadius: SIZES.radius,
                                        borderWidth: 1,
                                        borderColor: colors.border,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 15,
                                    }}
                                >
                                    <FontAwesome name={'user'} size={20} color={colors.textLight} style={{marginRight: 10}}/>
                                    <Text style={{...FONTS.font, color: gender ? colors.title : colors.text, flex: 1}}>
                                        {gender || 'Selecione o sexo'}
                                    </Text>
                                    <FontAwesome name="chevron-down" size={14} color={colors.text} />
                                </TouchableOpacity>
                            </View>

                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>Série</Text>
                                <TouchableOpacity
                                    onPress={() => openModal('schoolYear')}
                                    style={{
                                        height: 50,
                                        borderRadius: SIZES.radius,
                                        borderWidth: 1,
                                        borderColor: colors.border,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 15,
                                    }}
                                >
                                    <FontAwesome name={'graduation-cap'} size={20} color={colors.textLight} style={{marginRight: 10}}/>
                                    <Text style={{...FONTS.font, color: schoolYear ? colors.title : colors.text, flex: 1}}>
                                        {schoolYear || 'Selecione a série'}
                                    </Text>
                                    <FontAwesome name="chevron-down" size={14} color={colors.text} />
                                </TouchableOpacity>
                            </View>

                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>Endereço</Text>
                                <CustomInput
                                    icon={<FontAwesome name={'map-marker'} size={20} color={colors.textLight}/>}
                                    value={address}
                                    placeholder="Digite seu endereço"
                                    onChangeText={setAddress}
                                />
                            </View>

                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>Bairro</Text>
                                <CustomInput
                                    icon={<FontAwesome name={'map'} size={20} color={colors.textLight}/>}
                                    value={neighborhood}
                                    placeholder="Digite seu bairro"
                                    onChangeText={setNeighborhood}
                                />
                            </View>

                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>Cidade</Text>
                                <CustomInput
                                    icon={<FontAwesome name={'building'} size={20} color={colors.textLight}/>}
                                    value={city}
                                    placeholder="Digite sua cidade"
                                    onChangeText={setCity}
                                />
                            </View>

                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>CEP</Text>
                                <CustomInput
                                    icon={<FontAwesome name={'map-pin'} size={20} color={colors.textLight}/>}
                                    value={zipCode}
                                    placeholder="00000-000"
                                    onChangeText={setZipCode}
                                    keyboardType="numeric"
                                    maxLength={9}
                                />
                            </View>

                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>Bio</Text>
                                <CustomInput
                                    icon={<FontAwesome name={'pencil'} size={20} color={colors.textLight}/>}
                                    value={bio}
                                    placeholder="Escreva algo sobre você"
                                    onChangeText={setBio}
                                    multiline
                                    numberOfLines={4}
                                    style={{height: 100, textAlignVertical: 'top'}}
                                />
                            </View>

                            <View style={{paddingVertical:10}}>
                                <CustomButton 
                                    onPress={handleSaveProfile}
                                    title={'Salvar'}
                                    color="#FFB6C1" // Rosa pastel
                                    btnLight={true}
                                    style={{
                                        shadowColor: "#FFB6C1",
                                        shadowOpacity: 0.3,
                                    }}
                                />
                            </View>

                          
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default EditProfile;