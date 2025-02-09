import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from '../../firebaseConfig';
import { equalTo, get, orderByChild, push, query, ref, set, update } from 'firebase/database';
import { Platform, ToastAndroid, Alert } from 'react-native';

const Auth = {
    async setAccount(userData) {
        try {
            await AsyncStorage.setItem('userAccount', JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error('Erro ao salvar conta:', error);
            throw error;
        }
    },

    async getAccount() {
        try {
            const account = await AsyncStorage.getItem('userAccount');
            return account;
        } catch (error) {
            console.error('Erro ao recuperar conta:', error);
            throw error;
        }
    },

    async removeAccount() {
        try {
            await AsyncStorage.removeItem('userAccount');
        } catch (error) {
            console.error('Erro ao remover conta:', error);
            throw error;
        }
    },

    async isAuthenticated() {
        try {
            const account = await this.getAccount();
            return account !== null;
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            return false;
        }
    },

    async logout() {
        try {
            // Lista de todas as chaves que precisam ser removidas
            const keysToRemove = [
                'userAccount',
                'schedule',
                'classInfo',
                'grades',
                'activities',
                'notifications'
            ];

            // Remover todas as chaves do AsyncStorage
            await Promise.all(keysToRemove.map(key => AsyncStorage.removeItem(key)));

            // Atualizar o status de último acesso no Firebase
            const userDataStr = await this.getAccount();
            if (userDataStr) {
                const userData = JSON.parse(userDataStr);
                if (userData.id) {
                    await update(ref(database, `users/${userData.id}`), {
                        lastLogout: new Date().toISOString()
                    });
                }
            }

            // Mostrar mensagem de sucesso
            if (Platform.OS === 'android') {
                ToastAndroid.show('Logout realizado com sucesso!', ToastAndroid.SHORT);
            } else {
                Alert.alert('Sucesso', 'Logout realizado com sucesso!');
            }

            return true;
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            if (Platform.OS === 'android') {
                ToastAndroid.show('Erro ao fazer logout', ToastAndroid.LONG);
            } else {
                Alert.alert('Erro', 'Não foi possível completar o logout');
            }
            throw error;
        }
    },

    async userLogin(email, password) {
        try {
            if (!email || !password) {
                throw new Error('Email e senha são obrigatórios');
            }

            const usersRef = ref(database, 'users');
            const snapshot = await get(usersRef);

            if (!snapshot.exists()) {
                throw new Error('Erro ao acessar o banco de dados');
            }

            const users = snapshot.val();
            const userEntry = Object.entries(users).find(([_, userData]) =>
                userData.emailId && userData.emailId.toLowerCase() === email.toLowerCase()
            );

            if (!userEntry) {
                throw new Error('Email não encontrado');
            }

            const [userId, userData] = userEntry;

            if (userData.password !== password) {
                throw new Error('Senha incorreta');
            }

            // Garantir que todos os campos necessários estejam presentes
            const completeUserData = {
                ...userData,
                id: userId,
                lastLogin: new Date().toISOString()
            };

            // Atualizar o usuário no banco
            await update(ref(database, `users/${userId}`), {
                lastLogin: completeUserData.lastLogin
            });

            // Carregar informações da turma
            const classRef = ref(database, `classes/${userData.school}/${userData.schoolYear}/${userData.class}`);
            const classSnapshot = await get(classRef);

            if (classSnapshot.exists()) {
                completeUserData.classInfo = classSnapshot.val();
            }

            // Carregar grade horária
            const scheduleRef = ref(database, `timetable/${userData.school}/${userData.schoolYear}/${userData.class}`);
            const scheduleSnapshot = await get(scheduleRef);

            if (scheduleSnapshot.exists()) {
                completeUserData.schedule = scheduleSnapshot.val();
            }

            // Salvar no AsyncStorage
            await this.setAccount(completeUserData);

            return completeUserData;
        } catch (error) {
            console.error('Erro no userLogin:', error);
            throw error;
        }
    },

    async registerUser(name, emailId, password, additionalData = {}) {
        try {
            const usersRef = ref(database, "users");
            const emailQuery = query(usersRef, orderByChild("emailId"), equalTo(emailId));
            const snapshot = await get(emailQuery);

            if (snapshot.exists()) {
                Platform.OS === 'android'
                    ? ToastAndroid.show('Usuário já existe com este email.', ToastAndroid.LONG)
                    : Alert.alert('Usuário já existe com este email.');
                return { success: false, message: "Usuário já existe." };
            }

            const newUserRef = push(usersRef);
            const userData = {
                emailId,
                password: String(password),
                name,
                ...additionalData,
                createdAt: new Date().toISOString()
            };

            await set(newUserRef, userData);
            
            Platform.OS === 'android'
                ? ToastAndroid.show('Cadastro realizado com sucesso!', ToastAndroid.LONG)
                : Alert.alert('Cadastro realizado com sucesso!');
            
            return { success: true, userId: newUserRef.key };
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            throw error;
        }
    }
};

export default Auth;