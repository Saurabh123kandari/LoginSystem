import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Input, Box, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SigninSchema = Yup.object().shape({
  email: Yup.string().required('Email belong to'),
  password: Yup.string()
    .required('Please Enter your password')
});

const Signin = ({navigation}) => {
  const [storedData, setStoredData] = useState();
  const [isLoginStatus, setIsLoginStatus] = useState();

  const setLoginStatus = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      console.log(jsonValue, 'here is sdsdsdsdvalues');
      await AsyncStorage.setItem('@loginStatus', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const getLoginStatus = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@loginStatus');
      setIsLoginStatus(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {}
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@registerData');
      setStoredData(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {}
  };
  useEffect(() => {
    getData();
    // getLoginStatus()
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={SigninSchema}
        onSubmit={values => {
          payLoad = {
            email: values.email,
            password: values.password,
          };
          if (
            payLoad.email === storedData.email &&
            payLoad.password === storedData.password
          ) {
            navigation.navigate('home');
            setLoginStatus({isLogin: true});
          } else {
            alert('Please enter valid email and password');
          }
        }}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <Box alignItems="center">
            <Text style={styles.element} fontSize="2xl" mx="3">
              Please log in to your account.{' '}
            </Text>
            <View style={styles.boxstyle}>
              <Text style={styles.fieldText} fontSize="lg">
                Email
              </Text>
              <Input
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                size="lg"
                placeholder="Enter you email"
                w="90%"
                style={styles.inputbox}
              />
              {errors.email && (
                <Text style={{fontSize: 15, color: 'red'}}>{errors.email}</Text>
              )}
            </View>
            <View style={styles.boxstyle}>
              <Text fontSize="lg">Password</Text>
              <Input
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                size="lg"
                placeholder="Enter you Password"
                w="90%"
                style={styles.inputbox}
              />
              {errors.password && (
                <Text style={{fontSize: 15, color: 'red'}}>
                  {errors.password}
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
              style={styles.button}>
              <View>
                <Text> Sign In </Text>
              </View>
            </TouchableOpacity>
          </Box>
        )}
      </Formik>
    </SafeAreaView>
  );
};
export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5DCBA',
  },
  inputbox: {
    backgroundColor: '#F8EED9',
  },
  boxstyle: {
    marginTop: 10,
  },
  element: {
    marginTop: 100,
  },
  fieldText: {
    color: '#7E5936',
  },
  button: {
    margin: 27,
    padding: 10,
    backgroundColor: '#D4AD5D',
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
});
