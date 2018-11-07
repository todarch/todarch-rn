import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {authenticate} from '../api/userClient';
import {storeToken} from '../api/common';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login to Todarch'
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
    }
  }

  clearFields = () => {
    this.setState({email: '', password: ''});
  };

  canAuthenticate = () => {
    const {email, password} = this.state;
    if (!email) {
      Alert.alert('Warning', 'Please enter email')
      return false;
    } else if (!password) {
      Alert.alert('Warning', 'Please enter password')
      return false;
    } else {
      return true;
    }
  };

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
      <View style={style.container}>
        <TextInput
          style={style.inputs}
          onChangeText={(text) => this.setState({email: text.trim()})}
          value={this.state.email}
          placeholder='Your email'
        />

        <TextInput
          style={style.inputs}
          onChangeText={(text) => this.setState({password: text.trim()})}
          value={this.state.password}
          placeholder='Your password'
          secureTextEntry={true}
        />

        <TouchableHighlight
          onPress={this.handleLogin}
          underlayColor='#aaa'
        >

          <Text style={style.buttons}>
            Login
          </Text>

        </TouchableHighlight>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '45%', // keyboard
    backgroundColor: '#fff',
  },
  inputs: {
    padding: 10,
    height: 80,
    margin: 0,
    marginRight: 7,
    paddingLeft: 10,
  },
  buttons: {
    marginTop: 15,
    fontSize: 16
  }

});
