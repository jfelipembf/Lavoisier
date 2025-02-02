import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Header from '../../layout/Header';
import BackgroundGradient from '../../components/BackgroundGradient';

const todayActivities = {
    inClass: [
        {
            id: 1,
            title: 'Atividade de Matemática',
            subject: 'Matemática',
            description: 'Resolver exercícios de álgebra',
            time: '14:30',
            completed: false,
            icon: 'calculator',
            color: COLORS.primary,
        },
        {
            id: 2,
            title: 'Experimento de Química',
            subject: 'Ciências',
            description: 'Realizar experimento sobre reações químicas',
            time: '15:45',
            completed: true,
            icon: 'flask',
            color: COLORS.success,
        },
    ],
    homework: [
        {
            id: 3,
            title: 'Redação',
            subject: 'Português',
            description: 'Escrever redação sobre sustentabilidade',
            deadline: 'Até 18:00',
            completed: false,
            icon: 'pencil',
            color: COLORS.warning,
        },
        {
            id: 4,
            title: 'Lista de Exercícios',
            subject: 'Matemática',
            description: 'Resolver lista de geometria',
            deadline: 'Até 20:00',
            completed: false,
            icon: 'calculator',
            color: COLORS.primary,
        },
    ],
};

const previousActivities = [
    {
        id: 5,
        date: '01/02',
        title: 'Trabalho de História',
        subject: 'História',
        description: 'Pesquisa sobre Segunda Guerra Mundial',
        completed: true,
        grade: 9.5,
        icon: 'book-clock',
        color: COLORS.danger,
        feedback: 'Excelente trabalho! Ótima análise dos eventos históricos.',
    },
    {
        id: 6,
        date: '31/01',
        title: 'Apresentação',
        subject: 'Geografia',
        description: 'Apresentação sobre clima e vegetação',
        completed: true,
        grade: 8.5,
        icon: 'earth',
        color: COLORS.info,
        feedback: 'Boa apresentação, mas poderia ter mais exemplos práticos.',
    },
];

