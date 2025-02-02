import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { deleteSubTask, updateSubTask } from '../Redux/reducer/taskAction';

const taskColors = [COLORS.primary6, COLORS.primary7, "#00e049", "#ed9736","#dfdfdf"];

const SubTask = ({navigation,route}) => {
    
    const { parentId , id } = route.params;
    
    const dispatch = useDispatch();
    const { todos }  = useSelector(state => state.Todos);
    
    const parentIndex = todos.findIndex((obj => obj.id == parentId));
    
    const todoIndex = todos[parentIndex].subTasks.findIndex((obj => obj.id == id));

    const {colors} = useTheme();
    
    const [title , setTile] = useState(todos[parentIndex].subTasks[todoIndex] && todos[parentIndex].subTasks[todoIndex].title);
    const [desc , setDesc] = useState(todos[parentIndex].subTasks[todoIndex] && todos[parentIndex].subTasks[todoIndex].desc);
    const [taskColor , setTaskColor] = useState(taskColors[0]);
    
    const handleTaskUpdate = () => {
        dispatch(
            updateSubTask({
                parentId : parentId,
                data : {
                    id : id,
                    title : title,
                    color : taskColor,
                    desc : desc,
                    complete : false,
                }
            })
        )
    }

    const handleTaskDelete = () => {
        dispatch(
            deleteSubTask({
                parentId : parentId,
                data : {
                    id : id,
                }
            })
        )
        navigation.goBack();
    }

    return (
        <SafeAreaView
            style={[GlobalStyleSheet.container,{padding:0, flex:1,backgroundColor:colors.cardBg}]}
        >
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    borderBottomWidth:1,
                    borderBottomColor:colors.borderColor,
                    paddingVertical:2,
                }}
            >
                <IconButton
                    onPress={() => {handleTaskUpdate();navigation.goBack()}}
                    icon={() => <FeatherIcon size={20} color={colors.title} name='arrow-left'/>}
                />
                <Text numberOfLines={1} style={{...FONTS.font,fontSize:15,color:colors.textLight,top:1,flex:1}}>{todos[parentIndex].title}</Text>
                <IconButton
                    onPress={() => handleTaskDelete()}
                    icon={() => <FeatherIcon color={colors.textLight} size={20} name='trash-2'/>}
                />
                <IconButton
                    onPress={() => { handleTaskUpdate();navigation.navigate('TaskShare',{ id : id ,parentId : parentId , subTask : true })}}
                    icon={() => <FeatherIcon color={colors.textLight} size={20} name='share-2'/>}
                />
            </View>
            <View style={{flex:1}}>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View style={GlobalStyleSheet.container}>
                        <TextInput
                            style={{
                                ...FONTS.h4,
                                color:colors.title,
                            }}
                            value={title}
                            onChangeText={(val) => setTile(val)}
                            multiline
                            placeholder={'What would you like to do..'}
                            placeholderTextColor={colors.textLight}
                        />
                        <TextInput
                            style={{
                                ...FONTS.font,
                                fontSize:15,
                                color:colors.title,
                                marginBottom:20,
                            }}
                            value={desc}
                            onChangeText={(val) => setDesc(val)}
                            multiline
                            placeholder='Description'
                            placeholderTextColor={colors.textLight}
                        />
                    </View>
                </ScrollView>
            </View>

            <View
                style={{
                    borderTopWidth:1,
                    borderTopColor:colors.borderColor,
                    paddingHorizontal:10,
                    paddingVertical:3,
                    flexDirection:'row',
                    alignItems:'center',
                }}
            >
                <IconButton
                    onPress={() => {}}
                    icon={() => <FeatherIcon size={22} color={colors.textLight} name='image'/>}
                />
                <IconButton
                    onPress={() => {}}
                    icon={() => <FeatherIcon size={22} color={colors.textLight} name='paperclip'/>}
                />

                <View
                    style={{
                        flexDirection:'row',
                        justifyContent:'flex-end',
                        flex:1,
                    }}
                >
                    {taskColors.map((data,index) => {
                        return(
                            <TouchableOpacity
                                key={index}
                                onPress={()=> setTaskColor(data)}
                                style={[{
                                    margin:2,
                                    borderWidth:1.5,
                                    borderRadius:16,
                                    padding:2,
                                    borderColor:'transparent',
                                }, data == taskColor && {
                                    borderColor : data,
                                }]}
                            >
                                <View
                                    style={{
                                        height:16,
                                        width:16,
                                        borderRadius:14,
                                        backgroundColor:data,
                                    }}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
            
        </SafeAreaView>
    );
};

export default SubTask;