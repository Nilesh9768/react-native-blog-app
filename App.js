
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';

export default function App() {

  const Stack = createNativeStackNavigator()

  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='BlogForm' component={BlogForm} />
        <Stack.Screen name='Blog' component={Blog} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

