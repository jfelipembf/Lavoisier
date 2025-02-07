import React, {useState, useRef} from 'react';
import { LayoutAnimation, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import uuid from 'react-native-uuid';
import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS, FONTS } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import Button from '../components/Button/Button';
import TaskBox from './components/TaskBox';
import { addTask, completeTask } from '../Redux/reducer/taskAction';


const taskColors = [COLORS.primary6, COLORS.primary7, "#00e049", "#ed9736","#dfdfdf"];

const MainHome = ({navigation}) => {

    const {colors} = useTheme();

    const dispatch = useDispatch();
    const { todos }  = useSelector(state => state.Todos);

    const [taskValue, setTaskValue] = useState(''); 
    const [taskColor , setTaskColor] = useState(taskColors[0]);
    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    function onDateSelected(event, value) {
        
        setDate(value);
        setDatePicker(false);
    };
    const taskSheet = useRef();
    const taskInput = useRef();

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var datestring = ("0" + date.getDate()).slice(-2) + " " + months[date.getMonth('')];

    const handleCreateTask = () => {

        dispatch(
            addTask({
                id : uuid.v4(),
                title : taskValue,
                date : datestring,
                color : taskColor,
                desc : "",
                images : [],
                subTasks : [],
                complete : false,
            })
        )
        setTaskValue('');
        setDate(new Date());
        taskSheet.current.close();
    }

    const handleCompleteTask = (id) => {
        LayoutAnimation.configureNext({
            duration: 200,
            create: {type: 'linear', property: 'opacity'},
            update: {type: 'linear', springDamping: 0.4},
            delete: {type: 'linear', property: 'opacity'},
        });
        dispatch(completeTask(id))
    }


    return (
        <>
            <RBSheet
                ref={taskSheet}
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
                    {datePicker && (
                        <DateTimePicker
                            value={date}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            textColor={colors.title}
                            onChange={onDateSelected}
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
                        style={[GlobalStyleSheet.container,{
                            paddingHorizontal:15,
                            borderBottomWidth:1,
                            borderBottomColor:colors.borderColor,
                            paddingTop:5,
                            paddingBottom:4,
                        }]}
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
                                onPress={() => setDatePicker(true)}
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    padding:10,
                                    marginLeft:-8,
                                }}
                            >
                                <FeatherIcon style={{marginRight:6}} color={colors.textLight} size={16} name='calendar'/>
                                <Text style={{...FONTS.font,color:COLORS.primary6}}>{datestring}</Text>
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
                        <TouchableOpacity
                            disabled={taskValue.length == 0}
                            onPress={handleCreateTask}
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
                    backgroundColor:colors.background2,
                }]}
            >
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        backgroundColor:colors.cardBg,
                        elevation:4,
                    }}
                >
                    <IconButton
                        onPress={() => navigation.openDrawer()}
                        icon={() => <FeatherIcon color={colors.title} size={20} name='menu'/>}
                        />
                    <Text style={{...FONTS.h6,color:colors.title,top:1,flex:1}}>Home</Text>
                    <IconButton
                        icon={() => <FeatherIcon color={colors.title} size={20} name='calendar'/>}
                        onPress={() => navigation.navigate('Calendar')}
                    />
                </View>
                <View style={{flex:1}}>
                    <ScrollView>
                        <View style={GlobalStyleSheet.container}>
                            <View style={{marginBottom:15}}>
                                {todos && todos.length > 0 && todos.map((data,index) => {
                                    if(!data.complete){
                                        return(
                                            <TaskBox
                                                key={index}
                                                item={data}
                                                handleTaskComplete={handleCompleteTask}
                                            />
                                        )
                                    }
                                })}
                            </View>
                            <View>
                                <Text style={{...FONTS.h6,color:colors.title,marginBottom:12}}>Completed</Text>
                                {todos && todos.length > 0 && todos.map((data,index) => {
                                    if(data.complete){
                                        return(
                                            <TaskBox
                                                key={index}
                                                item={data}
                                                handleTaskComplete={handleCompleteTask}
                                            />
                                        )
                                    }
                                })}
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={GlobalStyleSheet.container}>
                    <Button
                        onPress={() => {taskSheet.current.open()}}s
                        color={COLORS.primary6}
                        title={'+ Create Task'}
                    />
                </View>
            </SafeAreaView>
        </>
    );
};

export default MainHome;