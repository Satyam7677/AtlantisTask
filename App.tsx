/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';


import MapScreen from './src/modules/MapScreen';
import LoginScreen from './src/modules/LoginScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieListScreen from './src/modules/MovieScreen';
import Splash from './src/modules/Splash';
import LocationInformation from './src/modules/LocationInformation';
import localeImage from './src/assets/localeImage';
import { Image } from 'react-native'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

function App(): React.JSX.Element {
  return (
<NavigationContainer>
<Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Splash'>
    <Stack.Screen name='Login' component={LoginScreen}/>
    <Stack.Screen name='BottomTab' component={BottomTab}/>
    <Stack.Screen name='Splash' component={Splash}/>
    </Stack.Navigator>
</NavigationContainer>
  );
}

const BottomTab=()=>{
  return(
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen options={{tabBarIcon:()=><Image source={localeImage.logo} style={{height:25,width:25}}/>}} name='Map' component={MapStack}/>
      <Tab.Screen options={{headerShown:true,tabBarIcon:()=><Image source={localeImage.movies} style={{height:20,width:20}}/>,title:'Movie List'}} name='Movie' component={MovieListScreen}/>
    </Tab.Navigator>
  )
}

const MapStack=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name='MapScreen' component={MapScreen}/>
      <Stack.Screen name='LocationInformation' component={LocationInformation} options={{title:'Location Information'}}/>
    </Stack.Navigator>
  )
}
export default App;
