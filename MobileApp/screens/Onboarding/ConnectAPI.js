import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
import { TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import AppleHealthKit from 'rn-apple-healthkit';
import Meteor, { composeWithTracker } from 'react-native-meteor';

var {height, width} = Dimensions.get('window');

class ConnectAPI extends React.Component {
  constructor(props) {
    super(props);

    this.connectHealthkit = this.connectHealthkit.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);

    this.state = {
      age: '',
      sex: '',
      weight: '',
      healthkitConnected: false,
      ready: false
    }
  }

  static navigationOptions = {
    header: null
  };

  saveAndContinue() {
    Meteor.call('users.updateHealthkitData', this.state.weight, this.state.age, this.state.sex, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(this.state.weight);
        this.props.navigation.navigate('VerifyAccountInfo');
      }
    });
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
    });

    this.setState({
      healthkitConnected: true,
      ready: true
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.userNameContainer}>
            <Text style={styles.screenTitle}>Connect Fitness Apps</Text>
            <Text style={styles.screenSubtitle}>
              THE EASY WAY TO ADD YOUR PAST AND FUTURE WORKOUTS
            </Text>
          </View>
        </View>
        {
          this.state.healthkitConnected ?
          <View style={styles.healthkitDataContainer}>
            <View style={styles.healthkitDataHeader}>
              <Text style={styles.healthkitDataSmall}>
                HEALTHKIT DATA
              </Text>
            </View>
            <View style={styles.healthkitDataBottomRow}>
              <View style={styles.healthkitDataItem}>
                <Text style={styles.healthkitDataBig}>
                  { this.state.age ? this.state.age : "N/A" }
                </Text>
                <Text style={styles.healthkitDataSmall}>
                  AGE
                </Text>
              </View>
              <View style={[styles.healthkitDataItem, styles.centerItem]}>
                <Text style={styles.healthkitDataBig}>
                  { this.state.sex ? this.state.sex : "N/A" }
                </Text>
                <Text style={styles.healthkitDataSmall}>
                  SEX
                </Text>
              </View>
              <View style={styles.healthkitDataItem}>
                <Text style={styles.healthkitDataBig}>
                  { this.state.weight ? this.state.weight : "N/A" }
                </Text>
                <Text style={styles.healthkitDataSmall}>
                  LBS
                </Text>
              </View>
            </View>
          </View> :
          <TouchableOpacity style={styles.connectAppButton} onPress={ this.connectHealthkit }>
            <Text style={styles.connectAppButtonText}>
              Connect Healthkit
            </Text>
          </TouchableOpacity>
        }

        <TouchableOpacity style={styles.connectAppButton}>
          <Text style={styles.connectAppButtonText}>
            Connect Fitbit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectAppButton}>
          <Text style={styles.connectAppButtonText}>
            Connect Strava
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipStepButton} onPress={ () => this.props.navigation.navigate('VerifyAccountInfo') }>
          <Text style={styles.skipStepButtonText}>
            Skip this step (boo)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipStepButton} onPress={ this.saveAndContinue }>
          <Text style={styles.skipStepButtonText}>
            Save and continue
          </Text>
        </TouchableOpacity>
        <View style={styles.stageButtonContainer}>
          <TouchableOpacity style={styles.selectedStageButton} disabled={true}>
            <View style={styles.selectedStageButtonInner}>
              <Text style={styles.selectedStageButtonText}>
                APPS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stageButton} disabled={true}>
            <View style={styles.stageButtonInner}>
              <Text style={styles.disabledStageButtonText}>
                INFO
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stageButton} disabled={true}>
            <View style={styles.stageButtonInner}>
              <Text style={styles.disabledStageButtonText}>
                SQUAD + FINISH UP
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
  connectAppButton: {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: SIZING.smallGutter,
    margin: SIZING.smallGutter,
    width: width * 0.96,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  connectAppButtonText: {
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
  },
  healthkitDataContainer: {
    width: width * 0.96,
    margin: SIZING.smallGutter,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 3,
    borderTopColor: '#e8e8e8',
    borderTopWidth: 1,
    borderLeftColor: '#e8e8e8',
    borderLeftWidth: 1,
    borderRightColor: '#e8e8e8',
    borderRightWidth: 1,
  },
  healthkitDataItem: {
    flexGrow: 1,
    height: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthkitDataHeader: {
    padding: SIZING.smallGutter,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
    width: width * 0.96
  },
  healthkitDataBig: {
    fontSize: 28
  },
  healthkitDataSmall: {
    fontSize: 10
  },
  centerItem: {
    borderRightColor: '#e8e8e8',
    borderRightWidth: 1,
    borderLeftColor: '#e8e8e8',
    borderLeftWidth: 1,
  },
  healthkitDataBottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});

export default ConnectAPI;
