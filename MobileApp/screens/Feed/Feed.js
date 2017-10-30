import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import ActivityCard from "../../components/ActivityCard";
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';
import Meteor, { createContainer } from 'react-native-meteor';
import ActionButton from 'react-native-action-button';
import Moment from 'moment';
import NoFriends from "../../components/NoFriends";

var {height, width} = Dimensions.get('window');

class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, feedActivities, feedActivitiesCount } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.userNameContainer}>
              <Text style={styles.screenTitle}>Activity</Text>
              <Text style={styles.screenSubtitle}>
                WHAT YOUR FRIENDS ARE UP TO
              </Text>
            </View>
          </View>
          <View style={styles.newItemContainer}>
            <View style={styles.cardContainer}>
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
                      <Text style={styles.userName}>Christian Buckner</Text>
                      <Text style={styles.activityDateTime}>{Moment().format('MMMM Do YYYY, h:mm a')}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.cardMenuButton} disabled={true}>
                    <View style={styles.cardMenuButtonInner}>
                      <Icon size={24} name={'md-more'} color={'#e8e8e8'} />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.mezzContainer}>
                  <TouchableOpacity style={styles.newLiftButton} onPress={() => this.props.navigation.navigate('AddDetailedActivity', {}) }>
                    <View style={styles.newButtonInner}>
                      <Icon size={30} name={'ios-timer-outline'} color={'#000'} style={styles.newButtonIcon} />
                      <Text style={styles.newButtonText}>Log a detailed workout</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.newActivityButton} onPress={() => this.props.navigation.navigate('AddBasicActivity', {}) }>
                    <View style={styles.newButtonInner}>
                      <Icon size={30} name={'ios-bicycle-outline'} color={'#000'} style={styles.newButtonIcon} />
                      <Text style={styles.newButtonText}>Log a single exercise</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {
            user ?
            <View>
              {
                feedActivities.length > 0 ?
                <FlatList
                  data={feedActivities}
                  renderItem={(activity) => <ActivityCard activity={activity} user={user}/>}
                /> : null
              }
              {
                user.friends ?
                null : <NoFriends navigation={ this.props.navigation} />

              }
            </View> : null
          }


        </ScrollView>
        <View style={styles.bumper}>
        </View>
      </View>
    );
  }
}

const FeedContainer = createContainer( () => {
  let user = Meteor.user();
  Meteor.subscribe('activities');

  return {
    user: user,
    feedActivities: Meteor.collection('activities').find({}, { sort: { createdAt: -1 } }),
    feedActivitiesCount: Meteor.collection('activities').find({}).length,
  };
}, Feed);

FeedContainer.navigationOptions = {
  tabBarLabel: 'Feed',
  // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={24}
      name={'ios-pulse-outline'}
      color={tintColor}
    />
  ),
  header: null
};

export default FeedContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryBackground,
  },
  bumper: {
    height: 20,
    backgroundColor: '#f8f8f8',
    position: 'absolute',
    width: width,
    top: 0,
    left: 0
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
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  newItemContainer: {
    backgroundColor: '#f8f8f8',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1
  },
  cardContainer: {
    backgroundColor: '#fff',
    marginTop: SIZING.smallGutter,
    marginBottom: SIZING.smallGutter,
    marginLeft: SIZING.smallGutter,
    marginRight: SIZING.smallGutter,
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  newLiftButton: {
    flex: 1,
    backgroundColor: '#fff',
    marginRight: SIZING.mediumGutter,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 3,
    borderTopColor: '#e8e8e8',
    borderTopWidth: 1,
    borderLeftColor: '#e8e8e8',
    borderLeftWidth: 1,
    borderRightColor: '#e8e8e8',
    borderRightWidth: 1,
  },
  newActivityButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 3,
    borderTopColor: '#e8e8e8',
    borderTopWidth: 1,
    borderLeftColor: '#e8e8e8',
    borderLeftWidth: 1,
    borderRightColor: '#e8e8e8',
    borderRightWidth: 1,
  },
  newButtonInner: {
    padding: SIZING.mediumGutter,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  newButtonText: {
    flexGrow: 2,
    color: '#000',
    paddingLeft: SIZING.mediumGutter,
  },
  newButtonIcon: {
    flexGrow: 1
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
  },
  listOfCards: {
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
