import React from 'react';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import useUser from '../../hooks/useUser';

const BannerSlider = () => {
    const navigation = useNavigation();
    const { user, loading } = useUser();

    const handlePayment = (title, value) => {
        navigation.navigate('Payment', {
            title: title,
            value: value,
            user: user // Passando os dados do usuário
        });
    };

    return (
        <>
            <ScrollView
                horizontal
                contentContainerStyle={{paddingLeft:15,marginBottom:15,paddingTop:10}}
                showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity
                    onPress={() => handlePayment('Curso de Verão', 'R$ 800,00')}
                >
                    <ImageBackground
                        source={IMAGES.eduPattern1}
                        style={{
                            width:330,
                            height:169,
                            marginRight:15,
                            borderRadius:15,
                            overflow:'hidden',
                            justifyContent:'center',
                            alignItems:'flex-start',
                            paddingLeft:20,
                            paddingVertical:20,
                            paddingRight:120,
                        }}
                    >
                        <Text style={{...FONTS.font,fontSize:15,color:COLORS.white}}>40% OFF</Text>
                        <Text style={{...FONTS.h4,color:COLORS.white}}>Especial do Dia</Text>
                        <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.8,marginBottom:14}}>Desconto válido apenas hoje!</Text>
                        <View
                            style={{
                                backgroundColor:'rgba(255,255,255,.25)',
                                paddingHorizontal:16,
                                paddingVertical:7,
                                borderRadius:8,
                            }}
                        >
                            <Text style={{...FONTS.font,marginBottom:2,...FONTS.fontBold,color:COLORS.white}}>Ver mais</Text>
                        </View>
                        <Image
                            style={{
                                width:125,
                                height:185,
                                resizeMode:'contain',
                                position:'absolute',
                                right:0,
                                top:0,
                            }}
                            source={IMAGES.eduBnr1}
                        />
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handlePayment('Aulas de Reforço', 'R$ 500,00')}
                >
                    <ImageBackground
                        source={IMAGES.eduPattern3}
                        style={{
                            width:330,
                            height:169,
                            marginRight:15,
                            borderRadius:15,
                            overflow:'hidden',
                            justifyContent:'center',
                            alignItems:'flex-start',
                            paddingLeft:20,
                            paddingVertical:20,
                            paddingRight:120,
                        }}
                    >
                        <Text style={{...FONTS.font,fontSize:15,color:COLORS.white}}>40% OFF</Text>
                        <Text style={{...FONTS.h4,color:COLORS.white}}>Especial do Dia</Text>
                        <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.8,marginBottom:14}}>Desconto válido apenas hoje!</Text>
                        <View
                            style={{
                                backgroundColor:'rgba(255,255,255,.25)',
                                paddingHorizontal:16,
                                paddingVertical:7,
                                borderRadius:8,
                            }}
                        >
                            <Text style={{...FONTS.font,marginBottom:2,...FONTS.fontBold,color:COLORS.white}}>Ver mais</Text>
                        </View>
                        <Image
                            style={{
                                width:130,
                                height:200,
                                resizeMode:'contain',
                                position:'absolute',
                                right:0,
                                top:10,
                            }}
                            source={IMAGES.eduBnr2}
                        />
                    </ImageBackground>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
};

export default BannerSlider;