import React from 'react';
import {
  FlatList,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import {
  getCurrentUserTodos
} from '../api/todoClient';

export default class TodoListScreen extends React.Component {
  static navigationOptions = {
    title: 'Your Todos',
  };

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todosLoaded: false,
    };
  }

  componentDidMount() {
    // we may come back after adding new td item
    this.props.navigation.addListener('didFocus', () => {
      getCurrentUserTodos()
        .then(todos => {
          this.setState({todos, todosLoaded: true});
        })
        .catch(error => {
          this.props.navigation.navigate('AuthLoading');
        })
    });
  }

  handleNewTodo = () => {
    this.props.navigation.navigate('TodoCreationRoute');
  };

  render() {
    // { this.state.todosLoaded &&
    const { navigate } = this.props.navigation;
    return  [
      <Button
        key="addTodoButton"
        onPress={this.handleNewTodo}
        title="New Todo"
        color="#841584"
        accessibilityLabel="Add a new todo item"
      />,
      <FlatList
        key="todoList"
        data={this.state.todos}
        renderItem={({item}) => <TodoCard todo={item} navigate={navigate} />}
        keyExtractor={item => item.id.toString()}
      />
    ];
  }

}

const styles = StyleSheet.create({
  todoStyle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  }
});

function TodoCard({todo, navigate}) {
  return (
    <TouchableWithoutFeedback onPress={() => navigate("TodoDetailRoute", { todoId: todo.id })}>
      <View>
        <Text style={styles.todoStyle}>{todo.id} - {todo.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

}
