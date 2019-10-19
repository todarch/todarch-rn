import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Text } from 'native-base';
import commonColor from '../theme/variables/commonColor';

export default class Link extends React.Component {

  render() {
    const {navigation, toRoute, text} = this.props;
    return(
      <TouchableHighlight onPress={() => navigation.navigate(toRoute)}>
        <Text
          note
          style={{ textAlign: 'center', color: commonColor.brandPrimary }}>
          {text}
        </Text>
      </TouchableHighlight>
    );
  }
}
