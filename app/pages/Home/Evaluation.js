import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Dimensions,
    Platform,
    Image,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Header from '../../layout/Header';
import BackgroundGradient from '../../components/BackgroundGradient';

const { width } = Dimensions.get('window');

const evaluations = [
    {
        id: 1,
        title: 'Avaliação de Matemática',
        description: 'Funções e Equações',
        date: '05/02',
        time: '14:30',
        duration: '2h',
        status: 'upcoming',
        icon: 'calculator',
        color: COLORS.primary,
        completed: false,
        grade: 0,
        details: null,
    },
    {
        id: 2,
        title: 'Simulado Geral',
        description: 'Todas as matérias',
        date: '07/02',
        time: '08:00',
        duration: '4h',
        status: 'upcoming',
        icon: 'book-clock',
        color: COLORS.success,
        completed: false,
        grade: 0,
        details: null,
    },
    {
        id: 3,
        title: 'Prova de Física',
        description: 'Mecânica e Dinâmica',
        date: '01/02',
        time: '10:30',
        duration: '1h30',
        grade: 8.5,
        icon: 'atom',
        color: COLORS.warning,
        completed: true,
        details: {
            correctAnswers: 17,
            wrongAnswers: 3,
            totalQuestions: 20,
            timeSpent: '1h15',
            byTopic: [
                { topic: 'Cinemática', correct: 6, total: 7 },
                { topic: 'Dinâmica', correct: 5, total: 6 },
                { topic: 'Energia', correct: 4, total: 5 },
                { topic: 'Impulso', correct: 2, total: 2 },
            ],
            feedback: 'Bom desempenho! Foque um pouco mais em Energia para melhorar ainda mais.',
        },
    },
    {
        id: 4,
        title: 'Avaliação de História',
        description: 'Segunda Guerra Mundial',
        date: '29/01',
        time: '16:00',
        duration: '2h',
        grade: 9.0,
        icon: 'book-open-variant',
        color: COLORS.danger,
        completed: true,
        details: {
            correctAnswers: 18,
            wrongAnswers: 2,
            totalQuestions: 20,
            timeSpent: '1h45',
            byTopic: [
                { topic: 'Causas da Guerra', correct: 5, total: 5 },
                { topic: 'Principais Batalhas', correct: 4, total: 5 },
                { topic: 'Holocausto', correct: 5, total: 5 },
                { topic: 'Consequências', correct: 4, total: 5 },
            ],
            feedback: 'Excelente compreensão do tema! Continue assim.',
        },
    },
];

