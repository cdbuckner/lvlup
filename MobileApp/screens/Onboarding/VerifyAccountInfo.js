import React from 'react';
import { TextInput, TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
import { TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import { Accounts } from 'react-native-meteor';
import Meteor, { createContainer } from 'react-native-meteor';
import { ButtonGroup, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

var {height, width} = Dimensions.get('window');

class VerifyAccountInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      privateLevelIndex: 2,
      autoShareIndex: 1,
      sexIndex: 1,
      age: 28,
      weight: 180
    }
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.updateSexIndex = this.updateSexIndex.bind(this);
    this.updatePrivateLevelIndex = this.updatePrivateLevelIndex.bind(this);
    this.updateAutoShareIndex = this.updateAutoShareIndex.bind(this);
  }

  componentDidMount() {
    let {user} = this.props;

    if (user.profile) {
      this.setState({
        age: user.profile.age,
        sex: user.profile.sex,
        weight: user.profile.weight
      })
    }

  }

  updatePrivateLevelIndex(privateLevelIndex) {
    this.setState({privateLevelIndex});
  }

  updateAutoShareIndex(autoShareIndex) {
    this.setState({autoShareIndex});
  }

  updateSexIndex(sexIndex) {
    this.setState({sexIndex});
  }

  onChangeAge(text) {
    this.setState({age: text});
  }

  onChangeWeight(text) {
    this.setState({weight: text});
  }

  updateUserInfo() {
    let privacy = this.state.privateLevelIndex,
        sharing = this.state.autoShareIndex,
        sex = this.state.sexIndex;

    if (privacy == 0) {
      privacy = 'no one';
    } else if (privacy == 1) {
      privacy = 'friends only';
    } else {
      privacy = 'everyone';
    }

    if (sharing == 0) {
      sharing = 'manual';
    } else {
      sharing = 'auto';
    }

    if (sex == 0) {
      sex = 'female';
    } else {
      sex = 'male';
    }

    Meteor.call('users.onboard', [Meteor.userId(), privacy, sharing, sex, this.state.age, this.state.weight], (err) => {
      if (err) {
        console.log(err);
      } else {
        this.props.navigation.navigate('InviteFriends');
      }
    });
  }

  render() {
    console.log(Meteor.user());

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.userNameContainer}>
            <Text style={styles.screenTitle}>{this.props.user.username}</Text>
            <Text style={styles.screenSubtitle}>
              CONFIRM YOUR INFO
            </Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Gender</Text>
          <ButtonGroup
            onPress={this.updateSexIndex}
            selectedIndex={this.state.sexIndex}
            buttons={['Female', 'Male']}
            containerStyle={styles.buttonGroup}
            textStyle={styles.buttonGroupText} />
          <Text style={styles.validationMessage}>Your levels are adjusted for your gender.</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Age (years)</Text>
          <TextInput style={styles.inputText} placeholder={'Add your age'} value={this.state.age} onChangeText={ this.onChangeAge } />
          <Text style={styles.validationMessage}>Your levels are adjusted for your age. Only visible to you.</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Weight (lbs)</Text>
          <TextInput style={styles.inputText} placeholder={'Add your weight'} defaultValue={'180'} onChangeText={ this.onChangeWeight }/>
          <Text style={styles.validationMessage}>Your strength levels are relative to your weight. Only visible to you.</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Level Privacy</Text>
          <ButtonGroup
            onPress={this.updatePrivateLevelIndex}
            selectedIndex={this.state.privateLevelIndex}
            buttons={['No one', 'Friends only', 'Everyone']}
            containerStyle={styles.buttonGroup}
            textStyle={styles.buttonGroupText} />
          <Text style={styles.validationMessage}>Your level will be viewable by everyone.</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Activity Sharing</Text>
          <ButtonGroup
            onPress={this.updateAutoShareIndex}
            selectedIndex={this.state.autoShareIndex}
            buttons={['Manual', 'Auto']}
            containerStyle={styles.buttonGroup}
            textStyle={styles.buttonGroupText} />
          <Text style={styles.validationMessage}>You will automatically share your workouts with your friends.</Text>
        </View>
        <TouchableOpacity style={styles.connectAppButton} onPress={ this.updateUserInfo }>
          <Text style={styles.connectAppButtonText}>
            Submit and finish up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectAppButton} onPress={ () => console.log(this.props.user) }>
          <Text style={styles.connectAppButtonText}>
            user?
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
          <TouchableOpacity style={styles.selectedStageButton} disabled={true}>
            <View style={styles.selectedStageButtonInner}>
              <Text style={styles.selectedStageButtonText}>
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

const VerifyAccountInfoContainer = createContainer( () => {
  let user = {};

  if (Meteor.user()) {
    user = Meteor.user();
  }

  return {
    user: user,
  };
}, VerifyAccountInfo);

VerifyAccountInfoContainer.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryBackground,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: width,
    paddingLeft: SIZING.largeGutter,
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
  buttonGroup: {
    marginLeft: 0,
    marginRight: 0,
    height: 40
  },
  buttonGroupText: {
    fontSize: 12
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
  inputText: {
    fontSize: 14,
    padding: SIZING.smallGutter,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  },
  labelText: {
    fontSize: 12,
    paddingBottom: 2,
    color: "#b8b8b8",
    paddingLeft: SIZING.smallGutter,
  },
  inputContainer: {
    marginTop: SIZING.mediumGutter,
    marginLeft: SIZING.mediumGutter,
    marginRight: SIZING.mediumGutter,
  },
  validationMessage: {
    fontSize: 10,
    paddingTop: 2,
    color: "#b8b8b8",
    paddingLeft: SIZING.smallGutter,
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
});

export default VerifyAccountInfoContainer;
