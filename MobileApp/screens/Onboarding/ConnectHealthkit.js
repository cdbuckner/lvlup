import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
import { TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import { Accounts } from 'react-native-meteor';
import Meteor, { createContainer } from 'react-native-meteor';
import AppleHealthKit from 'rn-apple-healthkit';

var {height, width} = Dimensions.get('window');

class VerifyAccountInfo extends React.Component {
  constructor(props) {
    super(props);

    this.connectHealthkit = this.connectHealthkit.bind(this);
    this.concatProfile = this.concatProfile.bind(this);

    this.state = {
      age: '',
      weight: '',
      sex: '',
    }
  }

  static navigationOptions = {
    header: null
  };

  concatProfile(key, value) {
    let newProfile = Meteor.user().profile;
    newProfile[key] = value;
    return newProfile;
  }

  connectHealthkit() {
    let options = {
      permissions: {
        read: ["Weight", "BiologicalSex", "DateOfBirth"],
      }
    };

    AppleHealthKit.initHealthKit(options: Object, (err: string, results: Object) => {
      if (err) {
        console.log("error initializing Healthkit: ", err);
        return;
      }

      AppleHealthKit.getDateOfBirth(null, (err: Object, results: Object) => {
        if (err) {
          console.log(err);
        }
        if (results) {
          this.setState({
            age: results.age
          })
        }
      });

      AppleHealthKit.getBiologicalSex(null, (err: Object, results: Object) => {
        if (err) {
          console.log(err);
        }
        if (results) {
          this.setState({
            sex: results.value
          })
        }
      });

      AppleHealthKit.getLatestWeight(null, (err: Object, results: Object) => {
        if (err) {
          console.log(err);
        }
        if (results) {
          this.setState({
            weight: results.value
          })
        }
      });

      this.props.navigation.navigate('ConnectAPI');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.userNameContainer}>
            <Text style={styles.screenTitle}>Connect Healthkit</Text>
            <Text style={styles.screenSubtitle}>
              THE EASY WAY TO ADD YOUR FITNESS INFO
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.connectHealthkitButton} onPress={ this.connectHealthkit }>
          <Text style={styles.connectHealthkitButtonText}>
            Connect Healthkit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipStepButton} onPress={ () => this.props.navigation.navigate('ConnectAPI') }>
          <Text style={styles.skipStepButtonText}>
            Skip this step (boo)
          </Text>
        </TouchableOpacity>
        <View style={styles.stageButtonContainer}>
          <TouchableOpacity style={styles.selectedStageButton} onPress={() => this.props.navigation.navigate('ConnectHealthkit')}>
            <View style={styles.selectedStageButtonInner}>
              <Text style={styles.selectedStageButtonText}>
                HEALTHKIT
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stageButton} disabled={true}>
            <View style={styles.stageButtonInner}>
              <Text style={styles.disabledStageButtonText}>
                APPS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stageButton} disabled={true}>
            <View style={styles.stageButtonInner}>
              <Text style={styles.disabledStageButtonText}>
                CONFIRM
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stageButton} disabled={true}>
            <View style={styles.stageButtonInner}>
              <Text style={styles.disabledStageButtonText}>
                SQUAD
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryBackground,
  },
  connectHealthkitButton: {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: SIZING.smallGutter,
    margin: SIZING.smallGutter,
    width: width * 0.96,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  connectHealthkitButtonText: {
    color: 'red',
  },
  skipStepButton: {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: SIZING.smallGutter,
    margin: SIZING.smallGutter,
    width: width * 0.96,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  skipStepButtonText: {
    color: 'grey',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: width,
    paddingLeft: SIZING.largeGutter,
    paddingBottom: SIZING.mediumGutter,
    paddingRight: SIZING.largeGutter,
  },
  screenTitle: {
    fontSize: SIZING.h1,
    lineHeight: SIZING.h1,
    fontWeight: '800',
    marginTop: 60 + SIZING.mediumGutter,
    marginBottom: 5,
  },
  screenSubtitle: {
    fontSize: 10
  },
  headerButton: {

  },
  stageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#f8f8f8',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width
  },
  stageButton: {
    flexGrow: 1,
  },
  stageButtonInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  stageButtonText: {
    fontSize: 10,
    color: '#000'
  },
  selectedStageButton: {
    flexGrow: 1,
  },
  selectedStageButtonInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedStageButtonText: {
    fontSize: 10,
    color: 'red'
  },
  disabledStageButtonText: {
    fontSize: 10,
    color: '#b8b8b8'
  }
});

export default VerifyAccountInfo;
