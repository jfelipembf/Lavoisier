import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from '../../firebaseConfig';
import { equalTo, get, orderByChild, push, query, ref, set, update } from 'firebase/database';
import { Platform, ToastAndroid,Alert } from 'react-native';

async function getAccount() {
  try {
    ('Auth: Buscando dados da conta');
    const account = await AsyncStorage.getItem('account');
    ('Auth: Dados encontrados:', account);
    return account;
  } catch (error) {
    console.error('Auth: Erro ao buscar conta:', error);
    return null;
  }
}

async function setAccount(data) {
  try {
    ('Auth: Salvando dados da conta:', data);
    await AsyncStorage.setItem('account', typeof data === 'string' ? data : JSON.stringify(data));
    ('Auth: Dados salvos com sucesso');
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
    const usersRef = ref(database, "users");
    const emailQuery = query(usersRef, orderByChild("emailId"));

    const snapshot = await get(emailQuery);

    if (snapshot.exists()) {
      let userFound = null;
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        // Comparação case-insensitive do email e convertendo senha para string
        if (userData.emailId.toLowerCase() === email.toLowerCase() && 
            String(userData.password) === String(password)) {
          userFound = userData;
        }
      });

      if (userFound) {
        // Armazenando todos os dados relevantes do usuário
        const userDataToStore = {
          id: userFound.id,
          name: userFound.name,
          emailId: userFound.emailId,
          address: userFound.address,
          phone: userFound.phone,
          birthDate: userFound.birthDate,
          cep: userFound.cep,
          city: userFound.city,
          gender: userFound.gender,
          img: userFound.img,
          notificationPreferences: userFound.notificationPreferences || {},
          languagePreference: userFound.languagePreference || 'en',
          lastLogin: new Date().toISOString(),
        };

        await setAccount(userDataToStore);
        {Platform.OS === 'android' ? 
          ToastAndroid.show('Login realizado com sucesso!' , ToastAndroid.LONG)  
        :
          Alert.alert('Login realizado com sucesso!')
        }
        return userDataToStore;
      } else {
        {Platform.OS === 'android' ?
          ToastAndroid.show('Email ou senha inválidos!' , ToastAndroid.LONG)
        :
          Alert.alert('Email ou senha inválidos!')
        }
        return null;
      }
    } else {
      {Platform.OS === 'android' ?
        ToastAndroid.show('Email não encontrado!' , ToastAndroid.LONG)
      :
        Alert.alert('Email não encontrado!')
      }
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

async function registerUser(name,emailId, password, additionalData = {}){
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
      const newUserRef = push(usersRef); // Generate a unique ID for the new user
      const userData = {
        emailId: emailId,
        password: password,
        name: name,
        ...additionalData // Include any additional data, e.g., username, profile info
      };

      await set(newUserRef, userData); // Save user data to Firebase
      {Platform.OS === 'android' ?
          ToastAndroid.show('Register Successfully!', ToastAndroid.LONG)
        :
          Alert.alert('Register Successfully!')
      }

      return { success: true, message: "Registration successful", user: userData };
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, message: "Error during registration", error };
  }
};


export default {
  logout,
  getAccount,
  setAccount,
  registerUser,
  userLogin
};