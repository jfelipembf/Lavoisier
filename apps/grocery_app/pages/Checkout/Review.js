import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';

const Review = (props) => {
    const {colors} = useTheme();
    const StepData = [
        {
            title : "Address",
            active : false,
            success : true,
        },
        {
            title : "Payment",
            active : false,
            success : true,
        },
        {
            title : "Status",
            active : true,
            success : false,
        },
    ];


    return (
        <>
            <SafeAreaView style={[GlobalStyleSheet.container,{padding:0, flex:1,backgroundColor:colors.background2}]}>
                <View
                    style={{
                        height:55,
                        backgroundColor: colors.cardBg,
                        flexDirection:'row',
                        alignItems:'center',
                        ...GlobalStyleSheet.shadow,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={{
                            height:55,
                            width:55,
                            alignItems:'center',
                            justifyContent:'center',
                            marginRight:5,
                        }}
                    >
                        <FeatherIcon color={colors.title} name={'arrow-left'} size={22}/>
                    </TouchableOpacity>
                    <Text style={{...FONTS.h5,color:colors.title}}>Order Status</Text>
                </View>
                <View
                    style={{
                        flexDirection:'row',
                        paddingVertical:15,
                        borderBottomWidth:1,
                        borderColor:colors.borderColor,

                    }}
                >
                    {StepData.map((data,index) => {
                        return(
                            <View
                                key={index}
                                style={[styles.stepItem]}
                            >
                                <View
                                    style={[styles.stepIcon,{
                                        backgroundColor:colors.cardBg,
                                    }, data.active && {
                                        backgroundColor:COLORS.primary2,
                                    }, data.success && {
                                        backgroundColor:COLORS.primary2,
                                    }]}
                                >
                                    {data.success ?
                                        <FeatherIcon color={COLORS.white} size={16} name='check' />
                                        :
                                        <Text style={[{
                                            ...FONTS.font,
                                            ...FONTS.fontBold,
                                            color:colors.title,
                                            marginBottom:2,
                                        }, data.active && {
                                            color:COLORS.white,
                                        }]}>{index+1}</Text>
                                    }
                                </View>
                                <Text style={{
                                    ...FONTS.font,
                                    ...FONTS.fontBold,
                                    color:colors.title
                                }}>{data.title}</Text>
                            </View>
                        )
                    })}
                </View>
                
                <View
                    style={{
                        flex:1,
                        backgroundColor:colors.cardBg
                    }}
                >
                    <ScrollView
                        contentContainerStyle={{flexGrow:1}}
                    >
                        <View
                            style={{
                                flex:1,
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <Image
                                style={{
                                    height:50,
                                    width:50,
                                    marginBottom:15,
                                }}
                                source={IMAGES.check}
                            />
                            <Text style={{...FONTS.h5,color:colors.title}}>Payment Successfull</Text>
                        </View>
                    </ScrollView>
                    <View style={[GlobalStyleSheet.container]}>
                        <Button 
                            onPress={() => props.navigation.navigate('Home')}
                            title={'Back to Home'} 
                            color={COLORS.primary2}
                        />
                    </View>
                </View>

            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    stepItem : {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    stepIcon : {
        height:30,
        width:30,
        borderRadius:35,
        marginRight:10,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:COLORS.primary2,
    }
})

export default Review;