import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
import { TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import AppleHealthKit from 'rn-apple-healthkit';

var {height, width} = Dimensions.get('window');

class ConnectAPI extends React.Component {
  constructor(props) {
    super(props);
    this.connectAppleHealthkit = this.connectAppleHealthkit.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  connectAppleHealthkit() {
    let options = {
        permissions: {
            read: ["Height", "Weight", "BiologicalSex", "DateOfBirth", "BodyMassIndex"],
        }
    };

    AppleHealthKit.initHealthKit(options: Object, (err: string, results: Object) => {
      if (err) {
          console.log("error initializing Healthkit: ", err);
          return;
      } else {
          console.log('success:', results)
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.newActivityButton} onPress={ this.connectAppleHealthkit }>
          <View style={styles.newActivityButtonInner}>
            <Text>Connect Apple Healthkit</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryBackground,
  },
  newActivityButton: {
    padding: SIZING.mediumGutter,
    backgroundColor: COLORS.primaryBackground,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  newActivityButtonInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});

export default ConnectAPI;
