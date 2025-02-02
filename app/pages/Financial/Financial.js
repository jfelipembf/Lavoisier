import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    Modal,
    Dimensions,
    Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Header from '../../layout/Header';
import BackgroundGradient from '../../components/BackgroundGradient';

const { width } = Dimensions.get('window');

const months = [
    { id: 1, name: 'Janeiro', paid: true, dueDate: '05/01/2025', value: 199.90 },
    { id: 2, name: 'Fevereiro', paid: false, dueDate: '05/02/2025', value: 199.90 },
    { id: 3, name: 'Março', paid: false, dueDate: '05/03/2025', value: 199.90 },
    { id: 4, name: 'Abril', paid: false, dueDate: '05/04/2025', value: 199.90 },
    { id: 5, name: 'Maio', paid: false, dueDate: '05/05/2025', value: 199.90 },
    { id: 6, name: 'Junho', paid: false, dueDate: '05/06/2025', value: 199.90 },
    { id: 7, name: 'Julho', paid: false, dueDate: '05/07/2025', value: 199.90 },
    { id: 8, name: 'Agosto', paid: false, dueDate: '05/08/2025', value: 199.90 },
    { id: 9, name: 'Setembro', paid: false, dueDate: '05/09/2025', value: 199.90 },
    { id: 10, name: 'Outubro', paid: false, dueDate: '05/10/2025', value: 199.90 },
    { id: 11, name: 'Novembro', paid: false, dueDate: '05/11/2025', value: 199.90 },
    { id: 12, name: 'Dezembro', paid: false, dueDate: '05/12/2025', value: 199.90 },
];

const paymentMethods = [
    {
        id: 'pix',
        name: 'PIX',
        icon: 'qrcode',
        description: 'Pagamento instantâneo',
        color: COLORS.success,
    },
    {
        id: 'boleto',
        name: 'Boleto',
        icon: 'barcode',
        description: 'Vencimento em 3 dias úteis',
        color: COLORS.warning,
    },
    {
        id: 'cartao',
        name: 'Cartão de Crédito',
        icon: 'credit-card-outline',
        description: 'Pagamento em até 12x',
        color: COLORS.primary,
    },
];

