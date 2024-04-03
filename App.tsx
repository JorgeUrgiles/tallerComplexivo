
import { PaperProvider } from 'react-native-paper';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { LoginScreen } from './src/screens/LoginScreen';

export default function App() {
  return (
    <PaperProvider>
      {/*<RegisterScreen/>*/}
      <LoginScreen/>
    </PaperProvider>
  );
}
