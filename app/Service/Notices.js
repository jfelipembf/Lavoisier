import { database } from '../../firebaseConfig';
import { get, push, ref, set, update } from 'firebase/database';

async function createNotice(noticeData) {
    try {
        // Criar referência para o novo aviso
        const noticesRef = ref(database, `notices/${noticeData.schoolYear}/${noticeData.class}`);
        const newNoticeRef = push(noticesRef);
        const noticeId = newNoticeRef.key;
        
        // Criar o objeto do aviso
        const notice = {
            title: noticeData.title,
            content: noticeData.content,
            date: new Date().toISOString(),
            time: noticeData.time,
            shift: noticeData.shift,
            createdAt: new Date().toISOString(),
            createdBy: noticeData.createdBy,
            status: 'active',
            class: noticeData.class
        };

        await set(newNoticeRef, notice);
        return { success: true, noticeId };
    } catch (error) {
        throw error;
    }
}

async function getNoticesBySchoolYear(schoolYear, userClass) {
    try {
        const noticesRef = ref(database, `notices/${schoolYear}/${userClass}`);
        const snapshot = await get(noticesRef);
        
        if (!snapshot.exists()) {
            return [];
        }

        const notices = [];
        snapshot.forEach((notice) => {
            const noticeData = notice.val();
            if (noticeData.status === 'active') {
                notices.push({
                    id: notice.key,
                    ...noticeData
                });
            }
        });

        // Ordenar por data, mais recentes primeiro
        notices.sort((a, b) => new Date(b.date) - new Date(a.date));

        return notices;
    } catch (error) {
        throw error;
    }
}

async function deactivateNotice(schoolYear, userClass, noticeId) {
    try {
        const updates = {
            [`notices/${schoolYear}/${userClass}/${noticeId}/status`]: 'inactive'
        };

        await update(ref(database), updates);
        return { success: true };
    } catch (error) {
        throw error;
    }
}

export default {
    createNotice,
    getNoticesBySchoolYear,
    deactivateNotice
};
