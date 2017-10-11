import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import ActivityCard from "../../components/ActivityCard";
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';
import Meteor, { createContainer } from 'react-native-meteor';

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
          <View style={styles.newActivityContainer}>
            <TouchableOpacity style={styles.newActivityButton} onPress={() => this.props.navigation.navigate('AddPersonalBest', {user: user}) }>
              <View style={styles.newActivityButtonInner}>
                <View style={styles.imageAndTextContainer}>
                  <View style={styles.userImageContainer}>
                    <View style={styles.userImage}>
                    </View>
                    <View style={styles.userLevel}>
                      <Text>72</Text>
                    </View>
                  </View>
                  <Text>Add a personal best</Text>
                </View>
                <Icon size={40} name={'ios-add-outline'} color={'black'} style={styles.newActivityIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newActivityButton} onPress={() => this.props.navigation.navigate('AddActivityModule', {user: user}) }>
              <View style={styles.newActivityButtonInner}>
                <View style={styles.imageAndTextContainer}>
                  <View style={styles.userImageContainer}>
                    <View style={styles.userImage}>
                    </View>
                    <View style={styles.userLevel}>
                      <Text>72</Text>
                    </View>
                  </View>
                  <Text>Add an activity</Text>
                </View>
                <Icon size={40} name={'ios-add-outline'} color={'black'} style={styles.newActivityIcon} />
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={feedActivities}
            renderItem={(activity) => <ActivityCard activity={activity} user={user}/>}
          />
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
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  newActivityContainer: {
    width: width,
    paddingBottom: SIZING.mediumGutter,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: (SIZING.mediumGutter * 6) + 160,
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
  newActivityIcon: {

  },
  imageAndTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  userImageContainer: {
    width: 45,
    marginRight: SIZING.mediumGutter
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
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
  newActivityIcon: {
    marginTop: 5
  },
  listOfCards: {
  }
});
