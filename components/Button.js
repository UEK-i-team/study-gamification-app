import {Text, View, Pressable, StyleSheet} from 'react-native';
import React from 'react';

const Button = ({ text, onPress, disabled}) => {
    return(
        <Pressable
              onPress={onPress}
              disabled={disabled}
              style={({ pressed }) => [
                styles.button,
                disabled && styles.disabledButton,
                !disabled && pressed && styles.pressedButton,
              ]}
            >
              <Text style={disabled ? styles.disabledButtonText : styles.buttonText}>
                {text}
              </Text>
            </Pressable>
    )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    minWidth: 120,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  disabledButtonText: {
    color: '#6b7280',
  },
  pressedButton: {
    backgroundColor: '#1d4ed8',
  }
});

export default Button;