import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';

const CategoryData = [
    {
        id : "1",
        icon : IMAGES.bell,
        title : "Avisos",
        description: "Notificações importantes",
        color : "#cee7e6",
        route: "Notifications"
    },
    {
        id : "2",
        icon : IMAGES.file,
        title : "Agenda",
        description: "Tarefas diárias",
        color : "#eae3ef",
        route: "Schedule"
    },
    {
        id : "3",
        icon : IMAGES.headphones,
        title : "Fale conosco",
        description: "Suporte e ajuda",
        color : "#f2eee9",
        route: "Contact"
    },
    {
        id : "4",
        icon : IMAGES.clock,
        title : "Grade",
        description: "Grade de horários",
        color : "#f3dfde",
        route: "ClassSchedule"
    },
];

const Categories = () => {
    const navigation = useNavigation();

    const handleNavigation = (item) => {
        if (item.route) {
            navigation.navigate(item.route);
        } else {
            navigation.navigate('Courses', {
                title: item.title,
                bgColor: item.color,
                catIcon: item.icon
            });
        }
    };

    const renderItem = ({item}) => {
        return (
            <View style={{ marginRight:20, width:160 }}>
                <TouchableOpacity
                    onPress={() => handleNavigation(item)}
                    style={{
                        paddingHorizontal:15,
                        paddingVertical:25,
                        width:165,
                        backgroundColor:item.color,
                        borderRadius:15,
                        marginBottom:10,
                        flex:1,
                    }}
                >
                    <Image
                        style={{
                            height:32,
                            width:42,
                            marginBottom:12,
                            marginTop:5,
                            tintColor: '#444444',
                            resizeMode: 'contain'
                        }}
                        source={item.icon}
                    />
                    <Text style={{...FONTS.font, ...FONTS.fontBold}}>{item.title}</Text>
                    <Text style={{...FONTS.font, fontSize: 12, color: '#666666', marginTop: 4}}>
                        {item.description}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingLeft:15, paddingBottom:10, paddingTop:12}}
            data={CategoryData}
            keyExtractor={item => item.id}
            renderItem={renderItem}
        />
    );
};

export default Categories;
