import React from "react";
import { View, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { COLORS } from "../constants/theme";

// Screens
import Home from "./Home/Home";
import Learning from "./Learning";
import Profile from "./Profile/Profile";
import Grades from "./Grades/Grades";
import Quiz from "./Learning/Quiz/Quiz";
import FinanceiroScreen from "./Financeiro/Financeiro";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 88 : 60,
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -5,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#777777",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              size={24}
              color={focused ? COLORS.primary : "#777777"}
            />
          ),
          tabBarLabel: "Início",
        }}
      />
      <Tab.Screen
        name="Financial"
        component={FinanceiroScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="wallet"
              size={24}
              color={focused ? COLORS.primary : "#777777"}
            />
          ),
          tabBarLabel: "Financeiro",
        }}
      />
      <Tab.Screen
        name="Learning"
        component={Learning}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="book-education"
              size={24}
              color={focused ? COLORS.primary : "#777777"}
            />
          ),
          tabBarLabel: "Aprendizagem",
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={Quiz}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="clipboard-text"
              size={24}
              color={focused ? COLORS.primary : "#777777"}
            />
          ),
          tabBarLabel: "Quiz",
        }}
      />
      <Tab.Screen
        name="Grades"
        component={Grades}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="chart-box"
              size={24}
              color={focused ? COLORS.primary : "#777777"}
            />
          ),
          tabBarLabel: "Notas",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-circle"
              size={24}
              color={focused ? COLORS.primary : "#777777"}
            />
          ),
          tabBarLabel: "Perfil",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
