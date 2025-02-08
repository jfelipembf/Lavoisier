import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from '../../firebaseConfig';
import { equalTo, get, orderByChild, push, query, ref, set, update } from 'firebase/database';
import { Platform, ToastAndroid, Alert } from 'react-native';

async function getAccount() {
  try {
    console.log('Auth: Buscando dados da conta');
    const account = await AsyncStorage.getItem('account');
    console.log('Auth: Dados encontrados:', account);
    return account;
  } catch (error) {
    console.error('Auth: Erro ao buscar conta:', error);
    return null;
  }
}

async function setAccount(data) {
  try {
    console.log('Auth: Salvando dados da conta:', data);
    await AsyncStorage.setItem('account', typeof data === 'string' ? data : JSON.stringify(data));
    console.log('Auth: Dados salvos com sucesso');
  } catch (error) {
    console.error('Auth: Erro ao salvar conta:', error);
    throw error;
  }
}

async function logout() {
  return await AsyncStorage.removeItem('account');
}

async function userLogin(email, password){
  try {
    console.log('=== INICIANDO LOGIN ===');
    
    // Buscar usuário pelo email
    const userRef = ref(database, 'users');
    const userQuery = query(userRef, orderByChild('emailId'), equalTo(email));
    const snapshot = await get(userQuery);
    
    if (!snapshot.exists()) {
      throw new Error('Usuário não encontrado');
    }

    // Pegar primeiro usuário encontrado
    const [userId, userData] = Object.entries(snapshot.val())[0];
    
    if (userData.password !== password) {
      throw new Error('Senha incorreta');
    }

    // Atualizar último login
    userData.lastLogin = new Date().toISOString();
    
    // Mapear todas as disciplinas do sistema
    console.log('\n=== MAPEANDO TODAS AS DISCIPLINAS DO SISTEMA ===');
    const allUsersRef = ref(database, 'users');
    const allUsersSnapshot = await get(allUsersRef);
    const allDisciplines = new Set();
    
    if (allUsersSnapshot.exists()) {
      allUsersSnapshot.forEach((userSnapshot) => {
        const user = userSnapshot.val();
        if (user.notas) {
          Object.keys(user.notas).forEach(disciplina => {
            allDisciplines.add(disciplina);
            console.log('Disciplina encontrada:', disciplina);
          });
        }
      });
    }
    
    console.log('\n=== TODAS AS DISCIPLINAS ENCONTRADAS ===');
    console.log(Array.from(allDisciplines));

    // Garantir que o usuário tenha todas as disciplinas
    if (!userData.notas) {
      userData.notas = {};
    }

    // Adicionar disciplinas faltantes ao usuário
    allDisciplines.forEach(disciplina => {
      if (!userData.notas[disciplina]) {
        console.log('Adicionando disciplina faltante:', disciplina);
      }
      
      // Garantir estrutura padrão para todas as disciplinas
      userData.notas[disciplina] = {
        Unidade1: {
          extra: userData.notas[disciplina]?.Unidade1?.extra || 0,
          final: userData.notas[disciplina]?.Unidade1?.final || 0,
          prova: userData.notas[disciplina]?.Unidade1?.prova || 0,
          simulado: userData.notas[disciplina]?.Unidade1?.simulado || 0,
          trabalho: userData.notas[disciplina]?.Unidade1?.trabalho || 0
        },
        Unidade2: {
          extra: userData.notas[disciplina]?.Unidade2?.extra || 0,
          final: userData.notas[disciplina]?.Unidade2?.final || 0,
          prova: userData.notas[disciplina]?.Unidade2?.prova || 0,
          simulado: userData.notas[disciplina]?.Unidade2?.simulado || 0,
          trabalho: userData.notas[disciplina]?.Unidade2?.trabalho || 0
        },
        Unidade3: {
          extra: userData.notas[disciplina]?.Unidade3?.extra || 0,
          final: userData.notas[disciplina]?.Unidade3?.final || 0,
          prova: userData.notas[disciplina]?.Unidade3?.prova || 0,
          simulado: userData.notas[disciplina]?.Unidade3?.simulado || 0,
          trabalho: userData.notas[disciplina]?.Unidade3?.trabalho || 0
        },
        Unidade4: {
          extra: userData.notas[disciplina]?.Unidade4?.extra || 0,
          final: userData.notas[disciplina]?.Unidade4?.final || 0,
          prova: userData.notas[disciplina]?.Unidade4?.prova || 0,
          simulado: userData.notas[disciplina]?.Unidade4?.simulado || 0,
          trabalho: userData.notas[disciplina]?.Unidade4?.trabalho || 0
        }
      };
    });

    // Atualizar dados no Firebase
    await update(ref(database), {
      [`users/${userId}`]: userData
    });

    // Salvar na memória local
    await setAccount(JSON.stringify(userData));
    
    console.log('=== LOGIN CONCLUÍDO COM SUCESSO ===');
    return userData;
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

async function registerUser(name, emailId, password, additionalData = {}){
  try {
    // Step 1: Check if the user already exists
    const usersRef = ref(database, "users");
    const emailQuery = query(usersRef, orderByChild("emailId"), equalTo(emailId));

    const snapshot = await get(emailQuery);

    if (snapshot.exists()) {
      {Platform.OS === 'android' ?
          ToastAndroid.show('User already exists with this email.', ToastAndroid.LONG)
        :
          Alert.alert('User already exists with this email.')
      }
      return { success: false, message: "User already exists." };
    } else {
      // Step 2: Register the new user
      const newUserRef = push(usersRef);
      const userData = {
        emailId: emailId,
        password: String(password), // Garantir que a senha seja string
        name: name,
        ...additionalData
      };

      await set(newUserRef, userData);
      {Platform.OS === 'android' ?
          ToastAndroid.show('Register Successfully!', ToastAndroid.LONG)
        :
          Alert.alert('Register Successfully!')
      }
      return { success: true, userId: newUserRef.key };
    }
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

async function getAllDisciplines() {
  try {
    console.log('\n=== BUSCANDO TODAS AS DISCIPLINAS ===');
    
    // Buscar todos os usuários
    const usersRef = ref(database, 'users');
    const usersSnapshot = await get(usersRef);
    
    if (!usersSnapshot.exists()) {
      console.log('Nenhum usuário encontrado');
      return new Set();
    }

    // Conjunto para armazenar disciplinas únicas
    const allDisciplines = new Set();
    
    // Processar cada usuário
    usersSnapshot.forEach((userSnapshot) => {
      const userData = userSnapshot.val();
      if (userData.notas) {
        Object.keys(userData.notas).forEach(disciplina => {
          allDisciplines.add(disciplina);
        });
      }
    });

    console.log('\n=== TODAS AS DISCIPLINAS ENCONTRADAS ===');
    console.log(Array.from(allDisciplines));
    
    return allDisciplines;
  } catch (error) {
    console.error('Erro ao buscar disciplinas:', error);
    throw error;
  }
}

async function updateUserGrades(userId) {
  try {
    console.log('=== ATUALIZANDO NOTAS DO USUÁRIO ===');
    
    // Buscar dados atuais do usuário
    const userRef = ref(database, `users/${userId}`);
    const userSnapshot = await get(userRef);
    
    if (!userSnapshot.exists()) {
      throw new Error('Usuário não encontrado');
    }

    const userData = userSnapshot.val();
    
    // Mostrar dados atuais
    console.log('\n=== DISCIPLINAS ATUAIS DO USUÁRIO ===');
    if (userData.notas) {
      console.log('Disciplinas:', Object.keys(userData.notas));
    }
    
    // Se não tiver notas, criar objeto vazio
    if (!userData.notas) {
      userData.notas = {};
    }

    // Garantir que as disciplinas base existam, sem apagar as existentes
    const disciplinasBase = {
      portugues: {
        Unidade1: { extra: 2, final: 8, prova: 0, simulado: 0, trabalho: 0 },
        Unidade2: { extra: 0, final: 0, prova: 0, simulado: 0, trabalho: 0 },
        Unidade3: { extra: 0, final: 7.5, prova: 5, simulado: 2.5, trabalho: 0 },
        Unidade4: { extra: 0, final: 0, prova: 0, simulado: 0, trabalho: 0 }
      },
      'Matemática': {
        Unidade1: { extra: 0, final: 8, prova: 0, simulado: 0, trabalho: 0 },
        Unidade2: { extra: 0, final: 0, prova: 0, simulado: 0, trabalho: 0 },
        Unidade3: { extra: 0, final: 0, prova: 0, simulado: 0, trabalho: 0 },
        Unidade4: { extra: 0, final: 0, prova: 0, simulado: 0, trabalho: 0 }
      }
    };

    // Adicionar apenas disciplinas que não existem
    Object.entries(disciplinasBase).forEach(([disciplina, notas]) => {
      if (!userData.notas[disciplina]) {
        userData.notas[disciplina] = notas;
      }
    });

    // Mostrar disciplinas após atualização
    console.log('\n=== DISCIPLINAS APÓS ATUALIZAÇÃO ===');
    console.log('Disciplinas:', Object.keys(userData.notas));

    // Atualizar notas no Firebase
    await update(ref(database), {
      [`users/${userId}/notas`]: userData.notas
    });

    // Atualizar dados no AsyncStorage
    await setAccount(JSON.stringify(userData));

    console.log('=== NOTAS ATUALIZADAS COM SUCESSO ===');
    return userData;
  } catch (error) {
    console.error('Erro ao atualizar notas:', error);
    throw error;
  }
}

export default {
  logout,
  getAccount,
  setAccount,
  userLogin,
  registerUser,
  updateUserGrades,
  getAllDisciplines
};