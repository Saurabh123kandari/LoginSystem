import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';

const splashlogo = require('../../assets/images/splashlogo.png');
const Home = ({navigation}) => {
  const [isLoginStatus, setIsLoginStatus] = useState();

  useEffect(() => {
    getLoginStatus();
  }, []);

  const storeLoginStatus = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@loginStatus', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const getLoginStatus = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@loginStatus');
      // setIsLoginStatus(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {}
  };
  const logOut = () => {
    AsyncStorage.removeItem('@loginStatus');
    navigation.navigate('signin');
  };
  // console.log(isLoginStatus,"islooooogggiin")
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <Image style={styles.logo} source={splashlogo} />
      </View>
      <TouchableOpacity
        onPress={() => {
          logOut();
        }}
        style={styles.button}>
        <View>
          <Text> Logout </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9B860',
  },
  header: {},
  logo: {
    height: 80,
    width: 80,
  },
  text: {
    fontSize: 20,
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
