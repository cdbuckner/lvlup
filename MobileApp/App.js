import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";
import { Root } from "native-base";
import Meteor, { createContainer }  from 'react-native-meteor';
import Feed from "./screens/Feed";
import Leaders from "./screens/Leaders";
import You from "./screens/You";
import Messages from "./screens/Messages";
import AddActivity from "./screens/AddActivity";
import AddPersonalBest from "./screens/AddPersonalBest";
import AddMessage from "./screens/AddMessage";
import SelectExercises from "./screens/AddActivity/SelectExercises";
import User from "./screens/User";
import Splash from "./screens/Splash";
import { Login } from "./screens/AccountAccess";
import { Signup } from "./screens/AccountAccess";
import { ConnectAPI } from "./screens/Onboarding";

let homeRoute = 'AccountAccess';
let loggedIn = false;

console.disableYellowBox = true;

const Home = TabNavigator({
  ConnectAPI: { screen: ConnectAPI },
  Feed: { screen: Feed },
  Leaders: { screen: Leaders },
  Messages: { screen: Messages },
  You: { screen: You },
},
{
  tabBarOptions: {
    activeTintColor: '#e91e63',
    style: {
      backgroundColor: '#fff',
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: {width: 0, height: -2},
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    showLabel: false
  },
});

const AccountAccess = StackNavigator({
  Login: { screen: Login},
  Signup: { screen: Signup },
},
{
  initialRouteName: 'Login',
  headerMode: 'screen',
  mode: 'card'
});

const AddActivityModule = StackNavigator({
  AddActivity: { screen: AddActivity},
  SelectExercises: { screen: SelectExercises },
},
{
  initialRouteName: 'AddActivity',
  headerMode: 'none',
  mode: 'modal'
});

const CardStack = StackNavigator({
  User: { screen: User },
},
{
  initialRouteName: 'AddActivity',
  headerMode: 'screen',
  mode: 'card'
});

const App = StackNavigator({
  Splash: { screen: Splash},
  Home: { screen: Home},
  AccountAccess: { screen: AccountAccess},
  AddActivityModule: { screen: AddActivityModule },
  AddPersonalBest: { screen: AddPersonalBest },
  AddMessage: { screen: AddMessage },
  CardStack: { screen: AddMessage }
},
{
  initialRouteName: 'Splash',
  headerMode: 'screen',
  mode: 'modal'
});

class Lvlup extends React.Component {
  componentWillMount() {
    const SERVER_URL = 'ws://10.0.0.6:3000/websocket';
    Meteor.connect(SERVER_URL);
  }

  render() {
    return (
      <Root>
        <App />
      </Root>
    );
  }
}

export default Lvlup;
