import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import CustomInput from '../../components/Input/CustomInput';
import { Checkbox } from 'react-native-paper';

const Address = (props) => {
    const {colors} = useTheme();
    const StepData = [
        {
            title : "Address",
            active : true,
            success : false,
        },
        {
            title : "Payment",
            active : false,
            success : false,
        },
        {
            title : "Status",
            active : false,
            success : false,
        },
    ];

    const [defaultAddress, setAddress] = useState('Home');
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    return (
        <>
            <SafeAreaView style={[GlobalStyleSheet.container,{padding:0,flex:1,backgroundColor:colors.cardBg}]}>
                <View
                    style={{
                        flex:1,
                        backgroundColor:colors.background2
                    }}
                >
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
                        <Text style={{...FONTS.h5,color:colors.title}}>Add Address</Text>
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
                    
                    <KeyboardAvoidingView
                        style={{
                            flex:1,
                        }}
                        behavior={Platform.OS === "ios" ? "padding" : ""}
                    >
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
                                    style={[GlobalStyleSheet.container]}
                                >
                                    <View
                                        style={{
                                            borderBottomWidth:1,
                                            borderBottomColor:colors.borderColor,
                                            paddingBottom:5,
                                            marginBottom:20,
                                        }}
                                    >
                                        <Text style={{...FONTS.h6,color:colors.title}}>Contact Details</Text>
                                    </View>
                                    
                                    <View style={{marginBottom:15}}>
                                        <CustomInput
                                            placeholder="Name"
                                        />
                                    </View>
                                    <View style={{marginBottom:15}}>
                                        <CustomInput
                                            placeholder="Mobile No."
                                        />
                                    </View>
                                    
                                    <View
                                        style={{
                                            borderBottomWidth:1,
                                            borderBottomColor:colors.borderColor,
                                            paddingBottom:5,
                                            marginBottom:20,
                                            marginTop:10,
                                        }}
                                    >
                                        <Text style={{...FONTS.h6,color:colors.title}}>Address</Text>
                                    </View>
                                    <View style={{marginBottom:15}}>
                                        <CustomInput
                                            placeholder="Pin Code"
                                        />
                                    </View>
                                    <View style={{marginBottom:15}}>
                                        <CustomInput
                                            placeholder="Address"
                                        />
                                    </View>
                                    <View style={{marginBottom:15}}>
                                        <CustomInput
                                            placeholder="Locality / Town"
                                        />
                                    </View>
                                    <View style={[GlobalStyleSheet.row]}>
                                        <View style={[GlobalStyleSheet.col50]}>
                                            <View style={{marginBottom:15}}>
                                                <CustomInput
                                                    placeholder="City / District"
                                                />
                                            </View>
                                        </View>
                                        <View style={[GlobalStyleSheet.col50]}>
                                            <View style={{marginBottom:15}}>
                                                <CustomInput
                                                    placeholder="State"
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            borderBottomWidth:1,
                                            borderBottomColor:colors.borderColor,
                                            paddingBottom:5,
                                            marginBottom:16,
                                            marginTop:10,
                                        }}
                                    >
                                        <Text style={{...FONTS.h6,color:colors.title}}>Save Address As</Text>
                                    </View>
                                    
                                    <View
                                        style={{
                                            flexDirection:'row',
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => setAddress('Home')}
                                            style={[{
                                                borderWidth:1,
                                                borderColor:colors.title,
                                                borderRadius:30,
                                                paddingHorizontal:10,
                                                paddingVertical:2,
                                                marginRight:10,
                                            }, defaultAddress === "Home" && {
                                                borderColor:COLORS.primary2,
                                            }]}
                                        >
                                            <Text style={[{...FONTS.font,color:colors.title,paddingBottom:2}, defaultAddress === "Home" && {color:COLORS.primary2}]}>Home</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => setAddress('Work')}
                                            style={[{
                                                borderWidth:1,
                                                borderColor:colors.title,
                                                borderRadius:30,
                                                paddingHorizontal:10,
                                                paddingVertical:2,
                                            }, defaultAddress === "Work" && {
                                                borderColor:COLORS.primary2,
                                            }]}
                                        >
                                            <Text style={[{...FONTS.font,color:colors.title,paddingBottom:2}, defaultAddress === "Work" && {color:COLORS.primary2}]}>Work</Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                            marginTop:15,
                                        }}
                                    >
                                        <View
                                            style={[
                                                Platform.OS === 'ios' && {
                                                    transform:[{
                                                        scale:.7
                                                    }]
                                                }
                                            ]}
                                        >
                                            <Checkbox
                                                tintColors={{ true: COLORS.primary2, false: colors.textLight }}
                                                onCheckColor={COLORS.primary2}
                                                onTintColor={COLORS.primary2}
                                                value={toggleCheckBox}
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                        </View>
                                        <View style={{
                                            marginLeft:4,
                                            flex:1,
                                            marginBottom:1,
                                        }}>
                                            <Text style={{...FONTS.font,color:colors.title}}>Make this my default addrss</Text>
                                        </View>
                                    </View>

                                </View>
                            </ScrollView>
                            <View style={[GlobalStyleSheet.container]}>
                                <Button 
                                    onPress={() => props.navigation.navigate('CheckoutPayment')}
                                    title={'Save Address'} 
                                    color={COLORS.primary2}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
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

export default Address;