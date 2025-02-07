import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { FONTS } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../layout/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

// Cores pastéis personalizadas
const PASTEL_COLORS = {
    blue: '#cee7e6',    // Azul pastel
    green: '#eae3ef',   // Verde pastel
    red: '#f2eee9',     // Vermelho pastel
    yellow: '#f3dfde',  // Amarelo pastel
};

const notifications = [
    {
        id: 1,
        title: 'Reunião de Pais',
        description: 'Reunião geral com os pais para discussão do desempenho dos alunos no primeiro bimestre.',
        date: '2025-02-15',
        time: '19:00',
        type: 'event',
        read: false
    },
    {
        id: 2,
        title: 'Prova de Matemática',
        description: 'Avaliação sobre equações do segundo grau e funções.',
        date: '2025-02-10',
        time: '08:00',
        type: 'exam',
        read: true
    },
    {
        id: 3,
        title: 'Feira de Ciências',
        description: 'Apresentação dos projetos desenvolvidos pelos alunos.',
        date: '2025-02-20',
        time: '14:00',
        type: 'event',
        read: false
    },
    {
        id: 4,
        title: 'Recesso Escolar',
        description: 'Início do recesso escolar do Carnaval.',
        date: '2025-02-12',
        type: 'info',
        read: true
    }
];

const NotificationCard = ({ notification }) => {
    const getIcon = (type) => {
        switch(type) {
            case 'event':
                return 'calendar';
            case 'exam':
                return 'pencil';
            case 'info':
                return 'info-circle';
            default:
                return 'bell';
        }
    };

    const getColor = (type) => {
        switch(type) {
            case 'event':
                return PASTEL_COLORS.blue;
            case 'exam':
                return PASTEL_COLORS.red;
            case 'info':
                return PASTEL_COLORS.green;
            default:
                return PASTEL_COLORS.yellow;
        }
    };

    return (
        <View style={[styles.notificationCard, { borderLeftColor: getColor(notification.type) }]}>
            <View style={styles.iconContainer}>
                <FontAwesome 
                    name={getIcon(notification.type)} 
                    size={20} 
                    color="#666666" 
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{notification.title}</Text>
                <Text style={styles.description}>{notification.description}</Text>
                <View style={styles.dateContainer}>
                    <FontAwesome name="clock-o" size={14} color="#666666" style={styles.dateIcon} />
                    <Text style={styles.dateText}>
                        {moment(notification.date).format('DD [de] MMMM')}
                        {notification.time ? ` às ${notification.time}` : ''}
                    </Text>
                </View>
            </View>
            {!notification.read && <View style={styles.unreadDot} />}
        </View>
    );
};

const Notifications = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#FFFFFF'}]}>
            <Header 
                title={'Avisos'} 
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
                        {notifications.map(notification => (
                            <NotificationCard 
                                key={notification.id} 
                                notification={notification} 
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    notificationCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 12,
        padding: 15,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderLeftWidth: 4,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },
    contentContainer: {
        flex: 1
    },
    title: {
        ...FONTS.h6,
        color: '#333333',
        marginBottom: 4
    },
    description: {
        ...FONTS.fontXs,
        color: '#666666',
        marginBottom: 8
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateIcon: {
        marginRight: 4
    },
    dateText: {
        ...FONTS.fontXs,
        color: '#666666'
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: PASTEL_COLORS.blue,
        position: 'absolute',
        top: 8,
        right: 8
    }
});

export default Notifications;
