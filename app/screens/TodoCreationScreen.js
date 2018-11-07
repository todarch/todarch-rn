import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {formatDateTime} from '../../dateUtil';
import {createTodo} from '../api/todoClient';


const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  text: {
    height: 40,
    margin: 0,
    marginRight: 7,
    paddingLeft: 10,
  }
});


export default class TodoCreationScreen extends React.Component {
  static navigationOptions = {
    title: 'Add New Todo',
  };

  state = {
    title: '',
    description: '',
    priority: 5,
    tags: [],
    timeNeededInMin: 0,
    deadline: '',
    showDatePicker: false,
  };

  handleTitleChange = (value) => {
    this.setState({title: value});
  };

  handleDeadlinePress = () => {
    this.setState({ showDatePicker: true });
  };

  handleDeadlinePicked = (date) => {
    this.setState({ deadline: date });
    this.hideDateTimePicker();
  };

  hideDateTimePicker = () => {
    this.setState({ showDatePicker: false });
  };

  addNewTodo = () => {
    createTodo(this.state)
      .then(ignore => {
        Alert.alert("Success", "Created todo successfully");
        this.props.navigation.navigate('TodoListRoute');
      });
  };

  render() {
    return (
      <View style={{ // inline style
        flex: 1
      }}>
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.text}
            placeholder="Todo Title"
            value={this.state.title}
            spellCheck={false}
            onChangeText={this.handleTitleChange}>
          </TextInput>
          <TextInput
            style={styles.text}
            placeholder="Todo Priority"
            value={this.state.priority}
            spellCheck={false}
            onChangeText={(text) => this.setState({priority: parseInt(text, 10)})}>
          </TextInput>
          <TextInput
            style={styles.text}
            placeholder="How much you need(in minutes)"
            value={this.state.timeNeededInMin}
            spellCheck={false}
            onChangeText={(text) => this.setState({timeNeededInMin: parseInt(text, 10)})}>
          </TextInput>
          <TextInput
            style={styles.text}
            placeholder="Deadline"
            value={formatDateTime(this.state.deadline.toString())}
            spellCheck={false}
            editable={!this.state.showDatePicker}
            onFocus={this.handleDeadlinePress}
            onChangeText={this.handleTitleChange}>
          </TextInput>
          <DateTimePicker
            isVisible={this.state.showDatePicker}
            mode='datetime'
            onConfirm={this.handleDeadlinePicked}
            onCancel={this.hideDateTimePicker}
          />
        </View>
          <Button
            key="addTodoButton"
            title="Add Todo"
            color="#841584"
            onPress={this.addNewTodo}
            accessibilityLabel="Add a new todo item"/>
      </View>
    );
  }
}
