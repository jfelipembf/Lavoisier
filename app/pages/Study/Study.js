import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Header from '../../layout/Header';
import BackgroundGradient from '../../components/BackgroundGradient';

const Study = () => {
    const navigation = useNavigation();

    const quizzes = [
        {
            id: 1,
            subject: 'Matemática',
            title: 'Álgebra Linear',
            questions: 15,
            time: '30 min',
            icon: 'calculator',
            color: '#FF6B6B',
        },
        {
            id: 2,
            subject: 'Português',
            title: 'Interpretação de Texto',
            questions: 20,
            time: '45 min',
            icon: 'book-open-page-variant',
            color: '#4ECDC4',
        },
        {
            id: 3,
            subject: 'História',
            title: 'Brasil Colônia',
            questions: 10,
            time: '20 min',
            icon: 'clock-time-four',
            color: '#45B7D1',
        },
        {
            id: 4,
            subject: 'Geografia',
            title: 'Clima e Tempo',
            questions: 12,
            time: '25 min',
            icon: 'earth',
            color: '#96CEB4',
        },
    ];

    const renderQuizCard = (item) => (
        <TouchableOpacity
            key={item.id}
            style={[styles.quizCard, { borderLeftColor: item.color }]}
            onPress={() => navigation.navigate('Quiz', { 
                subject: item.subject,
                title: item.title,
                questions: [
                    {
                        subject: item.subject,
                        question: "Qual é a primeira questão?",
                        options: ["Opção A", "Opção B", "Opção C", "Opção D"],
                        correctAnswer: 0,
                        explanation: "Explicação da resposta correta"
                    },
                    {
                        subject: item.subject,
                        question: "Qual é a segunda questão?",
                        options: ["Opção A", "Opção B", "Opção C", "Opção D"],
                        correctAnswer: 1,
                        explanation: "Explicação da resposta correta"
                    },
                    // Adicione mais questões conforme necessário
                ]
            })}
        >
            <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
            </View>
            <View style={styles.quizInfo}>
                <Text style={styles.subjectText}>{item.subject}</Text>
                <Text style={styles.titleText}>{item.title}</Text>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons name="help-circle-outline" size={16} color={COLORS.gray} />
                        <Text style={styles.detailText}>{item.questions} questões</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons name="clock-outline" size={16} color={COLORS.gray} />
                        <Text style={styles.detailText}>{item.time}</Text>
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
        <SafeAreaView style={styles.container}>
            <BackgroundGradient>
                <Header title="Estudos" />
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.headerContainer}>
                        <Text style={styles.welcomeText}>Olá, Estudante!</Text>
                        <Text style={styles.subtitleText}>
                            Escolha um questionário para praticar
                        </Text>
                    </View>
                    <View style={styles.quizContainer}>
                        {quizzes.map(renderQuizCard)}
                    </View>
                </ScrollView>
            </BackgroundGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    headerContainer: {
        padding: SIZES.padding,
    },
    welcomeText: {
        ...FONTS.h2,
        color: COLORS.black,
        marginBottom: 8,
    },
    subtitleText: {
        ...FONTS.body3,
        color: COLORS.gray,
    },
    quizContainer: {
        padding: SIZES.padding,
    },
    quizCard: {
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
    quizInfo: {
        flex: 1,
    },
    subjectText: {
        ...FONTS.h4,
        color: COLORS.black,
        marginBottom: 4,
    },
    titleText: {
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
});

export default Study;