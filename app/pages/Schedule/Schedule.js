import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import moment from 'moment';
import 'moment/locale/pt-br';
import Header from '../../layout/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Collapsible from 'react-native-collapsible';
import { useNavigation } from '@react-navigation/native';
import useSchedule from '../../hooks/useSchedule';

moment.locale('pt-br');

const PASTEL_COLORS = {
    blue: '#cee7e6',    // Azul pastel
    green: '#eae3ef',   // Verde pastel
    red: '#f2eee9',     // Vermelho pastel
    yellow: '#f3dfde',  // Amarelo pastel
};

const Schedule = () => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(true);
    const { activities, loading, error, markActivityAsComplete, getActivityStats } = useSchedule();

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
            moment(activity.date).format('YYYY-MM-DD') === selectedDate ||
            moment(activity.dueDate).format('YYYY-MM-DD') === selectedDate
        );

        return { classroomActivities, homeworkActivities };
    };

    const handleToggleActivity = async (activity) => {
        try {
            await markActivityAsComplete(activity.id, activity.schoolYear);
        } catch (error) {
            console.error('Erro ao marcar atividade:', error);
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
                        style={styles.activityCard}
                        onPress={() => handleToggleActivity(activity)}
                    >
                        <View style={styles.activityHeader}>
                            <Text style={styles.activityTime}>
                                {type === 'classroom' 
                                    ? moment(activity.date).format('HH:mm')
                                    : `Entrega: ${moment(activity.dueDate).format('DD/MM')}`
                                }
                            </Text>
                            <Checkbox
                                value={activity.progress.completed}
                                onValueChange={() => handleToggleActivity(activity)}
                                color={activity.progress.completed ? color : undefined}
                                style={styles.checkbox}
                            />
                        </View>
                        <Text style={styles.activityTitle}>{activity.title}</Text>
                        <Text style={styles.activityDescription}>{activity.description}</Text>
                        {activity.progress.completed && (
                            <View style={styles.completedInfo}>
                                <FontAwesome name="check-circle" size={16} color={COLORS.success} />
                                <Text style={styles.completedText}>
                                    {type === 'classroom' 
                                        ? `Concluído - ${activity.progress.performance}`
                                        : `Entregue em ${moment(activity.progress.submittedDate).format('DD/MM')}`
                                    }
                                </Text>
                            </View>
                        )}
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
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#FFFFFF'}]}>
                <Header 
                    title={'Agenda'} 
                    titleLeft 
                    leftIcon="back"
                    onPressLeft={() => navigation.goBack()}
                />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#FFFFFF'}]}>
                <Header 
                    title={'Agenda'} 
                    titleLeft 
                    leftIcon="back"
                    onPressLeft={() => navigation.goBack()}
                />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Erro ao carregar atividades: {error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    const { classroomActivities, homeworkActivities } = getFilteredActivities();
    const stats = getActivityStats();

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
                                [selectedDate]: {selected: true, selectedColor: COLORS.primary}
                            }}
                            theme={{
                                selectedDayBackgroundColor: COLORS.primary,
                                todayTextColor: COLORS.primary,
                                arrowColor: COLORS.primary,
                            }}
                        />
                    </Collapsible>

                    <View style={styles.statsContainer}>
                        <View style={[styles.statCard, { backgroundColor: PASTEL_COLORS.blue }]}>
                            <Text style={styles.statTitle}>Atividades em Sala</Text>
                            <Text style={styles.statValue}>{stats.classroom.completed}/{stats.classroom.total}</Text>
                        </View>
                        <View style={[styles.statCard, { backgroundColor: PASTEL_COLORS.green }]}>
                            <Text style={styles.statTitle}>Tarefas de Casa</Text>
                            <Text style={styles.statValue}>{stats.homework.completed}/{stats.homework.total}</Text>
                        </View>
                    </View>

                    <View style={GlobalStyleSheet.container}>
                        {renderActivitySection('Atividades em Sala', classroomActivities, 'classroom', PASTEL_COLORS.blue)}
                        {renderActivitySection('Tarefas de Casa', homeworkActivities, 'homework', PASTEL_COLORS.green)}
                        
                        {classroomActivities.length === 0 && homeworkActivities.length === 0 && (
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
    activityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    activityTime: {
        ...FONTS.fontSm,
        color: '#666666'
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
    checkbox: {
        marginLeft: 10
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
        padding: 20
    },
    errorText: {
        ...FONTS.font,
        color: COLORS.danger,
        textAlign: 'center'
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
    completedInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },
    completedText: {
        ...FONTS.fontSm,
        color: COLORS.success,
        marginLeft: 5
    },
    details: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },
    detailsText: {
        ...FONTS.fontSm,
        color: '#666666',
        marginBottom: 5
    },
    detailsLabel: {
        ...FONTS.fontSm,
        fontWeight: 'bold'
    }
});

export default Schedule;
