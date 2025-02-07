import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import TaskDetails from './TaskDetails';
import SubTask from './SubTask';
import TaskShare from './TaskShare';
import CalendarScreen from './Calendar';
import Components from '../Screens/components';


const StackComponent = createStackNavigator();

const TaskManagerPage = () => {

    return (
        <>
            <StackComponent.Navigator
                initialRouteName={"DrawerNavigation"}
                detachInactiveScreens={true}
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: "transparent" },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
                >
                <StackComponent.Screen name={"DrawerNavigation"} component={DrawerNavigation} />
                <StackComponent.Screen name={"TaskDetails"} component={TaskDetails} />
                <StackComponent.Screen name={"SubTask"} component={SubTask} />
                <StackComponent.Screen name={"TaskShare"} component={TaskShare} />
                <StackComponent.Screen name={"Calendar"} component={CalendarScreen} />
                <StackComponent.Screen name={"Components"} component={Components} />
            </StackComponent.Navigator>
        </>
    );

};


export default TaskManagerPage;