import { useEffect, useState } from 'react';
import Auth from '../Service/Auth';

const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                ('useUser: Buscando dados do usuário');
                const account = await Auth.getAccount();
                
                if (account) {
                    const parsedAccount = JSON.parse(account);
                    ('useUser: Dados encontrados:', parsedAccount);
                    setUser(parsedAccount);
                } else {
                    ('useUser: Nenhum dado encontrado');
                    setUser(null);
                }
            } catch (err) {
                console.error('useUser: Erro ao buscar dados:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return {
        user,
        loading,
        error,
        refreshUser: async () => {
            setLoading(true);
            try {
                const account = await Auth.getAccount();
                if (account) {
                    const parsedAccount = JSON.parse(account);
                    setUser(parsedAccount);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
    };
};

export default useUser;