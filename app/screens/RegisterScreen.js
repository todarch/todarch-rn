import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  TouchableHighlight
} from 'react-native';
import {register} from '../api/userClient';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Todarch Registration'
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      passwordConfirm: ''
    }
  }

  cancelRegistration = () => {
    Alert.alert('Warning', 'Registration cancelled');
    this.props.navigation.navigate('HomeRoute');
  };

  handleRegistration = () => {
    const {email, password, passwordConfirm} = this.state;

    if (!email) {
      Alert.alert('Warning', 'Enter email address');
    } else if (password !== passwordConfirm) {
      Alert.alert('Warning', 'Passwords do not match');
    } else {
      register({email, password})
        .then(response => {
          Alert.alert('Success', 'Account created for ' + response.email);
          this.props.navigation.navigate('LoginRoute');
        })
    }
  };

  render() {
    return(
      <View>
        <View style={style.container}>
          <TextInput
            style={style.inputs}
            onChangeText={(text) => this.setState({email: text.trim()})}
            value={this.state.email}
            placeholder='Enter email'
          />

          <TextInput
            style={style.inputs}
            onChangeText={(text) => this.setState({password: text.trim()})}
            value={this.state.password}
            placeholder='Enter password'
            secureTextEntry={true}
          />

          <TextInput
            style={style.inputs}
            onChangeText={(text) => this.setState({passwordConfirm: text.trim()})}
            value={this.state.passwordConfirm}
            placeholder='Enter password confirm'
            secureTextEntry={true}
          />

          <TouchableHighlight
            onPress={this.handleRegistration}
            underlayColor='#f3f'
          >

            <Text style={style.buttons}>
              Register
            </Text>

          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: '45%', // keyboard
    backgroundColor: '#fff',
  },
  inputs: {
    padding: 5,
    height: 50,
    margin: 0,
    marginRight: 7,
    paddingLeft: 10,
  },
  buttons: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 16
  }

});