const Evaluation = () => {
    const { colors } = useTheme();
    const [selectedEvaluation, setSelectedEvaluation] = useState(null);

    const renderDetailsModal = () => {
        if (!selectedEvaluation?.details) return null;

        const { details } = selectedEvaluation;
        const accuracyPercentage = (details.correctAnswers / details.totalQuestions) * 100;

        return (
            <Modal
                visible={!!selectedEvaluation}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setSelectedEvaluation(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: colors.cardBg }]}>
                        <View style={styles.modalHeader}>
                            <View style={styles.modalHeaderLeft}>
                                <MaterialCommunityIcons
                                    name={selectedEvaluation.icon}
                                    size={24}
                                    color={selectedEvaluation.color}
                                />
                                <Text style={[styles.modalTitle, { color: colors.title }]}>
                                    {selectedEvaluation.title}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setSelectedEvaluation(null)}
                                style={styles.closeButton}
                            >
                                <MaterialCommunityIcons
                                    name="close"
                                    size={24}
                                    color={colors.text}
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Resumo */}
                            <View style={styles.summaryContainer}>
                                <View style={[styles.summaryCard, { backgroundColor: COLORS.success + '15' }]}>
                                    <MaterialCommunityIcons
                                        name="check-circle"
                                        size={24}
                                        color={COLORS.success}
                                    />
                                    <Text style={[styles.summaryValue, { color: COLORS.success }]}>
                                        {details.correctAnswers}
                                    </Text>
                                    <Text style={[styles.summaryLabel, { color: colors.text }]}>
                                        Acertos
                                    </Text>
                                </View>
                                <View style={[styles.summaryCard, { backgroundColor: COLORS.danger + '15' }]}>
                                    <MaterialCommunityIcons
                                        name="close-circle"
                                        size={24}
                                        color={COLORS.danger}
                                    />
                                    <Text style={[styles.summaryValue, { color: COLORS.danger }]}>
                                        {details.wrongAnswers}
                                    </Text>
                                    <Text style={[styles.summaryLabel, { color: colors.text }]}>
                                        Erros
                                    </Text>
                                </View>
                                <View style={[styles.summaryCard, { backgroundColor: COLORS.primary + '15' }]}>
                                    <MaterialCommunityIcons
                                        name="clock-check"
                                        size={24}
                                        color={COLORS.primary}
                                    />
                                    <Text style={[styles.summaryValue, { color: COLORS.primary }]}>
                                        {details.timeSpent}
                                    </Text>
                                    <Text style={[styles.summaryLabel, { color: colors.text }]}>
                                        Tempo
                                    </Text>
                                </View>
                            </View>

                            {/* Gráfico por Tópico */}
                            <View style={[styles.sectionCard, { backgroundColor: colors.cardBg }]}>
                                <Text style={[styles.sectionTitle, { color: colors.title }]}>
                                    Desempenho por Tópico
                                </Text>
                                {details.byTopic.map((topic, index) => {
                                    const percentage = (topic.correct / topic.total) * 100;
                                    return (
                                        <View key={index} style={styles.topicItem}>
                                            <View style={styles.topicHeader}>
                                                <Text style={[styles.topicName, { color: colors.title }]}>
                                                    {topic.topic}
                                                </Text>
                                                <Text style={[styles.topicScore, { color: colors.text }]}>
                                                    {topic.correct}/{topic.total}
                                                </Text>
                                            </View>
                                            <View style={styles.progressContainer}>
                                                <View 
                                                    style={[
                                                        styles.progressBar,
                                                        { 
                                                            backgroundColor: COLORS.primary,
                                                            width: `${percentage}%`,
                                                        }
                                                    ]} 
                                                />
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>

                            {/* Feedback */}
                            <View style={[styles.feedbackCard, { backgroundColor: colors.cardBg }]}>
                                <MaterialCommunityIcons
                                    name="lightbulb-on"
                                    size={24}
                                    color={COLORS.warning}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={[styles.feedbackText, { color: colors.text }]}>
                                    {details.feedback}
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackgroundGradient>
                <Header title="Avaliações" />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        {/* Cabeçalho */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 20,
                                padding: 15,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary + '20',
                            }}
                        >
                            <MaterialCommunityIcons
                                name="file-document-edit"
                                size={32}
                                color={COLORS.primary}
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={[styles.headerTitle, { color: colors.title }]}>
                                    Suas Avaliações
                                </Text>
                                <Text style={[styles.headerSubtitle, { color: colors.text }]}>
                                    Acompanhe suas provas e simulados
                                </Text>
                            </View>
                        </View>

                        {/* Lista de Avaliações */}
                        {evaluations.map((evaluation, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.evaluationCard, { backgroundColor: colors.cardBg }]}
                                onPress={() => evaluation.completed && setSelectedEvaluation(evaluation)}
                                activeOpacity={evaluation.completed ? 0.7 : 1}
                            >
                                <View style={styles.evaluationHeader}>
                                    <View style={[
                                        styles.iconContainer,
                                        { backgroundColor: evaluation.color + '15' }
                                    ]}>
                                        <MaterialCommunityIcons
                                            name={evaluation.icon}
                                            size={24}
                                            color={evaluation.color}
                                        />
                                    </View>
                                    <View style={styles.evaluationInfo}>
                                        <Text style={[styles.evaluationTitle, { color: colors.title }]}>
                                            {evaluation.title}
                                        </Text>
                                        <Text style={[styles.evaluationDescription, { color: colors.text }]}>
                                            {evaluation.description}
                                        </Text>
                                        <View style={styles.metaContainer}>
                                            <View style={styles.metaItem}>
                                                <MaterialCommunityIcons
                                                    name="calendar"
                                                    size={16}
                                                    color={colors.text}
                                                    style={{ marginRight: 4 }}
                                                />
                                                <Text style={[styles.metaText, { color: colors.text }]}>
                                                    {evaluation.date}
                                                </Text>
                                            </View>
                                            <View style={styles.metaItem}>
                                                <MaterialCommunityIcons
                                                    name="clock-outline"
                                                    size={16}
                                                    color={colors.text}
                                                    style={{ marginRight: 4 }}
                                                />
                                                <Text style={[styles.metaText, { color: colors.text }]}>
                                                    {evaluation.time}
                                                </Text>
                                            </View>
                                            <View style={styles.metaItem}>
                                                <MaterialCommunityIcons
                                                    name="timer-sand"
                                                    size={16}
                                                    color={colors.text}
                                                    style={{ marginRight: 4 }}
                                                />
                                                <Text style={[styles.metaText, { color: colors.text }]}>
                                                    {evaluation.duration}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[
                                        styles.statusBadge,
                                        {
                                            backgroundColor: evaluation.completed
                                                ? COLORS.success + '15'
                                                : COLORS.warning + '15'
                                        }
                                    ]}>
                                        {evaluation.completed ? (
                                            <Text style={[styles.grade, { color: COLORS.success }]}>
                                                {evaluation.grade}
                                            </Text>
                                        ) : (
                                            <MaterialCommunityIcons
                                                name="clock-outline"
                                                size={20}
                                                color={COLORS.warning}
                                            />
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                {renderDetailsModal()}
            </BackgroundGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    headerTitle: {
        ...FONTS.h6,
    },
    headerSubtitle: {
        ...FONTS.fontXs,
        marginTop: 2,
    },
    evaluationCard: {
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
    evaluationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: SIZES.radius_sm,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    evaluationInfo: {
        flex: 1,
    },
    evaluationTitle: {
        ...FONTS.fontLg,
        marginBottom: 4,
    },
    evaluationDescription: {
        ...FONTS.fontSm,
        marginBottom: 8,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        marginBottom: 4,
    },
    metaText: {
        ...FONTS.fontXs,
    },
    statusBadge: {
        width: 35,
        height: 35,
        borderRadius: SIZES.radius_sm,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    grade: {
        ...FONTS.fontLg,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: SIZES.radius,
        borderTopRightRadius: SIZES.radius,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 30,
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    modalHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalTitle: {
        ...FONTS.h6,
        marginLeft: 10,
    },
    closeButton: {
        padding: 5,
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    summaryCard: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        borderRadius: SIZES.radius_sm,
        marginHorizontal: 5,
    },
    summaryValue: {
        ...FONTS.h5,
        fontWeight: '600',
        marginVertical: 8,
    },
    summaryLabel: {
        ...FONTS.fontXs,
    },
    sectionCard: {
        borderRadius: SIZES.radius_sm,
        padding: 15,
        marginBottom: 15,
    },
    sectionTitle: {
        ...FONTS.h6,
        marginBottom: 15,
    },
    topicItem: {
        marginBottom: 15,
    },
    topicHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    topicName: {
        ...FONTS.font,
    },
    topicScore: {
        ...FONTS.fontSm,
    },
    progressContainer: {
        height: 8,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 4,
    },
    feedbackCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: SIZES.radius_sm,
        marginBottom: 15,
    },
    feedbackText: {
        ...FONTS.fontSm,
        flex: 1,
    },
});

export default Evaluation;
