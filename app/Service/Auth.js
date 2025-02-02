import AsyncStorage from '@react-native-async-storage/async-storage';
import { database, storage } from '../../firebaseConfig';
import { equalTo, get, orderByChild, push, query, ref, set, update } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Platform, ToastAndroid, Alert } from 'react-native';

async function getAccount() {
  return await AsyncStorage.getItem('account');
}

async function setAccount(data) {
  return await AsyncStorage.setItem('account', JSON.stringify(data));
}

async function logout() {
  return await AsyncStorage.removeItem('account');
}

async function userLogin(email, password) {
  try {
    const usersRef = ref(database, "users");
    const emailQuery = query(usersRef, orderByChild("emailId"), equalTo(email));

    const snapshot = await get(emailQuery);

    if (snapshot.exists()) {
      let userFound = null;
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        if (userData.password === password) {
          userFound = userData;
        }
      });

      if (userFound) {
        Platform.OS === 'android' ? 
          ToastAndroid.show('Login Successfully!' , ToastAndroid.LONG)  
        :
          Alert.alert('Login Successfully!')
        return userFound; 
      } else {
        Platform.OS === 'android' ?
          ToastAndroid.show('Invalid password!' , ToastAndroid.LONG)
        :
          Alert.alert('Invalid password!')
        return null;
      }
    } else {
      Platform.OS === 'android' ?
        ToastAndroid.show('Invalid emailId!' , ToastAndroid.LONG)
        :
        Alert.alert('Invalid emailId!')
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

async function registerUser(name, emailId, password, additionalData = {}) {
  try {
    const usersRef = ref(database, "users");
    const emailQuery = query(usersRef, orderByChild("emailId"), equalTo(emailId));

    const snapshot = await get(emailQuery);

    if (snapshot.exists()) {
      Platform.OS === 'android' ?
        ToastAndroid.show('User already exists with this email.', ToastAndroid.LONG)
        :
        Alert.alert('User already exists with this email.')
      return { success: false, message: "User already exists." };
    } else {
      const newUserRef = push(usersRef); 
      const userData = {
        emailId: emailId,
        password: password,
        name: name,
        ...additionalData 
      };

      await set(newUserRef, userData); 
      Platform.OS === 'android' ?
        ToastAndroid.show('Register Successfully!', ToastAndroid.LONG)
        :
        Alert.alert('Register Successfully!')

      return { success: true, message: "Registration successful", user: userData };
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, message: "Error during registration", error };
  }
};

async function updateProfile(userData, imageUri = null) {
  try {
    if (!userData.id) {
      throw new Error('User ID is required');
    }

    // Handle image upload if provided
    if (imageUri) {
      const imageRef = storageRef(storage, `profile_images/${userData.id}`);
      
      // Convert URI to blob
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      // Upload image
      await uploadBytes(imageRef, blob);
      
      // Get download URL
      const downloadURL = await getDownloadURL(imageRef);
      userData.img = downloadURL;
    }

    // Prepare update data
    const updates = {
      ...userData,
      emailId: userData.emailId || userData.email,
    };
    delete updates.email;

    // Update user data in Firebase
    const userRef = ref(database, `users/${userData.id}`);
    await update(userRef, updates);
    
    // Update local storage
    await setAccount(updates);
    
    Platform.OS === 'android' 
      ? ToastAndroid.show('Profile updated successfully!', ToastAndroid.LONG)
      : Alert.alert('Success', 'Profile updated successfully!');

    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    Platform.OS === 'android'
      ? ToastAndroid.show('Failed to update profile', ToastAndroid.LONG)
      : Alert.alert('Error', 'Failed to update profile');
    throw error;
  }
}

async function deleteAccount(userId) {
  try {
    try {
      const imageRef = storageRef(storage, `profile_images/${userId}`);
      await deleteObject(imageRef);
    } catch (error) {
      console.log('No profile image to delete or error deleting image:', error);
    }

    const userRef = ref(database, `users/${userId}`);
    await set(userRef, null);
    await logout();
    
    Platform.OS === 'android'
      ? ToastAndroid.show('Account deleted successfully!', ToastAndroid.LONG)
      : Alert.alert('Success', 'Account deleted successfully!');
    
    return true;
  } catch (error) {
    console.error('Error deleting account:', error);
    Platform.OS === 'android'
      ? ToastAndroid.show('Failed to delete account', ToastAndroid.LONG)
      : Alert.alert('Error', 'Failed to delete account');
    return false;
  }
}

export default {
  logout,
  getAccount,
  setAccount,
  userLogin,
  registerUser,
  updateProfile,
  deleteAccount,
};