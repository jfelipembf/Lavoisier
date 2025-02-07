import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../components/Home';
import Quiz from '../pages/Learning/Quiz/Quiz';
import Financeiro from '../pages/Financeiro/Financeiro';

const Stack = createNativeStackNavigator();

const EducationPages = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="EducationHome" component={Home} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Financeiro" component={Financeiro} />
    </Stack.Navigator>
  );
};

export default EducationPages;
