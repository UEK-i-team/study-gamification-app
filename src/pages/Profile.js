import {
     StyleSheet,
     View,
     Text,
     TouchableOpacity,
     StatusBar,
     SafeAreaView,
     Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BACKGROUND_COLOR = '#0F172A';

export default function ProfileScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: BACKGROUND_COLOR }]}>
             <StatusBar barStyle="light-content" backgroundColor={BACKGROUND_COLOR} />

             <View style={styles.content}>
                    <Text style={styles.greetingText}>User Profile</Text>
             </View>

             <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => navigation.navigate('Home')}
                  activeOpacity={0.7}
                  >
                    <Text style={styles.startButtonText}>Go Back To Home</Text>
             </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 50,
      },
      content: {
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          width: '100%',
      },
      greetingText: {
          fontSize: 42,
          fontWeight: '800',
          color: '#E5E7EB',
          marginBottom: 10,
          letterSpacing: 1.5,
          textAlign: 'center',
      },
      subtitle: {
          fontSize: 20,
          fontWeight: '300',
          color: '#9CA3AF',
          marginBottom: 100,
      },
      startButton: {
          backgroundColor: '#807A5C',
          paddingVertical: 18,
          paddingHorizontal: 40,
          borderRadius: 12,
          width: '80%',
          alignItems: 'center',
          marginBottom: 30,
          shadowColor: '#807A5C',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.6,
          shadowRadius: 8,
          elevation: 10,
      },
      startButtonText: {
          fontSize: 22,
          fontWeight: '700',
          color: '#FFF',
          textShadowColor: 'rgba(0, 0, 0, 0.3)',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,
      },
});