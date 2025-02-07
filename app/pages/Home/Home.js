import React from "react";
import { 
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import FeatherIcon from "react-native-vector-icons/Feather";
import Header from "../../layout/Header";
import { COLORS, FONTS, IMAGES, SIZES } from "../../constants/theme";
import RBSheet from "react-native-raw-bottom-sheet";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import Home from "../../components/Home";

const HomeScreen = () => {
  const { colors } = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  const sheetRef = React.useRef(null);

  const renderHeader = () => (
    <View
      style={[
        GlobalStyleSheet.container,
        {
          padding: 0,
          backgroundColor: colors.card,
          borderBottomWidth: 1,
          borderColor: colors.borderColor,
          paddingBottom: 5,
          paddingTop: 0,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          alignItems: "center",
        },
      ]}
    >
      <TextInput
        style={{
          ...FONTS.font,
          paddingHorizontal: 15,
          color: colors.title,
          width: "100%",
          height: 45,
        }}
        placeholder="Write a message ..."
        placeholderTextColor={colors.text}
      />
    </View>
  );

  const renderContent = () => (
    <View
      style={[
        GlobalStyleSheet.container,
        {
          padding: 0,
          backgroundColor: colors.card,
          paddingBottom: 70,
        },
      ]}
    >
      <View
        style={{
          marginHorizontal: 15,
          marginVertical: 15,
        }}
      >
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 0,
            top: -1,
            zIndex: 1,
          }}
        >
          <FeatherIcon name="search" color={colors.text} size={24} />
        </TouchableOpacity>
        <TextInput
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: colors.borderColor,
            borderRadius: SIZES.radius,
            paddingHorizontal: 15,
            ...FONTS.font,
            color: colors.title,
          }}
          placeholder="Search here..."
          placeholderTextColor={colors.text}
        />
      </View>
      <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
        <Text style={{ ...FONTS.h6, fontSize: 14, color: colors.title }}>
          Nenhum dado disponível.
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Header 
        titleLeft
        title={'Início'}
        bgWhite
      />
      <LinearGradient style={{ flex: 1 }} colors={colors.bgGradient}>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsHorizontalScrollIndicator={false}>
          <Home />
        </ScrollView>
      </LinearGradient>

      <RBSheet
        ref={sheetRef}
        closeOnDragDown={true}
        height={500}
        openDuration={300}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,.3)",
          },
          container: {
            backgroundColor: colors.card,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
        }}
      >
        {renderHeader()}
        <ScrollView showsHorizontalScrollIndicator={false}>
          <TouchableOpacity activeOpacity={1} style={{ flex: 1 }}>
            {renderContent()}
          </TouchableOpacity>
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
};

export default HomeScreen;
