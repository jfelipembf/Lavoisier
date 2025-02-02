import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import CustomInput from '../../components/Input/CustomInput';


const Payment = (props) => {
    const {colors} = useTheme();
    const StepData = [
        {
            title : "Address",
            active : false,
            success : true,
        },
        {
            title : "Payment",
            active : true,
            success : false,
        },
        {
            title : "Status",
            active : false,
            success : false,
        },
    ];

    const [paymentOption, setPaymentOption] = useState('');

    const [payActive , setPayActive] = useState('');

    const PhonePeOption = [
        {
            image : IMAGES.phonepe,
            title : "Phone Pe",
        },
        {
            image : IMAGES.phonepe,
            title : "Paytm",
        },
        {
            image : IMAGES.phonepe,
            title : "Enter UPI ID",
        },
    ]

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
                    <Text style={{...FONTS.h5,color:colors.title}}>Payment</Text>
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
                        <View style={[GlobalStyleSheet.container]}>
                            <View style={{flexDirection:'row',alignItems:'center',marginBottom:8}}>
                                <Image style={{height:20,width:20,marginRight:10,tintColor:colors.title}} source={IMAGES.discount}/>
                                <Text style={{...FONTS.h6,color:colors.title}}>Bank Offer</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{
                                    height:3,
                                    width:3,
                                    borderRadius:3,
                                    backgroundColor:colors.text,
                                    marginRight:10,
                                    opacity:.5,
                                    marginTop:8,
                                }}/>
                                <Text style={{...FONTS.font,color:colors.text}}>10% instant Savings on Citi Credit and Debit Cards on a min spend of Rs 3,0000. TCA</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                backgroundColor:colors.background2,
                                paddingHorizontal:15,
                                paddingBottom:10,
                                paddingTop:15,
                            }}
                        >
                            <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.text}}>Payment Options</Text>
                        </View>
                        
                        <View style={{borderBottomWidth:1,borderColor:colors.borderColor}}>
                            <TouchableOpacity
                                onPress={() => setPaymentOption(paymentOption === 'Cash' ? '' : 'Cash')}
                                style={[styles.list]}
                            >
                                <Image
                                    style={[styles.listImg,{tintColor:colors.title}]}
                                    source={IMAGES.cash}
                                />
                                <Text style={[styles.listTitle,{color:colors.title}]}>Cash On Delivery(Cash/UPI)</Text>
                                <FeatherIcon color={colors.title} name={'chevron-down'} size={22} />
                            </TouchableOpacity>
                            <Collapsible collapsed={paymentOption === "Cash" ? false : true}>
                                {/* <Text>
                                    awraweijr ai ier auriaewur iowwaura iwe
                                </Text> */}
                            </Collapsible>
                        </View>

                        <View style={{borderBottomWidth:1,borderColor:colors.borderColor}}>
                            <TouchableOpacity
                                onPress={() => setPaymentOption(paymentOption === 'Credit' ? '' : 'Credit')}
                                style={[styles.list]}
                            >
                                <Image
                                    style={[styles.listImg,{tintColor:colors.title}]}
                                    source={IMAGES.card}
                                />
                                <Text style={[styles.listTitle,{color:colors.title}]}>Credit / Debit Card</Text>
                                <FeatherIcon color={colors.title} name={'chevron-down'} size={22} />
                            </TouchableOpacity>
                            <Collapsible collapsed={paymentOption === "Credit" ? false : true}>
                                <View
                                    style={{
                                        paddingHorizontal:15,
                                        paddingBottom:30,
                                    }}
                                >
                                    <Text style={{...FONTS.font,color:colors.text,marginBottom:10}}>Please ensure your card can be used for online transactions.</Text>
                                    <View style={{marginBottom:15}}>
                                        <CustomInput
                                            placeholder="Card Number"
                                        />
                                    </View>
                                    <View style={{marginBottom:15}}>
                                        <CustomInput
                                            placeholder="Name on card"
                                        />
                                    </View>
                                    <View style={[GlobalStyleSheet.row]}>
                                        <View style={[GlobalStyleSheet.col50]}>
                                            <CustomInput
                                                placeholder="Valid Thru(MM/YY)"
                                            />
                                        </View>
                                        <View style={[GlobalStyleSheet.col50]}>
                                            <CustomInput
                                                placeholder="CVV"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Collapsible>
                        </View>

                        <View style={{borderBottomWidth:1,borderColor:colors.borderColor}}>
                            <TouchableOpacity
                                onPress={() => setPaymentOption(paymentOption === 'PhonePe' ? '' : 'PhonePe')}
                                style={[styles.list]}
                            >
                                <Image
                                    style={[styles.listImg,{tintColor:colors.title}]}
                                    source={IMAGES.pay}
                                />
                                <Text style={[styles.listTitle,{color:colors.title}]}>PhonePe/ Google Pay/ BHIM UPI</Text>
                                <FeatherIcon color={colors.title} name={'chevron-down'} size={22} />
                            </TouchableOpacity>
                            <Collapsible collapsed={paymentOption === "PhonePe" ? false : true}>
                                <View style={{paddingBottom:20}}>
                                    {PhonePeOption.map((data,index) => {
                                        return(
                                            <TouchableOpacity
                                                onPress={() => setPayActive(data.title)}
                                                key={index}
                                                style={[styles.payList,{
                                                    borderBottomColor:colors.borderColor,
                                                }, PhonePeOption.length - 1 === index && {
                                                    borderBottomWidth:0,
                                                }]}
                                            >
                                                <View
                                                    style={[styles.listRadio,{
                                                        borderColor:colors.text,
                                                    }, payActive === data.title && {
                                                        borderColor:COLORS.primary2,
                                                    }]}
                                                >
                                                    {payActive === data.title &&
                                                        <View style={styles.listRadioCircle}/>
                                                    }
                                                </View>
                                                <View
                                                    style={[styles.payMedia,{
                                                        borderColor:colors.borderColor,
                                                    }]}
                                                >
                                                    <Image style={styles.payImg} source={data.image}/>
                                                </View>
                                                <Text style={[
                                                    {
                                                        ...FONTS.font,
                                                        color:colors.text
                                                    },
                                                    payActive === data.title && {
                                                        ...FONTS.fontBold,
                                                        color:colors.title
                                                    }]}>{data.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </Collapsible>
                        </View>

                        <View style={{borderBottomWidth:1,borderColor:colors.borderColor}}>
                            <TouchableOpacity
                                onPress={() => setPaymentOption(paymentOption === 'PaytmWallet' ? '' : 'PaytmWallet')}
                                style={[styles.list]}
                            >
                                <Image
                                    style={[styles.listImg,{tintColor:colors.title}]}
                                    source={IMAGES.wallet}
                                />
                                <Text style={[styles.listTitle,{color:colors.title}]}>Paytm/ Wallets</Text>
                                <FeatherIcon color={colors.title} name={'chevron-down'} size={22} />
                            </TouchableOpacity>
                            <Collapsible collapsed={paymentOption === "PaytmWallet" ? false : true}>
                                <View style={{paddingBottom:20}}>
                                    {PhonePeOption.map((data,index) => {
                                        return(
                                            <TouchableOpacity
                                                onPress={() => setPayActive(data.title)}
                                                key={index}
                                                style={[styles.payList,{
                                                    borderBottomColor:colors.borderColor,
                                                }, PhonePeOption.length - 1 === index && {
                                                    borderBottomWidth:0,
                                                }]}
                                            >
                                                <View
                                                    style={[styles.listRadio,{
                                                        borderColor:colors.text,
                                                    }, payActive === data.title && {
                                                        borderColor:COLORS.primary2,
                                                    }]}
                                                >
                                                    {payActive === data.title &&
                                                        <View style={styles.listRadioCircle}/>
                                                    }
                                                </View>
                                                <View
                                                    style={[styles.payMedia,{
                                                        borderColor:colors.borderColor,
                                                    }]}
                                                >
                                                    <Image style={styles.payImg} source={data.image}/>
                                                </View>
                                                <Text style={[
                                                    {
                                                        ...FONTS.font,
                                                        color:colors.text
                                                    },
                                                    payActive === data.title && {
                                                        ...FONTS.fontBold,
                                                        color:colors.title
                                                    }]}>{data.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </Collapsible>
                        </View>

                        <View style={{borderBottomWidth:1,borderColor:colors.borderColor}}>
                            <TouchableOpacity
                                onPress={() => setPaymentOption(paymentOption === 'Netbanking' ? '' : 'Netbanking')}
                                style={[styles.list]}
                            >
                                <Image
                                    style={[styles.listImg,{tintColor:colors.title}]}
                                    source={IMAGES.bank}
                                />
                                <Text style={[styles.listTitle,{color:colors.title}]}>Net Banking</Text>
                                <FeatherIcon color={colors.title} name={'chevron-down'} size={22} />
                            </TouchableOpacity>
                            <Collapsible collapsed={paymentOption === "Netbanking" ? false : true}>
                                <View style={{paddingBottom:20}}>
                                    {PhonePeOption.map((data,index) => {
                                        return(
                                            <TouchableOpacity
                                                onPress={() => setPayActive(data.title)}
                                                key={index}
                                                style={[styles.payList,{
                                                    borderBottomColor:colors.borderColor,
                                                }, PhonePeOption.length - 1 === index && {
                                                    borderBottomWidth:0,
                                                }]}
                                            >
                                                <View
                                                    style={[styles.listRadio,{
                                                        borderColor:colors.text,
                                                    }, payActive === data.title && {
                                                        borderColor:COLORS.primary2,
                                                    }]}
                                                >
                                                    {payActive === data.title &&
                                                        <View style={styles.listRadioCircle}/>
                                                    }
                                                </View>
                                                <View
                                                    style={[styles.payMedia,{
                                                        borderColor:colors.borderColor,
                                                    }]}
                                                >
                                                    <Image style={styles.payImg} source={data.image}/>
                                                </View>
                                                <Text style={[
                                                    {
                                                        ...FONTS.font,
                                                        color:colors.text
                                                    },
                                                    payActive === data.title && {
                                                        ...FONTS.fontBold,
                                                        color:colors.title
                                                    }]}>{data.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </Collapsible>
                        </View>

                        <View style={{borderBottomWidth:1,borderColor:colors.borderColor}}>
                            <TouchableOpacity
                                onPress={() => setPaymentOption(paymentOption === 'EMI' ? '' : 'EMI')}
                                style={[styles.list]}
                            >
                                <Image
                                    style={[styles.listImg,{tintColor:colors.title}]}
                                    source={IMAGES.personal}
                                />
                                <Text style={[styles.listTitle,{color:colors.title}]}>EMI/ Pay Later</Text>
                                <FeatherIcon color={colors.title} name={'chevron-down'} size={22} />
                            </TouchableOpacity>
                            <Collapsible collapsed={paymentOption === "EMI" ? false : true}>
                                <View style={{paddingBottom:20}}>
                                    {PhonePeOption.map((data,index) => {
                                        return(
                                            <TouchableOpacity
                                                onPress={() => setPayActive(data.title)}
                                                key={index}
                                                style={[styles.payList,{
                                                    borderBottomColor:colors.borderColor,
                                                }, PhonePeOption.length - 1 === index && {
                                                    borderBottomWidth:0,
                                                }]}
                                            >
                                                <View
                                                    style={[styles.listRadio,{
                                                        borderColor:colors.text,
                                                    }, payActive === data.title && {
                                                        borderColor:COLORS.primary2,
                                                    }]}
                                                >
                                                    {payActive === data.title &&
                                                        <View style={styles.listRadioCircle}/>
                                                    }
                                                </View>
                                                <View
                                                    style={[styles.payMedia,{
                                                        borderColor:colors.borderColor,
                                                    }]}
                                                >
                                                    <Image style={styles.payImg} source={data.image}/>
                                                </View>
                                                <Text style={[
                                                    {
                                                        ...FONTS.font,
                                                        color:colors.text
                                                    },
                                                    payActive === data.title && {
                                                        ...FONTS.fontBold,
                                                        color:colors.title
                                                    }]}>{data.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </Collapsible>
                        </View>
                        
                        <View style={[GlobalStyleSheet.container]}>
                            <View
                                style={{
                                    paddingHorizontal:15,
                                    paddingVertical:15,
                                    backgroundColor:colors.background2,
                                    borderRadius:10,
                                    flexDirection:'row',
                                    alignItems:'center',
                                }}
                            >
                                <Image
                                    style={{height:18,width:18,marginRight:12,tintColor:colors.title}}
                                    source={IMAGES.gift}
                                />
                                <Text style={[styles.listTitle,{color:colors.title}]}>Have a Gift Card?</Text>
                                <TouchableOpacity>
                                    <Text style={{...FONTS.font,color:COLORS.primary2,...FONTS.fontBold}}>APPLY</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[GlobalStyleSheet.container]}>
                            <View
                                style={{
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                    paddingBottom:10,
                                    marginBottom:10,
                                }}
                            >
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title}}>Price Details(1 item)</Text>
                            </View>
                            <View style={styles.detailList}>
                                <Text style={{...FONTS.font,color:colors.text}}>Total MRP</Text>
                                <Text style={{...FONTS.font,color:colors.text}}>1599</Text>
                            </View>
                            <View style={styles.detailList}>
                                <Text style={{...FONTS.font,color:colors.text}}>Discount on MRP</Text>
                                <Text style={{...FONTS.font,color:COLORS.success}}>-640</Text>
                            </View>
                            <View style={styles.detailList}>
                                <Text style={{...FONTS.font,color:colors.text}}>Coupon Discount</Text>
                                <Text style={{...FONTS.font,color:COLORS.success}}>-200</Text>
                            </View>
                            <View
                                style={{
                                    borderTopWidth:1,
                                    borderTopColor:colors.borderColor,
                                    paddingTop:8,
                                    marginTop:10,
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                }}
                            >
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title}}>Total Amount</Text>
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title}}>759</Text>
                            </View>
                        </View>

                    </ScrollView>
                    <View style={[GlobalStyleSheet.container,{
                        borderTopWidth:1,
                        borderColor:colors.borderColor,
                    }]}>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                        >
                            <View style={{width:120}}>
                                <Text style={{...FONTS.h5,color:colors.title}}>759</Text>
                                <TouchableOpacity>
                                    <Text style={{...FONTS.font,color:COLORS.primary2,lineHeight:16}}>View Details</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1}}>
                                <Button 
                                    onPress={() => props.navigation.navigate('CheckoutReview')}
                                    title={'Pay now'} color={COLORS.primary2}/>
                            </View>
                        </View>
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
    },
    list : {
        paddingHorizontal:15,
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:18,
    },
    listImg : {
        height:20,
        width:20,
        resizeMode:'contain',
        marginRight:12,
    },
    listTitle : {
        ...FONTS.font,
        ...FONTS.fontBold,
        flex:1,
    },
    detailList:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:2,
    },
    payList : {
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
        paddingVertical:15,
        borderBottomWidth:1,
    },
    listRadio : {
        height:15,
        width:15,
        borderRadius:10,
        borderWidth:1,
        marginRight:15,
        alignItems:'center',
        justifyContent:'center',
    },
    listRadioCircle : {
        height:8,
        width:8,
        borderRadius:8,
        backgroundColor:COLORS.primary2,
    },
    payImg : {
        height:35,
        width:35,
        borderRadius:35,
    },
    payMedia : {
        borderWidth:1,
        padding:5,
        borderRadius:40,
        marginRight:15,
    }
})

export default Payment;