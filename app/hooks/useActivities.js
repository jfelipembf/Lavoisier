import { useState, useEffect } from 'react';
import { database } from '../../firebaseConfig';
import { ref, get, set, onValue } from 'firebase/database';
import Auth from '../Service/Auth';

const useActivities = () => {
    const [activities, setActivities] = useState({ classroom: [], homework: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadActivities = async () => {
            try {
                const userDataStr = await Auth.getAccount();
                if (!userDataStr) {
                    throw new Error('Usuário não encontrado');
                }

                const userData = JSON.parse(userDataStr);
                if (!userData.school || !userData.schoolYear || !userData.class) {
                    throw new Error('Informações da turma não encontradas');
                }

                // Referência para as atividades da turma
                const activitiesRef = ref(database, `activities/${userData.school}/${userData.schoolYear}/${userData.class}`);
                const progressRef = ref(database, `activityProgress/${userData.school}/${userData.schoolYear}/${userData.class}`);

                // Listener para atualizações em tempo real
                onValue(activitiesRef, async (snapshot) => {
                    if (snapshot.exists()) {
                        const activitiesData = snapshot.val();
                        const progressSnapshot = await get(progressRef);
                        const progressData = progressSnapshot.exists() ? progressSnapshot.val() : {};

                        // Separar atividades por tipo e adicionar informação de progresso
                        const classroomActivities = [];
                        const homeworkActivities = [];

                        Object.entries(activitiesData).forEach(([id, activity]) => {
                            const activityWithProgress = {
                                ...activity,
                                id,
                                progress: progressData[id]?.[userData.id] || { completed: false }
                            };

                            if (activity.type === 'classroom') {
                                classroomActivities.push(activityWithProgress);
                            } else if (activity.type === 'homework') {
                                homeworkActivities.push(activityWithProgress);
                            }
                        });

                        setActivities({
                            classroom: classroomActivities.sort((a, b) => new Date(a.date) - new Date(b.date)),
                            homework: homeworkActivities.sort((a, b) => new Date(a.date) - new Date(b.date))
                        });
                    } else {
                        setActivities({ classroom: [], homework: [] });
                    }
                    setLoading(false);
                });

            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        loadActivities();
    }, []);

    const markActivityAsComplete = async (activity) => {
        try {
            const userDataStr = await Auth.getAccount();
            if (!userDataStr) throw new Error('Usuário não encontrado');

            const userData = JSON.parse(userDataStr);
            const progressRef = ref(database, 
                `activityProgress/${userData.school}/${userData.schoolYear}/${userData.class}/${activity.id}/${userData.id}`
            );

            const currentDate = new Date().toISOString();
            const newProgress = {
                completed: !activity.progress?.completed,
                updatedAt: currentDate,
                ...(activity.type === 'homework' && { submittedDate: currentDate })
            };

            await set(progressRef, newProgress);

            // Atualizar o estado local imediatamente
            setActivities(prevActivities => {
                const updatedActivities = { ...prevActivities };
                const activityType = activity.type;

                updatedActivities[activityType] = updatedActivities[activityType].map(act => {
                    if (act.id === activity.id) {
                        return { ...act, progress: { ...newProgress } };
                    }
                    return act;
                });

                return updatedActivities;
            });

            return true;

        } catch (error) {
            console.error('Error marking activity as complete:', error);
            throw error;
        }
    };

    return { activities, loading, error, markActivityAsComplete };
};

export default useActivities;
