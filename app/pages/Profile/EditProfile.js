import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator,
    View,
    Text,
    Modal,
    FlatList,
    Platform,
    Alert,
    StyleSheet,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from '../../constants/theme';
import Header from '../../layout/Header';
import Auth from '../../Service/Auth';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BackgroundGradient from '../../components/BackgroundGradient';

const EditProfile = () => {
    const {colors} = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [imgUrl, setImgUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [showGenderModal, setShowGenderModal] = useState(false);
    const [showSchoolYearModal, setShowSchoolYearModal] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        emailId: '',
        gender: '',
        birthDate: '',
        phone: '',
        schoolYear: '',
        cep: '',
        address: '',
        city: '',
        state: '',
        img: '',
    });

    const genderOptions = [
        'Masculino',
        'Feminino',
        'Outro',
        'Prefiro não informar'
    ];

    const schoolYearOptions = [
        'Maternal I',
        'Maternal II',
        'Maternal III',
        '1º Ano',
        '2º Ano',
        '3º Ano',
        '4º Ano',
        '5º Ano',
        '6º Ano',
        '7º Ano',
        '8º Ano',
        '9º Ano',
        '1º Ano do Ensino Médio',
        '2º Ano do Ensino Médio',
        '3º Ano do Ensino Médio'
    ];

    useEffect(() => {
        getUser();
    },[]);

    const getUser = async () => {
        let tempData = await Auth.getAccount();
        let data = JSON.parse(tempData);
        setImgUrl(data.img || '');
        setFormData({
            id: data.id || '',
            name: data.name || '',
            emailId: data.emailId || '',
            gender: data.gender || '',
            birthDate: data.birthDate || '',
            phone: data.phone || '',
            schoolYear: data.schoolYear || '',
            cep: data.cep || '',
            address: data.address || '',
            city: data.city || '',
            state: data.state || '',
            img: data.img || '',
        });
    }

    const handleProfileImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Erro', 'Permissão para acessar a galeria é necessária!');
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
            Alert.alert('Erro', 'Falha ao selecionar imagem');
        }
    };

    const renderInput = (label, value, onChangeText, keyboardType = 'default', placeholder = '') => (
        <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: colors.title }]}>{label}</Text>
            <TextInput
                style={[styles.input, { 
                    backgroundColor: 'rgba(0,0,0,0.03)',
                    color: colors.title,
                    borderColor: 'rgba(0,0,0,0.1)',
                }]}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.text}
            />
        </View>
    );

    const renderDropdown = (label, value, onPress) => (
        <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: colors.title }]}>{label}</Text>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.input, {
                    backgroundColor: 'rgba(0,0,0,0.03)',
                    borderColor: 'rgba(0,0,0,0.1)',
                    justifyContent: 'center',
                }]}
            >
                <Text style={{
                    ...FONTS.font,
                    color: value ? colors.title : colors.text
                }}>
                    {value || `Selecione ${label}`}
                </Text>
            </TouchableOpacity>
        </View>
    );

    const DropdownModal = ({ visible, onClose, title, options, onSelect }) => (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={{
                flex:1,
                backgroundColor:'rgba(0,0,0,.5)',
                justifyContent:'flex-end',
            }}>
                <View style={{
                    backgroundColor:colors.background,
                    borderTopLeftRadius:20,
                    borderTopRightRadius:20,
                    padding:20,
                }}>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center',
                        marginBottom:15,
                    }}>
                        <Text style={{...FONTS.h6,color:colors.title}}>{title}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={{...FONTS.font,color:COLORS.primary}}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={options}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={{
                                    paddingVertical:15,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                }}
                                onPress={() => {
                                    onSelect(item);
                                    onClose();
                                }}
                            >
                                <Text style={{...FONTS.font,color:colors.title}}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item}
                    />
                </View>
            </View>
        </Modal>
    );

    const handleUpdateProfile = async () => {
        if (!formData.name.trim()) {
            Alert.alert('Erro', 'Por favor, insira seu nome');
            return;
        }

        if (!formData.id) {
            Alert.alert('Erro', 'ID do usuário não encontrado');
            return;
        }

        setLoading(true);
        try {
            const updatedData = {
                ...formData,
                id: formData.id, // Ensure we have the ID
            };

            // Pass both the user data and the new image URI (if changed)
            const success = await Auth.updateProfile(
                updatedData,
                imgUrl !== formData.img ? imgUrl : null
            );
            
            if (success) {
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Erro', 'Falha ao atualizar perfil');
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <BackgroundGradient>
                {loading && (
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
                )}

                <Header title="Editar Perfil" leftIcon={'back'} />
                
                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Cabeçalho do Perfil */}
                    <View style={styles.profileHeader}>
                        <View style={[styles.profileImage, { backgroundColor: colors.cardBg }]}>
                            <TouchableOpacity
                                onPress={handleProfileImage}
                                style={{
                                    height: 35,
                                    width: 35,
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: COLORS.primary,
                                    borderRadius: 30,
                                    zIndex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 3,
                                    borderColor: colors.background,
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="camera"
                                    size={18}
                                    color={COLORS.white}
                                />
                            </TouchableOpacity>
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
                                {formData.name || 'Seu Nome'}
                            </Text>
                            <Text style={[styles.profileSchool, { color: colors.text }]}>
                                {formData.emailId}
                            </Text>
                            <Text style={[styles.profileClass, { color: COLORS.primary }]}>
                                {formData.schoolYear || 'Selecione seu ano escolar'}
                            </Text>
                        </View>
                    </View>

                    {/* Informações Pessoais */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <MaterialCommunityIcons
                                name="account-edit"
                                size={24}
                                color={COLORS.primary}
                            />
                            <Text style={[styles.sectionTitle, { color: colors.title }]}>
                                Informações Pessoais
                            </Text>
                        </View>
                        
                        {renderInput('Nome', formData.name, (text) => setFormData({...formData, name: text}))}
                        {renderInput('E-mail', formData.emailId, (text) => setFormData({...formData, emailId: text}), 'email-address')}
                        {renderDropdown('Sexo', formData.gender, () => setShowGenderModal(true))}
                        {renderInput('Data de Nascimento', formData.birthDate, (text) => setFormData({...formData, birthDate: text}))}
                        {renderInput('Telefone', formData.phone, (text) => setFormData({...formData, phone: text}), 'phone-pad')}
                        {renderDropdown('Ano Escolar', formData.schoolYear, () => setShowSchoolYearModal(true))}
                    </View>

                    {/* Endereço */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <MaterialCommunityIcons
                                name="map-marker"
                                size={24}
                                color={COLORS.primary}
                            />
                            <Text style={[styles.sectionTitle, { color: colors.title }]}>
                                Endereço
                            </Text>
                        </View>
                        
                        {renderInput('CEP', formData.cep, (text) => setFormData({...formData, cep: text}))}
                        {renderInput('Endereço', formData.address, (text) => setFormData({...formData, address: text}))}
                        {renderInput('Cidade', formData.city, (text) => setFormData({...formData, city: text}))}
                        {renderInput('Estado', formData.state, (text) => setFormData({...formData, state: text}))}
                    </View>

                    {/* Botão de Salvar */}
                    <TouchableOpacity
                        onPress={handleUpdateProfile}
                        style={styles.saveButton}
                    >
                        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                        <MaterialCommunityIcons
                            name="content-save"
                            size={20}
                            color={COLORS.white}
                            style={{ marginLeft: 8 }}
                        />
                    </TouchableOpacity>
                </ScrollView>

                <DropdownModal
                    visible={showGenderModal}
                    onClose={() => setShowGenderModal(false)}
                    title="Selecione o sexo"
                    options={genderOptions}
                    onSelect={(value) => setFormData({...formData, gender: value})}
                />

                <DropdownModal
                    visible={showSchoolYearModal}
                    onClose={() => setShowSchoolYearModal(false)}
                    title="Selecione o ano escolar"
                    options={schoolYearOptions}
                    onSelect={(value) => setFormData({...formData, schoolYear: value})}
                />
            </BackgroundGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 15,
        paddingBottom: Platform.OS === 'ios' ? 120 : 100,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
    section: {
        marginBottom: 25,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        ...FONTS.h6,
        marginLeft: 10,
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputLabel: {
        ...FONTS.font,
        marginBottom: 8,
    },
    input: {
        ...FONTS.font,
        height: 45,
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderRadius: SIZES.radius,
        paddingHorizontal: 15,
        borderColor: 'rgba(0,0,0,0.1)',
        color: COLORS.title,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        height: 50,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        flexDirection: 'row',
    },
    saveButtonText: {
        ...FONTS.h6,
        color: COLORS.white,
    },
});

export default EditProfile;