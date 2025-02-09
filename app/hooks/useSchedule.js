import { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { database } from '../../firebaseConfig';
import Auth from '../Service/Auth';

const useSchedule = () => {
    const [activities, setActivities] = useState({ classroom: [], homework: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const accountData = await Auth.getAccount();
                if (!accountData) {
                    setError('Usuário não autenticado');
                    setLoading(false);
                    return;
                }
                setUser(JSON.parse(accountData));
            } catch (err) {
                setError('Erro ao carregar usuário: ' + err.message);
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    useEffect(() => {
        if (!user) return;

        const activitiesRef = ref(database, `activities/${user.id}`);
        
        const unsubscribe = onValue(activitiesRef, (snapshot) => {
            try {
                const data = snapshot.val();
                if (data) {
                    // Organizar atividades por tipo
                    const classroom = [];
                    const homework = [];

                    Object.entries(data).forEach(([schoolYear, yearData]) => {
                        if (yearData.classroom) {
                            Object.entries(yearData.classroom).forEach(([id, activity]) => {
                                classroom.push({
                                    id,
                                    schoolYear,
                                    ...activity
                                });
                            });
                        }
                        if (yearData.homework) {
                            Object.entries(yearData.homework).forEach(([id, activity]) => {
                                homework.push({
                                    id,
                                    schoolYear,
                                    ...activity
                                });
                            });
                        }
                    });

                    setActivities({
                        classroom: classroom.sort((a, b) => new Date(a.date) - new Date(b.date)),
                        homework: homework.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                    });
                } else {
                    setActivities({ classroom: [], homework: [] });
                }
                setError(null);
            } catch (err) {
                setError('Erro ao carregar atividades: ' + err.message);
            } finally {
                setLoading(false);
            }
        }, (err) => {
            setError('Erro ao carregar atividades: ' + err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const markActivityAsComplete = async (activityId, schoolYear) => {
        if (!user) {
            throw new Error('Usuário não autenticado');
        }

        const activity = [...activities.classroom, ...activities.homework]
            .find(a => a.id === activityId);

        if (!activity) {
            throw new Error('Atividade não encontrada');
        }

        const type = activities.classroom.find(a => a.id === activityId) ? 'classroom' : 'homework';
        const now = new Date().toISOString();

        const updates = {};
        updates[`activities/${user.id}/${schoolYear}/${type}/${activityId}/progress/completed`] = !activity.progress.completed;
        
        if (type === 'homework') {
            updates[`activities/${user.id}/${schoolYear}/${type}/${activityId}/progress/submittedDate`] = now;
        }

        try {
            await update(ref(database), updates);
        } catch (err) {
            throw new Error('Erro ao atualizar atividade: ' + err.message);
        }
    };

    const getActivityStats = () => {
        const stats = {
            classroom: {
                total: activities.classroom.length,
                completed: activities.classroom.filter(a => a.progress.completed).length
            },
            homework: {
                total: activities.homework.length,
                completed: activities.homework.filter(a => a.progress.completed).length
            }
        };

        return stats;
    };

    return {
        activities,
        loading,
        error,
        markActivityAsComplete,
        getActivityStats
    };
};

export default useSchedule;