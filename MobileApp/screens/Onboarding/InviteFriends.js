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
import Communications from 'react-native-communications';

var {height, width} = Dimensions.get('window');

class InviteFriends extends React.Component {
  constructor(props) {
    super(props);
    this.sendInviteText = this.sendInviteText.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  sendInviteText() {
    Communications.textWithoutEncoding("", "Seriously, get this fitness app:");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.userNameContainer}>
            <Text style={styles.screenTitle}>Invite Your Friends</Text>
            <Text style={styles.screenSubtitle}>
              THIS IS MORE FUN WITH PEOPLE TO TAUNT (OR CHEER)
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.connectHealthkitButton} onPress={ this.sendInviteText }>
          <Text style={styles.connectHealthkitButtonText}>
            Invite contacts from your phone
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectHealthkitButton}>
          <Text style={styles.connectHealthkitButtonText}>
            Invite facebook friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectHealthkitButton}>
          <Text style={styles.connectHealthkitButtonText}>
            Find friends on levelup
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipStepButton} onPress={ () => this.props.navigation.navigate('Home') }>
          <Text style={styles.skipStepButtonText}>
            Skip this step and finish (boo)
          </Text>
        </TouchableOpacity>
        <View style={styles.stageButtonContainer}>
          <TouchableOpacity style={styles.stageButton} onPress={() => this.props.navigation.navigate('ConnectAPI')}>
            <View style={styles.stageButtonInner}>
              <Text style={styles.stageButtonText}>
                APPS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stageButton} onPress={() => this.props.navigation.navigate('VerifyAccountInfo')}>
            <View style={styles.stageButtonInner}>
              <Text style={styles.stageButtonText}>
                INFO
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stageButton} disabled={true}>
            <View style={styles.stageButtonInner}>
              <Text style={styles.selectedStageButtonText}>
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

export default InviteFriends;
