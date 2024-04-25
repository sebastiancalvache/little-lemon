import { StyleSheet, View } from 'react-native';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <View style={styles.container}>
      <UserProvider>
      </UserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
