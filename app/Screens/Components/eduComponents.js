import React from 'react';
import { View } from 'react-native';
import BannerSlider from '../../components/Edu_Components/BannerSlider';
import Categories from '../../components/Edu_Components/Categories';
import PopularCourses from '../../components/Edu_Components/PopularCourses';
import PopularSkillTest from '../../components/Edu_Components/PopularSkillTest';

const EduComponents = () => {
    return (
        <View>
            <BannerSlider />
            <Categories />
            <PopularCourses />
            <PopularSkillTest />
        </View>
    );
};

export default EduComponents;