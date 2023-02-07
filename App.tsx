/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Navigation from './src/navigations';
import { NativeBaseProvider, Box } from "native-base";
import { requestUserPermission, notificationListener } from './src/utils/notificationServices';
const App = () => {
  useEffect(() => {
     requestUserPermission()
     notificationListener()
    }, [])
  return (
    <NativeBaseProvider>
    <Navigation/>
  </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
