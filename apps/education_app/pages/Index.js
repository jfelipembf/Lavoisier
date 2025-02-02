import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Courses from './Courses';
import CourseDetails from './CourseDetails';
import Components from '../Screens/components';
import DrawerNavigation from './DrawerNavigation';
import OnBoarding from './OnBoarding';


const StackComponent = createStackNavigator();

const EduacationPage = () => {

    return (
        <>
            <StackComponent.Navigator
                initialRouteName={"OnBoarding"}
                detachInactiveScreens={true}
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: "transparent" },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
                >
                <StackComponent.Screen name={"OnBoarding"} component={OnBoarding} />
                <StackComponent.Screen name={"DrawerNavigation"} component={DrawerNavigation} />
                <StackComponent.Screen name={"Courses"} component={Courses} />
                <StackComponent.Screen name={"CourseDetails"} component={CourseDetails} />
                <StackComponent.Screen name={"Components"} component={Components} />
            </StackComponent.Navigator>
        </>
    );

};


export default EduacationPage;