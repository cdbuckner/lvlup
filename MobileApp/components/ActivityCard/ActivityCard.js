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

    console.log( activity );

    return (
      <TouchableOpacity style={styles.container}>
        <View>
          <View style={styles.upperDeckContainer}>
            <View style={styles.userContainer}>
              <View style={styles.userImageContainer}>
                <View style={styles.userImage}>
                </View>
                <View style={styles.userLevel}>
                  <Text style={styles.userLevelText}>53</Text>
                </View>
              </View>
              <View style={styles.upperDeckText}>
                <Text style={styles.userName}>{activity.item.username}</Text>
                <Text style={styles.activityDateTime}>{Moment(activity.item.createdAt).format('MMMM Do YYYY, h:mm a')}</Text>
              </View>
            </View>
            {
              Meteor.userId() == activity.item.owner._id ?
              <TouchableOpacity style={styles.cardMenuButton} onPress={ this.openCardMenu }>
                <View style={styles.cardMenuButtonInner}>
                  <Icon size={24} name={'md-more'} color={'black'} />
                </View>
              </TouchableOpacity> : null
            }
          </View>
          <View style={styles.mezzContainer}>

            <Text style={styles.primaryActivityText}>{'I did a ' + activity.item.name}</Text>
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
    marginBottom: SIZING.smallGutter,
    marginLeft: SIZING.smallGutter,
    marginRight: SIZING.smallGutter,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 3,
    borderTopColor: '#e8e8e8',
    borderTopWidth: 1,
    borderLeftColor: '#e8e8e8',
    borderLeftWidth: 1,
    borderRightColor: '#e8e8e8',
    borderRightWidth: 1,
  },
  upperDeckContainer: {
    width: width * 0.96,
    paddingLeft: SIZING.mediumGutter,
    paddingRight: SIZING.mediumGutter,
    paddingTop: SIZING.mediumGutter,
    paddingBottom: SIZING.mediumGutter,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
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
    backgroundColor: '#c8c8c8',
  },
  userLevel: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginRight: SIZING.mediumGutter,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userLevelText: {
    fontSize: 10,
    color: '#000',
  },
  upperDeckText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  userName: {
    fontSize: SIZING.p1,
    paddingBottom: 3,
    color: '#000'
  },
  activityDateTime: {
    fontSize: SIZING.p2,
    color: '#999'
  },
  mezzContainer: {
    width: width * 0.96,
    padding: SIZING.mediumGutter,
  },
  primaryActivityText: {
    fontSize: SIZING.p1
  },
  lowerDeckContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopColor: '#e8e8e8',
    borderTopWidth: 1
  },
  cardButton: {
    padding: SIZING.mediumGutter,
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
