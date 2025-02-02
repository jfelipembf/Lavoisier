import React from 'react';
import { FlatList } from 'react-native';
import CardStyle6 from '../../components/card/CardStyle6';
import { IMAGES } from '../../constants/theme';

const PopularCourses = () => {

    const CourseData = [
        {
            id : "1",
            image : IMAGES.eduCourse1,
            title : "UX Design Fundamentals",
            lesson : "25",
            duration : "3 hrs",
            tags : ["Ui Design", "Development"],
        },
        {
            id : "2",
            image : IMAGES.eduCourse1,
            title : "UX Design Fundamentals",
            lesson : "25",
            duration : "3 hrs",
            tags : ["Ui Design", "Development"],
        },
        {
            id : "3",
            image : IMAGES.eduCourse1,
            title : "UX Design Fundamentals",
            lesson : "25",
            duration : "3 hrs",
            tags : ["Ui Design", "Development"],
        },
    ]

    const renderItem = ({item}) => {
        return(
            <CardStyle6
                image={item.image}
                title={item.title}
                duration={item.duration}
                lesson={item.lesson}
                tags={item.tags}
                navigate={'CourseDetails'}
            />
        )
    }

    return (
        <>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft:15,paddingBottom:20,paddingTop:10}}
                data={CourseData}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </>
    );
};


export default PopularCourses;