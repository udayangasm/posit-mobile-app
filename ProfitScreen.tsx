import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
  TextInput,
} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';
import {useNavigation } from '@react-navigation/native';
import { useGlobalValue } from './GlobalContext';

const ProfitScreen = () => {

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, };

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',
    },
    valueText: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    nameText: {
      fontSize: 15,
      fontWeight: 'normal',
    },
  });

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, seToDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [salesValue, setSalesValue] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [profit, setProfit] = useState('');
  const [showFromDatePicker, setFromDateShowPicker] = useState(false);
  const [showToDatePicker, setToDateShowPicker] = useState(false);
  const { globalValue } = useGlobalValue();

  const onChangeFromDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setFromDateShowPicker(false);
    setFromDate(currentDate);
  };

  const onChangeToDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setToDateShowPicker(false);
    seToDate(currentDate);
  };

  const showFromDateTimePicker = () => {
    setFromDateShowPicker(true);
  };

  const showToDateTimePicker = () => {
    setToDateShowPicker(true);
  };



  const handlProfitRequest = async () => {
    try {
      const response = await fetch('https://positnow.com:8010/profit/getAllProfit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+globalValue
        },
        body: JSON.stringify({
          fromDate: fromDate,
          toDate: toDate,
          salesRefId: 0
        }),
      });

      const data = await response.json();
      setSalesValue(data.salesValue);
      setUnitCost(data.unitCost);
      const sales = parseFloat(salesValue);
      const cost = parseFloat(unitCost);
      const profit = sales - cost;
      setProfit(profit.toString());
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

          {showFromDatePicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={onChangeFromDate}
            />
          )}

          {showToDatePicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={onChangeToDate}
            />
          )}

          <TextInput onChangeText={showFromDateTimePicker} placeholder="from date" value={JSON.stringify(fromDate)} />
          <TextInput onChangeText={showToDateTimePicker} placeholder="to date" value={JSON.stringify(toDate)} />

          <Button title="Find" onPress={handlProfitRequest} />
          <Text style={styles.baseText}>
            <Text style={styles.nameText}>
              {'\n'}
              {'\n'}
              {'Sales Value : '}
            </Text>
            <Text style={styles.valueText}>
              {salesValue}
            </Text>
            <Text style={styles.nameText}>
              {'\n'}
              {'\n'}
              {'Unit Cost : '}
            </Text>
            <Text style={styles.valueText}>
              {unitCost}
            </Text>
            <Text style={styles.nameText}>
              {'\n'}
              {'\n'}
              {'Profit : '}
            </Text>
            <Text style={styles.valueText}>
              {profit}
              {'\n'}
              {'\n'}
            </Text>
          </Text>

        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </SafeAreaView>

    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <Button title="Go back" onPress={() => navigation.goBack()} />
    // </View>
  );
};

export default ProfitScreen;