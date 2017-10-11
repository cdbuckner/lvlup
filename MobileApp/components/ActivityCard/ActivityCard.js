import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActionSheet } from "native-base";
import Moment from 'moment';
import Meteor, { createContainer } from 'react-native-meteor';

var {height, width} = Dimensions.get('window');
var BUTTONS = ["Set activity as private", "Delete activity", "Cancel"];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

class ActivityCard extends React.Component {
  constructor(props){
    super(props);

    this.openCardMenu = this.openCardMenu.bind(this);
    this.cheerToggle = this.cheerToggle.bind(this);
    this.tauntToggle = this.tauntToggle.bind(this);

    this.state = {};
  }

  openCardMenu() {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: "Activity options"
      },
      buttonIndex => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
      }
    );
  }

  cheerToggle(activityId, userName) {
    Meteor.call('activities.cheer', activityId, userName, (err, res) => {});
  }

  tauntToggle(activityId, userName) {
    Meteor.call('activities.taunt', activityId, userName, (err, res) => {});
  }

  render() {
    const { activity, user } = this.props;

    return (
      <TouchableOpacity style={styles.container}>
        <View>
          <View style={styles.upperDeckContainer}>
            <View style={styles.userContainer}>
              <View style={styles.userImageContainer}>
                <View style={styles.userImage}>
                </View>
                <View style={styles.userLevel}>
                  <Text>53</Text>
                </View>
              </View>
              <View style={styles.upperDeckText}>
                <Text style={styles.userName}>{activity.item.username}</Text>
                <Text style={styles.activityDateTime}>{Moment(activity.item.createdAt).format('MMMM Do YYYY, h:mm a')}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.cardMenuButton} onPress={ this.openCardMenu }>
              <View style={styles.cardMenuButtonInner}>
                <Icon size={24} name={'md-more'} color={'black'} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.mezzContainer}>
            <Text style={styles.primaryActivityText}>{'I did ' + activity.item.activity}</Text>
          </View>
          <View style={styles.lowerDeckContainer}>
            <TouchableOpacity style={styles.cardButton} onPress={ () => this.cheerToggle(activity.item._id, user.username) }>
              <View style={styles.cardButtonInner}>
                <Icon size={18} name={'ios-thumbs-up-outline'} color={'black'} />
                <Text style={styles.cardButtonText}>{activity.item.cheeredBy.length}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardButton} onPress={() => this.tauntToggle(activity.item._id, user.username) }>
              <View style={styles.cardButtonInner}>
                <Icon size={18} name={'ios-thumbs-down-outline'} color={'black'} />
                <Text style={styles.cardButtonText}>{activity.item.tauntedBy.length}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryBackground,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: SIZING.mediumGutter,
  },
  upperDeckContainer: {
    width: width,
    paddingLeft: SIZING.mediumGutter,
    paddingRight: SIZING.mediumGutter,
    paddingTop: SIZING.mediumGutter,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userImageContainer: {
    width: 45,
    marginRight: SIZING.mediumGutter
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryHighlight,
  },
  userLevel: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    backgroundColor: COLORS.primaryBackground,
    marginRight: SIZING.mediumGutter,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperDeckText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  userName: {
    fontSize: SIZING.p1,
    paddingBottom: 3
  },
  activityDateTime: {
    fontSize: SIZING.p2,
    color: '#666666'
  },
  mezzContainer: {
    width: width,
    paddingLeft: (SIZING.mediumGutter * 2) + 45,
    paddingRight: SIZING.largeGutter,
    paddingTop: SIZING.mediumGutter,
  },
  primaryActivityText: {
    fontSize: SIZING.h2
  },
  lowerDeckContainer: {
    paddingRight: SIZING.smallGutter,
    paddingLeft: (SIZING.mediumGutter) + 45,
    paddingTop: SIZING.mediumGutter,
    paddingBottom: SIZING.smallGutter,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cardButton: {
    paddingLeft: SIZING.mediumGutter,
    paddingRight: SIZING.mediumGutter,
    paddingTop: SIZING.smallGutter,
    paddingBottom: SIZING.smallGutter,
    flex: 1
  },
  cardButtonInner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cardButtonText: {
    fontSize: SIZING.p2,
    marginLeft: 4
  },
  cardMenuButton: {
    padding: SIZING.smallGutter,
  },
  cardMenuButtonInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ActivityCard;
