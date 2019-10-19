import React from 'react';
import {
  KeyboardAvoidingView
} from 'react-native';
import {
  Container, Label, Spinner, Textarea,
  Content, Form, Item, Input, Button, Text } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {formatDateTime} from '../../dateUtil';
import {createTodo} from '../api/todoClient';

export default class TodoCreationScreen extends React.Component {
  static navigationOptions = {
    title: 'Add New Todo',
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      priority: '5',
      tags: [],
      timeNeededInMin: "0",
      deadline: '',
      showDatePicker: false,
    };

  }

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
      <Container padder>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input
                onChangeText={(text) => this.setState({title: text.trim()})}
                value={this.state.title}/>
            </Item>
            <Item floatingLabel>
              <Label>Priority</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(text) => this.setState({priority: parseInt(text, 10)})}
                value={this.state.priority}/>
            </Item>
            <Item floatingLabel>
              <Label>How long will it take approx(in min) ?</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(text) => this.setState({timeNeededInMin: parseInt(text, 10)})}
                value={this.state.timeNeededInMin} />
            </Item>
            {/*<Item floatingLabel>*/}
              {/*<Label>Deadline</Label>*/}
              {/*<Input*/}
                {/*value={formatDateTime(this.state.deadline.toString())}*/}
                {/*spellCheck={false}*/}
                {/*editable={!this.state.showDatePicker}*/}
                {/*onFocus={this.handleDeadlinePress}*/}
                {/*onChangeText={this.handleTitleChange} />*/}
            {/*</Item>*/}
            {/*<Item>*/}
              {/*<DateTimePicker*/}
                {/*isVisible={this.state.showDatePicker}*/}
                {/*mode='datetime'*/}
                {/*onConfirm={this.handleDeadlinePicked}*/}
                {/*onCancel={this.hideDateTimePicker}*/}
              {/*/>*/}
            {/*</Item>*/}
          </Form>
          <Button
            style={{ margin: 15, marginTop: 50 }}
            onPress={this.addNewTodo}
            block primary>
            <Text>Add Todo</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
