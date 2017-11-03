import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
import { TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import Meteor, { createContainer } from 'react-native-meteor';

var {height, width} = Dimensions.get('window');

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.logUserIn = this.logUserIn.bind(this);
    this.logTestIn = this.logTestIn.bind(this);

    this.state = {
      username: '',
      password: ''
    }

  }

  logUserIn() {
    Meteor.loginWithPassword(this.state.username, this.state.password, (error) => {
      if (error) {
        console.log(error);
      } else {
        this.props.navigation.navigate('Home');
      }
    })
  }

  logTestIn() {
    Meteor.loginWithPassword('Test','Test', (error) => {
      if (error) {
        console.log(error);
      } else {
        this.props.navigation.navigate('Home');
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.userNameContainer}>
            <Text style={styles.screenTitle}>Login</Text>
            <Text style={styles.screenSubtitle}>
              GET YOUR GAME ON
            </Text>
          </View>
        </View>
        <Form style={styles.form}>
          <Item floatingLabel >
            <Label>Username</Label>
            <Input onChangeText={(text) => this.setState({username: text})} />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input onChangeText={(text) => this.setState({password: text})} />
          </Item>
          <Button rounded block style={styles.submitButton} onPress={ this.logUserIn }>
            <Text>Login</Text>
          </Button>
          <Button rounded block style={styles.submitButton} onPress={() => this.props.navigation.navigate('Signup') }>
            <Text>Go to Signup</Text>
          </Button>

          <Button rounded block style={styles.submitButton} onPress={this.logTestIn}>
            <Text>Log Test In</Text>
          </Button>
        </Form>
      </View>
    );
  }
}

const LoginContainer = createContainer( () => {
  let user = Meteor.user();

  return {
    user
  };
}, Login);

LoginContainer.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryBackground,
  },
  form: {
    marginTop: SIZING.mediumGutter,
  },
  inputContainer: {
    margin: 0
  },
  inputLabel: {

  },
  input: {

  },
  submitButton:{
    marginTop: SIZING.mediumGutter,
    marginLeft: SIZING.largeGutter,
    marginRight: SIZING.largeGutter,
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

export default LoginContainer;
