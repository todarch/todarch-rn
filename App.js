import React from 'react';
import TodoListScreen from './app/screens/TodoListScreen';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import TodoCreationScreen from './app/screens/TodoCreationScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import TodoDetailScreen from './app/screens/TodoDetailScreen';
import AuthLoadingScreen from './app/screens/AuthLoadingScreen';
import ProfileScreen from './app/screens/ProfileScreen';

const TodoStack = createStackNavigator({
  TodoListRoute: {
    screen: TodoListScreen,
  },
  TodoDetailRoute: {
    screen: TodoDetailScreen,
  },
  TodoCreationRoute: {
    screen: TodoCreationScreen,
  }
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
  RegisterRoute: {
    screen: RegisterScreen,
  },
});

const tab = createBottomTabNavigator({
  TodoTab: TodoStack,
  ProfileTab: ProfileStack,
});

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

export default App;
