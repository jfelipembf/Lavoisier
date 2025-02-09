import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../components/Header';
import useTimetable from '../../hooks/useTimetable';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

const Timetable = ({ navigation }) => {
    const { timetable, loading, error, getCurrentClass, getNextClass } = useTimetable();
    const [selectedDay, setSelectedDay] = useState(moment().format('dddd'));

    const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

    const renderCurrentClass = () => {
        const currentClass = getCurrentClass();
        const nextClass = getNextClass();

        return (
            <View style={styles.currentClassContainer}>
                <Text style={styles.sectionTitle}>Aula Atual</Text>
                {currentClass ? (
                    <View style={styles.classCard}>
                        <Text style={styles.subjectName}>{currentClass.subject}</Text>
                        <Text style={styles.classInfo}>
                            {currentClass.startTime} - {currentClass.endTime}
                        </Text>
                        {!currentClass.isBreak && (
                            <Text style={styles.classInfo}>Sala: {currentClass.room}</Text>
                        )}
                    </View>
                ) : (
                    <Text style={styles.emptyText}>Nenhuma aula no momento</Text>
                )}

                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Próxima Aula</Text>
                {nextClass ? (
                    <View style={styles.classCard}>
                        <Text style={styles.subjectName}>{nextClass.subject}</Text>
                        <Text style={styles.classInfo}>
                            {nextClass.startTime} - {nextClass.endTime}
                        </Text>
                        {!nextClass.isBreak && (
                            <Text style={styles.classInfo}>Sala: {nextClass.room}</Text>
                        )}
                    </View>
                ) : (
                    <Text style={styles.emptyText}>Nenhuma aula programada</Text>
                )}
            </View>
        );
    };

    const renderDaySelector = () => (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.daySelector}
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
                        {day}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const renderTimetable = () => {
        if (!timetable || !timetable[selectedDay]) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        Nenhuma aula encontrada para {selectedDay}
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.timetableContainer}>
                {timetable[selectedDay].map((period, index) => (
                    <View 
                        key={index} 
                        style={[
                            styles.periodCard,
                            period.isBreak && styles.breakCard
                        ]}
                    >
                        <View style={styles.timeContainer}>
                            <Text style={styles.timeText}>{period.startTime}</Text>
                            <Text style={styles.timeText}>{period.endTime}</Text>
                        </View>
                        <View style={styles.subjectContainer}>
                            <Text style={styles.subjectText}>{period.subject}</Text>
                            {!period.isBreak && (
                                <Text style={styles.roomText}>Sala: {period.room}</Text>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Header title="Grade Horária" navigation={navigation} />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Header title="Grade Horária" navigation={navigation} />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Grade Horária" navigation={navigation} />
            <ScrollView>
                {renderCurrentClass()}
                {renderDaySelector()}
                {renderTimetable()}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: COLORS.danger,
        textAlign: 'center',
        ...FONTS.h4,
    },
    currentClassContainer: {
        padding: 15,
        backgroundColor: COLORS.lightGray,
    },
    sectionTitle: {
        ...FONTS.h4,
        color: COLORS.black,
        marginBottom: 10,
    },
    classCard: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 15,
        marginBottom: 5,
        elevation: 2,
    },
    subjectName: {
        ...FONTS.h4,
        color: COLORS.primary,
        marginBottom: 5,
    },
    classInfo: {
        ...FONTS.body4,
        color: COLORS.gray,
    },
    daySelector: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: COLORS.white,
    },
    dayButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: COLORS.lightGray,
    },
    selectedDayButton: {
        backgroundColor: COLORS.primary,
    },
    dayButtonText: {
        ...FONTS.body4,
        color: COLORS.gray,
    },
    selectedDayButtonText: {
        color: COLORS.white,
    },
    timetableContainer: {
        padding: 15,
    },
    periodCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        elevation: 2,
    },
    breakCard: {
        backgroundColor: COLORS.lightGray,
    },
    timeContainer: {
        width: 70,
        marginRight: 15,
    },
    timeText: {
        ...FONTS.body4,
        color: COLORS.gray,
    },
    subjectContainer: {
        flex: 1,
    },
    subjectText: {
        ...FONTS.h4,
        color: COLORS.black,
        marginBottom: 5,
    },
    roomText: {
        ...FONTS.body4,
        color: COLORS.gray,
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
    },
    emptyText: {
        ...FONTS.body4,
        color: COLORS.gray,
        textAlign: 'center',
    },
});

export default Timetable;
