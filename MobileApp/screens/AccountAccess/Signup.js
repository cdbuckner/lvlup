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
    Accounts.createUser({
      username: this.state.email,
      email: this.state.email,
      password: this.state.password,
      profile: {
        friends: [],
        age: 0,
        sex: '',
        weight: 0,
        level: 0
      }
    }, (err) => {
      if (err) {
        console.log(err);
      } else {
        Meteor.loginWithPassword(this.state.email,this.state.password, (error) => {
          if (error) {
            console.log(error);
          } else {
            this.props.navigation.navigate('Onboarding');
          }
        })
      }

    })
  }

  updateUsername(email) {
    this.setState({
      email: email
    });
  }

  updatePassword(password) {
    this.setState({
      password: password
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.userNameContainer}>
            <Text style={styles.screenTitle}>Signup</Text>
            <Text style={styles.screenSubtitle}>
              {"LEVEL YOURSELF UP"}
            </Text>
          </View>
        </View>
        <Form style={styles.form}>
          <Button rounded block style={styles.submitButton} onPress={() => this.props.navigation.navigate('Login') }>
            <Text>Login with Facebook</Text>
          </Button>
          <Text>or</Text>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input onChangeText={ (username) =>  this.updateUsername(username) } />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input onChangeText={ (password) => this.updatePassword(password) } />
          </Item>
          <Item floatingLabel>
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
    marginTop: SIZING.mediumGutter,
  },
  submitButton:{
    marginTop: 20
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: width,
    paddingLeft: SIZING.largeGutter,
    paddingBottom: SIZING.mediumGutter,
    paddingRight: SIZING.largeGutter,
  },
  screenTitle: {
    fontSize: SIZING.h1,
    lineHeight: SIZING.h1,
    fontWeight: '800',
    marginTop: 60 + SIZING.mediumGutter,
    marginBottom: 5,
  },
  screenSubtitle: {
    fontSize: 10
  },
  headerButton: {

  },
});

export default Signup;
