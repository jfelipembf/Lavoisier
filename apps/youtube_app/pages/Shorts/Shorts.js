import React, { useState } from 'react';
import { 
    Image, 
    SafeAreaView, 
    ScrollView, 
    Text, 
    TouchableOpacity, 
    View,
    TextInput,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import { List } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS, FONTS, ICONS, IMAGES, SIZES, VIDEOS } from '../../constants/theme';
import SingleReel from '../../components/SingleReel';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const ReelsData = [
    {
        profileImg : IMAGES.user1,
        userName : "as_Status_25",
        likes : "27k",
        comments : "500",
        url : VIDEOS.video1,
        isLike : false,
    },
    {
        profileImg : IMAGES.user2,
        userName : "as_Status_25",
        likes : "15k",
        comments : "200",
        url : VIDEOS.video2,
        isLike : true,
    },
    {
        profileImg : IMAGES.user3,
        userName : "as_Status_25",
        likes : "165k",
        comments : "800",
        url : VIDEOS.video3,
        isLike : false,
    },
    {
        profileImg : IMAGES.user4,
        userName : "as_Status_25",
        likes : "1.5m",
        comments : "200k",
        url : VIDEOS.video4,
        isLike : false,
    },
    {
        profileImg : IMAGES.user5,
        userName : "as_Status_25",
        likes : "907k",
        comments : "850",
        url : VIDEOS.video5,
        isLike : false,
    },
]

const sendData = [
    {
        image : IMAGES.user1,
        name : 'Andy Lee',
    },
    {
        image : IMAGES.user2,
        name : 'Brian Harahap',
    },
    {
        image : IMAGES.user3,
        name : 'Christian Hang',
    },
    {
        image : IMAGES.user4,
        name : 'Chloe Mc. Jenskin',
    },
    {
        image : IMAGES.user5,
        name : 'David Bekam',
    },
    {
        image : IMAGES.user6,
        name : 'Dons John',
    },
    {
        image : IMAGES.user7,
        name : 'Eric Leew',
    },
    {
        image : IMAGES.user8,
        name : 'Richard Sigh',
    },
    {
        image : IMAGES.user5,
        name : 'David Bekam',
    },
    {
        image : IMAGES.user6,
        name : 'Dons John',
    },
    {
        image : IMAGES.user7,
        name : 'Eric Leew',
    },
    {
        image : IMAGES.user8,
        name : 'Richard Sigh',
    },
] 


