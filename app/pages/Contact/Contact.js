import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { FONTS } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Cores pastéis personalizadas
const PASTEL_COLORS = {
    blue: '#cee7e6',    // Azul pastel
    green: '#eae3ef',   // Verde pastel
    red: '#f2eee9',     // Vermelho pastel
    yellow: '#f3dfde',  // Amarelo pastel
};

const contactInfo = {
    phone: '(11) 1234-5678',
    whatsapp: '5511912345678',
    email: 'contato@escola.com.br',
    schedule: [
        { day: 'Segunda a Sexta', hours: '08:00 às 18:00' },
        { day: 'Sábado', hours: '08:00 às 12:00' }
    ]
};

const Contact = () => {
    const navigation = useNavigation();

    const handlePhonePress = () => {
        Linking.openURL(`tel:${contactInfo.phone}`);
    };

    const handleWhatsAppPress = () => {
        Linking.openURL(`whatsapp://send?phone=${contactInfo.whatsapp}`);
    };

    const handleEmailPress = () => {
        Linking.openURL(`mailto:${contactInfo.email}`);
    };

    const ContactCard = ({ icon, title, value, color, onPress, description }) => (
        <TouchableOpacity 
            style={[styles.contactCard, { borderLeftColor: color }]}
            onPress={onPress}
        >
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
                <FontAwesome name={icon} size={24} color="#666666" />
            </View>
            <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{title}</Text>
                <Text style={styles.contactValue}>{value}</Text>
                {description && (
                    <Text style={styles.contactDescription}>{description}</Text>
                )}
            </View>
            <FontAwesome name="angle-right" size={24} color="#666666" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#FFFFFF'}]}>
            <Header 
                title={'Fale Conosco'} 
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
                        <Text style={styles.sectionTitle}>Entre em Contato</Text>
                        
                        <ContactCard 
                            icon="phone"
                            title="Telefone"
                            value={contactInfo.phone}
                            color={PASTEL_COLORS.blue}
                            onPress={handlePhonePress}
                            description="Clique para ligar"
                        />

                        <ContactCard 
                            icon="whatsapp"
                            title="WhatsApp"
                            value={contactInfo.phone}
                            color={PASTEL_COLORS.green}
                            onPress={handleWhatsAppPress}
                            description="Clique para enviar mensagem"
                        />

                        <ContactCard 
                            icon="envelope"
                            title="E-mail"
                            value={contactInfo.email}
                            color={PASTEL_COLORS.yellow}
                            onPress={handleEmailPress}
                            description="Clique para enviar e-mail"
                        />

                        <View style={styles.scheduleContainer}>
                            <Text style={styles.sectionTitle}>Horário de Atendimento</Text>
                            
                            {contactInfo.schedule.map((schedule, index) => (
                                <View 
                                    key={index} 
                                    style={[
                                        styles.scheduleCard,
                                        { borderLeftColor: PASTEL_COLORS.red }
                                    ]}
                                >
                                    <View style={styles.scheduleContent}>
                                        <Text style={styles.scheduleDay}>{schedule.day}</Text>
                                        <Text style={styles.scheduleHours}>{schedule.hours}</Text>
                                    </View>
                                    <FontAwesome 
                                        name="clock-o" 
                                        size={24} 
                                        color="#666666" 
                                        style={styles.scheduleIcon}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        ...FONTS.h6,
        color: '#333333',
        marginBottom: 16,
        marginTop: 8
    },
    contactCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 12,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderLeftWidth: 4
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    contactInfo: {
        flex: 1
    },
    contactTitle: {
        ...FONTS.fontSm,
        color: '#666666',
        marginBottom: 4
    },
    contactValue: {
        ...FONTS.h6,
        color: '#333333',
        marginBottom: 2
    },
    contactDescription: {
        ...FONTS.fontXs,
        color: '#666666'
    },
    scheduleContainer: {
        marginTop: 24
    },
    scheduleCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 12,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderLeftWidth: 4
    },
    scheduleContent: {
        flex: 1
    },
    scheduleDay: {
        ...FONTS.h6,
        color: '#333333',
        marginBottom: 4
    },
    scheduleHours: {
        ...FONTS.fontSm,
        color: '#666666'
    },
    scheduleIcon: {
        marginLeft: 15
    }
});

export default Contact;
