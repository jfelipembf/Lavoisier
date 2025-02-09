import { useEffect, useState } from 'react';
import useUser from './useUser';
import NoticesService from '../Service/Notices';

const useNotices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useUser();

    const loadNotices = async () => {
        if (!user?.schoolYear) {
            setNotices([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const userNotices = await NoticesService.getNoticesBySchoolYear(user.schoolYear);
            setNotices(userNotices);
        } catch (err) {
            console.error('Erro ao carregar avisos:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            loadNotices();
        }
    }, [user]);

    return {
        notices,
        loading,
        error,
        refreshNotices: loadNotices
    };
};

export default useNotices;