const Shorts = ({navigation}) => {

    const { colors } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const refRBSheet = React.useRef();
    const RBSheetReport = React.useRef();
    const refSuccessSheet = React.useRef();
    const sheetRef = React.useRef(null);
    const handleChangeIndexValue = (index) => {
        setCurrentIndex(index);
    };

    const postOption = () => {
        return(
            <View>
                <List.Item
                    style={{paddingHorizontal:15}}
                    titleStyle={{...FONTS.font,fontSize:16,color:COLORS.danger}}
                    onPress={() => {RBSheetReport.current.open();refRBSheet.current.close()}}
                    title={"Report"}
                    left={() => 
                        <SvgXml
                            style={{
                                marginRight:5,
                            }}
                            height={20}
                            width={20}
                            fill={COLORS.danger}
                            xml={ICONS.info}
                        />
                    }
                />
                <List.Item
                    style={{paddingHorizontal:15}}
                    titleStyle={{...FONTS.font,fontSize:16,color:colors.title}}
                    onPress={() => {}}
                    title={"Share"}
                    left={() => 
                        <SvgXml
                            style={{
                                marginRight:5,
                            }}
                            height={20}
                            width={20}
                            stroke={colors.title}
                            xml={ICONS.share2}
                        />
                    }
                />
            </View>
        )
    }

    const reportData = [
        "It's spam",
        "Nudity or sexual activity",
        "Hate speech or symbols",
        "I just dont't like it",
        "Bullying or harassment",
        "False information",
        "Violence or dangerous organizations",
        "Scam or fraud",
        "Intellectual property violation",
        "Sale of illegal or regulated goods",
        "Suicide or self-injury",
        "Eating disorders",
        "Something else"
    ];

    const renderHeader = () => (
        <View
            style={{
                backgroundColor:colors.card,
                borderBottomWidth:1,
                borderColor:colors.borderColor,
                paddingBottom:5,
                paddingTop:5,
                borderTopLeftRadius:18,
                borderTopRightRadius:18,
                alignItems:'center',
            }}
        >
            <TextInput
                style={{
                    ...FONTS.font,
                    height:48,
                    paddingHorizontal:15,
                    color:colors.title,
                    width:'100%',
                }}
                placeholder="Write a message ..."
                placeholderTextColor={colors.text}
            />
        </View>
    )

    const renderContent = () => (
        <View
            style={{
                backgroundColor: colors.card,
                paddingBottom:70,
            }}
        >
          <View
            style={{
                marginHorizontal:15,
                marginVertical:15,
            }}
          >
            <TouchableOpacity
                style={{
                    height:50,
                    width:50,
                    alignItems:'center',
                    justifyContent:'center',
                    position:'absolute',
                    right:0,
                    top:-1,
                    zIndex:1,
                }}
            >
                <FeatherIcon name='search' color={colors.text} size={24}/>
            </TouchableOpacity>
            <TextInput
                style={{
                    height:50,
                    borderWidth:1,
                    borderColor:colors.borderColor,
                    borderRadius:SIZES.radius,
                    paddingHorizontal:15,
                    ...FONTS.font,
                    color:colors.title,
                }}
                placeholder="Search here..."
                placeholderTextColor={colors.text}
            />
          </View>
          {sendData.map((data,index) => {
            return(
                <View
                    key={index}
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        paddingHorizontal:15,
                        paddingVertical:10,
                    }}
                >
                    <Image
                        style={{
                            height:40,
                            width:40,
                            borderRadius:20,
                            marginRight:8,
                        }}
                        source={data.image}
                    />
                    <Text style={{...FONTS.h6,fontSize:14,flex:1,color:colors.title}}>{data.name}</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor:COLORS.primary,
                            paddingHorizontal:14,
                            paddingVertical:6,
                            borderRadius:6,
                        }}
                    >
                        <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.white,lineHeight:18}}>Send</Text>
                    </TouchableOpacity>
                </View>
            )
          })}
        </View>
    );




    return (
        <>
            <RBSheet
                ref={refSuccessSheet}
                closeOnDragDown={true}
                height={180}
                openDuration={300}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,.3)',
                    },
                    container:{
                        backgroundColor:colors.card,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15,
                    },
                }}
            >
                <View style={{alignItems:'center',paddingTop:25}}>

                    <Image
                        source={IMAGES.check}
                        style={{
                            height:50,
                            width:50,
                            marginBottom:20,
                        }}
                    />
                    <Text style={{...FONTS.h5,color:colors.title}}>Thanks for letting us know</Text>
                </View>
                
            </RBSheet>

            <RBSheet    
                ref={refRBSheet}
                closeOnDragDown={true}
                height={170}
                openDuration={300}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,.3)',
                    },
                    container:{
                        backgroundColor:colors.card,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15,
                    },
                }}
            >
                {postOption()}
                
            </RBSheet>

            <RBSheet
                ref={RBSheetReport}
                closeOnDragDown={true}
                height={600}
                openDuration={300}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,.3)',
                    },
                    container:{
                        backgroundColor:colors.card,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15,
                    },
                }}
            >
                <View style={{alignItems:'center',borderBottomWidth:1,borderColor:colors.borderColor,paddingBottom:8,paddingTop:4}}>
                    <Text style={{...FONTS.h5,color:colors.title}}>Report</Text>
                </View>
                <View style={{padding:15}}>
                    <Text style={{...FONTS.h6,color:colors.title}}>Why are you reporting this post?</Text>
                    <Text style={{...FONTS.fontSm,color:colors.text}}>Your report is anonymous, except if you're reporting an intellectual property infirngement. If someone is in immediate danger, call the local emergency services - don't wait.</Text>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom:20}}>
                    {reportData.map((data,index) => (
                        <List.Item
                            titleStyle={{color:colors.title}}
                            onPress={() => {refSuccessSheet.current.open();RBSheetReport.current.close()}}
                            key={index}
                            title={data}
                        />
                    ))}
                </ScrollView>
            </RBSheet>
            
            <RBSheet
                ref={sheetRef}
                closeOnDragDown={true}
                height={500}
                openDuration={300}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,.3)',
                    },
                    container:{
                        backgroundColor:colors.card,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15,
                    },
                }}
            >
                {renderHeader()}
                <ScrollView>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            flex:1
                        }}
                    >
                        {renderContent()}
                    </TouchableOpacity>
                </ScrollView>
            </RBSheet>

            <SafeAreaView style={[GlobalStyleSheet.container,{
                padding:0,
                flex:1,
                backgroundColor:'#000',
            }]}>

                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                        position:'absolute',
                        zIndex:1,
                        width:'100%',
                        paddingLeft:15,
                        paddingRight:5,
                        paddingVertical:5,
                    }}
                >
                    <Text style={{...FONTS.h4,color:COLORS.white}}>Shorts</Text>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            height:48,
                            width:48,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <FeatherIcon name='x' size={26} color={COLORS.white}/>
                    </TouchableOpacity>
                </View>

                <Swiper
                    loop={false}
                    horizontal={false}
                    showsPagination={false}
                    onIndexChanged={handleChangeIndexValue}
                >
                    {ReelsData.map((data,index) => {
                        return(
                            <View
                                key={index} 
                                style={{
                                    paddingBottom:55,
                                }}
                            >
                                <SingleReel
                                    item={data} 
                                    index={index} 
                                    currentIndex={currentIndex} 
                                    refRBSheet={refRBSheet}
                                    sheetRef={sheetRef}
                                    hasNavigation={true}
                                />
                            </View>
                        )
                    })}
                </Swiper>
            </SafeAreaView>
        </>
    );
};


export default Shorts;