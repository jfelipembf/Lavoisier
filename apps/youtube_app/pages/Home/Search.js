import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { FONTS, IMAGES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';


const searchData = [
    {
        image : IMAGES.poster1,
        title : "God of War - Full Gameplay #01",
    },
    {
        image : IMAGES.poster5,
        title : "Demon Slayer : Kimetsu no Yaiba Swordsmith Village Arc Trailer",
    },
    {
        image : IMAGES.poster2,
        title : "Battelfield 2042 Official Reveal Trailer",
    },
    {
        image : IMAGES.poster4,
        title : "Dragon Ball Z : The Movie | Teaser(2022)",
    },
    {
        image : IMAGES.poster3,
        title : "Alan Walker, Sabrina - On My Way",
    },
    {
        image : IMAGES.poster6,
        title : "FIFA 23 Reveal Trailer | The World's Game",
    },
    {
        image : IMAGES.poster1,
        title : "God of War - Full Gameplay #01",
    },
    {
        image : IMAGES.poster5,
        title : "Demon Slayer : Kimetsu no Yaiba Swordsmith Village Arc Trailer",
    },
    {
        image : IMAGES.poster2,
        title : "Battelfield 2042 Official Reveal Trailer",
    },
    {
        image : IMAGES.poster4,
        title : "Dragon Ball Z : The Movie | Teaser(2022)",
    },
    {
        image : IMAGES.poster3,
        title : "Alan Walker, Sabrina - On My Way",
    },
    {
        image : IMAGES.poster6,
        title : "FIFA 23 Reveal Trailer | The World's Game",
    },
]

const Search = ({navigation}) => {
    
    const { colors } = useTheme();

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
                }}
            >
                <IconButton
                    onPress={() => navigation.goBack()}
                    icon={() => <FeatherIcon size={22} color={colors.title} name='arrow-left' />}
                />
                <TextInput
                    autoFocus={true}
                    style={{
                        ...FONTS.font,
                        flex:1,
                        paddingHorizontal:10,
                        color:colors.title,
                    }}
                    placeholder='Search here..'
                    placeholderTextColor={colors.textLight}
                />
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}>
                {searchData.map((data,index) => {
                    return(
                        <TouchableOpacity
                            key={index}
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                paddingHorizontal:15,
                                paddingVertical:10,
                            }}
                        >
                            <MaterialIcons
                                size={22}
                                color={colors.textLight}
                                style={{
                                    marginRight:10,
                                }}
                                name={'history'}
                            />
                            <Image
                                style={{
                                    height:35,
                                    width:52,
                                    borderRadius:3,
                                    marginRight:10,
                                }}
                                source={data.image}
                            />
                            <Text numberOfLines={2} style={{...FONTS.font,...FONTS.fontBold,color:colors.title,flex:1}}>{data.title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Search;