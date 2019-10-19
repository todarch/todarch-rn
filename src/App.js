import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Root } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TodoListScreen from './screens/TodoListScreen';
import TodoDetailScreen from './screens/TodoDetailScreen';
import TodoCreationScreen from './screens/TodoCreationScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import RegisteredScreen from './screens/RegisteredScreen';

const TodoStack = createStackNavigator({
  TodoListRoute: {
    screen: TodoListScreen,
  },
  TodoCreationRoute: {
    screen: TodoCreationScreen,
  },
  TodoDetailRoute: {
    screen: TodoDetailScreen,
  },
});

const ProfileStack = createStackNavigator({
  ProfileRoute: {
    screen: ProfileScreen
  },
});

const AuthStack = createStackNavigator({
  LoginRoute: {
    screen: LoginScreen,
  },
  RegisteredRoute: {
    screen: RegisteredScreen,
  },
  RegisterRoute: {
    screen: RegisterScreen,
  },
  ForgotPasswordRoute: {
    screen: ForgotPasswordScreen,
  },
});

const tab = createBottomTabNavigator(
  {
    Home: TodoStack,
    Profile: ProfileStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'md-home';
        } else if (routeName === 'Profile') {
          iconName = 'md-person'
        }

        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: "#841584",
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      }
    },
  }
);

const App = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: tab,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default () =>
  <Root>
    <App />
  </Root>;
