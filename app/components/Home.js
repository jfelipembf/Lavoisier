import react from 'react';
import { View } from 'react-native';
import BannerSlider from './Edu_Components/BannerSlider';
import TitleArea from '../components/TitleArea';
import Categories from './Edu_Components/Categories';
import PopularCourses from './Edu_Components/PopularCourses';

const Home = () => {
    return (
        <View style={{ backgroundColor: '#FFFFFF' }}>
            <View style={{ marginBottom: 40, alignItems: 'center', marginTop: 20 }}>
                <TitleArea title={'Seu futuro'} />
                <BannerSlider />
            </View>

            <View style={{ marginBottom: 40, alignItems: 'center', marginTop: 20 }}>
                <TitleArea title={'Fique atento'} />
                <Categories />
            </View>
            <View style={{ marginBottom: 40, alignItems: 'center', marginTop: 20 }}>
                <TitleArea title={'Cursos Populares'} />
                <PopularCourses />
            </View>
        </View>
    );
};

export default Home;
