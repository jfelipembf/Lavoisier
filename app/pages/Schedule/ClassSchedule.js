/**
 * ClassSchedule (Grade Horária)
 * 
 * Responsabilidade: Exibir a grade horária das aulas
 * - Mostra os horários das aulas por dia da semana
 * - Exibe informações como professor, disciplina e sala
 * - Usa o hook useSchedule para gerenciar os dados
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { FONTS, COLORS } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Header from '../../layout/Header';
import { useSchedule } from '../../hooks/useSchedule';

const { width } = Dimensions.get('window');
const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

// Cores pastéis personalizadas
const PASTEL_COLORS = {
    blue: '#cee7e6',    // Azul pastel
    green: '#eae3ef',   // Verde pastel
    red: '#f2eee9',     // Vermelho pastel
    yellow: '#f3dfde',  // Amarelo pastel
    purple: '#e6e6fa',  // Lilás pastel
    orange: '#ffe4c4',  // Pêssego pastel
    accent: '#d4e9e2'   // Verde suave para o detalhe vertical
};

const ClassSchedule = ({ navigation }) => {
    const { schedule, loading, error, classInfo } = useSchedule();
    const [selectedDay, setSelectedDay] = useState('Segunda');

    const renderDaySelector = () => (
        <View style={styles.daySelectorContainer}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dayButtonsContainer}
            >
                {weekDays.map((day) => (
                    <TouchableOpacity
                        key={day}
                        style={[
                            styles.dayButton,
                            selectedDay === day && styles.selectedDayButton
                        ]}
                        onPress={() => setSelectedDay(day)}
                    >
                        <Text style={[
                            styles.dayButtonText,
                            selectedDay === day && styles.selectedDayButtonText
                        ]}>
                            {day.substring(0, 3)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderNoClassCard = () => (
        <View style={styles.noClassContainer}>
            <Text style={styles.noClassText}>
                Nenhuma aula programada para este dia
            </Text>
        </View>
    );

    const renderClassCard = (classInfo) => {
        return (
            <View 
                key={classInfo.startTime} 
                style={styles.classCard}
            >
                <View style={styles.verticalAccent} />
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>
                        {classInfo.startTime}
                    </Text>
                    <View style={styles.timeSeparator} />
                    <Text style={styles.timeText}>
                        {classInfo.endTime}
                    </Text>
                </View>
                <View style={styles.classInfo}>
                    <Text style={styles.subjectText}>
                        {classInfo.subject}
                    </Text>
                    <View style={styles.detailsRow}>
                        <Text style={styles.teacherText}>
                            {classInfo.teacher}
                        </Text>
                        <Text style={styles.roomText}>
                            {classInfo.room}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderDaySchedule = () => {
        if (!schedule || !schedule[selectedDay]) {
            return renderNoClassCard();
        }

        return schedule[selectedDay].map(classInfo => renderClassCard(classInfo));
    };

    if (loading) {
        return (
            <SafeAreaView style={[GlobalStyleSheet.safeAreaView, styles.container]}>
                <Header 
                    title="Grade de Horários"
                    leftIcon="back"
                    onPressLeft={() => navigation.goBack()}
                />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={PASTEL_COLORS.purple} />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={[GlobalStyleSheet.safeAreaView, styles.container]}>
                <Header 
                    title="Grade de Horários"
                    leftIcon="back"
                    onPressLeft={() => navigation.goBack()}
                />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[GlobalStyleSheet.safeAreaView, styles.container]}>
            <Header 
                title="Grade de Horários"
                leftIcon="back"
                onPressLeft={() => navigation.goBack()}
            />
            <View style={styles.mainContainer}>
                {classInfo && (
                    <View style={styles.classInfoHeader}>
                        <Text style={styles.classTitle}>
                            {`${classInfo.segment} ${classInfo.class}`}
                        </Text>
                        <View style={styles.shiftBadge}>
                            <Text style={styles.shiftText}>
                                {classInfo.shift}
                            </Text>
                        </View>
                    </View>
                )}

                {renderDaySelector()}
                
                <ScrollView 
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {renderDaySchedule()}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    classInfoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF'
    },
    classTitle: {
        ...FONTS.h6,
        color: '#495057'
    },
    shiftBadge: {
        backgroundColor: PASTEL_COLORS.purple,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16
    },
    shiftText: {
        ...FONTS.fontXs,
        color: '#495057'
    },
    daySelectorContainer: {
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF'
    },
    dayButtonsContainer: {
        paddingHorizontal: 15,
        gap: 10
    },
    dayButton: {
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E9ECEF'
    },
    selectedDayButton: {
        backgroundColor: PASTEL_COLORS.purple,
        borderColor: PASTEL_COLORS.purple
    },
    dayButtonText: {
        ...FONTS.font,
        color: '#495057'
    },
    selectedDayButtonText: {
        color: '#495057'
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    scrollContent: {
        padding: 15
    },
    classCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 10,
        padding: 15,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 2,
        overflow: 'hidden' // Para garantir que o detalhe verde não ultrapasse as bordas
    },
    verticalAccent: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
        backgroundColor: PASTEL_COLORS.accent
    },
    timeContainer: {
        alignItems: 'center',
        paddingRight: 15,
        borderRightWidth: 1,
        borderRightColor: '#E9ECEF',
        marginLeft: 10 // Para dar espaço ao detalhe verde
    },
    timeText: {
        ...FONTS.font,
        color: '#495057'
    },
    timeSeparator: {
        width: 2,
        height: 15,
        backgroundColor: '#E9ECEF',
        marginVertical: 5
    },
    classInfo: {
        flex: 1,
        marginLeft: 15
    },
    subjectText: {
        ...FONTS.fontLg,
        color: '#495057',
        marginBottom: 5
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    teacherText: {
        ...FONTS.font,
        color: '#495057'
    },
    roomText: {
        ...FONTS.fontXs,
        color: '#495057'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    errorText: {
        ...FONTS.fontLg,
        color: '#DC3545',
        textAlign: 'center'
    },
    noClassContainer: {
        padding: 15,
        alignItems: 'center'
    },
    noClassText: {
        ...FONTS.font,
        color: '#495057',
        textAlign: 'center'
    }
});

export default ClassSchedule;
