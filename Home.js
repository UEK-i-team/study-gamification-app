import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>HOME PAGE</Text>
            <Button
            title="Go to Pomodoro Page"
            onPress={() => navigation.navigate('Pomodoro')} />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a9675',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
});