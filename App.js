import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from "./ThemeContext";
import CategoryItemsScreen from "./screens/CategoryItemsScreen";
import LoginScreen from './screens/LoginScreen';
import MainTabs from './screens/MainTabs';
import SignupScreen from './screens/SignupScreen';
import StartScreen from './screens/StartScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >

        <Stack.Screen
          name="Start"
          component={StartScreen}

          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CategoryItems"
          component={CategoryItemsScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
}