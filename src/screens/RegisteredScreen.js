import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  Container, Label, Spinner, Toast,
  Content, Form, Item, Input, Button, Text } from 'native-base';
import Ionicons from "react-native-vector-icons/Ionicons";
import commonColor from '../theme/variables/commonColor';
import Link from '../components/Link';

export default class RegisteredScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  };

  render() {
    const registeredEmail = this.props.navigation.getParam('email', 'error@email.com');

    return(
      <Container padder>
        <Content>
          <Ionicons style={styles.welcomeIcon} name="md-checkmark-circle"/>
          <Text style={styles.welcomeHeading}>Thank you!</Text>
          <Text style={styles.welcomeSubheading}>
            The account created successfully.
            There is one more step though, you have to verify
            the email address. We have sent an verification link to
            <Text style={styles.email}> {registeredEmail}</Text>.
          </Text>
          <Link
            navigation={this.props.navigation}
            toRoute="LoginRoute"
            text="Login"
          />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  welcomeHeading: {
    fontSize: 28,
    fontWeight: '300',
    textAlign: 'center',
    marginVertical: 10
  },
  welcomeSubheading: {
    fontSize: 20,
    fontWeight: '100',
    textAlign: 'center',
    margin: 15
  },
  email: {
    fontWeight: 'bold',
  },
  welcomeIcon: {
    fontSize: 100,
    fontWeight: '300',
    textAlign: 'center',
    marginVertical: 10,
    color: commonColor.brandPrimary,
  },
});


