import React from 'react';
import { Container, Content, Button, Text } from 'native-base';
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
      <Container>
        <Content>
          <Button block primary onPress={this.handleLogout}>
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}
