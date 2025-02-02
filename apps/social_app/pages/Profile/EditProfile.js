import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from '../../constants/theme';
import Header from '../../layout/Header';
import Auth from '../../Service/Auth';

const EditProfile = () => {
    const {colors} = useTheme();
    const dispatch = useDispatch();
    const [imgUrl , setImgUrl] = useState('');
    const [loading , setLoading] = useState(false);

    const handleProfileImage = async () => {
        if (Platform.OS === 'android') {
            try {
                // Request permission to access media library
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access media library is required!');
                    return;
                }
    
                // Launch the image picker
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1], // Crop aspect ratio (1:1)
                    quality: 1, // Image quality (0.1 to 1)
                });
    
                if (!result.canceled) {
                    setImgUrl(result.assets[0].uri); // Set the selected image URI
                }
            } catch (e) {
                console.error('Error selecting image:', e);
            }
        }
    };

    useEffect(() => {
        getUser();
    },[]);

    const getUser = async () => {
        let tempData = await Auth.getAccount();
    
        let data = JSON.parse(tempData);
      //console.log(data);
      setImgUrl(data.img);
    }

    return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>

            {loading ?
                <View
                    style={{
                        position:'absolute',
                        zIndex:1,
                        height:'100%',
                        width:'100%',
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'rgba(0,0,0,.3)',
                    }}
                >
                    <ActivityIndicator size={'large'} color={COLORS.white}/>
                </View>
                :
                null
            }

            <Header title={'Edit profile'} leftIcon={'back'} />

            <ScrollView>
                <View style={GlobalStyleSheet.container}>
                    <View
                        style={{
                            alignItems:'center',
                            marginBottom:20,
                        }}
                    >
                        <View>
                            <TouchableOpacity
                                onPress={()=> handleProfileImage()}
                                style={{
                                    height:35,
                                    width:35,
                                    position:'absolute',
                                    bottom:0,
                                    right:0,
                                    backgroundColor:COLORS.primary,
                                    borderRadius:30,
                                    zIndex:1,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    borderWidth:3,
                                    borderColor:colors.background,
                                }}
                            >
                                <SvgXml
                                    fill={COLORS.white}
                                    height={14}
                                    width={14}
                                    xml={ICONS.edit}
                                />
                            </TouchableOpacity>
                            <Image
                                style={{
                                    height:100,
                                    width:100,
                                    borderRadius:100,
                                }}
                                source={imgUrl ? {uri : imgUrl} : IMAGES.user}
                            />
                        </View>
                    </View>
                    
                    <View style={{marginBottom:12}}>
                        <Text style={{...FONTS.font,color:colors.text,marginBottom:5}}>Name</Text>
                        <TextInput
                            style={{
                                ...FONTS.font,
                                ...FONTS.fontBold,
                                color:colors.title,
                                height:45,
                                borderWidth:1,
                                paddingHorizontal:15,
                                borderColor:colors.borderColor,
                                borderRadius:SIZES.radius,
                            }}
                            defaultValue={'John Doe'}
                            placeholder='Name'
                            placeholderTextColor={colors.text}
                        />
                    </View>
                    <View style={{marginBottom:12}}>
                        <Text style={{...FONTS.font,color:colors.text,marginBottom:5}}>Username</Text>
                        <TextInput
                            style={{
                                ...FONTS.font,
                                ...FONTS.fontBold,
                                color:colors.title,
                                height:45,
                                borderWidth:1,
                                paddingHorizontal:15,
                                borderColor:colors.borderColor,
                                borderRadius:SIZES.radius,
                            }}
                            defaultValue={'JohnDoe12345'}
                            placeholder='Username'
                            placeholderTextColor={colors.text}
                        />
                    </View>
                    <View style={{marginBottom:15}}>
                        <Text style={{...FONTS.font,color:colors.text,marginBottom:5}}>Bio</Text>
                        <TextInput
                            style={{
                                ...FONTS.font,
                                ...FONTS.fontBold,
                                color:colors.title,
                                height:45,
                                borderWidth:1,
                                paddingHorizontal:15,
                                borderColor:colors.borderColor,
                                borderRadius:SIZES.radius,
                            }}
                            defaultValue={'Photography'}
                            placeholder='Username'
                            placeholderTextColor={colors.text}
                        />
                    </View>
                    
                    <CustomButton 
                        //onPress={updateImage}
                        title={'Save'}
                    />

                </View>
            </ScrollView>

        </SafeAreaView>
    );
};


export default EditProfile;