import { db } from '../config/firebase';
import { ref, set, get, update } from 'firebase/database';
import moment from 'moment';

export const scheduleService = {
    async getActivities(userId, date) {
        try {
            const activitiesRef = ref(db, `activities/${userId}/${date}`);
            const snapshot = await get(activitiesRef);
            
            if (snapshot.exists()) {
                return snapshot.val();
            }
            return {
                classActivities: [],
                homework: []
            };
        } catch (error) {
            console.error('Error getting activities:', error);
            throw error;
        }
    },

    async toggleActivityStatus(userId, date, activityId, type, completed) {
        try {
            const activityRef = ref(db, `activities/${userId}/${date}/${type}/${activityId}/completed`);
            await set(activityRef, completed);
            return true;
        } catch (error) {
            console.error('Error toggling activity status:', error);
            throw error;
        }
    },

    async addActivity(userId, date, activity, type) {
        try {
            const activitiesRef = ref(db, `activities/${userId}/${date}/${type}`);
            const snapshot = await get(activitiesRef);
            
            let activities = [];
            if (snapshot.exists()) {
                activities = snapshot.val();
            }
            
            activities.push({
                ...activity,
                id: Date.now(),
                completed: false
            });
            
            await set(activitiesRef, activities);
            return true;
        } catch (error) {
            console.error('Error adding activity:', error);
            throw error;
        }
    }
};
