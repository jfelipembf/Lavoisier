import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    Dimensions,
    Image,
    ActivityIndicator,
    Modal,
    TextInput,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Header from '../../layout/Header';
import BackgroundGradient from '../../components/BackgroundGradient';

const { width } = Dimensions.get('window');

const news = [
    {
        id: 1,
        title: 'Feira de Ciências 2025',
        description: 'Prepare seu projeto para a maior feira de ciências do ano! Inscrições abertas.',
        date: '15/03/2025',
        icon: 'flask',
        color: COLORS.primary,
        image: 'https://img.freepik.com/free-photo/front-view-boy-doing-science-experiment_23-2149360201.jpg',
        views: '100',
        readTime: '5 minutos',
    },
    {
        id: 2,
        title: 'Olimpíada de Matemática',
        description: 'Participe da olimpíada e concorra a bolsas de estudo.',
        date: '20/03/2025',
        icon: 'calculator',
        color: COLORS.success,
        image: 'https://img.freepik.com/free-photo/close-up-student-doing-math_23-2148888810.jpg',
        views: '50',
        readTime: '3 minutos',
    },
];

const events = [
    {
        id: 1,
        title: 'Palestra: Profissões do Futuro',
        date: '10/02/2025',
        time: '19:00',
        location: 'Auditório Principal',
        type: 'event',
        icon: 'presentation',
    },
    {
        id: 2,
        title: 'Workshop de Robótica',
        date: '12/02/2025',
        time: '14:00',
        location: 'Laboratório de Tecnologia',
        type: 'workshop',
        icon: 'robot',
    },
];

const quickAccess = [
    {
        id: 'agenda',
        title: 'Agenda',
        description: 'Visualize suas atividades',
        icon: 'calendar-clock',
        color: COLORS.primary,
        route: 'Agenda',
    },
    {
        id: 'grades',
        title: 'Notas',
        description: 'Acompanhe seu desempenho',
        icon: 'chart-line',
        color: COLORS.success,
        route: 'Grades',
    },

];

