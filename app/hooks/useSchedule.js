import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../../firebaseConfig';
import Auth from '../Service/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSchedule = () => {
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [classInfo, setClassInfo] = useState(null);

    const mapTeacherNames = async (scheduleData, userData) => {
        try {
            // Carregar todos os professores do caminho correto
            const teachersRef = ref(database, `schools/${userData.school}/staff/teachers`);
            const teachersSnapshot = await get(teachersRef);
            
            if (!teachersSnapshot.exists()) {
                return scheduleData;
            }

            const teachers = teachersSnapshot.val();
            const mappedSchedule = {};

            // Mapear cada dia da semana
            Object.keys(scheduleData).forEach(day => {
                mappedSchedule[day] = scheduleData[day].map(slot => {
                    if (slot.isBreak) return slot;
                    
                    const teacherId = slot.teacher;
                    const teacher = teachers[teacherId];
                    
                    return {
                        ...slot,
                        teacher: teacher ? teacher.name : 'Professor não encontrado'
                    };
                });
            });

            return mappedSchedule;
        } catch (error) {
            console.error('Erro ao mapear professores:', error);
            return scheduleData;
        }
    };

    useEffect(() => {
        const loadSchedule = async () => {
            try {
                setLoading(true);
                
                // Carregar dados do usuário
                const userDataStr = await Auth.getAccount();
                if (!userDataStr) {
                    throw new Error('Usuário não encontrado');
                }

                const userData = JSON.parse(userDataStr);
                if (!userData.school || !userData.schoolYear || !userData.class) {
                    throw new Error('Informações da turma não encontradas');
                }

                // Carregar informações da turma
                const classRef = ref(database, `classes/${userData.school}/${userData.schoolYear}/${userData.class}`);
                const classSnapshot = await get(classRef);
                
                let classData;
                if (classSnapshot.exists()) {
                    classData = classSnapshot.val();
                } else {
                    // Fallback para dados do usuário
                    classData = {
                        segment: userData.schoolYear,
                        class: userData.class,
                        shift: userData.shift || 'Manhã'
                    };
                }
                setClassInfo(classData);

                // Carregar grade horária
                const scheduleRef = ref(database, `timetable/${userData.school}/${userData.schoolYear}/${userData.class}/${userData.shift || 'Manhã'}`);
                const scheduleSnapshot = await get(scheduleRef);
                
                if (scheduleSnapshot.exists()) {
                    let scheduleData = scheduleSnapshot.val();
                    // Mapear os nomes dos professores
                    scheduleData = await mapTeacherNames(scheduleData, userData);
                    setSchedule(scheduleData);
                    await AsyncStorage.setItem('schedule', JSON.stringify(scheduleData));
                } else {
                    // Tentar carregar do AsyncStorage se não encontrar no Firebase
                    const savedSchedule = await AsyncStorage.getItem('schedule');
                    if (savedSchedule) {
                        setSchedule(JSON.parse(savedSchedule));
                    } else {
                        throw new Error('Grade horária não encontrada');
                    }
                }
            } catch (err) {
                console.error('Erro ao carregar grade horária:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadSchedule();
    }, []);

    return { schedule, loading, error, classInfo };
};