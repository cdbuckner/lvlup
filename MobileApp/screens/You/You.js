import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../styles";
import UserListItem from "../../components/UserListItem";
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Meteor, { createContainer } from 'react-native-meteor';

var {height, width} = Dimensions.get('window');

class You extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characteristics: {
        'Speed': 20,
        'Cardio Endurance': 45,
        'Muscular Strength': 76,
        'Muscular Endurance': 63,
        'Flexability': 10,
        'Helpfulness': 67
      },
      friends: [
        {'name':'Adam Buckner','level': 43 },
        {'name':'Alec Buckner','level': 22 },
        {'name':'Stephanie Scapa','level': 54 },
        {'name':'Atlas Buckner','level': 53 }
      ],
    }

  }

  render() {
    let {user} = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {
            user ?

            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <View style={styles.userNameContainer}>
                  <Text style={styles.userFirstName}>
                    {user.username}
                  </Text>
                  <Text style={styles.userLastName}>
                    Christian Buckner
                  </Text>
                </View>
                <View style={styles.userImage}>
                </View>
              </View>

              <View style={styles.sectionContainer}>
                <View style={styles.levelAndTitleContainer}>
                  <Text style={styles.levelText}>
                    Level 72
                  </Text>
                  <Text style={styles.titleText}>
                    LONG DISTANCE WIZARD
                  </Text>
                </View>
                <View style={styles.characteristicsContainer}>
                  {
                    Object.keys(this.state.characteristics).map((characteristic) => {
                      return (
                        <View style={styles.characteristic}>
                          <Text style={styles.characteristicName}>
                            {characteristic}
                          </Text>
                          <View style={styles.currentRatingContainer}>
                            <View style={[styles.currentRatingBar, {width: ((width *  0.88) - 10) * (this.state.characteristics[characteristic] / 100)}]}>
                            </View>
                            <Text style={styles.currentRatingText}>
                              { this.state.characteristics[characteristic] }
                            </Text>
                          </View>
                        </View>
                      )
                    })
                  }
                </View>
              </View>
              <View style={styles.sectionContainer}>
                <View style={styles.levelAndTitleContainer}>
                  <Text style={styles.levelText}>
                    Friends
                  </Text>
                </View>
                {
                  this.state.friends.map((user, index) => {
                    return (
                      <UserListItem user={user} index={index} navigation={this.props.navigation}/>
                    )
                  })
                }
                <TouchableOpacity style={styles.inviteFriendsButton}>
                  <View style={styles.inviteFriendsButtonInner}>
                    <Text style={styles.inviteFriendsButtonText}>
                      Invite friends to play
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            :
            <Text>Loading</Text>

          }
        </ScrollView>
        <View style={styles.bumper}>
        </View>
      </View>
    );
  }
}

const YouContainer = createContainer( params => {
  let user = Meteor.user();

  return {
    user,
  };
}, You);

YouContainer.navigationOptions = {
  tabBarLabel: 'You',
  // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={24}
      name={'ios-contact-outline'}
      color={tintColor}
    />
  ),
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryBackground
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bumper: {
    height: 20,
    backgroundColor: COLORS.primaryBackground,
    marginBottom: SIZING.mediumGutter,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: 'absolute',
    width: width,
    top: 0,
    left: 0
  },
  sectionContainer: {
    backgroundColor: COLORS.primaryBackground,
    width: width,
    marginBottom: SIZING.mediumGutter,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  headerContainer: {
    padding: SIZING.mediumGutter,
    backgroundColor: COLORS.primaryBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    marginTop: 20 + SIZING.mediumGutter,
    marginBottom: SIZING.mediumGutter,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  characteristicsContainer: {
    paddingBottom: SIZING.mediumGutter,
  },
  messagesButton: {
    padding: SIZING.mediumGutter,
    backgroundColor: COLORS.primaryBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    marginBottom: SIZING.mediumGutter,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  messagesButtonText: {
    fontSize: SIZING.p1
  },
  userNameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  userFirstName: {
    fontSize: SIZING.h1
  },
  userLastName: {
    fontSize: SIZING.h3
  },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 40,
    backgroundColor: 'blue',
  },
  levelAndTitleContainer: {
    width: width,
    padding: SIZING.mediumGutter,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  levelText: {
    fontSize: SIZING.h1,
  },
  inviteFriendsButton: {
    paddingTop: SIZING.smallGutter,
    paddingBottom: SIZING.smallGutter,
    paddingLeft: SIZING.mediumGutter,
    paddingRight: SIZING.mediumGutter,

  },
  inviteFriendsButtonInner: {

  },
  inviteFriendsButtonText: {

  },
  titleText: {
    fontSize: SIZING.h3,
  },
  characteristic: {
    width: width,
    paddingTop: SIZING.mediumGutter,
    paddingLeft: SIZING.mediumGutter,
    paddingRight: SIZING.mediumGutter,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  characteristicName: {
    fontSize: SIZING.h2,
    marginBottom: 5
  },
  currentRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: SIZING.fillMediumGutters
  },
  currentRatingBar: {
    height: 10,
    width: width * 0.4,
    backgroundColor: '#e8e8e8'
  },
  currentRatingText: {
    fontSize: SIZING.p1,
    lineHeight: SIZING.p1,
  }
});

export default YouContainer;
