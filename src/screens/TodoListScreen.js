import React from 'react';
import {
  FlatList,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Card,
  CardItem,
  Text,
  Left,
  Right,
  Body,
  Fab,
  Spinner,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  getCurrentUserTodos
} from '../api/todoClient';

export default class TodoListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Todarch',
      headerRight:
        <Ionicons
          onPress={() => navigation.navigate('TodoCreationRoute')}
          style={{ marginRight:15 }}
          name="md-add-circle"
          size={25} />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      fabActive: false,
      todos: [],
    };
  }

  componentDidMount() {
    // we may come back after adding new td item
    this.props.navigation.addListener('didFocus', () => {
      this.setState({isLoading: true});
      getCurrentUserTodos()
        .then(todos => {
          this.setState({todos, isLoading: false});
        })
        .catch(error => {
          this.setState({isLoading: false});
          this.props.navigation.navigate('AuthLoading');
        })
    });
  }

  handleNewTodo = () => {
    this.props.navigation.navigate('TodoCreationRoute');
  };

  render() {
    if (this.state.isLoading) {
      return(
        <Spinner color={"red"}/>
      );
    }
    const { navigate } = this.props.navigation;
    return(
      <Container>
          <FlatList
            key="todoList"
            data={this.state.todos}
            renderItem={({item}) => <TodoCard todo={item} navigate={navigate} />}
            keyExtractor={item => item.id.toString()}
          />
      </Container>
    );
  }

}

function TodoCard({todo, navigate}) {
  return (
    <View>
          <Card>
            <CardItem bordered>
              <Left>
                <Body>
                <Text>{todo.title}</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem style={{ paddingVertical: 0 }}>
              <Ionicons name="md-pulse" style={{marginHorizontal: 10}}/>
              <Text note>{todo.priority}</Text>
              <Ionicons name="md-timer" style={{marginHorizontal: 10}}/>
              <Text note>{todo.timeNeededInMin} min</Text>
              <Ionicons name="md-calendar" style={{marginHorizontal: 10}}/>
              <Text note>{todo.createdAtEpoch}</Text>
              <Right>
                <TouchableWithoutFeedback
                  onPress={() => navigate("TodoDetailRoute", { todoId: todo.id, todoTitle: todo.title })}>
                  <Text>
                    <Ionicons size={20} name="md-arrow-round-forward" />
                  </Text>
                </TouchableWithoutFeedback>
              </Right>
            </CardItem>
          </Card>
    </View>
  );

}
