import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {Center, Input, Box, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Geolocation from '@react-native-community/geolocation';
import {fetchingLocation} from '../../services/locationservice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email belong to'),
  password: Yup.string()
    .required('Please Enter your password'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  contactNumber: Yup.string()
    .required('Contact Number is required')
    .matches(phoneRegExp, 'Phone number is not valid'),
});
const Singnup = ({navigation}) => {
  const [location, setLocation] = useState();
  const [locationStatus, setLocationStatus] = useState('');
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@registerData', jsonValue);
    } catch (e) {}
  };
  const getYourLocation = async (lat, long) => {
    await fetchingLocation(lat, long).then(res => {
      setLocation(res?.data?.items[0]?.address?.label).catch(err => {
        console.log(error);
      });
    });
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(info => {
      const loc = getYourLocation(
        info?.coords?.latitude,
        info?.coords?.longitude,
      );
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Formik
          initialValues={{
            name: '',
            email: '',
            contactNumber: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            console.log(values, 'value here');
            payLoad = {
              name: values.name,
              email: values.email,
              contactNumber: values.contactNumber,
              password: values.password,
              confirmPassword: values.confirmPassword,
              location: location[0]?.address?.label,
            };
            if (payLoad) {
              storeData(payLoad);
              navigation.navigate('signin');
            }
          }}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <Box alignItems="center">
              <Text style={styles.element} fontSize="2xl" mx="3">
                Please fill your Registration Details.{' '}
              </Text>
              <View style={styles.boxstyle}>
                <Text style={styles.fieldText} fontSize="lg">
                  Name
                </Text>
                <Input
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  size="lg"
                  placeholder="Enter you name"
                  w="90%"
                  style={styles.inputbox}
                />
                {errors.name && (
                  <Text style={{fontSize: 15, color: 'red'}}>
                    {errors.name}
                  </Text>
                )}
              </View>

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
                  <Text style={{fontSize: 15, color: 'red'}}>
                    {errors.email}
                  </Text>
                )}
              </View>

              <View style={styles.boxstyle}>
                <Text style={styles.fieldText} fontSize="lg">
                  Phone Number
                </Text>
                <Input
                  onChangeText={handleChange('contactNumber')}
                  onBlur={handleBlur('contactNumber')}
                  value={values.contactNumber}
                  size="lg"
                  placeholder="Enter you Contact Number"
                  w="90%"
                  style={styles.inputbox}
                />
                {errors.contactNumber && (
                  <Text style={{fontSize: 15, color: 'red'}}>
                    {errors.contactNumber}
                  </Text>
                )}
              </View>

              <View style={styles.boxstyle}>
                <Text style={styles.fieldText} fontSize="lg">
                  Location
                </Text>
                <Input
                  value={location}
                  onFocus={() => getOneTimeLocation()}
                  size="lg"
                  placeholder="Tap for Location"
                  w="90%"
                  style={styles.inputbox}
                />
              </View>

              <View style={styles.boxstyle}>
                <Text style={styles.fieldText} fontSize="lg">
                  Password
                </Text>
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

              <View style={styles.boxstyle}>
                <Text style={styles.fieldText} fontSize="lg">
                  Confirm Password
                </Text>
                <Input
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  size="lg"
                  placeholder="Enter you Confirm Password"
                  w="90%"
                  style={styles.inputbox}
                />
                {errors.confirmPassword && (
                  <Text style={{fontSize: 15, color: 'red'}}>
                    {errors.confirmPassword}
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default Singnup;

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
    marginTop: 70,
    color: '#7E5936',
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
