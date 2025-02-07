import React from 'react';
import { FlatList } from 'react-native';
import CardStyle6 from '../../components/card/CardStyle6';
import { IMAGES } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';

const PopularCourses = () => {
    const navigation = useNavigation();

    const handleCoursePress = (course) => {
        let paymentDetails = {
            title: course.title,
            value: course.price
        };

        if (course.type === 'exam') {
            paymentDetails = {
                ...paymentDetails,
                description: 'Inscrição para a Prova Anual de Inteligência',
                details: [
                    'Data da prova: 15 de Março de 2025',
                    'Local: Unidade Central',
                    'Duração: 4 horas',
                    'Material necessário: Documento com foto'
                ]
            };
        } else if (course.type === 'subscription') {
            paymentDetails = {
                ...paymentDetails,
                description: 'Assinatura do Plano Premium',
                details: [
                    'Acesso ilimitado a todas as vídeo aulas',
                    'Banco com mais de 10.000 questões',
                    'Simulados personalizados',
                    'Suporte 24/7',
                    'Cancelamento a qualquer momento'
                ]
            };
        }

        navigation.navigate('Payment', paymentDetails);
    };

    const CourseData = [
        {
            id: "1",
            image: IMAGES.eduCourse1,
            title: "Prova Anual Inteligência",
            lesson: "4 horas",
            duration: "15/03/2025",
            tags: ["Presencial", "Certificado"],
            price: "R$ 150,00",
            type: "exam"
        },
        {
            id: "2",
            image: IMAGES.eduCourse2,
            title: "Plano Premium",
            lesson: "Ilimitado",
            duration: "Mensal",
            tags: ["Vídeo aulas", "Questões"],
            price: "R$ 49,90/mês",
            type: "subscription"
        }
    ];

    const renderItem = ({item}) => {
        return(
            <CardStyle6
                image={item.image}
                title={item.title}
                duration={item.duration}
                lesson={item.lesson}
                tags={item.tags}
                onPress={() => handleCoursePress(item)}
            />
        )
    }

    return (
        <>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{paddingLeft:15,paddingBottom:20,paddingTop:10}}
                data={CourseData}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </>
    );
};

export default PopularCourses;