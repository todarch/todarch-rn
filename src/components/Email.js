import React from 'react';
import { Container, Label, Content, Form, Item, Input, Button, Text } from 'native-base';
import {authenticate} from '../api/userClient';
import {storeToken} from '../api/common';

export default class Email extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      email: '',
    }
  }

  handleLogin = () => {
    if (this.canAuthenticate()) {
      const {email, password} = this.state;
      this.setState({isLoading: true});
      authenticate({email, password})
        .then(response => {
          console.log('hello wtd');
          this.setState({isLoading: false});
          storeToken(response.token)
            .then((value, result) => {
              Alert.alert('Success!', "Successfully logged in!");
              this.props.navigation.navigate('AuthLoading');
            });
        })
        .catch(error => {
          console.log("error on authentication: ", error);
          Alert.alert("Error", "Could not authenticate");
        })
    }
  };

  render() {
    return(
      <Input
        onChangeText={(text) => this.setState({email: text.trim()})}
        value={this.state.email}
        spellCheck={false}
        autoCapitalize="none" />
    )
  }
}