const Agenda = () => {
    const { colors } = useTheme();
    const [showPrevious, setShowPrevious] = React.useState(false);
    const [expandedActivity, setExpandedActivity] = React.useState(null);

    const renderActivityCard = (activity, type = 'today') => (
        <TouchableOpacity
            key={activity.id}
            style={[styles.activityCard, { backgroundColor: colors.cardBg }]}
            onPress={() => type === 'previous' && setExpandedActivity(
                expandedActivity === activity.id ? null : activity.id
            )}
        >
            <View style={styles.activityHeader}>
                <View style={[
                    styles.iconContainer,
                    { backgroundColor: activity.color + '15' }
                ]}>
                    <MaterialCommunityIcons
                        name={activity.icon}
                        size={24}
                        color={activity.color}
                    />
                </View>
                <View style={styles.activityInfo}>
                    <Text style={[styles.activityTitle, { color: colors.title }]}>
                        {activity.title}
                    </Text>
                    <Text style={[styles.activitySubject, { color: activity.color }]}>
                        {activity.subject}
                    </Text>
                    <Text style={[styles.activityDescription, { color: colors.text }]}>
                        {activity.description}
                    </Text>
                    <View style={styles.activityMeta}>
                        <View style={styles.metaItem}>
                            <MaterialCommunityIcons
                                name={type === 'today' ? 'clock' : 'calendar'}
                                size={16}
                                color={colors.text}
                                style={{ marginRight: 4 }}
                            />
                            <Text style={[styles.metaText, { color: colors.text }]}>
                                {type === 'today' ? (activity.time || activity.deadline) : activity.date}
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={[
                        styles.statusBadge,
                        {
                            backgroundColor: activity.completed
                                ? COLORS.success + '15'
                                : COLORS.warning + '15'
                        }
                    ]}
                >
                    <MaterialCommunityIcons
                        name={activity.completed ? 'check-circle' : 'clock-outline'}
                        size={20}
                        color={activity.completed ? COLORS.success : COLORS.warning}
                    />
                </TouchableOpacity>
            </View>

            {/* Detalhes extras para atividades anteriores */}
            {type === 'previous' && expandedActivity === activity.id && (
                <View style={styles.expandedContent}>
                    <View style={styles.gradeContainer}>
                        <Text style={[styles.gradeLabel, { color: colors.text }]}>Nota:</Text>
                        <Text style={[styles.gradeValue, { color: activity.color }]}>
                            {activity.grade}
                        </Text>
                    </View>
                    <Text style={[styles.feedback, { color: colors.text }]}>
                        {activity.feedback}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackgroundGradient>
                <Header title="Agenda" />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        {/* Cabeçalho */}
                        <View
                            style={styles.headerGradient}
                        >
                            <MaterialCommunityIcons
                                name="calendar-check"
                                size={32}
                                color={COLORS.primary}
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={[styles.headerTitle, { color: colors.title }]}>
                                    Atividades de Hoje
                                </Text>
                                <Text style={[styles.headerSubtitle, { color: colors.text }]}>
                                    {new Date().toLocaleDateString('pt-BR')}
                                </Text>
                            </View>
                        </View>

                        {/* Atividades em Sala */}
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: colors.title }]}>
                                Em Sala
                            </Text>
                            {todayActivities.inClass.map(activity => renderActivityCard(activity))}
                        </View>

                        {/* Atividades para Casa */}
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: colors.title }]}>
                                Para Casa
                            </Text>
                            {todayActivities.homework.map(activity => renderActivityCard(activity))}
                        </View>

                        {/* Botão para ver atividades anteriores */}
                        <TouchableOpacity
                            style={[styles.viewMoreButton, { borderColor: colors.border }]}
                            onPress={() => setShowPrevious(!showPrevious)}
                        >
                            <Text style={[styles.viewMoreText, { color: COLORS.primary }]}>
                                {showPrevious ? 'Ocultar Anteriores' : 'Ver Atividades Anteriores'}
                            </Text>
                            <MaterialCommunityIcons
                                name={showPrevious ? 'chevron-up' : 'chevron-down'}
                                size={24}
                                color={COLORS.primary}
                            />
                        </TouchableOpacity>

                        {/* Atividades Anteriores */}
                        {showPrevious && (
                            <View style={styles.section}>
                                <Text style={[styles.sectionTitle, { color: colors.title }]}>
                                    Atividades Anteriores
                                </Text>
                                {previousActivities.map(activity => renderActivityCard(activity, 'previous'))}
                            </View>
                        )}
                    </View>
                </ScrollView>
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
        marginBottom: 20,
        padding: 15,
        borderRadius: SIZES.radius,
    },
    headerTitle: {
        ...FONTS.h6,
    },
    headerSubtitle: {
        ...FONTS.fontXs,
        marginTop: 2,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        ...FONTS.h6,
        marginBottom: 15,
    },
    activityCard: {
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
    activityHeader: {
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
    activityInfo: {
        flex: 1,
    },
    activityTitle: {
        ...FONTS.fontLg,
        marginBottom: 4,
    },
    activitySubject: {
        ...FONTS.fontXs,
        fontWeight: '600',
        marginBottom: 4,
    },
    activityDescription: {
        ...FONTS.fontSm,
        marginBottom: 8,
    },
    activityMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
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
    viewMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderTopWidth: 1,
        marginTop: 5,
        marginBottom: 15,
    },
    viewMoreText: {
        ...FONTS.font,
        marginRight: 8,
    },
    expandedContent: {
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
    },
    gradeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    gradeLabel: {
        ...FONTS.fontSm,
        marginRight: 8,
    },
    gradeValue: {
        ...FONTS.h5,
        fontWeight: '600',
    },
    feedback: {
        ...FONTS.fontSm,
        fontStyle: 'italic',
    },
});

export default Agenda;