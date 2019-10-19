import React from 'react';
import {
  Keyboard,
  Alert,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {
  Container, Label, Spinner, Toast,
  Content, Form, Item, Input, Button, Text } from 'native-base';
import Ionicons from "react-native-vector-icons/Ionicons";
import {toastr} from '../api/common';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorBox from '../components/ErrorBox';
import commonColor from '../theme/variables/commonColor';

export default class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    title: 'Log in to Todarch'
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  handleForgottenPassword = (values, bag) => {
    Keyboard.dismiss();
    toastr.showToast('Not yet implemented!');
  };

  render() {
    return(
      <Container padder>
        <Content>
          <Text style={styles.forgotPasswordHeading}>Forgot your password?</Text>
          <Text style={styles.forgotPasswordSubheading}>
            Enter your email address to receive a password reset link.</Text>
          <Formik
            initialValues={{ email: '' }}
            onSubmit={this.handleForgottenPassword}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required(),
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
                </Form>
                {this.state.isLoading
                  ? <Spinner color={"red"}/>
                  : <Button
                    style={{margin: 15, marginTop: 50}}
                    onPress={handleSubmit}
                    disabled={!isValid}
                    primary={isValid}
                    block>
                    <Text>Reset Password</Text>
                  </Button>
                }
              </React.Fragment>
            )}
          />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  forgotPasswordHeading: {
    fontSize: 28,
    fontWeight: '300',
    marginTop: 10,
    marginLeft: 10,
  },
  forgotPasswordSubheading: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 40,
  }
});
