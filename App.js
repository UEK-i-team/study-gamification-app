import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0)
  const [number, setNumber] = React.useState('');
  const [isResting, setIsResting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
     let interval = null;
     if (isRunning) {
        if (count > 0) {
            interval = setInterval(() => {
                setCount(preCount => preCount - 1)
            }, 1000)
        } else {
            if (!isResting) {
                setCount(5);
                setIsResting(true);
            } else {
                setIsRunning(false);
                setIsResting(false);
                setCount(0);
                }
            }
        }
        return () => clearInterval(interval);
      }, [isRunning, count, isResting]);

  const startTimer = () => {
    const newNum = parseInt(number, 10);
    if (!isNaN(newNum) && newNum > 0) {
        setCount(25);
        setNumber(number - 1);
        setIsRunning(true);
        setIsResting(false);
    }
  };

  const stopTimer = () => {
      setIsRunning(false);
      setIsResting(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setNumber}
        value={number}
        placeholder="sessions"
        keyboardType="numeric"
       />
       <Text>{number} Sessions</Text>
       <Button
        title="Start Timer"
        onPress={startTimer}
        disabled={isRunning}
       />
       <Button
        title="Stop Timer"
        onPress={stopTimer}
        disabled={!isRunning}
        />
        <Text style={styles.statusText}>
          {isRunning ? (isResting ? 'Rest' : 'Work') : 'Idle'}
        </Text>
       <Text>Timer {count}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a9675',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
