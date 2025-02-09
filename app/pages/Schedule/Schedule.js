/**
 * Schedule (Agenda)
 * 
 * Responsabilidade: Exibir e gerenciar atividades e tarefas dos alunos
 * - Mostra atividades em sala e tarefas de casa
 * - Permite marcar atividades como concluídas
 * - Usa o hook useActivities para gerenciar os dados
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import 'moment/locale/pt-br';
import Header from '../../layout/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Collapsible from 'react-native-collapsible';
import { useNavigation } from '@react-navigation/native';
import useActivities from '../../hooks/useActivities';

moment.locale('pt-br');

const PASTEL_COLORS = {
    blue: '#cee7e6',    // Azul pastel
    green: '#eae3ef',   // Verde pastel
    red: '#f2eee9',     // Vermelho pastel
    yellow: '#f3dfde',  // Amarelo pastel
    primary: '#e6f3f5', // Primary pastel
    text: '#666666',    // Texto suave
    border: '#e5e5e5'   // Borda suave
};

const Schedule = () => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(true);
    const [updatingActivity, setUpdatingActivity] = useState(null);
    const { activities, loading, error, markActivityAsComplete } = useActivities();

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
        setIsCalendarCollapsed(true);
    };

    // Filtrar atividades pela data selecionada
    const getFilteredActivities = () => {
        const classroomActivities = activities.classroom.filter(activity => 
            moment(activity.date).format('YYYY-MM-DD') === selectedDate
        );

        const homeworkActivities = activities.homework.filter(activity => 
            moment(activity.date).format('YYYY-MM-DD') === selectedDate
        );

        return [...classroomActivities, ...homeworkActivities];
    };

    const getFilteredStats = () => {
        const classroomActivities = activities.classroom.filter(activity => 
            moment(activity.date).format('YYYY-MM-DD') === selectedDate
        );
        const homeworkActivities = activities.homework.filter(activity => 
            moment(activity.date).format('YYYY-MM-DD') === selectedDate
        );

        return {
            classroom: {
                total: classroomActivities.length,
                completed: classroomActivities.filter(a => a.progress?.completed).length
            },
            homework: {
                total: homeworkActivities.length,
                completed: homeworkActivities.filter(a => a.progress?.completed).length
            }
        };
    };

    const handleToggleActivity = async (activity) => {
        try {
            setUpdatingActivity(activity.id);
            await markActivityAsComplete(activity);
            // O estado será atualizado automaticamente pelo listener do Firebase
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar a atividade: ' + error.message);
        } finally {
            setUpdatingActivity(null);
        }
    };

    const renderActivitySection = (title, activities, type, color) => {
        if (!activities || activities.length === 0) return null;

        return (
            <View style={styles.section}>
                <View style={[styles.sectionHeader, { backgroundColor: color }]}>
                    <Text style={styles.sectionTitle}>{title}</Text>
                </View>
                {activities.map((activity) => (
                    <TouchableOpacity 
                        key={activity.id} 
                        style={[
                            styles.activityCard,
                            updatingActivity === activity.id && styles.activityCardUpdating
                        ]}
                        onPress={() => handleToggleActivity(activity)}
                        disabled={updatingActivity === activity.id}
                    >
                        <View style={styles.activityHeader}>
                            <View style={styles.activityTimeContainer}>
                                <Text style={styles.activityTime}>
                                    {type === 'classroom' 
                                        ? moment(activity.date).format('HH:mm')
                                        : `Entrega: ${moment(activity.dueDate).format('DD/MM')}`
                                    }
                                </Text>
                                {activity.subject && (
                                    <Text style={styles.activitySubject}>{activity.subject}</Text>
                                )}
                            </View>
                            <TouchableOpacity 
                                onPress={() => handleToggleActivity(activity)}
                                style={[
                                    styles.customCheckbox,
                                    activity.progress?.completed && styles.customCheckboxChecked,
                                    { borderColor: color }
                                ]}
                                disabled={updatingActivity === activity.id}
                            >
                                {activity.progress?.completed && (
                                    <View style={[styles.checkboxInner, { backgroundColor: color }]} />
                                )}
                                {updatingActivity === activity.id && (
                                    <ActivityIndicator 
                                        size="small" 
                                        color={color}
                                        style={styles.checkboxLoading}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.activityTitle}>{activity.title}</Text>
                        <Text style={styles.activityDescription}>{activity.description}</Text>
                        {activity.details && (
                            <View style={styles.details}>
                                {activity.details.materialsNeeded && (
                                    <Text style={styles.detailsText}>
                                        <Text style={styles.detailsLabel}>Materiais: </Text>
                                        {activity.details.materialsNeeded.join(', ')}
                                    </Text>
                                )}
                                {activity.details.pages && (
                                    <Text style={styles.detailsText}>
                                        <Text style={styles.detailsLabel}>Páginas: </Text>
                                        {activity.details.pages}
                                    </Text>
                                )}
                            </View>
                        )}
                        {activity.progress?.completed && (
                            <View style={styles.completedInfo}>
                                <FontAwesome name="check-circle" size={16} color={color} />
                                <Text style={[styles.completedText, { color }]}>
                                    {type === 'classroom' 
                                        ? `Concluído ${activity.progress.updatedAt ? `em ${moment(activity.progress.updatedAt).format('DD/MM HH:mm')}` : ''}`
                                        : `Entregue ${activity.progress.submittedDate ? `em ${moment(activity.progress.submittedDate).format('DD/MM HH:mm')}` : ''}`
                                    }
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const renderStats = () => {
        const stats = getFilteredStats();
        return (
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statTitle}>Atividades em Sala</Text>
                    <Text style={styles.statValue}>
                        {stats.classroom.total === 0 ? '0/0' : `${stats.classroom.completed}/${stats.classroom.total}`}
                    </Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statTitle}>Tarefas de Casa</Text>
                    <Text style={styles.statValue}>
                        {stats.homework.total === 0 ? '0/0' : `${stats.homework.completed}/${stats.homework.total}`}
                    </Text>
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header title="Agenda" leftIcon="back" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={PASTEL_COLORS.primary} />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header title="Agenda" leftIcon="back" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <Text style={{ color: COLORS.danger, textAlign: 'center', marginBottom: 10 }}>
                        Ops! Algo deu errado.
                    </Text>
                    <Text style={{ color: COLORS.text, textAlign: 'center' }}>
                        {error}
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    const filteredActivities = getFilteredActivities();
    const stats = getFilteredStats();

    return (
        <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#FFFFFF'}]}>
            <Header 
                title={'Agenda'} 
                titleLeft 
                leftIcon="back"
                onPressLeft={() => navigation.goBack()}
            />
            
            <ScrollView style={{backgroundColor: '#FFFFFF'}} contentContainerStyle={{paddingBottom: 100}}>
                <View style={{flex:1, backgroundColor: '#FFFFFF'}}>
                    <TouchableOpacity 
                        style={styles.dateSelector}
                        onPress={() => setIsCalendarCollapsed(!isCalendarCollapsed)}
                    >
                        <Text style={styles.selectedDate}>
                            {moment(selectedDate).format('DD [de] MMMM [de] YYYY')}
                        </Text>
                        <FontAwesome 
                            name={isCalendarCollapsed ? "angle-down" : "angle-up"} 
                            size={20} 
                            color="#666666" 
                        />
                    </TouchableOpacity>

                    <Collapsible collapsed={isCalendarCollapsed}>
                        <Calendar
                            onDayPress={onDayPress}
                            markedDates={{
                                [selectedDate]: {
                                    selected: true,
                                    selectedColor: PASTEL_COLORS.primary,
                                    selectedTextColor: PASTEL_COLORS.text
                                }
                            }}
                            theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: PASTEL_COLORS.text,
                                selectedDayBackgroundColor: PASTEL_COLORS.primary,
                                selectedDayTextColor: PASTEL_COLORS.text,
                                todayTextColor: PASTEL_COLORS.text,
                                dayTextColor: '#2d4150',
                                textDisabledColor: '#d9e1e8',
                                dotColor: PASTEL_COLORS.primary,
                                selectedDotColor: PASTEL_COLORS.text,
                                arrowColor: PASTEL_COLORS.text,
                                monthTextColor: PASTEL_COLORS.text,
                                textDayFontFamily: 'System',
                                textMonthFontFamily: 'System',
                                textDayHeaderFontFamily: 'System',
                                textDayFontSize: 16,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 14
                            }}
                            style={{
                                borderRadius: 10,
                                padding: 10,
                                backgroundColor: '#ffffff',
                                marginBottom: 15
                            }}
                        />
                    </Collapsible>

                    {renderStats()}

                    <View style={GlobalStyleSheet.container}>
                        {filteredActivities.filter(activity => activity.type === 'classroom').length > 0 && renderActivitySection('Atividades em Sala', filteredActivities.filter(activity => activity.type === 'classroom'), 'classroom', PASTEL_COLORS.blue)}
                        {filteredActivities.filter(activity => activity.type === 'homework').length > 0 && renderActivitySection('Tarefas de Casa', filteredActivities.filter(activity => activity.type === 'homework'), 'homework', PASTEL_COLORS.green)}
                        
                        {filteredActivities.length === 0 && (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>Nenhuma atividade para esta data</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    dateSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    selectedDate: {
        ...FONTS.h6,
        color: '#333333'
    },
    section: {
        marginBottom: 20
    },
    sectionHeader: {
        padding: 10,
        borderRadius: SIZES.radius,
        marginBottom: 10
    },
    sectionTitle: {
        ...FONTS.h6,
        color: '#333333'
    },
    activityCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: SIZES.radius,
        padding: 15,
        marginBottom: 10,
        elevation: 2
    },
    activityCardUpdating: {
        opacity: 0.7
    },
    activityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    activityTimeContainer: {
        flex: 1
    },
    activityTime: {
        ...FONTS.fontSm,
        color: '#666666'
    },
    activitySubject: {
        ...FONTS.fontSm,
        color: '#666666',
        marginTop: 2
    },
    activityTitle: {
        ...FONTS.h6,
        color: '#333333',
        marginBottom: 5
    },
    activityDescription: {
        ...FONTS.font,
        color: '#666666'
    },
    customCheckbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    customCheckboxChecked: {
        borderWidth: 2,
    },
    checkboxInner: {
        width: 14,
        height: 14,
        borderRadius: 7,
    },
    checkboxLoading: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    completedInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    completedText: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '500'
    },
    statsContainer: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between'
    },
    statCard: {
        flex: 1,
        margin: 5,
        padding: 15,
        borderRadius: SIZES.radius,
        alignItems: 'center'
    },
    statTitle: {
        ...FONTS.fontSm,
        color: '#666666',
        marginBottom: 5
    },
    statValue: {
        ...FONTS.h6,
        color: '#333333'
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center'
    },
    emptyText: {
        ...FONTS.font,
        color: '#666666',
        textAlign: 'center'
    },
    details: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },
    detailsLabel: {
        fontWeight: '600',
        color: '#333'
    },
    detailsText: {
        ...FONTS.fontSm,
        color: '#666666',
        marginBottom: 4
    },
});

export default Schedule;
