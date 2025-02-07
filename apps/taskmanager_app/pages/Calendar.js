import React from 'react';
import {
    SafeAreaView,
    View,
    Text
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Calendar } from 'react-native-calendars';
import { FONTS } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';

const CalendarScreen = ({navigation}) => {

    const {colors} = useTheme();

    return (
        <SafeAreaView
            style={[GlobalStyleSheet.container,{
                padding:0,
                flex:1,
                backgroundColor:colors.cardBg,
            }]}
        >
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    borderBottomWidth:1,
                    borderBottomColor:colors.borderColor,
                    paddingVertical:2,
                }}
            >
                <IconButton
                    onPress={() => {navigation.goBack()}}
                    icon={() => <FeatherIcon size={20} color={colors.title} name='arrow-left'/>}
                />
                <Text style={{...FONTS.h6,color:colors.title,top:1,flex:1}}>Calendar</Text>
            </View>

            <Calendar
                theme={{
                    calendarBackground: colors.cardBg,
                    dayTextColor: colors.title,
                    monthTextColor: colors.title,
                    textDisabledColor: colors.textLight,
                }}
            />
        </SafeAreaView>
    );
};

export default CalendarScreen;