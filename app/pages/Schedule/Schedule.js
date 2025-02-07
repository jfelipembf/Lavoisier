import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FONTS, SIZES } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import moment from 'moment';
import 'moment/locale/pt-br';
import Header from '../../layout/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Collapsible from 'react-native-collapsible';
import { useNavigation } from '@react-navigation/native';

moment.locale('pt-br');

// Cores pastéis personalizadas
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
    const [activities, setActivities] = useState({
        [moment().format('YYYY-MM-DD')]: {
            classActivities: [
                { id: 1, title: 'Matemática - Equações do 2º grau', description: 'Resolução de exercícios em sala', completed: false, time: '08:00' },
                { id: 2, title: 'Português - Análise Sintática', description: 'Aula expositiva', completed: false, time: '10:00' },
                { id: 3, title: 'Física - Movimento Uniforme', description: 'Laboratório', completed: false, time: '13:30' }
            ],
            homework: [
                { id: 4, title: 'Lista de Exercícios - Matemática', description: 'Resolver problemas 1 a 10', completed: false, dueDate: '2025-02-08' },
                { id: 5, title: 'Redação - Tema: Sustentabilidade', description: 'Escrever texto dissertativo', completed: false, dueDate: '2025-02-09' }
            ]
        }
    });

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
        setIsCalendarCollapsed(true);
    };

    const toggleActivity = (activityId, type) => {
        setActivities(prev => {
            const currentDayActivities = prev[selectedDate]?.[type] || [];
            const updatedActivities = currentDayActivities.map(activity => 
                activity.id === activityId 
                    ? {...activity, completed: !activity.completed}
                    : activity
            );

            return {
                ...prev,
                [selectedDate]: {
                    ...prev[selectedDate],
                    [type]: updatedActivities
                }
            };
        });
    };

    const renderActivitySection = (title, activities, type, color) => {
        if (!activities || activities.length === 0) return null;

        return (
            <View style={styles.section}>
                <View style={[styles.sectionHeader, { backgroundColor: color }]}>
                    <Text style={styles.sectionTitle}>{title}</Text>
                </View>
                {activities.map((activity) => (
                    <View key={activity.id} style={styles.activityCard}>
                        <View style={styles.activityHeader}>
                            <Text style={styles.activityTime}>
                                {type === 'classActivities' ? activity.time : `Entrega: ${moment(activity.dueDate).format('DD/MM')}`}
                            </Text>
                            <Checkbox
                                value={activity.completed}
                                onValueChange={() => toggleActivity(activity.id, type)}
                                color={activity.completed ? color : undefined}
                                style={styles.checkbox}
                            />
                        </View>
                        <Text style={styles.activityTitle}>{activity.title}</Text>
                        <Text style={styles.activityDescription}>{activity.description}</Text>
                    </View>
                ))}
            </View>
        );
    };

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
                    <View style={GlobalStyleSheet.container}>
                        <TouchableOpacity 
                            style={[styles.dateSelector, { 
                                backgroundColor: PASTEL_COLORS.blue
                            }]}
                            onPress={() => setIsCalendarCollapsed(!isCalendarCollapsed)}
                        >
                            <FontAwesome name="calendar" size={16} color="#666666" style={styles.parameterIcon} />
                            <Text style={styles.dateText}>
                                {moment(selectedDate).format('DD [de] MMMM [de] YYYY')}
                            </Text>
                            <FontAwesome 
                                name={isCalendarCollapsed ? 'chevron-down' : 'chevron-up'} 
                                size={14} 
                                color="#666666" 
                            />
                        </TouchableOpacity>

                        <Collapsible collapsed={isCalendarCollapsed}>
                            <Calendar
                                onDayPress={onDayPress}
                                markedDates={{
                                    [selectedDate]: {
                                        selected: true,
                                        selectedColor: PASTEL_COLORS.blue,
                                    }
                                }}
                                theme={{
                                    backgroundColor: '#ffffff',
                                    calendarBackground: '#ffffff',
                                    textSectionTitleColor: '#666666',
                                    selectedDayBackgroundColor: PASTEL_COLORS.blue,
                                    selectedDayTextColor: '#666666',
                                    todayTextColor: '#666666',
                                    dayTextColor: '#2d4150',
                                    textDisabledColor: '#d9e1e8',
                                    dotColor: PASTEL_COLORS.blue,
                                    selectedDotColor: '#666666',
                                    arrowColor: '#666666',
                                    monthTextColor: '#666666',
                                    textDayFontFamily: 'System',
                                    textMonthFontFamily: 'System',
                                    textDayHeaderFontFamily: 'System',
                                    textDayFontSize: 16,
                                    textMonthFontSize: 16,
                                    textDayHeaderFontSize: 14
                                }}
                                style={styles.calendar}
                            />
                        </Collapsible>

                        <View style={styles.activitiesContainer}>
                            {renderActivitySection(
                                'Atividades em Sala',
                                activities[selectedDate]?.classActivities,
                                'classActivities',
                                PASTEL_COLORS.blue
                            )}
                            {renderActivitySection(
                                'Tarefas para Casa',
                                activities[selectedDate]?.homework,
                                'homework',
                                PASTEL_COLORS.green
                            )}
                        </View>
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
        borderRadius: 8,
        marginBottom: 16
    },
    parameterIcon: {
        marginRight: 10
    },
    dateText: {
        ...FONTS.font,
        color: '#666666',
        flex: 1
    },
    calendar: {
        borderRadius: 8,
        marginBottom: 16,
        borderColor: '#E5E5E5',
        borderWidth: 1
    },
    activitiesContainer: {
        flex: 1
    },
    section: {
        marginBottom: 20
    },
    sectionHeader: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 12
    },
    sectionTitle: {
        ...FONTS.font,
        color: '#666666',
        fontWeight: 'bold'
    },
    activityCard: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E5E5E5'
    },
    activityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    activityTime: {
        ...FONTS.font,
        color: '#666666',
        fontWeight: 'bold'
    },
    checkbox: {
        marginLeft: 10,
        borderRadius: 12,
        width: 24,
        height: 24
    },
    activityTitle: {
        ...FONTS.h6,
        marginBottom: 5,
        color: '#333333'
    },
    activityDescription: {
        ...FONTS.fontXs,
        color: '#666666'
    }
});

export default Schedule;
