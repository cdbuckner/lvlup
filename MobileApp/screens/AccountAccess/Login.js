import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
import { TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';

var {height, width} = Dimensions.get('window');

class Login extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input />
          </Item>
          <Button rounded block style={styles.submitButton}>
            <Text>Login</Text>
          </Button>
          <Button rounded block style={styles.submitButton} onPress={() => this.props.navigation.navigate('Signup') }>
            <Text>Go to Signup</Text>
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

export default Login;
