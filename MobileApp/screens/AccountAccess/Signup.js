import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
import { TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import { Accounts } from 'react-native-meteor';
import Meteor, { createContainer } from 'react-native-meteor';

var {height, width} = Dimensions.get('window');

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.createUser = this.createUser.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);

    this.state = {
      email: '',
      password: ''
    }
  }

  static navigationOptions = {
    header: null
  };

  createUser() {
    Accounts.createUser({ username: this.state.email, email: this.state.email, password: this.state.password}, (err) => {
      if (err) {
        console.log(err);
      } else {
        this.props.navigation.navigate('Home');
        console.log(Meteor.user());
      }

    })
  }

  updateUsername(email) {
    this.setState({
      email: email
    });
    console.log(this.state);
  }

  updatePassword(password) {
    this.setState({
      password: password
    });
    console.log(this.state);
  }

  render() {
    return (
      <View style={styles.container}>
        <Form style={styles.form}>
          <Button rounded block style={styles.submitButton} onPress={() => this.props.navigation.navigate('Login') }>
            <Text>Login with Facebook</Text>
          </Button>
          <Text>or</Text>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input onChangeText={ (username) =>  this.updateUsername(username) } />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input onChangeText={ (password) => this.updatePassword(password) } />
          </Item>
          <Item floatingLabel last>
            <Label>Confirm Password</Label>
            <Input />
          </Item>
          <Button rounded block style={styles.submitButton} onPress={ this.createUser }>
            <Text>Signup</Text>
          </Button>
          <Button rounded block style={styles.submitButton} onPress={() => this.props.navigation.navigate('Login') }>
            <Text>Go to Login</Text>
          </Button>
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryBackground,
  },
  form: {
    marginTop: 80
  },
  submitButton:{
    marginTop: 20
  }
});

export default Signup;
