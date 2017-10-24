import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import Icon from '../../node_modules/react-native-vector-icons/MaterialIcons';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';

let {height, width} = Dimensions.get('window');

export default (props) => {
  let { contact, selected, toggleSelected, rowId } = props;

  return (
    <TouchableOpacity
      style={ styles.button }
      onPress={() => toggleSelected(contact)}
    >
      <View style={ styles.contactInfo }>
        <View style={ styles.image }>
          <Text style={ [styles.initials] }>
            { contact.givenName.charAt(0).toUpperCase() + contact.familyName.charAt(0).toUpperCase() }
          </Text>
        </View>

        <View style={ styles.textContainer }>
          <Text style={ [styles.name] }>
              { contact.givenName + " " + contact.familyName }
          </Text>

          { contact.phoneNumbers[0] ?

          <Text style={ [styles.typeAndDistance] }>
              { contact.phoneNumbers[0].label + " " + contact.phoneNumbers[0].number }
          </Text>

          : null }

        </View>
      </View>

      <Icon
        name={ contact.isSelected ? "check-circle" : "radio-button-unchecked" }
        color="white"
        size={30}
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
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center"
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
    paddingLeft: SIZING.largeGutter,
    paddingRight: SIZING.largeGutter,
    paddingTop: SIZING.smallGutter,
    paddingBottom: SIZING.smallGutter,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textContainer: {
    paddingLeft: SIZING.mediumGutter
  },
  typeAndDistance: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10
  },
  name: {
    color: "#fff",
    fontSize: 14,
    paddingTop: 2
  }
});
