import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


import {  useNavigation } from '@react-navigation/native';
import { useGlobalValue } from './GlobalContext';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

// const [token, setToken] = useState(null);

const HomeScreen = () => {

  const navigation = useNavigation();
  const [user, userName] = React.useState('');
  const [pass, password] = React.useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, };
  const [responseData, setResponseData] = useState(null);
  const { globalValue, setGlobalValue } = useGlobalValue();


  const handlePostRequest = async () => {
    try {
      const response = await fetch('https://positnow.com:8040/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        body: JSON.stringify({
          // Your request body data
          username: user,
          password: pass,
        }),
      });

      const data = await response.json();
      // Handle response data
      setResponseData(data);
      Alert.alert(data.token);
      setGlobalValue(data.token);
      navigation.navigate('Profit')
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to make POST request');
    }
  };


  return (

    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="POSITNOW">
          </Section>

          <TextInput onChangeText={userName} placeholder="user name" value={user} />
          <TextInput onChangeText={password} placeholder="password" value={pass} />
          <Button title="Login" onPress={handlePostRequest} />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


export default HomeScreen;