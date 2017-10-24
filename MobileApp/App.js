import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";
import { Root } from "native-base";
import Meteor, { createContainer }  from 'react-native-meteor';
import Feed from "./screens/Feed";
import Leaders from "./screens/Leaders";
import FilterUserList from "./screens/Leaders/FilterUserList";
import You from "./screens/You";
import Messages from "./screens/Messages";
import AddDetailedActivity from "./screens/AddDetailedActivity";
import AddBasicActivity from "./screens/AddBasicActivity";
import AddPersonalBest from "./screens/AddPersonalBest";
import AddMessage from "./screens/AddMessage";
import SelectExercises from "./screens/SelectExercises";
import User from "./screens/User";
import Splash from "./screens/Splash";
import ExerciseHistory from "./screens/ExerciseHistory";
import WorkoutRecap from "./screens/WorkoutRecap";
import InviteContacts from "./screens/InviteContacts";
import FindFriends from "./screens/FindFriends";
import { Login } from "./screens/AccountAccess";
import { Signup } from "./screens/AccountAccess";
import { ConnectAPI } from "./screens/Onboarding";
import { InviteFriends } from "./screens/Onboarding";
import { VerifyAccountInfo } from "./screens/Onboarding";

let homeRoute = 'AccountAccess';
let loggedIn = false;

console.disableYellowBox = true;

const Home = TabNavigator({
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
      borderTopColor: '#e8e8e8',
      borderTopWidth: 1
    },
    showLabel: false
  },
});

const Onboarding = StackNavigator({
  ConnectAPI: { screen: ConnectAPI},
  VerifyAccountInfo: { screen: VerifyAccountInfo },
  InviteFriends: { screen: InviteFriends },
},
{
  initialRouteName: 'ConnectAPI',
  headerMode: 'screen',
  mode: 'card'
});

const AccountAccess = StackNavigator({
  Login: { screen: Login},
  Signup: { screen: Signup },
  Onboarding: { screen: Onboarding },
},
{
  initialRouteName: 'Login',
  headerMode: 'screen',
  mode: 'card'
});

const App = StackNavigator({
  Splash: { screen: Splash },
  Home: { screen: Home },
  AccountAccess: { screen: AccountAccess },
  FilterUserList: { screen: FilterUserList },
  AddPersonalBest: { screen: AddPersonalBest },
  AddMessage: { screen: AddMessage },
  AddDetailedActivity: { screen: AddDetailedActivity },
  AddBasicActivity: { screen: AddBasicActivity },
  SelectExercises: { screen: SelectExercises },
  ExerciseHistory: { screen: ExerciseHistory },
  WorkoutRecap: { screen: WorkoutRecap },
  User: { screen: User },
  InviteContacts: { screen: InviteContacts },
  FindFriends: { screen: FindFriends },
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
