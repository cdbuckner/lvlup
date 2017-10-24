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

class RightButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  renderIcon() {
    const { type } = this.props;

    if (type == 'edit') {
      return ( <Icon name="ios-create-outline" size={26} color="#000" /> )
    }
  }

  render() {
    const { type, navigation, toggleEdit } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={ toggleEdit }>
        { this.renderIcon() }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: SIZING.mediumGutter
  },
  icon: {

  }
});

export default RightButton;
