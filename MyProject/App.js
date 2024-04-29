import { StyleSheet, View } from 'react-native';
import { UserProvider } from './context/UserContext';
import Navigation from './screens/Navigation';

export default function App() {
  return (
    <View style={styles.container}>
      <UserProvider>
        <Navigation></Navigation>
      </UserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
