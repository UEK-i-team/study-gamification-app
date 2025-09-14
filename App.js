import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Button from './components/Button.js'

export default function App() {
  const WORK_TIME = 25;
  const REST_TIME = 5;
  const [sessions, setSessions] = useState(1);
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
     let interval = null;
     if (isRunning) {
        interval = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    if (isWorkSession) {
                        setIsWorkSession(false);
                        setIsWorkSession(prevSessions => prevSessions - 1);
                        return REST_TIME;
                    } else {
                        if (setSessionsCompleted < sessions) {
                            setIsWorkSession(true);
                            return WORK_TIME;
                        } else {
                            setIsRunning(false);
                            return 0;
                      }
                    }
                  }
                });
              }, 1000);
            } else if (timeLeft === 0 && !isRunning && sessionsCompleted >= sessions) {

            }
            return () => clearInterval(interval);
      }, [isRunning, timeLeft, isWorkSession, sessions, sessionsCompleted]);

  const startPauseTimer = () => {
    if (isRunning) {
        setIsRunning(false)
    } else {
        const numSessions = parseInt(sessions, 10);
        if (!isNaN(numSessions) && numSessions > 0) {
            setIsRunning(true);
      }
    }
  };

  const resetTimer = () => {
      setTimeLeft(WORK_TIME);
      setSessionsCompleted(0);
      setSessions(1);
      setIsWorkSession(true);
      setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setSessions}
        value={sessions}
        placeholder="sessions"
        keyboardType="numeric"
       />
       <Text>{sessions} Sessions</Text>
       <View style={styles.buttons}>
          <Button
             text={isRunning ? "Pause" : "Start"}
             onPress={startPauseTimer}
             disabled={!sessions}
             />
          <Button
             text={"Reset"}
             onPress={resetTimer}
             disabled={!isRunning && timeLeft === WORK_TIME && sessions === 1}
             />

       </View>
        <Text style={styles.statusText}>
          {isWorkSession ? 'Work Time': 'Rest Time'}
        </Text>
       <Text>{timeLeft}</Text>
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
    marginTop: 50
  },
  statusText: {
    marginTop: 16,
    paddingVertical: 8,
    borderRadius: 6,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%'
  },
});
