import React from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActionSheet } from "native-base";
import Moment from 'moment';
import { NavigationActions } from 'react-navigation';
import Meteor, { createContainer } from 'react-native-meteor';

class BackButton extends React.Component {
  constructor(props){
    super(props);

    this.goBack = this.goBack.bind(this);
    this.state = {};
  }

  renderIcon() {
    const { type } = this.props;

    if (type == 'close-x') {
      return ( <Icon name="ios-close-outline" size={30} color="#000" /> )
    } else if (type == 'close-down') {
      return ( <Icon name="ios-arrow-round-down-outline" size={30} color="#000" /> )
    } else if (type == 'close-left') {
      return ( <Icon name="ios-arrow-round-back-outline" size={30} color="#000" /> )
    }
  }

  goBack() {
    const { type, navigation, confirmation } = this.props;

    if ( confirmation ) {
      Alert.alert(
        'You sure?',
        'This will erase your current workout',
        [
          {text: 'Erase', onPress: () => navigation.dispatch(NavigationActions.back()), style: 'destructive'},
          {text: 'Cancel'},
        ],
        { cancelable: false }
      );
    } else {
      navigation.dispatch(NavigationActions.back());
    }
  }

  render() {
    const { type, navigation, confirmation } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={ this.goBack }>
        { this.renderIcon() }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: SIZING.largeGutter
  },
  icon: {

  }
});

export default BackButton;
