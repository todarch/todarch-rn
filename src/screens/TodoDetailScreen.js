import React from 'react';
import {
  Text,
  View,
  Alert,
} from 'react-native';
import {getTodoDetail} from '../api/todoClient';

export default class TodoDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('todoTitle', 'Todo Details'),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  componentDidMount() {
    const todoId = this.props.navigation.getParam('todoId', 'No todoId');

    getTodoDetail(todoId)
      .then(todo => {
        Alert.alert("Success!", JSON.stringify(todo))
      })
  }

  render() {
    const todoId = this.props.navigation.getParam('todoId', 'No todoId');
    return(
      <View>
        <Text>{todoId}</Text>
      </View>
    )
  }

}
