import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Profile1 from "./Profile1";
import Profile2 from "./Profile2";
import Profile3 from "./Profile3";
import Profile4 from "./Profile4";
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../constants/colors';
import FONTS from '../constants/fonts';

const ProfileScreen = () => {

    const [profileLayout , setProfileLayout] = useState('');
    
    useFocusEffect(
        React.useCallback(() => {
            getUser();
          return () => {};
        }, [profileLayout])
    );

    const getUser = async () => {
      let data = await AsyncStorage.getItem('profileLayout');
      setProfileLayout(data);
    }

    const renderProfileCard = (item) => (
        <TouchableOpacity
            key={item.id}
            style={[styles.profileCard, { borderLeftColor: item.color || COLORS.primary }]}
            onPress={item.onPress}
        >
            <View style={[styles.iconContainer, { backgroundColor: (item.color || COLORS.primary) + '20' }]}>
                <MaterialCommunityIcons name={item.icon} size={24} color={item.color || COLORS.primary} />
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.profileTitle}>{item.title}</Text>
                <Text style={styles.profileSubtitle}>{item.subtitle}</Text>
            </View>
            <MaterialCommunityIcons 
                name="chevron-right" 
                size={24} 
                color={COLORS.gray} 
                style={styles.arrowIcon}
            />
        </TouchableOpacity>
    );

    return(
        <>
            {profileLayout === "profileLayout1" ?
                <Profile1 renderProfileCard={renderProfileCard}/>
                :
            profileLayout === "profileLayout2" ?
                <Profile2 renderProfileCard={renderProfileCard}/>
                :
            profileLayout === "profileLayout3" ?
                <Profile3 renderProfileCard={renderProfileCard}/>
                :
            profileLayout === "profileLayout4" ?
                <Profile4 renderProfileCard={renderProfileCard}/>
                :
                <Profile1 renderProfileCard={renderProfileCard}/>
            }
        </>
    )
}

const styles = StyleSheet.create({
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderLeftWidth: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    profileInfo: {
        flex: 1,
    },
    profileTitle: {
        ...FONTS.h4,
        color: COLORS.black,
        marginBottom: 4,
    },
    profileSubtitle: {
        ...FONTS.body4,
        color: COLORS.gray,
    },
    arrowIcon: {
        marginLeft: 10,
    },
});

export default ProfileScreen;