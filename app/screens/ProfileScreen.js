import React from 'react';
import {
  View,
  Button,
} from 'react-native';
import {logout} from '../api/userClient';
import {clearToken} from '../api/common';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Todarch Profile'
  };

  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    logout()
      .then(ignore => {
        clearToken()
          .then(ignore => {
            this.props.navigation.navigate('AuthLoading');
          });
      });
  };

  render() {
    return(
      <View>
        <Button
          onPress={this.handleLogout}
          title="Logout"
          color="#841584"
          accessibilityLabel="Logout"
        />
      </View>
    )
  }
}
