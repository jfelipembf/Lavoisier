import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Cores pastéis personalizadas
const PASTEL_COLORS = {
    blue: '#cee7e6',    // Azul pastel (mesmo do Categories)
    green: '#eae3ef',   // Verde pastel (mesmo do Categories)
    red: '#f2eee9',     // Vermelho pastel (mesmo do Categories)
    yellow: '#f3dfde',  // Amarelo pastel (mesmo do Categories)
};

const StatCard = ({ icon, title, value, color }) => {
    const { colors } = useTheme();
    
    return (
        <View style={[styles.cardWrapper]}>
            <View style={[styles.statCard, { backgroundColor: color }]}>
                <View style={styles.iconContainer}>
                    {icon}
                </View>
                <View style={styles.statInfo}>
                    <Text style={[styles.statValue, { color: '#444444' }]}>{value}</Text>
                    <Text style={[styles.statTitle, { color: '#666666' }]}>{title}</Text>
                </View>
            </View>
        </View>
    );
};

const StudentStats = ({ stats }) => {
    const { colors } = useTheme();

    const calculatePercentage = (correct, total) => {
        if (total === 0) return '0%';
        return `${Math.round((correct / total) * 100)}%`;
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.sectionTitle, { color: colors.title }]}>Desempenho em Exercícios</Text>
            <View style={styles.statsGrid}>
                <StatCard
                    icon={<MaterialIcons name="question-answer" size={32} color={'#777777'} />}
                    title="Questões Respondidas"
                    value={stats.totalQuestions || 0}
                    color={PASTEL_COLORS.blue}
                />
                <StatCard
                    icon={<MaterialIcons name="check-circle" size={32} color={'#777777'} />}
                    title="Acertos"
                    value={stats.correctAnswers || 0}
                    color={PASTEL_COLORS.green}
                />
                <StatCard
                    icon={<MaterialIcons name="cancel" size={32} color={'#777777'} />}
                    title="Erros"
                    value={stats.wrongAnswers || 0}
                    color={PASTEL_COLORS.red}
                />
                <StatCard
                    icon={<MaterialIcons name="trending-up" size={32} color={'#777777'} />}
                    title="Taxa de Acerto"
                    value={calculatePercentage(stats.correctAnswers || 0, stats.totalQuestions || 0)}
                    color={PASTEL_COLORS.yellow}
                />
            </View>

            <Text style={[styles.sectionTitle, { color: colors.title, marginTop: 20 }]}>Presença e Participação</Text>
            <View style={styles.statsGrid}>
                <StatCard
                    icon={<FontAwesome name="calendar-check-o" size={32} color={'#777777'} />}
                    title="Presença"
                    value={calculatePercentage(stats.attendanceCount || 0, stats.totalClasses || 0)}
                    color={PASTEL_COLORS.blue}
                />
                <StatCard
                    icon={<MaterialIcons name="school" size={32} color={'#777777'} />}
                    title="Total de Aulas"
                    value={stats.totalClasses || 0}
                    color={PASTEL_COLORS.green}
                />
                <StatCard
                    icon={<MaterialIcons name="assignment-turned-in" size={32} color={'#777777'} />}
                    title="Tarefas Entregues"
                    value={calculatePercentage(stats.completedAssignments || 0, stats.totalAssignments || 0)}
                    color={PASTEL_COLORS.red}
                />
                <StatCard
                    icon={<MaterialIcons name="stars" size={32} color={'#777777'} />}
                    title="Média Geral"
                    value={stats.overallGrade ? `${stats.overallGrade.toFixed(1)}` : 'N/A'}
                    color={PASTEL_COLORS.yellow}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: -5,
        
    },
    sectionTitle: {
        ...FONTS.h6,
        marginBottom: 15,
        paddingHorizontal: 7,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 7,
    },
    cardWrapper: {
        width: '48.5%',
        marginBottom: 15,
    },
    statCard: {
        paddingHorizontal: 19,
        width: '100%',
        paddingVertical: 25,
        borderRadius: 15,
        flex: 1,
    },
    iconContainer: {
        marginBottom: 12,
        marginTop: 5,
    },
    statInfo: {
        flex: 1,
    },
    statValue: {
        ...FONTS.font,
        ...FONTS.fontBold,
        marginBottom: 2,
    },
    statTitle: {
        ...FONTS.font,
        fontSize: 12,
        marginTop: 4,
    },
});

export default StudentStats;