const Home = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [loadingImages, setLoadingImages] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        school: '',
    });

    const handleQuickAccess = (route) => {
        navigation.navigate(route);
    };

    const handleImageLoad = (id) => {
        setLoadingImages(prev => ({
            ...prev,
            [id]: false
        }));
    };

    const renderNewsCard = (item) => (
        <TouchableOpacity
            key={item.id}
            style={[styles.newsCard, { borderLeftColor: COLORS.primary }]}
            onPress={() => navigation.navigate('NewsDetail', { news: item })}
        >
            <View style={[styles.iconContainer, { backgroundColor: COLORS.primary + '20' }]}>
                <MaterialCommunityIcons name="newspaper" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.newsInfo}>
                <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.newsDate}>{item.date}</Text>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons name="eye-outline" size={16} color={COLORS.gray} />
                        <Text style={styles.detailText}>{item.views} visualizações</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons name="clock-outline" size={16} color={COLORS.gray} />
                        <Text style={styles.detailText}>{item.readTime}</Text>
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

    const renderEventCard = (item) => (
        <TouchableOpacity
            key={item.id}
            style={[styles.eventCard, { borderLeftColor: COLORS.warning }]}
            onPress={() => navigation.navigate('EventDetail', { event: item })}
        >
            <View style={[styles.iconContainer, { backgroundColor: COLORS.warning + '20' }]}>
                <MaterialCommunityIcons name="calendar" size={24} color={COLORS.warning} />
            </View>
            <View style={styles.eventInfo}>
                <Text style={styles.eventTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.eventDate}>{item.date}</Text>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons name="clock-outline" size={16} color={COLORS.gray} />
                        <Text style={styles.detailText}>{item.time}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons name="map-marker-outline" size={16} color={COLORS.gray} />
                        <Text style={styles.detailText}>{item.location}</Text>
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

    const renderHighlightCard = () => (
        <TouchableOpacity
            style={styles.highlightCard}
            onPress={() => setModalVisible(true)}
        >
            <Image
                source={require('../../assets/images/global/inteli_icon.png')}
                style={styles.highlightImage}
                resizeMode="cover"
            />
            <View style={styles.highlightOverlay}>
                <View style={styles.highlightContent}>
                    <View>
                        <View style={styles.eventBadge}>
                            <MaterialCommunityIcons
                                name="calendar-clock"
                                size={16}
                                color={COLORS.white}
                            />
                            <Text style={styles.eventBadgeText}>
                                15 de Março, 2025
                            </Text>
                        </View>
                    </View>

                    <View style={styles.mainContent}>
                        <Text style={styles.highlightTitle}>
                            Simulado Inteligenci 2025
                        </Text>
                        
                        <Text style={styles.highlightDescription}>
                            Prepare-se para o futuro! Participe do simulado mais avançado do Brasil e teste seus conhecimentos.
                        </Text>
                        
                        <View style={styles.highlightInfo}>
                            <View style={styles.infoItem}>
                                <MaterialCommunityIcons
                                    name="clock-outline"
                                    size={16}
                                    color={COLORS.white}
                                />
                                <Text style={styles.infoText}>5 horas de prova</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <MaterialCommunityIcons
                                    name="school"
                                    size={16}
                                    color={COLORS.white}
                                />
                                <Text style={styles.infoText}>90 questões</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <MaterialCommunityIcons
                                    name="cash"
                                    size={16}
                                    color={COLORS.white}
                                />
                                <Text style={styles.infoText}>R$ 149,90</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.highlightButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.highlightButtonText}>
                            Inscreva-se Agora
                        </Text>
                        <MaterialCommunityIcons
                            name="arrow-right"
                            size={20}
                            color={COLORS.white}
                            style={styles.buttonIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderRegistrationModal = () => (
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setModalVisible(false)}
            >
                <View
                    style={[styles.modalContent, { backgroundColor: COLORS.white }]}
                    onStartShouldSetResponder={() => true}
                >
                    <View style={styles.modalHeader}>
                        <View style={styles.modalHeaderLeft}>
                            <MaterialCommunityIcons
                                name="school"
                                size={24}
                                color={COLORS.primary}
                            />
                            <Text style={styles.modalTitle}>
                                Inscrição - Simulado Inteligenci
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <MaterialCommunityIcons 
                                name="close" 
                                size={24} 
                                color={COLORS.gray} 
                            />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.modalForm}>
                        <View style={styles.formDetails}>
                            <View style={styles.formItem}>
                                <View style={styles.formItemHeader}>
                                    <MaterialCommunityIcons 
                                        name="account" 
                                        size={20} 
                                        color={COLORS.primary} 
                                    />
                                    <Text style={styles.formItemTitle}>Nome Completo</Text>
                                </View>
                                <TextInput
                                    style={styles.input}
                                    value={formData.name}
                                    onChangeText={(text) => setFormData({...formData, name: text})}
                                    placeholder="Digite seu nome completo"
                                />
                            </View>

                            <View style={styles.formItem}>
                                <View style={styles.formItemHeader}>
                                    <MaterialCommunityIcons 
                                        name="email" 
                                        size={20} 
                                        color={COLORS.warning} 
                                    />
                                    <Text style={styles.formItemTitle}>E-mail</Text>
                                </View>
                                <TextInput
                                    style={styles.input}
                                    value={formData.email}
                                    onChangeText={(text) => setFormData({...formData, email: text})}
                                    placeholder="Digite seu e-mail"
                                    keyboardType="email-address"
                                />
                            </View>

                            <View style={styles.formItem}>
                                <View style={styles.formItemHeader}>
                                    <MaterialCommunityIcons 
                                        name="phone" 
                                        size={20} 
                                        color={COLORS.success} 
                                    />
                                    <Text style={styles.formItemTitle}>Telefone</Text>
                                </View>
                                <TextInput
                                    style={styles.input}
                                    value={formData.phone}
                                    onChangeText={(text) => setFormData({...formData, phone: text})}
                                    placeholder="Digite seu telefone"
                                    keyboardType="phone-pad"
                                />
                            </View>

                            <View style={styles.formItem}>
                                <View style={styles.formItemHeader}>
                                    <MaterialCommunityIcons 
                                        name="school" 
                                        size={20} 
                                        color={COLORS.info} 
                                    />
                                    <Text style={styles.formItemTitle}>Escola</Text>
                                </View>
                                <TextInput
                                    style={styles.input}
                                    value={formData.school}
                                    onChangeText={(text) => setFormData({...formData, school: text})}
                                    placeholder="Digite sua escola"
                                />
                            </View>

                            <View style={[styles.formItem, styles.priceContainer]}>
                                <View style={styles.formItemHeader}>
                                    <MaterialCommunityIcons 
                                        name="cash" 
                                        size={20} 
                                        color={COLORS.primary} 
                                    />
                                    <Text style={styles.formItemTitle}>Valor da Inscrição</Text>
                                </View>
                                <Text style={styles.priceValue}>R$ 149,90</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={() => {
                                    // Aqui você implementaria a lógica de pagamento
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.submitButtonText}>
                                    Pagar e Finalizar Inscrição
                                </Text>
                                <MaterialCommunityIcons 
                                    name="arrow-right" 
                                    size={20} 
                                    color={COLORS.white} 
                                    style={styles.submitButtonIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </TouchableOpacity>
        </Modal>
    );

    const renderScheduleCard = () => {
        const navigation = useNavigation();
        const scheduleItems = [
            {
                id: 1,
                title: 'Prova de Matemática',
                date: '05 de Março, 2025',
                time: '14:00',
                subject: 'Matemática',
                icon: 'calculator',
                color: COLORS.primary
            },
            {
                id: 2,
                title: 'Trabalho de Física',
                date: '08 de Março, 2025',
                time: '16:30',
                subject: 'Física',
                icon: 'atom',
                color: COLORS.warning
            },
            {
                id: 3,
                title: 'Simulado Geral',
                date: '12 de Março, 2025',
                time: '08:00',
                subject: 'Geral',
                icon: 'book-open-variant',
                color: COLORS.success
            }
        ];

        const handlePress = () => {
            navigation.navigate('Study', {
                screen: 'Schedule',
                initial: false
            });
        };

        return (
            <View style={styles.scheduleCard}>
                <View style={styles.cardHeader}>
                    <View style={styles.cardHeaderLeft}>
                        <MaterialCommunityIcons
                            name="calendar-month"
                            size={24}
                            color={COLORS.primary}
                        />
                        <Text style={styles.cardTitle}>Lembretes</Text>
                    </View>
                    <TouchableOpacity onPress={handlePress}>
                        <Text style={styles.seeAllButton}>Ver Tudo</Text>
                    </TouchableOpacity>
                </View>

                {scheduleItems.map((item) => (
                    <TouchableOpacity 
                        key={item.id} 
                        style={styles.scheduleItem}
                        onPress={handlePress}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                            <MaterialCommunityIcons
                                name={item.icon}
                                size={24}
                                color={item.color}
                            />
                        </View>
                        <View style={styles.scheduleInfo}>
                            <Text style={styles.scheduleTitle}>{item.title}</Text>
                            <View style={styles.scheduleDetails}>
                                <View style={styles.scheduleDetailItem}>
                                    <MaterialCommunityIcons
                                        name="calendar"
                                        size={14}
                                        color={COLORS.gray}
                                    />
                                    <Text style={styles.scheduleDetailText}>{item.date}</Text>
                                </View>
                                <View style={styles.scheduleDetailItem}>
                                    <MaterialCommunityIcons
                                        name="clock-outline"
                                        size={14}
                                        color={COLORS.gray}
                                    />
                                    <Text style={styles.scheduleDetailText}>{item.time}</Text>
                                </View>
                            </View>
                        </View>
                        <MaterialCommunityIcons
                            name="chevron-right"
                            size={20}
                            color={COLORS.gray}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 15,
        },
        section: {
            marginBottom: 25,
        },
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
        },
        sectionTitle: {
            ...FONTS.h6,
            marginLeft: 10,
        },
        newsCard: {
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
        eventCard: {
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
        newsInfo: {
            flex: 1,
        },
        eventInfo: {
            flex: 1,
        },
        newsTitle: {
            ...FONTS.h4,
            color: COLORS.black,
            marginBottom: 4,
        },
        eventTitle: {
            ...FONTS.h4,
            color: COLORS.black,
            marginBottom: 4,
        },
        newsDate: {
            ...FONTS.body4,
            color: COLORS.gray,
            marginBottom: 8,
        },
        eventDate: {
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
        logoContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            marginBottom: 10,
        },
        logo: {
            width: width * 0.6,
            height: 60,
        },
        quickAccessGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -5,
        },
        quickAccessCard: {
            width: (width - 40) / 2,
            padding: 15,
            borderRadius: SIZES.radius,
            margin: 5,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 2.84,
            elevation: 3,
        },
        quickAccessIcon: {
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
        },
        quickAccessTitle: {
            ...FONTS.font,
            fontWeight: '600',
            marginBottom: 4,
        },
        quickAccessDescription: {
            ...FONTS.fontXs,
        },
        highlightCard: {
            height: 280,
            borderRadius: SIZES.radius,
            overflow: 'hidden',
            marginBottom: 20,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        highlightImage: {
            width: '100%',
            height: '100%',
        },
        highlightOverlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: 20,
        },
        highlightContent: {
            flex: 1,
            justifyContent: 'space-between',
        },
        mainContent: {
            flex: 1,
            justifyContent: 'center',
            marginVertical: 20,
        },
        eventBadge: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.primary,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            alignSelf: 'flex-start',
            marginBottom: 'auto',
        },
        eventBadgeText: {
            ...FONTS.body4,
            color: COLORS.white,
            marginLeft: 6,
        },
        highlightTitle: {
            ...FONTS.h2,
            color: COLORS.white,
            marginBottom: 8,
        },
        highlightDescription: {
            ...FONTS.body4,
            color: COLORS.white,
            opacity: 0.9,
            marginBottom: 16,
        },
        highlightInfo: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 20,
        },
        infoItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 20,
        },
        infoText: {
            ...FONTS.body4,
            color: COLORS.white,
            marginLeft: 6,
        },
        highlightButton: {
            backgroundColor: COLORS.primary,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 15,
            borderRadius: SIZES.radius,
            width: '100%',
        },
        highlightButtonText: {
            ...FONTS.h4,
            color: COLORS.white,
            marginRight: 8,
        },
        buttonIcon: {
            marginLeft: 8,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-end',
        },
        modalContent: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            maxHeight: '90%',
        },
        modalHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
        },
        modalHeaderLeft: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        modalTitle: {
            ...FONTS.h4,
            color: COLORS.black,
            marginLeft: 10,
        },
        modalForm: {
            maxHeight: '80%',
        },
        formDetails: {
            backgroundColor: 'rgba(0,0,0,0.03)',
            borderRadius: SIZES.radius,
            padding: 15,
        },
        formItem: {
            marginBottom: 15,
        },
        formItemHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        formItemTitle: {
            ...FONTS.font,
            color: COLORS.black,
            marginLeft: 8,
        },
        input: {
            borderWidth: 1,
            borderColor: COLORS.gray + '20',
            borderRadius: SIZES.radius_sm,
            padding: 12,
            ...FONTS.body4,
            backgroundColor: COLORS.white,
        },
        priceContainer: {
            marginTop: 10,
            paddingTop: 15,
            borderTopWidth: 1,
            borderTopColor: 'rgba(0,0,0,0.1)',
        },
        priceValue: {
            ...FONTS.h3,
            color: COLORS.primary,
            fontWeight: 'bold',
            textAlign: 'right',
            marginTop: 5,
        },
        submitButton: {
            backgroundColor: COLORS.primary,
            padding: 15,
            borderRadius: SIZES.radius,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
        },
        submitButtonText: {
            ...FONTS.h4,
            color: COLORS.white,
        },
        submitButtonIcon: {
            marginLeft: 8,
        },
        scheduleCard: {
            backgroundColor: COLORS.white,
            borderRadius: SIZES.radius,
            padding: 15,
            marginBottom: 20,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
        },
        cardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15,
        },
        cardHeaderLeft: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        cardTitle: {
            ...FONTS.h4,
            color: COLORS.black,
            marginLeft: 10,
        },
        seeAllButton: {
            ...FONTS.body4,
            color: COLORS.primary,
        },
        scheduleItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.gray + '20',
        },
        scheduleInfo: {
            flex: 1,
        },
        scheduleTitle: {
            ...FONTS.h6,
            color: COLORS.black,
            marginBottom: 4,
        },
        scheduleDetails: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        scheduleDetailItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 15,
        },
        scheduleDetailText: {
            ...FONTS.fontXs,
            color: COLORS.gray,
            marginLeft: 4,
        },
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackgroundGradient>
                <Header title="" />
                
                {/* Logo Lavoisier */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/global/Lavoisier.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <ScrollView 
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: Platform.OS === 'ios' ? 120 : 100,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container}>
                        {/* Card Destacado do Simulado */}
                        {renderHighlightCard()}

                        {/* Acesso Rápido */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <MaterialCommunityIcons
                                    name="lightning-bolt"
                                    size={24}
                                    color={COLORS.primary}
                                />
                                <Text style={[styles.sectionTitle, { color: colors.title }]}>
                                    Acesso Rápido
                                </Text>
                            </View>
                            <View style={styles.quickAccessGrid}>
                                {quickAccess.map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={[styles.quickAccessCard, { backgroundColor: colors.cardBg }]}
                                        onPress={() => handleQuickAccess(item.route)}
                                    >
                                        <View style={[styles.quickAccessIcon, { backgroundColor: item.color + '15' }]}>
                                            <MaterialCommunityIcons
                                                name={item.icon}
                                                size={32}
                                                color={item.color}
                                            />
                                        </View>
                                        <Text style={[styles.quickAccessTitle, { color: colors.title }]}>
                                            {item.title}
                                        </Text>
                                        <Text style={[styles.quickAccessDescription, { color: colors.text }]}>
                                            {item.description}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Card de Agenda */}
                        {renderScheduleCard()}

                        {/* Modal de Inscrição */}
                        {renderRegistrationModal()}

                        {/* Próximos Eventos */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <MaterialCommunityIcons
                                    name="calendar-star"
                                    size={24}
                                    color={COLORS.primary}
                                />
                                <Text style={[styles.sectionTitle, { color: colors.title }]}>
                                    Próximos Eventos
                                </Text>
                            </View>
                            <View style={styles.eventsList}>
                                {events.map(event => (
                                    renderEventCard(event)
                                ))}
                            </View>
                        </View>

                        {/* Novidades */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <MaterialCommunityIcons
                                    name="newspaper-variant"
                                    size={24}
                                    color={COLORS.primary}
                                />
                                <Text style={[styles.sectionTitle, { color: colors.title }]}>
                                    Novidades da Escola
                                </Text>
                            </View>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={styles.newsScroll}
                            >
                                {news.map(item => (
                                    renderNewsCard(item)
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </BackgroundGradient>
        </SafeAreaView>
    );
};

export default Home;
