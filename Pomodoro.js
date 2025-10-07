import { StyleSheet,
             View,
             Text,
             TouchableOpacity,
             StatusBar,
             Dimensions,
             SafeAreaView
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

const TIME_MODES = {
        FOCUS: { name: 'Focus', minutes: 25, color: '#807A5C' },
        SHORT_BREAK: { name: 'Short Break', minutes: 5, color: '#3A5899' },
        LONG_BREAK: { name: 'Long Break', minutes: 15, color: '#257D60' },
    };
const BACKGROUND_COLOR = '#0F172A';
const { width } = Dimensions.get('window');
const getSecondsForMode = (modeConfig) => modeConfig.minutes * 60;

const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
};


export default function PomodoroScreen() {
    const [currentMode, setCurrentMode] = useState(TIME_MODES.FOCUS);
    const [timeRemaining, setTimeRemaining] = useState(getSecondsForMode(TIME_MODES.FOCUS));
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const navigation = useNavigation();

    const timerRef = useRef(null);

    useEffect(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        if (isTimerRunning && timeRemaining > 0) {
            timerRef.current = setInterval(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current)
                        setIsTimerRunning(false)
                        console.log(`${currentMode.name} finished`);
                        const nextMode =
                            currentMode === TIME_MODES.FOCUS ? TIME_MODES.SHORT_BREAK : TIME_MODES.FOCUS;
                        setCurrentMode(nextMode);
                        return 0;
                    }
                    return prevTime - 1;
                    });
                }, 1000);
            } else if (timeRemaining === 0) {
                setIsTimerRunning(false);
            }

            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            };
    }, [isTimerRunning, timeRemaining, currentMode]);

    useEffect(() => {
        if (timeRemaining !== getSecondsForMode(currentMode)) {
            setTimeRemaining(getSecondsForMode(currentMode));
        }
        setIsTimerRunning(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    }, [currentMode]);

    const handleModeChange = (mode) => {
        if (mode.name !== currentMode.name) {
            setCurrentMode(mode);
        }
    };

    const handleStartPause = () => {
        setIsTimerRunning(prev => !prev);
    };

    const handleReset = () => {
        setIsTimerRunning(false)
        setTimeRemaining(getSecondsForMode(currentMode));
        if(timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    const handleGoBack = () => {
        navigation.navigate('Home');
    };

     const accentColor = currentMode.color;
     const buttonText = isTimerRunning ? 'PAUSE' : (timeRemaining === getSecondsForMode(currentMode) ? 'START' : 'RESUME');


    return (
        <SafeAreaView style={[styles.safeArea, {backgroundColor: BACKGROUND_COLOR}]}>
               <StatusBar barStyle="light-content" backgroundColor={BACKGROUND_COLOR} />

                <Text style={styles.title}>Pomodoro App</Text>

                {/* Mode Selector Buttons */}
                <View style={styles.modeContainer}>
                    {Object.values(TIME_MODES).map((mode) => (
                        <TouchableOpacity
                            key={mode.name}
                            onPress={() => handleModeChange(mode)}
                            style={[
                                styles.modeButton,
                                currentMode.name === mode.name && {
                                    backgroundColor: accentColor,
                                    shadowColor: accentColor,
                                    shadowOpacity: 0.8,
                                    elevation: 8,
                                }
                            ]}
                        >
                            <Text style={styles.modeText}>{mode.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Timer Display */}
                <View style={[styles.timerCircle, { borderColor: accentColor }]}>
                    <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
                </View>

                {/* Control Buttons */}
                <View style={styles.controlsContainer}>
                    {/* Start/Pause Button */}
                    <TouchableOpacity
                        onPress={handleStartPause}
                        style={[styles.controlButton, { backgroundColor: accentColor, elevation: 12 }]}
                    >
                        <Text style={styles.controlButtonText}>{buttonText}</Text>
                    </TouchableOpacity>

                    {/* Reset Button */}
                    {(isTimerRunning || timeRemaining !== getSecondsForMode(currentMode)) && (
                        <TouchableOpacity
                            onPress={handleReset}
                            style={[styles.resetButton]}
                        >
                            <Text style={styles.resetButtonText}>Reset</Text>
                        </TouchableOpacity>
                  )}

                  {/* Go Back To Home Button */}
                  <TouchableOpacity
                      onPress={handleGoBack}
                      style={[styles.controlButton, { backgroundColor: accentColor, elevation: 12 }]}
                  >
                      <Text style={styles.controlButtonText}>GO BACK</Text>
                  </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  safeArea: {
          flex: 1,
          alignItems: 'center',
          paddingTop: 30,
          backgroundColor: BACKGROUND_COLOR,
      },
      title: {
          fontSize: 30,
          fontWeight: '700',
          color: '#E5E7EB', // Gray-200
          marginBottom: 40,
          letterSpacing: 1,
      },
      modeContainer: {
          flexDirection: 'row',
          backgroundColor: '#1E293B', // Slate-800
          borderRadius: 50,
          padding: 6,
          marginBottom: 50,
          width: width * 0.9,
          justifyContent: 'space-around',
      },
      modeButton: {
          paddingVertical: 12,
          paddingHorizontal: 18,
          borderRadius: 50,
          minWidth: width * 0.28,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
      },
      modeText: {
          color: '#E5E7EB',
          fontWeight: '600',
          fontSize: 16,
      },
      timerCircle: {
          width: width * 0.75,
          height: width * 0.75,
          borderRadius: (width * 0.75) / 2,
          borderWidth: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 60,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
      },
      timerText: {
          fontSize: 80,
          fontWeight: '200',
          color: '#E5E7EB',
          letterSpacing: 2,
      },
      controlsContainer: {
          alignItems: 'center',
          gap: 20,
      },
      controlButton: {
          paddingVertical: 18,
          paddingHorizontal: 40,
          borderRadius: 12,
          width: width * 0.6,
          alignItems: 'center',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.6,
          shadowRadius: 10,
      },
      controlButtonText: {
          fontSize: 24,
          fontWeight: '800',
          color: '#FFF',
          textShadowColor: 'rgba(0, 0, 0, 0.3)',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,
      },
      resetButton: {
          paddingVertical: 10,
          paddingHorizontal: 20,
      },
      resetButtonText: {
          fontSize: 18,
          color: '#94A3B8', // Slate-400
          fontWeight: '500',
      },
});

