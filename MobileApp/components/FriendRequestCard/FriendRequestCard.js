import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Moment from 'moment';
import Meteor, { createContainer } from 'react-native-meteor';


var {height, width} = Dimensions.get('window');

class FriendRequestCard extends React.Component {
  constructor(props) {
    super(props);

    this.approveFriendRequest = this.approveFriendRequest.bind(this);
    this.declineFriendRequest = this.declineFriendRequest.bind(this);
    this.dismissMessage = this.dismissMessage.bind(this);
  }

  declineFriendRequest() {
    let {data} = this.props;
    Meteor.call('messages.friendInviteDeclined', data._id, data.from._id, data.to._id, (err) => {
      if (err) {
        console.log(err);
      }
    })
  }

  dismissMessage() {
    let {data} = this.props;

    Meteor.call('messages.hide', data._id, (err) => {
      if (err) {
        console.log(err);
      }
    })
  }

  approveFriendRequest() {
    let { data } = this.props;
    Meteor.call('user.makeFriends', data.to._id, data.from._id, (err) => {
      if (err) {
        console.log(err);
      } else {
        Meteor.call('messages.friendInviteApproved', data._id, Meteor.user(), data.from, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  }

  render() {
    let {data} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.verificationSection}>
          <Text style={styles.verificationSectionText}>
            Friend Request!
          </Text>
        </View>
        <View style={styles.upperDeckContainer}>
          <View style={styles.userContainer}>
            <View style={styles.userImageContainer}>
              <View style={styles.userImage}>
              </View>
              <View style={styles.userLevel}>
                <Text style={styles.userLevelText}>{data.from.profile.level}</Text>
              </View>
            </View>
            <View style={styles.upperDeckText}>
              <Text style={styles.userName}>{data.from.username}</Text>
              <Text style={styles.activityDateTime}>{Moment(data.createdAt).format('MMMM Do YYYY, h:mm a')}</Text>
            </View>
          </View>
        </View>
        <View style={styles.mezzContainer}>
          <Text style={styles.primaryActivityText}>{"Hi " + data.to.username + ", let's be lvlup friends! We'll challenge each other to be the fittest we can be."}</Text>
        </View>
        <View style={styles.lowerDeckContainer}>
          <TouchableOpacity style={styles.cardButton} onPress={ this.approveFriendRequest }>
            <View style={styles.cardButtonInner}>
              <Icon size={18} name={'ios-thumbs-up-outline'} color={'black'} />
              <Text style={styles.cardButtonText}>APPROVE</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton} onPress={ this.declineFriendRequest }>
            <View style={styles.cardButtonInner}>
              <Icon size={18} name={'ios-thumbs-down-outline'} color={'black'} />
              <Text style={styles.cardButtonText}>DENY</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton} onPress={ this.dismissMessage }>
            <View style={styles.cardButtonInner}>
              <Icon size={18} name={'ios-thumbs-down-outline'} color={'black'} />
              <Text style={styles.cardButtonText}>DISMISS</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  verificationSection: {
    paddingLeft: SIZING.mediumGutter,
    paddingRight: SIZING.mediumGutter,
    paddingTop: SIZING.smallGutter,
    paddingBottom: SIZING.smallGutter,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width * 0.96,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8"
  },
  verificationSectionText: {

  },
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
    width: width * 0.96
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
    color: '#000'
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

export default FriendRequestCard;
