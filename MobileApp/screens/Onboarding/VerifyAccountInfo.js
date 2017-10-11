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

class VerifyAccountInfo extends React.Component {
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

  render() {
    return (
      <View style={styles.container}>

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

export default VerifyAccountInfo;
