import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { Container,  Content, Spinner } from 'native-base';
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
      <Container>
        <Content>
          <Spinner />
          <StatusBar barStyle="default" />
        </Content>
      </Container>
    );
  }
}