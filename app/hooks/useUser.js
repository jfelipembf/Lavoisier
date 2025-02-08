import { useEffect, useState } from 'react';
import Auth from '../Service/Auth';

const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                ('==== HOOK: BUSCANDO DADOS DO USUÁRIO ====');
                const account = await Auth.getAccount();
                
                if (account) {
                    try {
                        // Garantir que temos um objeto limpo
                        const userData = JSON.parse(account);
                        ('==== HOOK: DADOS DO USUÁRIO ====');
                        ('Dados:', JSON.stringify(userData, null, 2));

                        // Atualizar notas apenas se não existirem ou se faltarem disciplinas base
                        if (userData.id && (!userData.notas || !userData.notas.portugues || !userData.notas['Matemática'])) {
                            try {
                                const updatedUserData = await Auth.updateUserGrades(userData.id);
                                setUser(updatedUserData);
                            } catch (error) {
                                console.error('Erro ao atualizar notas:', error);
                                setUser(userData);
                            }
                        } else {
                            setUser(userData);
                        }
                    } catch (parseError) {
                        console.error('Erro ao fazer parse dos dados:', parseError);
                        setError(parseError);
                    }
                } else {
                    ('==== HOOK: NENHUM DADO ENCONTRADO ====');
                    setUser(null);
                }
            } catch (err) {
                console.error('==== HOOK: ERRO AO BUSCAR DADOS ====', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
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