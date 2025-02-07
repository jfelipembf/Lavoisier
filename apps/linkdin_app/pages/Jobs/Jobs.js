import React, {useRef, useState} from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { COLORS, FONTS, IMAGES, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import Header from '../components/Header';
import JobCard from '../components/JobCard';

const JobsData = [
    {
        logoImg : IMAGES.logo1,
        title : "Senior Ux Designer",
        company : "Maximoz Team",
        desc : "There are many variations of passages of Lorem Ipsum available or randomised words which don't look even slightly believable.",
        jobType : "Part - Time",
        salary : "$420,14 / mo",
        location : "Semarang, Indonesia",
        updateDate : "3 Month Ago",
        isBookmark : false,
    },
    {
        logoImg : IMAGES.logo2,
        title : "Senior Ux Designer",
        company : "Maximoz Team",
        desc : "There are many variations of passages of Lorem Ipsum available or randomised words which don't look even slightly believable.",
        jobType : "Part - Time",
        salary : "$420,14 / mo",
        location : "Semarang, Indonesia",
        updateDate : "3 Month Ago",
        isBookmark : false,
    },
    {
        logoImg : IMAGES.logo3,
        title : "Senior Ux Designer",
        company : "Maximoz Team",
        desc : "There are many variations of passages of Lorem Ipsum available or randomised words which don't look even slightly believable.",
        jobType : "Part - Time",
        salary : "$420,14 / mo",
        location : "Semarang, Indonesia",
        updateDate : "3 Month Ago",
        isBookmark : false,
    },
    {
        logoImg : IMAGES.logo4,
        title : "Senior Ux Designer",
        company : "Maximoz Team",
        desc : "There are many variations of passages of Lorem Ipsum available or randomised words which don't look even slightly believable.",
        jobType : "Part - Time",
        salary : "$420,14 / mo",
        location : "Semarang, Indonesia",
        updateDate : "3 Month Ago",
        isBookmark : false,
    },
]

const jobTypeData = [
    "Full-time",
    "Part-time",
    "Remote/Contract",
    "Freelance",
    "Internship",
    "Commission",
]

const experienceData = [
    "Entry level",
    "Mid level",
    "Senior level",
    "Manager level",
    "Sr. Manager level",
]

const Jobs = () => {

    const theme = useTheme();
    const {colors} = theme;
    const filterSheet = useRef();
    const [jobsDataArry , setJobDataArry] = useState(JobsData);
    const [experience , setExperience] = useState(experienceData[0]);
    const [jobType , setJobType] = useState(jobTypeData[0]);


    const handleJobSave = (val) => {
        let temp = jobsDataArry.map((data,index) => {
            if (val === index) {
                return { ...data, isBookmark: !data.isBookmark };
            }
            return data;
        });
        setJobDataArry(temp);
        
    }

    return (
        <>

            <RBSheet
                ref={filterSheet}
                closeOnDragDown={true}
                height={450}
                customStyles={{
                    container:{
                        backgroundColor: colors.cardBg,
                    }
                }}
            >
                <View style={{...GlobalStyleSheet.container,paddingTop:15}}>
                    <Text style={{...FONTS.h6,color:colors.title,marginBottom:10}}>Job type</Text>
                    <View
                        style={{
                            flexDirection:'row',
                            flexWrap:'wrap',
                            marginBottom:15,
                        }}
                    >
                        {jobTypeData.map((data,index) => {
                            return(
                                <TouchableOpacity
                                    onPress={() => setJobType(data)}
                                    key={index}
                                    style={[{
                                        backgroundColor : theme.dark ? "rgba(255,255,255,.08)" : "#eff2f5",
                                        paddingHorizontal : 15,
                                        paddingVertical : 8,
                                        borderRadius : 8,
                                        marginRight : 10,
                                        marginBottom : 10,
                                    }, data == jobType && {
                                        backgroundColor: COLORS.primary6,
                                    }]}
                                >
                                    <Text style={[{...FONTS.font,color:colors.text,top:-1}, data == jobType && {color: COLORS.white}]}>{data}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <Text style={{...FONTS.h6,color:colors.title,marginBottom:10}}>Experience level</Text>
                    <View
                        style={{
                            flexDirection:'row',
                            flexWrap:'wrap',
                            marginHorizontal:-10,
                            marginBottom:25,
                        }}
                    >
                        {experienceData.map((data,index) => {
                            return(
                                <TouchableOpacity
                                    onPress={() => setExperience(data)}
                                    key={index}
                                    style={{
                                        width:'50%',
                                        paddingHorizontal:10,
                                        flexDirection:'row',
                                        alignItems:'center',
                                        paddingVertical:4,
                                    }}
                                >
                                    <View
                                        style={[{
                                            height:14,
                                            width:14,
                                            borderRadius:14,
                                            borderWidth:1.5,
                                            borderColor:colors.textLight,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            marginRight:8,
                                        },experience === data && {
                                            borderColor:COLORS.primary6
                                        }]}
                                    >
                                        {experience === data &&
                                            <View
                                                style={{
                                                    height:8,
                                                    width:8,
                                                    borderRadius:4,
                                                    backgroundColor:COLORS.primary6,
                                                }}
                                            />
                                        }
                                    </View>
                                    <Text style={[{...FONTS.font,color:colors.text,top:-1},experience === data && {color:COLORS.primary6}]}>{data}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <Button
                        onPress={() => filterSheet.current.close()}
                        color={COLORS.primary6}
                        title={'Apply'}
                    />
                </View>
            </RBSheet>

            <SafeAreaView
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    flex:1,
                    backgroundColor:colors.background2,
                }]}
            >
                <Header
                    leftIcon={'back'}
                    title={'Jobs'}
                    rightIcon={'chat'}
                />
                <View
                    style={GlobalStyleSheet.container}
                >
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <TextInput
                                style={{
                                    ...FONTS.font,
                                    color:colors.title,
                                    backgroundColor:colors.cardBg,
                                    borderWidth:1,
                                    borderColor:colors.borderColor,
                                    borderRadius:6,
                                    height:45,
                                    paddingHorizontal:15,
                                    paddingLeft:50,
                                }}
                                placeholder='Search Jobs..'
                                placeholderTextColor={colors.text}
                            />
                            <TouchableOpacity
                                style={{
                                    position:'absolute',
                                    top:0,
                                    left:5,
                                    height:45,
                                    width:45,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <FeatherIcon color={colors.text} size={20} name='search'/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => filterSheet.current.open()}
                            style={{
                                height:45,
                                width:45,
                                backgroundColor:COLORS.primary6,
                                borderRadius:6,
                                alignItems:'center',
                                justifyContent:'center',
                                marginLeft:15,
                            }}
                        >
                            <FeatherIcon size={20} color={COLORS.white} name='sliders'/>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View
                        style={GlobalStyleSheet.container}
                    >
                        {jobsDataArry.map((data,index) => {
                            return(
                                <JobCard
                                    key={index}
                                    id={index}
                                    item={data}
                                    handleJobSave={handleJobSave}
                                />
                            )
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Jobs;