import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const TaskBox = ({item,handleTaskComplete,subTask,parentId}) => {

    const theme = useTheme();
    const {colors} = theme;
    const navigation = useNavigation();

 
    
    return (    
        <View
            style={{
                marginBottom:10,
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    subTask ?
                    navigation.navigate('SubTask',{parentId : parentId , id : item.id})
                    :
                    navigation.navigate('TaskDetails',{id : item.id})
                }}
                style={[{
                    backgroundColor:colors.cardBg,
                    paddingHorizontal:15,
                    paddingVertical:14,
                    borderLeftWidth:2,
                    borderRadius:4,
                    borderLeftColor:item.color,
                    flexDirection:'row',
                    alignItems:'center',
                    ...GlobalStyleSheet.shadow,
                }, item.complete && {
                    borderLeftColor : 'transparent',
                }]}
            >
                <TouchableOpacity
                    onPress={() => handleTaskComplete(item.id)}
                    style={{
                        padding:10,
                        marginVertical:-7,
                        marginLeft:-10,
                        marginRight:2,
                    }}
                >
                    <View
                        style={[{
                            height:16,
                            width:16,
                            borderWidth:1.5,
                            borderRadius:16,
                            borderColor:colors.textLight,
                            opacity:.6,
                            alignItems:'center',
                            justifyContent:'center',
                        }, item.complete && {
                            backgroundColor:theme.dark ? "rgba(255,255,255,.15)" : "#dfdfdf",
                            borderWidth:0,
                            opacity:1,
                        }]}
                    >
                        {item.complete &&
                            <FeatherIcon style={{opacity: theme.dark ? .5 : 1}} color={COLORS.white} name='check'/>
                        }
                    </View>
                </TouchableOpacity>
                <Text numberOfLines={1} style={[{...FONTS.font,fontSize:15,color:colors.title,flex:1},item.complete && {opacity: .4}]}>{item.title}</Text>
                <Text style={{...FONTS.fontXs,color:colors.textLight,top:1,marginLeft:10}}>{item.date}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TaskBox;