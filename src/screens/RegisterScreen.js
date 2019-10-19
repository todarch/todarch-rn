import React from 'react';
import {
  Keyboard,
  TouchableHighlight,
} from 'react-native';
import {
  Container, Label, Spinner, Toast,
  Content, Form, Item, Input, Button, Text } from 'native-base';
import {register} from '../api/userClient';
import {toastr} from '../api/common';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorBox from '../components/ErrorBox';
import commonColor from '../theme/variables/commonColor';
import Link from '../components/Link';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Todarch Registration'
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  handleRegistration = (values, bag) => {
    Keyboard.dismiss();
    const { email, password } = values;

    this.setState({isLoading: true});
    register({email, password})
      .then(response => {
        this.setState({isLoading: false});
        this.props.navigation.navigate('RegisteredRoute', { email: values.email });
      })
      .catch(error => {
        this.setState({isLoading: false});
        toastr.showToast('Could not create the account.');
      })
  };

  render() {
    return(
      <Container padder>
        <Content>
          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            onSubmit={this.handleRegistration}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required(),
              password: Yup.string()
                .min(8)
                .required(),
              confirmPassword: Yup.string()
                .oneOf(
                  [Yup.ref('password', null)],
                  'Confirm password must match password'
                )
                .required('Confirm password is required'),
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
                    <Label>Password</Label>
                    <Input
                      onChangeText={(text) => setFieldValue("password", text)}
                      onBlur={() => setFieldTouched("password")}
                      value={values.password}
                      name="password"
                      autoCapitalize="none"
                      secureTextEntry={true}/>
                  </Item>
                  <ErrorBox show={touched.password} msg={errors.password}/>
                  <Item stackedLabel>
                    <Label>Confirm Password</Label>
                    <Input
                      onChangeText={(text) => setFieldValue("confirmPassword", text)}
                      onBlur={() => setFieldTouched("confirmPassword")}
                      value={values.confirmPassword}
                      name="confirmPassword"
                      autoCapitalize="none"
                      secureTextEntry={true}/>
                  </Item>
                  <ErrorBox show={touched.confirmPassword} msg={errors.confirmPassword}/>
                </Form>
                {this.state.isLoading
                  ? <Spinner color={"red"}/>
                  : <Button
                    style={{margin: 15, marginTop: 30}}
                    onPress={handleSubmit}
                    disabled={!isValid}
                    primary={isValid}
                    block>
                    <Text>Create Account</Text>
                  </Button>
                }
                <Link
                  navigation={this.props.navigation}
                  toRoute="LoginRoute"
                  text="Already have an account?"
                />
              </React.Fragment>
            )}
          />
        </Content>
      </Container>
    )
  }
}
