import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import Splash from '../Screens/Splash';
import Home from '../Screens/Home';
import Landing from '../Screens/Landingscreen';
import Signin from '../Screens/Signin';
import Singnup from '../Screens/Signup';


const Stack = createNativeStackNavigator();
const Navigation = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='splash'>
        <Stack.Screen name="splash" component={Splash} options={{headerShown:false}} />
        <Stack.Screen name="landing" component={Landing} options={{headerShown:false}}/>
        <Stack.Screen name="signin" component={Signin} options={{headerShown:false}}/>
        <Stack.Screen name="signup" component={Singnup} options={{headerShown:false}}/>
        <Stack.Screen name="home" component={Home} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
