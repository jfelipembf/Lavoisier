import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FONTS } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { useNavigation } from '@react-navigation/native';

// Cores pastéis personalizadas
const PASTEL_COLORS = {
    blue: '#cee7e6',    // Azul pastel
    green: '#eae3ef',   // Verde pastel
    red: '#f2eee9',     // Vermelho pastel
    yellow: '#f3dfde',  // Amarelo pastel
    purple: '#e6e6fa',  // Lilás pastel
    orange: '#ffe4c4',  // Pêssego pastel
};

const weekDays = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira'
];

const schedule = {
    'Segunda-feira': [
        { time: '07:30 - 08:20', subject: 'Matemática', teacher: 'Prof. Silva', room: 'Sala 101' },
        { time: '08:20 - 09:10', subject: 'Português', teacher: 'Profa. Santos', room: 'Sala 102' },
        { time: '09:10 - 10:00', subject: 'História', teacher: 'Prof. Oliveira', room: 'Sala 103' },
        { time: '10:20 - 11:10', subject: 'Geografia', teacher: 'Prof. Lima', room: 'Sala 104' },
        { time: '11:10 - 12:00', subject: 'Ciências', teacher: 'Profa. Costa', room: 'Lab. Ciências' },
    ],
    'Terça-feira': [
        { time: '07:30 - 08:20', subject: 'Física', teacher: 'Prof. Pereira', room: 'Lab. Física' },
        { time: '08:20 - 09:10', subject: 'Química', teacher: 'Profa. Souza', room: 'Lab. Química' },
        { time: '09:10 - 10:00', subject: 'Biologia', teacher: 'Prof. Santos', room: 'Lab. Biologia' },
        { time: '10:20 - 11:10', subject: 'Ed. Física', teacher: 'Prof. Rodrigues', room: 'Quadra' },
        { time: '11:10 - 12:00', subject: 'Artes', teacher: 'Profa. Lima', room: 'Sala de Artes' },
    ],
    'Quarta-feira': [
        { time: '07:30 - 08:20', subject: 'Português', teacher: 'Profa. Santos', room: 'Sala 102' },
        { time: '08:20 - 09:10', subject: 'Matemática', teacher: 'Prof. Silva', room: 'Sala 101' },
        { time: '09:10 - 10:00', subject: 'Inglês', teacher: 'Profa. Miller', room: 'Sala 105' },
        { time: '10:20 - 11:10', subject: 'História', teacher: 'Prof. Oliveira', room: 'Sala 103' },
        { time: '11:10 - 12:00', subject: 'Geografia', teacher: 'Prof. Lima', room: 'Sala 104' },
    ],
    'Quinta-feira': [
        { time: '07:30 - 08:20', subject: 'Química', teacher: 'Profa. Souza', room: 'Lab. Química' },
        { time: '08:20 - 09:10', subject: 'Física', teacher: 'Prof. Pereira', room: 'Lab. Física' },
        { time: '09:10 - 10:00', subject: 'Matemática', teacher: 'Prof. Silva', room: 'Sala 101' },
        { time: '10:20 - 11:10', subject: 'Português', teacher: 'Profa. Santos', room: 'Sala 102' },
        { time: '11:10 - 12:00', subject: 'Inglês', teacher: 'Profa. Miller', room: 'Sala 105' },
    ],
    'Sexta-feira': [
        { time: '07:30 - 08:20', subject: 'Biologia', teacher: 'Prof. Santos', room: 'Lab. Biologia' },
        { time: '08:20 - 09:10', subject: 'Ed. Física', teacher: 'Prof. Rodrigues', room: 'Quadra' },
        { time: '09:10 - 10:00', subject: 'Artes', teacher: 'Profa. Lima', room: 'Sala de Artes' },
        { time: '10:20 - 11:10', subject: 'História', teacher: 'Prof. Oliveira', room: 'Sala 103' },
        { time: '11:10 - 12:00', subject: 'Geografia', teacher: 'Prof. Lima', room: 'Sala 104' },
    ],
};

const getSubjectColor = (subject) => {
    const subjectColors = {
        'Matemática': PASTEL_COLORS.blue,
        'Português': PASTEL_COLORS.green,
        'História': PASTEL_COLORS.red,
        'Geografia': PASTEL_COLORS.yellow,
        'Ciências': PASTEL_COLORS.purple,
        'Física': PASTEL_COLORS.blue,
        'Química': PASTEL_COLORS.green,
        'Biologia': PASTEL_COLORS.purple,
        'Ed. Física': PASTEL_COLORS.red,
        'Artes': PASTEL_COLORS.orange,
        'Inglês': PASTEL_COLORS.yellow,
    };
    return subjectColors[subject] || PASTEL_COLORS.blue;
};

const ClassSchedule = () => {
    const navigation = useNavigation();
    const [selectedDay, setSelectedDay] = useState(weekDays[0]);

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
                        selectedDay === day && styles.selectedDayText
                    ]}>
                        {day.split('-')[0]}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const renderClassCard = (classInfo) => (
        <View 
            key={classInfo.time} 
            style={[
                styles.classCard,
                { borderLeftColor: getSubjectColor(classInfo.subject) }
            ]}
        >
            <Text style={styles.timeText}>{classInfo.time}</Text>
            <View style={styles.classInfo}>
                <Text style={styles.subjectText}>{classInfo.subject}</Text>
                <Text style={styles.teacherText}>{classInfo.teacher}</Text>
                <Text style={styles.roomText}>{classInfo.room}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#FFFFFF'}]}>
            <Header 
                title={'Grade Horária'} 
                titleLeft 
                leftIcon="back"
                onPressLeft={() => navigation.goBack()}
            />
            
            {renderDaySelector()}

            <ScrollView 
                style={{backgroundColor: '#FFFFFF'}} 
                contentContainerStyle={{paddingBottom: 100}}
            >
                <View style={{flex:1, backgroundColor: '#FFFFFF'}}>
                    <View style={GlobalStyleSheet.container}>
                        {schedule[selectedDay].map(classInfo => renderClassCard(classInfo))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    daySelector: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5'
    },
    dayButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: '#F5F5F5'
    },
    selectedDayButton: {
        backgroundColor: PASTEL_COLORS.blue
    },
    dayButtonText: {
        ...FONTS.font,
        color: '#666666'
    },
    selectedDayText: {
        color: '#333333',
        fontWeight: 'bold'
    },
    classCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 12,
        padding: 15,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderLeftWidth: 4
    },
    timeText: {
        ...FONTS.fontSm,
        color: '#666666',
        marginBottom: 8
    },
    classInfo: {
        flex: 1
    },
    subjectText: {
        ...FONTS.h6,
        color: '#333333',
        marginBottom: 4
    },
    teacherText: {
        ...FONTS.fontXs,
        color: '#666666',
        marginBottom: 2
    },
    roomText: {
        ...FONTS.fontXs,
        color: '#666666'
    }
});

export default ClassSchedule;
