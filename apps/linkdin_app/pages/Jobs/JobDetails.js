import React, {useState} from 'react';
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View, Text, ToastAndroid } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import Header from '../components/Header';

const jobRequirements = [
    "Prototyping, wireframing, user flows, mockups",
    "Visual design and design software",
    "User research and usability testing",
    "Information architecture",
    "Application development",
    "Communication and presentation",
    "Prioritization and time management",
    "Curiosity and continuous learning",
    "Research skills and analytics",
]

const JobDetails = () => {

    const theme = useTheme();
    const {colors} = theme;
    const [isBookmark , setIsBookmark] = useState(false);

    return (
        <SafeAreaView
            style={[GlobalStyleSheet.container,{
                padding:0,
                flex:1,
                backgroundColor:colors.cardBg,
            }]}
        >
            <Header
                leftIcon={'back'}
                title={'Job Details'}
            />
                <View
                    style={{
                        flex:1,
                    }}
                >
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        <View style={GlobalStyleSheet.container}>
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    marginBottom:15,
                                }}
                            >
                                <Image
                                    style={{
                                        height:80,
                                        width:80,
                                        borderRadius:10,
                                        marginRight:15,
                                    }}
                                    source={IMAGES.logo1}
                                />
                                <View style={{flex:1}}>
                                    <Text style={[FONTS.font,{color:colors.text}]}>Maximoz Team</Text>
                                    <Text style={[FONTS.h6,{color:colors.title}]}>Senior Ux Designer</Text>
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                        }}
                                    >
                                        <FeatherIcon style={{marginRight:5,top:1}} color={colors.text} name='map-pin'/>
                                        <Text style={{...FONTS.font,color:colors.text}}>Semarang, Indonesia</Text>
                                    </View>
                                </View>
                            </View>

                            <View
                                style={{
                                    flexDirection:'row',
                                    flexWrap:'wrap',
                                    marginBottom:15,
                                    borderBottomWidth:1,
                                    paddingBottom:15,
                                    borderBottomColor:colors.borderColor,
                                }}
                            >
                                <View
                                    style={{
                                        paddingHorizontal:12,
                                        paddingVertical:6,
                                        borderRadius:6,
                                        backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : '#eee',
                                        marginRight:10,
                                    }}
                                >
                                    <Text style={{...FONTS.font,color:colors.title}}>Full-Time</Text>
                                </View>
                                <View
                                    style={{
                                        paddingHorizontal:12,
                                        paddingVertical:6,
                                        borderRadius:6,
                                        backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : '#eee',
                                        marginRight:10,
                                    }}
                                >
                                    <Text style={{...FONTS.font,color:colors.title}}>$420,14/mo</Text>
                                </View>
                                <View
                                    style={{
                                        paddingHorizontal:12,
                                        paddingVertical:6,
                                        borderRadius:6,
                                        backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : '#eee',
                                        marginRight:10,
                                    }}
                                >
                                    <Text style={{...FONTS.font,color:colors.title}}>Designer</Text>
                                </View>
                            </View>
                            
                            <Text style={[FONTS.h6,{color:colors.title,marginBottom:6}]}>Job Description</Text>
                            <Text style={[FONTS.fontSm,{color:colors.text,marginBottom:18}]}>This one quality of UI/UX designers is what makes them thrive better. The designing industry is growing and changing at a gaining momentum making it important for designers to be dynamic and adaptive.</Text>    
                            
                            <Text style={[FONTS.h6,{color:colors.title,marginBottom:6}]}>Requirements</Text>
                            {jobRequirements.map((data,index) => {
                                return(
                                    <View
                                        key={index}
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                            paddingVertical:2,
                                        }}
                                    >
                                        <View
                                            style={{
                                                height:5,
                                                width:5,
                                                marginRight:12,
                                                backgroundColor:colors.textLight,
                                            }}
                                        />
                                        <Text style={{...FONTS.font,color:colors.text}}>{data}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                <View style={GlobalStyleSheet.container}>
                    <View
                        style={{
                            flexDirection:'row',
                        }}
                    >
                        <View style={{flex:1}}>
                            <Button
                                title={'Apply Now'}
                                color={COLORS.primary6}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setIsBookmark(!isBookmark);
                                if(isBookmark){
                                    ToastAndroid.show({
                                        text : "You unsaved the post.",
                                        backgroundColor:"#000",
                                    })
                                }else{
                                    ToastAndroid.show({
                                        text : "Post Saved Successfully.",
                                        backgroundColor:"#000",
                                    })
                                }
                            }}
                            style={{
                                height:48,
                                width:48,
                                borderWidth:1,
                                borderRadius:10,
                                marginLeft:15,
                                alignItems:'center',
                                justifyContent:'center',
                                borderColor:COLORS.primary6,
                            }}
                        >
                            <FontAwesome size={24} color={COLORS.primary6} name={isBookmark ? 'bookmark' : 'bookmark-o'}/>
                        </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
    );
};

export default JobDetails;