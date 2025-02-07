import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView, ScrollView } from "react-native";
import Profile1 from "./Profile1";
import Profile2 from "./Profile2";
import Profile3 from "./Profile3";
import Profile4 from "./Profile4";

const ProfileScreen = () => {

    const [profileLayout, setProfileLayout] = useState("profileLayout1");

    useFocusEffect(
        React.useCallback(() => {
            getLayoutType();
        },[])
    )

    const getLayoutType = async() => {
        const layout = await AsyncStorage.getItem('profileLayout');
        setProfileLayout(layout);
    }


    return(
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#FFFFFF'
        }}>
            <ScrollView>
                {profileLayout === "profileLayout1" ?
                    <Profile1/>
                    :
                profileLayout === "profileLayout2" ?
                    <Profile2/>
                    :
                profileLayout === "profileLayout3" ?
                    <Profile3/>
                    :
                profileLayout === "profileLayout4" ?
                    <Profile4/>
                    :
                    <Profile1/>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen;