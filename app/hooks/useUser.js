import { useEffect, useState } from 'react';
import Auth from '../Service/Auth';
import { database } from '../../firebaseConfig';
import { get, ref, update } from 'firebase/database';

const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllDisciplines = async () => {
        try {
            const usersRef = ref(database, 'users');
            const usersSnapshot = await get(usersRef);
            
            if (!usersSnapshot.exists()) {
                return {
                    disciplines: new Set(),
                    units: new Set(),
                    gradeFields: new Set()
                };
            }

            const systemStructure = {
                disciplines: new Set(),
                units: new Set(),
                gradeFields: new Set()
            };
            
            usersSnapshot.forEach((userSnapshot) => {
                const userData = userSnapshot.val();
                if (userData.notas) {
                    Object.entries(userData.notas).forEach(([disciplina, unidades]) => {
                        systemStructure.disciplines.add(disciplina);
                        
                        if (typeof unidades === 'object') {
                            Object.entries(unidades).forEach(([unidade, notas]) => {
                                systemStructure.units.add(unidade);
                                
                                if (typeof notas === 'object') {
                                    Object.keys(notas).forEach(campo => {
                                        systemStructure.gradeFields.add(campo);
                                    });
                                }
                            });
                        }
                    });
                }
            });
            
            return systemStructure;
        } catch (error) {
            throw error;
        }
    };

    const updateUserGrades = async (userId) => {
        try {
            // Buscar estrutura atual do sistema
            const systemStructure = await getAllDisciplines();
            
            // Buscar dados atuais do usuário
            const userRef = ref(database, `users/${userId}`);
            const userSnapshot = await get(userRef);
            
            if (!userSnapshot.exists()) {
                throw new Error('Usuário não encontrado');
            }

            const userData = userSnapshot.val();
            
            if (!userData.notas) {
                userData.notas = {};
            }

            // Garantir que o usuário tenha todas as disciplinas com a estrutura correta
            systemStructure.disciplines.forEach(disciplina => {
                if (!userData.notas[disciplina]) {
                    userData.notas[disciplina] = {};
                }
                
                systemStructure.units.forEach(unidade => {
                    if (!userData.notas[disciplina][unidade] || typeof userData.notas[disciplina][unidade] !== 'object') {
                        userData.notas[disciplina][unidade] = {};
                    }
                    
                    systemStructure.gradeFields.forEach(campo => {
                        if (typeof userData.notas[disciplina][unidade][campo] === 'undefined') {
                            userData.notas[disciplina][unidade][campo] = 0;
                        }
                    });
                });
            });

            await update(ref(database), {
                [`users/${userId}/notas`]: userData.notas
            });

            await Auth.setAccount(JSON.stringify(userData));

            return userData;
        } catch (error) {
            throw error;
        }
    };

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
                                const updatedUserData = await updateUserGrades(userData.id);
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
        getAllDisciplines,
        updateUserGrades,
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