const Financial = () => {
    const { colors } = useTheme();
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);

    const handleMonthSelect = (month) => {
        if (!month.paid) {
            setSelectedMonth(month);
            setShowPaymentOptions(true);
        }
    };

    const handlePayment = (method) => {
        // Aqui você implementaria a lógica de pagamento
        console.log(`Pagamento via ${method} para ${selectedMonth.name}`);
        setShowPaymentOptions(false);
        setSelectedMonth(null);
    };

    const handleCloseModal = () => {
        setShowPaymentOptions(false);
        setSelectedMonth(null);
    };

    const renderFinancialCard = (item) => (
        <TouchableOpacity
            key={item.id}
            style={[styles.financialCard, { borderLeftColor: item.paid ? COLORS.success : COLORS.danger }]}
            onPress={() => handleMonthSelect(item)}
            disabled={item.paid}
        >
            <View style={[styles.iconContainer, { 
                backgroundColor: (item.paid ? COLORS.success : COLORS.danger) + '20' 
            }]}>
                <MaterialCommunityIcons 
                    name={item.paid ? 'check-circle' : 'alert-circle'} 
                    size={24} 
                    color={item.paid ? COLORS.success : COLORS.danger} 
                />
            </View>
            <View style={styles.financialInfo}>
                <Text style={styles.financialTitle}>{item.name}</Text>
                <Text style={styles.financialDate}>Vencimento: {item.dueDate}</Text>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons name="currency-usd" size={16} color={COLORS.gray} />
                        <Text style={styles.detailText}>R$ {item.value.toFixed(2).replace('.', ',')}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons 
                            name={item.paid ? 'check' : 'clock-outline'} 
                            size={16} 
                            color={COLORS.gray} 
                        />
                        <Text style={styles.detailText}>{item.paid ? 'Pago' : 'Pendente'}</Text>
                    </View>
                </View>
            </View>
            <MaterialCommunityIcons 
                name="chevron-right" 
                size={24} 
                color={COLORS.gray} 
                style={styles.arrowIcon}
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackgroundGradient>
                <Header title="Financeiro" />
                <ScrollView 
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: Platform.OS === 'ios' ? 120 : 100
                    }}
                >
                    <View style={styles.container}>
                        {/* Cabeçalho */}
                        <View
                            style={styles.headerGradient}
                        >
                            <MaterialCommunityIcons
                                name="wallet-outline"
                                size={32}
                                color={COLORS.primary}
                                style={{ marginRight: 15 }}
                            />
                            <View>
                                <Text style={[styles.headerTitle, { color: colors.title }]}>
                                    Mensalidade
                                </Text>
                                <Text style={[styles.headerValue, { color: COLORS.primary }]}>
                                    R$ 199,90
                                </Text>
                                <Text style={[styles.headerSubtitle, { color: colors.text }]}>
                                    Vencimento todo dia 5
                                </Text>
                            </View>
                        </View>

                        {/* Lista de Meses */}
                        <View style={styles.monthsContainer}>
                            {months.map((month) => renderFinancialCard(month))}
                        </View>

                        {/* Opções de Pagamento */}
                        {showPaymentOptions && (
                            <View style={[styles.paymentOptions, { backgroundColor: colors.cardBg }]}>
                                <View style={styles.paymentHeader}>
                                    <MaterialCommunityIcons
                                        name="credit-card"
                                        size={24}
                                        color={COLORS.primary}
                                    />
                                    <Text style={[styles.paymentTitle, { color: colors.title }]}>
                                        Formas de Pagamento
                                    </Text>
                                </View>
                                
                                <TouchableOpacity
                                    style={styles.paymentButton}
                                    onPress={() => handlePayment('pix')}
                                >
                                    <MaterialCommunityIcons
                                        name="qrcode"
                                        size={24}
                                        color={COLORS.primary}
                                    />
                                    <Text style={[styles.paymentButtonText, { color: colors.title }]}>
                                        Pagar com PIX
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.paymentButton}
                                    onPress={() => handlePayment('boleto')}
                                >
                                    <MaterialCommunityIcons
                                        name="barcode"
                                        size={24}
                                        color={COLORS.primary}
                                    />
                                    <Text style={[styles.paymentButtonText, { color: colors.title }]}>
                                        Gerar Boleto
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.paymentButton}
                                    onPress={() => handlePayment('cartao')}
                                >
                                    <MaterialCommunityIcons
                                        name="credit-card-outline"
                                        size={24}
                                        color={COLORS.primary}
                                    />
                                    <Text style={[styles.paymentButtonText, { color: colors.title }]}>
                                        Cartão de Crédito
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </ScrollView>

                {/* Modal de Pagamento */}
                <Modal
                    visible={!!selectedMonth}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={handleCloseModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContent, { backgroundColor: colors.cardBg }]}>
                            {/* Cabeçalho do Modal */}
                            <View style={styles.modalHeader}>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={handleCloseModal}
                                >
                                    <MaterialCommunityIcons
                                        name="close"
                                        size={24}
                                        color={colors.text}
                                    />
                                </TouchableOpacity>
                                <Text style={[styles.modalTitle, { color: colors.title }]}>
                                    Pagamento
                                </Text>
                            </View>

                            {/* Detalhes da Mensalidade */}
                            {selectedMonth && (
                                <View style={styles.paymentDetails}>
                                    <Text style={[styles.detailsTitle, { color: colors.title }]}>
                                        Mensalidade de {selectedMonth.name}
                                    </Text>
                                    <Text style={[styles.detailsSubtitle, { color: colors.text }]}>
                                        Vencimento: {selectedMonth.dueDate}
                                    </Text>
                                    <Text style={[styles.detailsValue, { color: COLORS.primary }]}>
                                        R$ {selectedMonth.value.toFixed(2).replace('.', ',')}
                                    </Text>
                                </View>
                            )}

                            {/* Opções de Pagamento */}
                            <View style={styles.paymentOptions}>
                                <Text style={[styles.optionsTitle, { color: colors.title }]}>
                                    Escolha a forma de pagamento
                                </Text>
                                {paymentMethods.map((method) => (
                                    <TouchableOpacity
                                        key={method.id}
                                        style={[
                                            styles.paymentMethod,
                                            { backgroundColor: method.color + '15' }
                                        ]}
                                        onPress={() => handlePayment(method.id)}
                                    >
                                        <View style={styles.methodIcon}>
                                            <MaterialCommunityIcons
                                                name={method.icon}
                                                size={28}
                                                color={method.color}
                                            />
                                        </View>
                                        <View style={styles.methodInfo}>
                                            <Text style={[styles.methodName, { color: colors.title }]}>
                                                {method.name}
                                            </Text>
                                            <Text style={[styles.methodDescription, { color: colors.text }]}>
                                                {method.description}
                                            </Text>
                                        </View>
                                        <MaterialCommunityIcons
                                            name="chevron-right"
                                            size={24}
                                            color={method.color}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                </Modal>
            </BackgroundGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    headerGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: SIZES.radius,
        marginBottom: 20,
    },
    headerTitle: {
        ...FONTS.h6,
        marginBottom: 4,
    },
    headerValue: {
        ...FONTS.h4,
        color: COLORS.primary,
        fontWeight: '700',
        marginBottom: 2,
    },
    headerSubtitle: {
        ...FONTS.fontXs,
    },
    monthsContainer: {
        marginBottom: 20,
    },
    financialCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderLeftWidth: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    financialInfo: {
        flex: 1,
    },
    financialTitle: {
        ...FONTS.h4,
        color: COLORS.black,
        marginBottom: 4,
    },
    financialDate: {
        ...FONTS.body4,
        color: COLORS.gray,
        marginBottom: 8,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    detailText: {
        ...FONTS.body4,
        color: COLORS.gray,
        marginLeft: 4,
    },
    arrowIcon: {
        marginLeft: 10,
    },
    paymentOptions: {
        padding: 15,
        borderRadius: SIZES.radius,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    paymentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    paymentTitle: {
        ...FONTS.h6,
        marginLeft: 10,
    },
    paymentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: SIZES.radius_sm,
        marginBottom: 10,
        backgroundColor: COLORS.primary + '15',
    },
    paymentButtonText: {
        ...FONTS.font,
        marginLeft: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    closeButton: {
        position: 'absolute',
        left: 20,
        padding: 5,
    },
    modalTitle: {
        ...FONTS.h6,
        textAlign: 'center',
    },
    paymentDetails: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    detailsTitle: {
        ...FONTS.h6,
        marginBottom: 4,
    },
    detailsSubtitle: {
        ...FONTS.fontSm,
        marginBottom: 8,
    },
    detailsValue: {
        ...FONTS.h5,
        fontWeight: '600',
    },
    paymentOptions: {
        padding: 20,
    },
    optionsTitle: {
        ...FONTS.font,
        marginBottom: 15,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: SIZES.radius,
        marginBottom: 10,
    },
    methodIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    methodInfo: {
        flex: 1,
    },
    methodName: {
        ...FONTS.font,
        fontWeight: '600',
        marginBottom: 4,
    },
    methodDescription: {
        ...FONTS.fontSm,
    },
});

export default Financial;
