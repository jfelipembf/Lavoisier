import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from '../../firebaseConfig';
import { equalTo, get, orderByChild, push, query, ref, set, update } from 'firebase/database';
import { Platform, ToastAndroid, Alert } from 'react-native';

async function getAccount() {
  try {
    const account = await AsyncStorage.getItem('account');
    return account;
  } catch (error) {
    return null;
  }
}

async function setAccount(data) {
  try {
    await AsyncStorage.setItem('account', typeof data === 'string' ? data : JSON.stringify(data));
  } catch (error) {
    throw error;
  }
}

async function logout() {
  return await AsyncStorage.removeItem('account');
}

async function userLogin(email, password){
  try {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    const userRef = ref(database, 'users');
    const snapshot = await get(userRef);
    
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

    const [firebaseId, userData] = userEntry;
    
    if (userData.password !== password) {
      throw new Error('Senha incorreta');
    }

    // Garantir que todos os campos necessários estejam presentes
    const requiredFields = {
      school: 'lavoisier-aracaju',
      schoolYear: userData.schoolYear || 'Jardim I',
      class: userData.class || 'A',
      shift: userData.shift || 'Manhã',
      role: userData.role || 'student'
    };

    const updatedUserData = {
      ...userData,
      ...requiredFields,
      id: userData.id || firebaseId, // Manter o id original se existir
      firebaseId, // Adicionar o firebaseId
      lastLogin: new Date().toISOString()
    };
    
    // Atualizar o usuário no banco com os campos necessários
    await update(ref(database, `users/${firebaseId}`), updatedUserData);

    // Salvar no AsyncStorage com o firebaseId
    await setAccount(JSON.stringify(updatedUserData));
    
    return updatedUserData;
  } catch (error) {
    console.error('Erro no userLogin:', error);
    throw error;
  }
}

async function registerUser(name, emailId, password, additionalData = {}){
  try {
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
      const newUserRef = push(usersRef);
      const userData = {
        emailId: emailId,
        password: String(password),
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
    throw error;
  }
}

export default {
  logout,
  getAccount,
  setAccount,
  userLogin,
  registerUser
};