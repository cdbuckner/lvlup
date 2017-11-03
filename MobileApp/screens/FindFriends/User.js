/**
 * Created by tsadykhov on 3/7/17.
 */

import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';

let {height, width} = Dimensions.get('window');

export default (props) => {
  let { user, selected, toggleSelected, rowId } = props;

  return (
    <TouchableOpacity
      style={ styles.button }
      onPress={() => toggleSelected(user)}
    >
      <View style={ styles.contactInfo }>
        <View style={ styles.nameContainer }>
          <Text style={ [styles.name] }>
            { user.username}
          </Text>
        </View>
      </View>

      <Icon
        name={ user.isSelected ? "ios-checkmark-circle-outline" : "ios-radio-button-off-outline" }
        color="black"
        size={18}
        style={styles.selectedIcon}
      />

    </TouchableOpacity>
  );
};

let styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: COLORS.darkgrey,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  contactInfo: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  selectedIcon: {
  },
  initials: {
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0)",
    fontSize: SIZING.h3
  },
  container: {
    paddingTop: 0,
  },
  button: {
    width: width,
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 1,
    borderBottomColor: COLORS.darkgrey,
    borderBottomWidth: 1,
    paddingLeft: SIZING.mediumGutter,
    paddingRight: SIZING.mediumGutter,
    paddingTop: SIZING.smallGutter,
    paddingBottom: SIZING.smallGutter,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  nameContainer: {

  },
  modificationsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  modifications: {

  },
  modification: {
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 2,
    borderColor: '#999',
    borderWidth: 1,
    marginTop: 3,
    marginRight: 3
  },
  modificationText: {
    fontSize: 8,
    color: '#999'
  },
  typeAndDistance: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10
  },
  name: {
    color: "#000",
    fontSize: 14,
    paddingTop: 2
  }
});
