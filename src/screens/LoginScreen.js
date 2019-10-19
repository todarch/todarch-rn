import React from 'react';
import {
  Keyboard,
} from 'react-native';
import {
  Container, Label, Spinner, Toast,
  Content, Form, Item, Input, Button, Text } from 'native-base';
import Ionicons from "react-native-vector-icons/Ionicons";
import {authenticate} from '../api/userClient';
import {storeToken, toastr} from '../api/common';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorBox from '../components/ErrorBox';
import Link from '../components/Link';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Log in to Todarch'
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showPassword: false,
    }
  }

  handleLogin = (values, bag) => {
    Keyboard.dismiss();
    this.setState({isLoading: true});
    authenticate(values)
      .then(response => {
        this.setState({isLoading: false});
        storeToken(response.token)
          .then((value, result) => {
            this.props.navigation.navigate('App');
          });
      })
      .catch(error => {
        this.setState({isLoading: false});
        toastr.showToast('Could not verify your credentials.');
      })
  };

  toggleShowPassword = () => {
    this.setState((prevState) => ({showPassword: !prevState.showPassword}));
  };

  render() {
    return(
      <Container padder>
        <Content>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={this.handleLogin}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required(),
              password: Yup.string().required(),
            })}
            render={({ values, handleSubmit, setFieldValue, errors, touched, setFieldTouched, isValid }) => (
              <React.Fragment>
                <Form>
                  <Item stackedLabel>
                    <Label>Email Address</Label>
                    <Input
                      keyboardType="email-address"
                      onChangeText={(text) => setFieldValue("email", text)}
                      onBlur={() => setFieldTouched("email")}
                      name="email"
                      value={values.email}
                      spellCheck={false}
                      autoCapitalize="none" />
                  </Item>
                  <ErrorBox show={touched.email} msg={errors.email}/>
                  <Item stackedLabel>
                    <Label>Password
                      <Ionicons
                        style={{fontSize: 18}}
                        onPress={this.toggleShowPassword}
                        name={this.state.showPassword ? "md-eye-off" : "md-eye"}
                      />
                    </Label>
                    <Input
                      onChangeText={(text) => setFieldValue("password", text)}
                      onBlur={() => setFieldTouched("password")}
                      value={values.password}
                      name="password"
                      autoCapitalize="none"
                      secureTextEntry={this.state.showPassword}/>
                  </Item>
                  <ErrorBox show={touched.password} msg={errors.password}/>
                </Form>
                {this.state.isLoading
                  ? <Spinner color={"red"}/>
                  : <Button
                    style={{margin: 15, marginTop: 50}}
                    onPress={handleSubmit}
                    disabled={!isValid}
                    primary={isValid}
                    block>
                    <Text>Log In</Text>
                  </Button>
                }

                <Link
                  navigation={this.props.navigation}
                  toRoute="ForgotPasswordRoute"
                  text="Forgotten your password?"
                />
                <Link
                  navigation={this.props.navigation}
                  toRoute="RegisterRoute"
                  text="Create an account"
                />
              </React.Fragment>
            )}
            />
        </Content>
      </Container>
    )
  }
}
