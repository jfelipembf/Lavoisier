import { useState, useEffect } from 'react';
import { ref, onValue, update, get } from 'firebase/database';
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
                const userData = JSON.parse(accountData);
                
                // Garantir que estamos usando o ID do Firebase
                if (!userData.firebaseId) {
                    // Buscar o ID do Firebase usando o email
                    const userRef = ref(database, 'users');
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        const users = snapshot.val();
                        const userEntry = Object.entries(users).find(([_, u]) => 
                            u.emailId && u.emailId.toLowerCase() === userData.emailId.toLowerCase()
                        );
                        if (userEntry) {
                            const [firebaseId] = userEntry;
                            userData.firebaseId = firebaseId;
                            // Atualizar o AsyncStorage com o firebaseId
                            await Auth.setAccount(JSON.stringify(userData));
                        }
                    }
                }
                
                setUser(userData);
            } catch (err) {
                setError('Erro ao carregar usuário: ' + err.message);
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    useEffect(() => {
        if (!user || !user.school || !user.schoolYear || !user.class || !user.shift) {
            console.log('Dados do usuário incompletos:', user);
            setError('Dados do usuário incompletos. Necessário: escola, ano escolar, turma e turno.');
            setLoading(false);
            return;
        }

        const activitiesRef = ref(database, `activities/${user.school}/${user.schoolYear}/${user.class}`);
        const progressRef = ref(database, `activityProgress/${user.school}/${user.schoolYear}/${user.class}`);
        
        // Função para combinar atividades com progresso
        const combineActivitiesWithProgress = async (activities, progressSnapshot) => {
            const progress = progressSnapshot.val() || {};
            const classroom = [];
            const homework = [];

            Object.entries(activities).forEach(([id, activity]) => {
                if (activity.shift === user.shift) {
                    // Usar o firebaseId se disponível, senão usar o id normal
                    const userId = user.firebaseId || user.id;
                    
                    // Pegar o progresso específico do usuário
                    const activityProgress = progress[id]?.[userId] || {
                        completed: false,
                        updatedAt: null
                    };

                    const activityWithProgress = {
                        id,
                        ...activity,
                        progress: activityProgress
                    };

                    if (activity.type === 'classroom') {
                        classroom.push(activityWithProgress);
                    } else if (activity.type === 'homework') {
                        homework.push(activityWithProgress);
                    }
                }
            });

            return {
                classroom: classroom.sort((a, b) => new Date(a.date) - new Date(b.date)),
                homework: homework.sort((a, b) => new Date(a.dueDate || a.date) - new Date(b.dueDate || b.date))
            };
        };

        // Listener para atividades e progresso
        const unsubscribeActivities = onValue(activitiesRef, async (activitiesSnapshot) => {
            try {
                const activitiesData = activitiesSnapshot.val();
                if (!activitiesData) {
                    setActivities({ classroom: [], homework: [] });
                    return;
                }

                // Buscar progresso atual
                const progressSnapshot = await get(progressRef);
                const combinedActivities = await combineActivitiesWithProgress(activitiesData, progressSnapshot);
                setActivities(combinedActivities);
                setError(null);
            } catch (err) {
                console.error('Erro ao carregar atividades:', err);
                setError('Erro ao carregar atividades: ' + err.message);
            } finally {
                setLoading(false);
            }
        }, (err) => {
            console.error('Erro ao observar atividades:', err);
            setError('Erro ao carregar atividades: ' + err.message);
            setLoading(false);
        });

        // Listener para progresso
        const unsubscribeProgress = onValue(progressRef, async (progressSnapshot) => {
            try {
                // Buscar atividades atuais
                const activitiesSnapshot = await get(activitiesRef);
                const activitiesData = activitiesSnapshot.val();
                if (!activitiesData) return;

                const combinedActivities = await combineActivitiesWithProgress(activitiesData, progressSnapshot);
                setActivities(combinedActivities);
                setError(null);
            } catch (err) {
                console.error('Erro ao atualizar progresso:', err);
            }
        });

        return () => {
            unsubscribeActivities();
            unsubscribeProgress();
        };
    }, [user]);

    const markActivityAsComplete = async (activity) => {
        if (!user || !user.school || !user.schoolYear || !user.class) {
            throw new Error('Dados do usuário incompletos');
        }

        try {
            // Usar o firebaseId se disponível, senão usar o id normal
            const userId = user.firebaseId || user.id;
            
            const updates = {};
            const path = `activityProgress/${user.school}/${user.schoolYear}/${user.class}/${activity.id}/${userId}`;
            const now = new Date().toISOString();
            
            // Toggle o estado completed
            const newCompleted = !activity.progress?.completed;
            
            updates[`${path}/completed`] = newCompleted;
            updates[`${path}/updatedAt`] = now;
            
            if (activity.type === 'homework' && newCompleted) {
                updates[`${path}/submittedDate`] = now;
            }

            await update(ref(database), updates);
            
            // O estado será atualizado automaticamente pelo listener onValue
        } catch (err) {
            console.error('Erro ao atualizar atividade:', err);
            throw new Error('Erro ao atualizar atividade: ' + err.message);
        }
    };

    const getActivityStats = () => {
        const stats = {
            classroom: {
                total: activities.classroom.length,
                completed: activities.classroom.filter(a => a.progress?.completed).length
            },
            homework: {
                total: activities.homework.length,
                completed: activities.homework.filter(a => a.progress?.completed).length
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