import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActionSheet } from "native-base";
import Moment from 'moment';
import { NavigationActions } from 'react-navigation';
import Meteor, { createContainer } from 'react-native-meteor';

var {height, width} = Dimensions.get('window');

class NoFriends extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Um... this is awkward... you have no friends. At least, none in lvlup. Invite some! This is more fun with friends to cheer and taunt. </Text>
        <TouchableOpacity style={styles.inviteFriendsButton} underlayColor={'#000'} activeOpacity={0} onPress={() => this.props.navigation.navigate('FindFriends')}>
         <View style={styles.inviteFriendsButtonInner}>
          <Text style={styles.inviteFriendsButtonText}>
            Invite Friends
          </Text>
         </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: SIZING.mediumGutter,
    backgroundColor: '#fff',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 3,
    borderTopColor: '#e8e8e8',
    borderTopWidth: 1,
    borderLeftColor: '#e8e8e8',
    borderLeftWidth: 1,
    borderRightColor: '#e8e8e8',
    borderRightWidth: 1,
    height: height / 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZING.smallGutter,
    marginLeft: SIZING.smallGutter,
    marginRight: SIZING.smallGutter,
  },
  description: {
    margin: SIZING.mediumGutter,
    color: "rgba(0,0,0,0.2)",
    textAlign: 'center'
  },
  inviteFriendsButton: {
    backgroundColor: '#e8e8e8',
    margin: SIZING.smallGutter,
  },
  inviteFriendsButtonInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZING.mediumGutter
  },
  inviteFriendsButtonText: {
    color: '#fff'
  }
});

export default NoFriends;
