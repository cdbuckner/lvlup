import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
import { NavigationActions, TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import Meteor, { createContainer } from 'react-native-meteor';

var {height, width} = Dimensions.get('window');

class Splash extends React.Component {

  componentWillMount() {
    let {user} = this.props;

    if ( user ) {
      this._navigateTo('Home')
    } else {
      this._navigateTo('AccountAccess')
    }
  }

  _navigateTo = (routeName: string) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(actionToDispatch)
  }

  render() {
    let {user} = this.props;

    console.log(user);

    return (
      <View style={styles.container}>
        <Text>Checking Login Status...</Text>
      </View>
    );
  }
}

const SplashContainer = createContainer( () => {
  let user = Meteor.collection('users').find();

  return {
    user
  };
}, Splash);

SplashContainer.navigationOptions = {
  header: null
};

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

export default SplashContainer;
