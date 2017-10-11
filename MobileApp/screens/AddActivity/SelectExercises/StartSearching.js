/**
 * Created by tsadykhov on 3/7/17.
 */

import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from '../../../node_modules/react-native-vector-icons/MaterialIcons';
import { COLORS, SIZING } from "../../../styles";
import Dimensions from 'Dimensions';

let {height, width} = Dimensions.get('window');

export default (props) => (
    <View>
      <Text style={ [styles.text] } >
        Search for contacts to add! They will appear here and you can select those you would like to invite.
      </Text>
    </View>
)

let styles = StyleSheet.create({
  text: {
    color: "white",
    padding: SIZING.largeGutter
  }
});
