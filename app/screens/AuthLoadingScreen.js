import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import {isLoggedIn} from '../api/userClient';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  bootstrapAsync = () => {
    isLoggedIn()
      .then(response => {
        this.props.navigation.navigate('App');
      })
      .catch(err => {
        this.props.navigation.navigate('Auth');
      })
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}