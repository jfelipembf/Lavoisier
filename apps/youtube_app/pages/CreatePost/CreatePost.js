import React, {useState} from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import { IconButton } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from "../../constants/theme";
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const GallleryData = [
    {
        image : IMAGES.post1,
    },
    {
        image : IMAGES.post2,
    },
    {
        image : IMAGES.post3,
    },
    {
        image : IMAGES.post4,
    },
    {
        image : IMAGES.post5,
    },
    {
        image : IMAGES.post6,
    },
    {
        image : IMAGES.post7,
    },
    {
        image : IMAGES.post8,
    },
    {
        image : IMAGES.post9,
    },
    {
        image : IMAGES.post10,
    },
    {
        image : IMAGES.post11,
    },
    {
        image : IMAGES.post12,
    },
    {
        image : IMAGES.poster1,
    },
    {
        image : IMAGES.poster2,
    },
    {
        image : IMAGES.poster3,
    },
    {
        image : IMAGES.poster4,
    },
]

const CreatePost = ({navigation}) => {

    const theme = useTheme();
    const {colors} = theme;
    const [image , setImage] = useState(IMAGES.poster5);

    return(
        <SafeAreaView style={[GlobalStyleSheet.container,{padding:0,flex:1,backgroundColor:colors.cardBg}]}>
            <View
                style={{
                    height:48,
                    flexDirection:'row',
                    alignItems:'center',
                    paddingHorizontal:5,
                }}
            >
                <IconButton
                    onPress={() => navigation.goBack()}
                    icon={() => <FeatherIcon size={20} color={colors.title} name='x'/>}
                />
                <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title,top:-1,flex:1}}>New Post</Text>
                <IconButton
                    onPress={() => {}}
                    icon={() => <FeatherIcon size={20} color={colors.title} name='arrow-right'/>}
                />
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View
                    style={{
                        height:350,
                        backgroundColor: theme.dark ? COLORS.darkBorder : '#eee',
                    }}
                >
                    <Image
                        style={{
                            height:'100%',
                            width:'100%',
                            resizeMode:'contain',
                        }}
                        source={image}
                    />
                </View>
                <View
                    style={{
                        height:50,
                        alignItems:'center',
                        flexDirection:'row',
                        paddingHorizontal:15,
                    }}
                >
                    <Text style={{...FONTS.h6,flex:1,color:colors.title}}>Gallery</Text>
                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="Camers"
                        accessibilityHint="open camera"
                        style={{
                            height:50,
                            width:50,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <SvgXml
                            stroke={colors.title}
                            xml={ICONS.camera}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    {GallleryData.map((data,index) => {
                        return(
                            <View
                                key={index}
                                style={{
                                    width:SIZES.width / 4,
                                    height:SIZES.width / 4,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => setImage(data.image)}
                                    style={{
                                        marginBottom:2,
                                        marginHorizontal:1,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:'100%',
                                            width:'100%',
                                        }}
                                        source={data.image}
                                    />
                                    <View
                                        style={{
                                            position:'absolute',
                                            bottom:5,
                                            right:5,
                                            paddingHorizontal:5,
                                            backgroundColor:'#000',
                                            borderRadius:3,
                                            paddingVertical:1,
                                        }}
                                    >
                                        <Text style={{...FONTS.fontXs,fontSize:10,color:COLORS.white,top:-1}}>2:25</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default CreatePost;