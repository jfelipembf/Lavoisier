import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebaseConfig';
import Auth from '../Service/Auth';

const useTimetable = () => {
    const [timetable, setTimetable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [teachers, setTeachers] = useState({});
    const [classInfo, setClassInfo] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const accountData = await Auth.getAccount();
                if (!accountData) {
                    setError('Usuário não autenticado');
                    setLoading(false);
                    return;
                }
                const userData = JSON.parse(accountData);
                setUser(userData);
                
                // Se temos a grade horária no AsyncStorage, usar ela
                if (userData.timetable) {
                    setTimetable(userData.timetable);
                    loadTeachers(userData.school);
                    loadClassInfo(userData.school, userData.schoolYear, userData.class);
                    setError(null);
                    return;
                }

                // Se não temos no AsyncStorage, buscar do Firebase
                const timetableRef = ref(database, `timetable/${userData.school}/${userData.schoolYear}/${userData.class}/${userData.shift}`);
                const unsubscribe = onValue(timetableRef, (snapshot) => {
                    try {
                        const data = snapshot.val();
                        if (!data) {
                            setError('Grade horária não encontrada para esta turma');
                            setTimetable(null);
                        } else {
                            setTimetable(data);
                            loadTeachers(userData.school);
                            loadClassInfo(userData.school, userData.schoolYear, userData.class);
                            setError(null);
                        }
                    } catch (err) {
                        console.error('Erro ao carregar grade horária:', err);
                        setError('Erro ao carregar grade horária: ' + err.message);
                    } finally {
                        setLoading(false);
                    }
                }, (err) => {
                    console.error('Erro ao observar grade horária:', err);
                    setError('Erro ao carregar grade horária: ' + err.message);
                    setLoading(false);
                });

                return () => unsubscribe();
            } catch (err) {
                setError('Erro ao carregar usuário: ' + err.message);
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const loadTeachers = (school) => {
        const teachersRef = ref(database, `schools/${school}/staff/teachers`);
        onValue(teachersRef, (snapshot) => {
            const teachersData = snapshot.val();
            if (teachersData) {
                setTeachers(teachersData);
            }
        });
    };

    const loadClassInfo = (school, year, className) => {
        const classRef = ref(database, `timetable/${school}/${year}/${className}`);
        onValue(classRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setClassInfo({
                    ...data,
                    schoolYear: year
                });
            }
        });
    };

    const getCurrentClass = () => {
        if (!timetable) return null;

        const now = new Date();
        const weekday = now.toLocaleDateString('pt-BR', { weekday: 'long' }).split('-')[0].trim();
        const currentTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const daySchedule = timetable[weekday];
        if (!daySchedule) return null;

        return daySchedule.find(period => 
            currentTime >= period.startTime && currentTime < period.endTime
        );
    };

    const getNextClass = () => {
        if (!timetable) return null;

        const now = new Date();
        const weekday = now.toLocaleDateString('pt-BR', { weekday: 'long' }).split('-')[0].trim();
        const currentTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const daySchedule = timetable[weekday];
        if (!daySchedule) return null;

        return daySchedule.find(period => currentTime < period.startTime);
    };

    const getTeacherInfo = (teacherId) => {
        if (!teacherId || !teachers[teacherId]) return null;
        
        const teacher = teachers[teacherId];
        const classesText = Object.entries(teacher.classes)
            .map(([year, sections]) => `${year}º ${sections.join('/')}`)
            .join(', ');
            
        return {
            ...teacher,
            classesText
        };
    };

    return {
        timetable,
        loading,
        error,
        getCurrentClass,
        getNextClass,
        getTeacherInfo,
        classInfo
    };
};

export default useTimetable;
