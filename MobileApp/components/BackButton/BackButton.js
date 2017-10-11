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

class BackButton extends React.Component {
  constructor(props){
    super(props);
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

  render() {
    const { type, navigation } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={ () => navigation.dispatch(NavigationActions.back()) }>
        { this.renderIcon() }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: SIZING.mediumGutter
  },
  icon: {

  }
});

export default BackButton;
