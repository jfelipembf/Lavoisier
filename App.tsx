import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Store from './app/Redux/Store';
import Routes from './app/Navigations/Route';

const App = () =>{

	const [loaded] = useFonts({
      NunitoSansRegular: require('./app/assets/fonts/NunitoSans-Regular.ttf'),
      NunitoSansBold : require('./app/assets/fonts/NunitoSans-Bold.ttf'),
      NunitoSansSemiBold : require('./app/assets/fonts/NunitoSans-SemiBold.ttf'),
      PoppinsSemiBold : require('./app/assets/fonts/Poppins-SemiBold.ttf'),
      PoppinsMedium : require('./app/assets/fonts/Poppins-Medium.ttf'),
	});  

	if(!loaded){
		  return null;
	}
  
	return (
		 <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
            <StatusBar style="dark" />
              <Provider store={Store}>
                <Routes/>
              </Provider>
        </SafeAreaView>
		</SafeAreaProvider>
	);
};

export default App;
