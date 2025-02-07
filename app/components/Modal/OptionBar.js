import React from 'react';
import { Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FONTS, SIZES } from '../../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ripple from 'react-native-material-ripple';

const OptionBar = ({ visible, onClose, title, options, onSelect, selectedValue }) => {
    const {colors} = useTheme();

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={{
                alignItems:'center',
                justifyContent:'center',
                flex:1,
                position:'relative',
            }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onClose}
                    style={{
                        position:'absolute',
                        height:'100%',
                        width:'100%',
                        backgroundColor:'rgba(0,0,0,.3)',
                    }}
                />
                <View style={{
                    alignItems:'center',
                    paddingHorizontal:25,
                    paddingVertical:20,
                    paddingBottom:25,
                    backgroundColor:colors.card,
                    borderRadius:SIZES.radius,
                    marginHorizontal:30,
                    width:'85%',
                    maxHeight:'70%',
                    shadowColor: "rgba(0,0,0,.6)",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 4.65,
                    elevation: 8,
                }}>
                    <Ionicons 
                        name='list-outline' 
                        style={{marginBottom:8}} 
                        color={colors.primary} 
                        size={40}
                    />
                    <Text style={{
                        ...FONTS.h5,
                        color:colors.title,
                        marginBottom:15,
                        textAlign:'center'
                    }}>{title}</Text>
                    
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        style={{width:'100%'}}
                    >
                        {options.map((option, index) => (
                            <Ripple
                                key={index}
                                style={{
                                    paddingVertical: 12,
                                    paddingHorizontal: 15,
                                    backgroundColor: selectedValue === option ? colors.primary + '20' : colors.cardBg,
                                    borderRadius: SIZES.radius - 5,
                                    marginBottom: 8,
                                    width: '100%',
                                }}
                                onPress={() => {
                                    onSelect(option);
                                    onClose();
                                }}
                            >
                                <Text style={{
                                    ...FONTS.font,
                                    color: selectedValue === option ? colors.primary : colors.text,
                                    textAlign: 'center',
                                    fontSize: 15,
                                }}>{option}</Text>
                            </Ripple>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default OptionBar;