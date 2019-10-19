import React from 'react';
import { Text } from 'native-base';

export default class ErrorBox extends React.Component {

  render() {
    // quick fix: elements are moving when msg is on/off
    // use it as a placeholder when it says do not show
    // and when it does not have a error message
    // after a field has valid input, the error msg is empty
    // it is important to have the same background color
    if (!this.props.show || !this.props.msg) {
      return(
        <Text note style={{color: 'white', marginLeft: 15}}>x</Text>
      )
    }

    return(
      <Text note style={{ color: 'red', marginLeft: 15}}>{this.props.msg}</Text>
    );
  }
}
