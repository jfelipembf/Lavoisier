import React, {useState, useRef} from 'react';
import { 
    SafeAreaView, 
    View, 
    Text, 
    ScrollView, 
    TouchableOpacity, 
    TextInput, 
    Image, 
    PermissionsAndroid,
    Platform
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Checkbox, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import uuid from 'react-native-uuid';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
// import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS, FONTS } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import TaskBox from './components/TaskBox';
import {  addImageTask, addSubTask, completeSubTask, deleteTask, taskImageRemove, updateTask } from '../Redux/reducer/taskAction';

const taskColors = [COLORS.primary6, COLORS.primary7, "#00e049", "#ed9736","#dfdfdf"];

const TaskDetails = ({navigation,route}) => {
    
    const {colors} = useTheme();
    
    const { id } = route.params;

    const dispatch = useDispatch();
    const { todos }  = useSelector(state => state.Todos);

    const todoData = todos.findIndex((obj => obj.id == id));

    const subTaskSheet = useRef();
    const taskInput = useRef();

    const [title , setTile] = useState(todos[todoData] ? todos[todoData].title : "");
    const [desc , setDesc] = useState(todos[todoData] ? todos[todoData].desc : "");
    const [taskColor , setTaskColor] = useState(todos[todoData] ? todos[todoData].color : "");
    const [taskComplete , setTaskComplete] = useState(todos[todoData] ? todos[todoData].complete : false);
    //const [taskImages , setTaskImages] = useState(todos[todoData] ? todos[todoData].images : []);
    //const [subTasks , setSubTasks] = useState(todos[todoData].subTasks);
    const [subTaskColor , setSubTaskColor] = useState(taskColors[0]);
    const [taskValue, setTaskValue] = useState("");
    const [datePicker, setDatePicker] = useState(false);
    const [datePicker2, setDatePicker2] = useState(false);
    const [date, setDate] = useState(new Date());
    const [subTaskDate, setSubTaskDate] = useState(new Date());
    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
    };

    function onSubTaskDateSelected(event, value) {
        setSubTaskDate(value);
        setDatePicker2(false);
    };

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var datestring = ("0" + date.getDate()).slice(-2) + " " + months[date.getMonth('')];
    var subTaskdatestring = ("0" + subTaskDate.getDate()).slice(-2) + " " + months[subTaskDate.getMonth('')];

    const handleTaskUpdate = () => {
        dispatch(
            updateTask({
                id : id,
                title : title,
                date : datestring,
                color : taskColor,
                desc : desc,
                complete : taskComplete,
            })
        )
    }
    
    const handleCreateTask = () => {
        dispatch(
            addSubTask({
                id : id,
                data : {
                    id : uuid.v4(),
                    title : taskValue,
                    date : subTaskdatestring,
                    color : subTaskColor,
                    desc : "",
                    complete : false,
                }
            })
        )
        setTaskValue('');
        subTaskSheet.current.close();
    }

    const handleSubtaskStatus = (taskId) => {
        dispatch(
            completeSubTask({
                id : id,
                data : { id : taskId }
            })
        )
    } 

    const handleTaskDelete = () => {
        dispatch(
            deleteTask(id)
        )
        navigation.goBack();
    }

    const handleImagePicker = async() => {
        if(Platform.OS === 'ios'){
            // 
        }else{
            try {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                ],
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                    'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
                ).then((result) => {
                    if (result['android.permission.CAMERA']
                    && result['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
                        ImagePicker.openPicker({
                            compressImageMaxWidth: 600,
                            compressImageMaxHeight: 600,
                            multiple : true,
                            cropping: true,
                        }).then(image => {
                            dispatch(
                                addImageTask({
                                    id : id,
                                    images : [...todos[todoData].images , ...image],
                                })
                            )
                        }).catch((e) => {
                            (e);
                        });
                    }
                });
            } catch (err) {
                console.warn(err);
            }
        }
    }

    const handleImageRemove = (index) => {
        dispatch(
            taskImageRemove({
                taskId : id,
                imageIndex : index,
            })
        )
    }

    return (
        <>
            <RBSheet
                ref={subTaskSheet}
                openDuration={0}
                onOpen={() => setTimeout(() => {taskInput.current.focus()},200)}
                height={130}
                customStyles={{
                    container:{
                        backgroundColor:colors.cardBg,
                        borderTopLeftRadius:10,
                        borderTopRightRadius:10,
                    }
                }}
            >
                <View style={[GlobalStyleSheet.container]}>
                    {datePicker2 && (
                        <DateTimePicker
                            value={subTaskDate}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onSubTaskDateSelected}
                            textColor={colors.title}
                            style={{
                                position:'absolute',
                                backgroundColor:colors.cardBg,
                                zIndex:9999,
                                left:0,
                                right:0,
                                top:0,
                                height:'100%',
                            }}
                        />
                    )}
                    <View
                        style={{
                            paddingHorizontal:15,
                            borderBottomWidth:1,
                            borderBottomColor:colors.borderColor,
                            paddingTop:5,
                            paddingBottom:4,
                        }}
                    >
                        <TextInput
                            ref={taskInput}
                            style={{
                                ...FONTS.font,
                                color:colors.title,
                                fontSize:15,
                                height:48,
                            }}
                            onChangeText={(val) => setTaskValue(val)}
                            value={taskValue}
                            placeholder={'What would you like to do..'}
                            placeholderTextColor={colors.textLight}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            paddingHorizontal:15,
                            paddingVertical:10,
                            alignItems:'center',
                        }}
                    >
                        <View
                            style={{
                                flex:1,
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setDatePicker2(true)}
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    padding:10,
                                    marginLeft:-8,
                                }}
                            >
                                <FeatherIcon style={{marginRight:6}} color={colors.textLight} size={16} name='calendar'/>
                                <Text style={{...FONTS.font,color:COLORS.primary6}}>{subTaskdatestring}</Text>
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexDirection:'row',
                                    marginLeft:10,
                                }}
                            >
                                {taskColors.map((data,index) => {
                                    return(
                                        <TouchableOpacity
                                            key={index}
                                            onPress={()=> setSubTaskColor(data)}
                                            style={[{
                                                margin:2,
                                                borderWidth:1.5,
                                                borderRadius:16,
                                                padding:2,
                                                borderColor:'transparent',
                                            }, data == subTaskColor && {
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
                        <TouchableOpacity
                            disabled={taskValue.length == 0}
                            onPress={() => handleCreateTask()}
                            style={{
                                height:40,
                                width:40,
                                backgroundColor:COLORS.primary6,
                                borderRadius:40,
                                alignItems:'center',
                                justifyContent:'center',
                                paddingLeft:3,
                                opacity : taskValue.length == 0 ? .8 : 1,
                            }}
                        >
                            <Ionicons size={16} color={COLORS.white} name={'send'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </RBSheet>

            <SafeAreaView
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    flex:1,
                    backgroundColor:colors.cardBg,
                }]}
            >
                {datePicker && (
                    <DateTimePicker
                        value={date}
                        mode={'date'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={true}
                        textColor={colors.title}
                        style={{
                            position:'absolute',
                            backgroundColor:colors.cardBg,
                            zIndex:1,
                            left:0,
                            right:0,
                            bottom:0,
                        }}
                        onChange={onDateSelected}
                    />
                )}
                
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
                    <Text style={{...FONTS.h6,color:colors.title,top:1,flex:1}}>Task Details</Text>
                    <IconButton
                        onPress={() => handleTaskDelete()}
                        icon={() => <FeatherIcon color={colors.textLight} size={20} name='trash-2'/>}
                    />
                    <IconButton
                        onPress={() => { handleTaskUpdate();navigation.navigate('TaskShare',{ id : id })}}
                        icon={() => <FeatherIcon color={colors.textLight} size={20} name='share-2'/>}
                    />
                </View>
                <View style={{flex:1}}>
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between',
                                paddingHorizontal:15,
                                paddingVertical:5,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                }}
                            >
                                <View
                                    style={[Platform.OS === 'ios' && {
                                        transform:[{
                                            scale:.7,
                                        }]
                                    }]}
                                >
                                    <Checkbox
                                        value={taskComplete}
                                        onTintColor={COLORS.primary6}
                                        onCheckColor={COLORS.primary6}
                                        onValueChange={(newValue) => setTaskComplete(newValue)}
                                        tintColors={{ true: COLORS.primary6, false: colors.textLight }}
                                        style={{left:-4}}
                                    />
                                </View>
                                <Text style={{...FONTS.font,fontSize:15,color:colors.textLight}}>Complete</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setDatePicker(true)}
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    paddingVertical:10,
                                    paddingHorizontal:5,
                                }}
                            >
                                <FeatherIcon style={{marginRight:6}} size={16} color={colors.textLight} name='calendar'/>
                                <Text style={{...FONTS.font,fontSize:15,color:COLORS.primary6,top:1}}>{datestring}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={[GlobalStyleSheet.container,{paddingTop:0}]}>
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

                            {todos[todoData] && todos[todoData].images.map((data,index) => {
                                return(
                                    <View
                                        key={index}
                                        style={{
                                            marginBottom:15,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width:"100%",
                                                height:200,
                                                borderRadius:4,
                                            }}
                                            source={{uri : data.path}}
                                        />
                                        <TouchableOpacity
                                            onPress={() => handleImageRemove(index)}
                                            activeOpacity={.8}
                                            style={{
                                                height:20,
                                                width:20,
                                                borderRadius:20,
                                                position:'absolute',
                                                top:-5,
                                                right:-5,
                                                zIndex:1,
                                                alignItems:'center',
                                                justifyContent:'center',
                                                backgroundColor:COLORS.danger,
                                            }}
                                        >
                                            <FeatherIcon name='x' size={14} color={COLORS.white}/>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}

                            <View
                                style={{
                                    padding:15,
                                    backgroundColor:colors.background2,
                                    borderRadius:4,
                                    marginTop:20,
                                }}
                            >
                                {todos[todoData] && todos[todoData].subTasks && todos[todoData].subTasks.length > 0 &&
                                    <View
                                        style={{
                                            marginBottom:6,
                                        }}
                                    >
                                        {todos[todoData].subTasks.map((data,index) => {
                                            return(
                                                <TaskBox
                                                    subTask={true}
                                                    parentId={id}
                                                    key={index}
                                                    item={data}
                                                    handleTaskComplete={handleSubtaskStatus}
                                                />
                                            )
                                        })}
                                    </View>
                                }
                                <TouchableOpacity
                                    onPress={() => subTaskSheet.current.open()}
                                >
                                    <Text style={{...FONTS.font,fontSize:15,color:COLORS.primary6}}>+ Add Subtask</Text>
                                </TouchableOpacity>
                            </View>

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
                        onPress={() => handleImagePicker()}
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
        </>
    );
};

export default TaskDetails;