import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView} from 'react-native';

const Landing = ({navigation}) => {
    
  const clicked = (data) => {
    console.log(data,"datata")
    {data ? navigation.navigate('signup') : navigation.navigate('signin') }
  };
  return (
    <SafeAreaView style={styles.main}>
    {/* <View> */}
      <Text style={styles.text}> WELCOME TO MyApp</Text>
      <Text style={{margin:3}}>Signin to continue in MyApp </Text>
      <TouchableOpacity style={styles.button}  onPress={() => clicked(0)}>
        <View>
          <Text>Sign In</Text>
        </View>
      </TouchableOpacity>
      <Text style={{margin:3}}>Please Register your self in MyApp </Text>
      <TouchableOpacity style={styles.button}  onPress={() => clicked(1)}>
        <View >
          <Text> Sign Up </Text>
        </View>
      </TouchableOpacity>
    {/* </View> */}
    </SafeAreaView>
  );
};
export default Landing;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#F5DCBA'
  },
  text: {
    // top:0,
    margin:15,
    fontSize: 25,
  },
  button: {
    margin:10,
    padding:10,
    backgroundColor:'#D4AD5D',
    height:50,
    width:200,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:7
    
  },
});
