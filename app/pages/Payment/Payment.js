import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Auth from '../../Service/Auth';
import useUser from '../../hooks/useUser';
import { useNavigation } from '@react-navigation/native';
import Header from '../../layout/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Cores pastéis personalizadas
const PASTEL_COLORS = {
    blue: '#cee7e6',    // Azul pastel
    green: '#eae3ef',   // Verde pastel
    red: '#f2eee9',     // Vermelho pastel
    yellow: '#f3dfde',  // Amarelo pastel
};

const paymentMethods = [
    {
        id: 'pix',
        title: 'PIX',
        icon: 'qrcode',
        description: 'Pagamento instantâneo',
        color: PASTEL_COLORS.green
    },
    {
        id: 'boleto',
        title: 'Boleto',
        icon: 'barcode',
        description: 'Vencimento em 3 dias úteis',
        color: PASTEL_COLORS.blue
    },
    {
        id: 'card',
        title: 'Cartão',
        icon: 'credit-card',
        description: 'Débito ou Crédito',
        color: PASTEL_COLORS.yellow
    }
];

const Payment = ({ route }) => {
    const navigation = useNavigation();
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [userId, setUserId] = useState(null);
    const [imgUrl, setImageUrl] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const tempData = await Auth.getAccount();
            if (tempData) {
                const data = JSON.parse(tempData);
                setEmail(data.emailId);
                setName(data.name);
                setImageUrl(data.img);
                setUserId(data.id);
            }
        } catch (error) {
            console.log('Erro ao buscar usuário:', error);
        }
    };

    const StudentCard = () => (
        <View style={styles.studentCard}>
            <View style={styles.studentInfo}>
                <Image
                    source={imgUrl ? { uri: imgUrl } : IMAGES.user3}
                    style={styles.studentPhoto}
                />
                <View style={styles.studentDetails}>
                    <Text style={styles.studentName}>{name || 'Carregando...'}</Text>
                    <Text style={styles.studentEmail}>{email || 'Carregando...'}</Text>
                </View>
            </View>
        </View>
    );

    const DetailItem = ({ label, value }) => (
        <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );

    const PaymentMethodCard = ({ method }) => (
        <TouchableOpacity 
            style={[
                styles.paymentCard,
                selectedMethod === method.id && { borderColor: method.color, borderWidth: 2 }
            ]}
            onPress={() => setSelectedMethod(method.id)}
        >
            <View style={[styles.paymentIcon, { backgroundColor: method.color }]}>
                <FontAwesome name={method.icon} size={24} color="#666666" />
            </View>
            <View style={styles.paymentInfo}>
                <Text style={styles.paymentTitle}>{method.title}</Text>
                <Text style={styles.paymentDescription}>{method.description}</Text>
            </View>
            <View style={styles.radioButton}>
                <View style={[
                    styles.radioCircle,
                    selectedMethod === method.id && styles.radioCircleSelected
                ]} />
            </View>
        </TouchableOpacity>
    );

    const handlePayment = () => {
        if (selectedMethod) {
            // Aqui implementaria a lógica de pagamento
            alert(`Processando pagamento via ${selectedMethod}`);
        } else {
            alert('Por favor, selecione um método de pagamento');
        }
    };

    return (
        <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#FFFFFF'}]}>
            <Header 
                title={'Pagamento'} 
                titleLeft 
                leftIcon="back"
                onPressLeft={() => navigation.goBack()}
            />
            
            <ScrollView 
                style={{backgroundColor: '#FFFFFF'}} 
                contentContainerStyle={{paddingBottom: 100}}
            >
                <View style={{flex:1, backgroundColor: '#FFFFFF'}}>
                    <View style={GlobalStyleSheet.container}>
                        <StudentCard />

                        <View style={styles.paymentSection}>
                            <View style={styles.courseInfo}>
                                <Text style={styles.courseTitle}>{route.params?.title || 'Mensalidade Escolar'}</Text>
                                <Text style={styles.courseValue}>{route.params?.value || 'R$ 1.200,00'}</Text>
                            </View>

                            <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
                            
                            {paymentMethods.map(method => (
                                <PaymentMethodCard 
                                    key={method.id} 
                                    method={method} 
                                />
                            ))}
                        </View>

                        <TouchableOpacity 
                            style={[
                                styles.payButton,
                                !selectedMethod && styles.payButtonDisabled
                            ]}
                            onPress={handlePayment}
                            disabled={!selectedMethod}
                        >
                            <Text style={styles.payButtonText}>Pagar Agora</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    studentCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },
    studentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    studentPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    studentDetails: {
        flex: 1,
    },
    studentName: {
        ...FONTS.fontBold,
        fontSize: 16,
        marginBottom: 4,
    },
    studentId: {
        ...FONTS.fontSm,
        color: '#666666',
        marginBottom: 2,
    },
    studentEmail: {
        ...FONTS.fontSm,
        color: '#666666',
    },
    paymentSection: {
        marginTop: 20
    },
    courseInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: 15,
        backgroundColor: PASTEL_COLORS.blue,
        borderRadius: 8
    },
    courseTitle: {
        ...FONTS.h6,
        color: '#333333'
    },
    courseValue: {
        ...FONTS.h5,
        color: '#333333'
    },
    sectionTitle: {
        ...FONTS.h6,
        color: '#333333',
        marginBottom: 15
    },
    paymentCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 12,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5'
    },
    paymentIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    paymentInfo: {
        flex: 1
    },
    paymentTitle: {
        ...FONTS.h6,
        color: '#333333',
        marginBottom: 4
    },
    paymentDescription: {
        ...FONTS.fontXs,
        color: '#666666'
    },
    radioButton: {
        marginLeft: 10
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioCircleSelected: {
        borderColor: PASTEL_COLORS.blue,
        backgroundColor: PASTEL_COLORS.blue
    },
    payButton: {
        backgroundColor: PASTEL_COLORS.blue,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20
    },
    payButtonDisabled: {
        opacity: 0.5
    },
    payButtonText: {
        ...FONTS.font,
        color: '#333333',
        fontWeight: 'bold'
    }
});

export default Payment;
