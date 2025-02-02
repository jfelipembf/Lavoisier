import React, {useRef} from 'react';
import { SafeAreaView, View, ScrollView, Text, Share } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import Button from '../components/Button/Button';
import { COLORS, FONTS } from '../constants/theme';

const TaskShare = ({navigation, route}) => {

    const {colors} = useTheme();
    const { id , parentId , subTask } = route.params;
    //const imageRef = useRef();

    const { todos }  = useSelector(state => state.Todos);
    const parentIndex = todos.findIndex((obj => obj.id == parentId));
    const todoIndex = subTask ? todos[parentIndex].subTasks.findIndex((obj => obj.id == id)) : todos.findIndex((obj => obj.id == id));

    const taskData = subTask ? todos[parentIndex].subTasks[todoIndex] : todos[todoIndex];

    const onShare = async () => {
        try {
          const result = await Share.share({
                message:
                `${taskData.title}\n${taskData.desc}\n ${taskData.subTasks.map(data =>  {return `* ${data.title} \n`})} \n Due Date : ${taskData.date}`,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
              
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    };

    // const handleScreenshot = () => {
    //     imageRef.current.capture().then(uri => {
    //         //console.log("do something with ", uri);
    //     });
    // }

    return (
        <SafeAreaView
            style={[GlobalStyleSheet.container,{
                padding:0,
                flex: 1,
                backgroundColor : colors.background2,
            }]}
        >
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    borderBottomWidth:1,
                    borderBottomColor:colors.borderColor,
                    paddingVertical:2,
                    backgroundColor:colors.cardBg,
                }}
            >
                <IconButton
                    onPress={() => navigation.goBack()}
                    icon={() => <FeatherIcon size={20} color={colors.title} name='arrow-left'/>}
                />
            </View>
            <View style={{
                flex : 1,
            }}>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View style={GlobalStyleSheet.container}>
                        {/* <ViewShot
                            ref={imageRef} 
                            options={{ 
                                fileName: taskData.id, 
                                format: "jpg", 
                                quality: 0.9 
                            }}
                        > */}
                            <View
                                style={{
                                    backgroundColor:colors.cardBg,
                                    paddingHorizontal:15,
                                    paddingVertical:20,
                                }}
                            >
                                <Text style={{...FONTS.h6,color : colors.title}}>{taskData.title}</Text>
                                {taskData.desc &&
                                    <Text style={{...FONTS.font,color : colors.textLight}}>{taskData.desc}</Text>
                                }
                                {taskData.subTasks && taskData.subTasks.length > 0 &&
                                    <View
                                        style={{
                                            marginTop:20,
                                        }}
                                    >
                                        {taskData.subTasks.map((data,index) => {
                                            return(
                                                <View
                                                    key={index}
                                                    style={{
                                                        flexDirection:'row',
                                                        alignItems:'center',
                                                        paddingVertical:2,
                                                    }}
                                                >
                                                    <Text style={{...FONTS.font,color:colors.title,marginRight:8,top:4}}>*</Text>
                                                    <Text style={{...FONTS.font,color:colors.title}}>{data.title}</Text>
                                                </View>
                                            )
                                        })}
                                    </View> 
                                }
                                <View
                                    style={{
                                        flexDirection : 'row',
                                        marginTop:15,
                                    }}
                                >
                                    <Text style={{...FONTS.font,color: colors.textLight}}>Due Date :</Text>
                                    <Text style={{...FONTS.font,color: colors.title}}> {taskData.date}</Text>
                                </View>
                            </View>
                        {/* </ViewShot> */}
                    </View>
                </ScrollView>
            </View>
            <View style={GlobalStyleSheet.container}>
                <Button
                    onPress={onShare}
                    color={COLORS.primary6}
                    title={'Share'}
                />
                {/* <Button
                    onPress={handleScreenshot}
                    color={COLORS.primary6}
                    title={'Share Image'}
                /> */}
            </View>
        </SafeAreaView>
    );
};

export default TaskShare;