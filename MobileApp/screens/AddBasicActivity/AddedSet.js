import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from '../../../node_modules/react-native-vector-icons/MaterialIcons';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import { RegularText, HeaderText } from '../../components/GroupknitText';

let {height, width} = Dimensions.get('window');

export default (props) => (
    <View>
        <RegularText style={ [styles.text] } >
            We're sorry we couldn't find any contacts which match your search. Please try again!
        </RegularText>
    </View>
)

let styles = StyleSheet.create({
    text: {
        color: "white",
        padding: SIZING.largeGutter
    }
});
