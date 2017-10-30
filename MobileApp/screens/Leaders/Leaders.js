import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import UserListItem from "../../components/UserListItem";
import Icon from 'react-native-vector-icons/Ionicons';
import Meteor, { createContainer } from 'react-native-meteor';
import NoFriends from "../../components/NoFriends";

var {height, width} = Dimensions.get('window');

class Leaders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areaFilters: ['Your Friends', 'Global', 'Regional', 'Local'],
      ageFilters: ['All','Under 18', '19-26', '27-34', '35-42', '43-50', '51-58', '59-66', 'Over 66'],
      genderFilters: ['All', 'Men', 'Women'],
      users: [{'name':'Christian Buckner','level': 72 },
              {'name':'Stephanie Scapa','level': 54 },
              {'name':'Atlas Buckner','level': 53 },
              {'name':'Alec Buckner','level': 24 },
              {'name':'Adam Buckner','level': 24 },
              {'name':'Dave Buckner','level': 24 },
              {'name':'Christian Buckner','level': 72 },
              {'name':'Stephanie Scapa','level': 54 },
              {'name':'Atlas Buckner','level': 53 },
              {'name':'Alec Buckner','level': 24 },
              {'name':'Adam Buckner','level': 24 },
              {'name':'Dave Buckner','level': 24 },
              {'name':'Christian Buckner','level': 72 },
              {'name':'Stephanie Scapa','level': 54 },
              {'name':'Atlas Buckner','level': 53 },
              {'name':'Alec Buckner','level': 24 },
              {'name':'Adam Buckner','level': 24 },
              {'name':'Dave Buckner','level': 24 }]
    }

  }

  render() {
    let { user, users, userCount } = this.props
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.userNameContainer}>
              <Text style={styles.screenTitle}>Rankings</Text>
              <Text style={styles.screenSubtitle}>
                YOUR FRIENDS, ALL AGES, ALL GENDERS
              </Text>
            </View>
            <TouchableOpacity style={styles.headerButton} onPress={() => this.props.navigation.navigate( 'FilterUserList' ) }>
              <Icon size={26} name={'ios-funnel-outline'} color={'#000'} />
            </TouchableOpacity>
          </View>
          {
            user ?
            <View>
              {
                user.friends > 0 ?
                <View style={styles.listOfUsers}>
                  {
                    users.map((user, index) => {
                      return (
                        <UserListItem user={user} index={index} navigation={this.props.navigation}/>
                      )
                    })
                  }
                </View> : <NoFriends />
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

const LeadersContainer = createContainer( () => {
  let user = Meteor.user();
  Meteor.subscribe('users');

  return {
    user: user,
    users: Meteor.collection('users').find({}),
    usersCount: Meteor.collection('activities').find({}).length,
  };
}, Leaders);

LeadersContainer.navigationOptions = {
  tabBarLabel: 'Leaders',
  // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={24}
      name={'ios-ribbon-outline'}
      color={tintColor}
    />
  ),
  header: null
};

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
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: width,
    paddingLeft: SIZING.largeGutter,
    paddingBottom: SIZING.mediumGutter,
    paddingRight: SIZING.largeGutter,
    marginBottom: SIZING.smallGutter
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
  filterButton: {
    width: width * 0.96,
    backgroundColor: 'rgba(255,255,255,1)',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: SIZING.smallGutter,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 3,
    borderTopColor: '#e8e8e8',
    borderTopWidth: 1,
    borderLeftColor: '#e8e8e8',
    borderLeftWidth: 1,
    borderRightColor: '#e8e8e8',
    borderRightWidth: 1,
  },
  filterButtonSection: {
    flexGrow: 1,
    padding: SIZING.mediumGutter,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  listOfUsers: {
    backgroundColor: '#fff',
    margin: SIZING.smallGutter,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 3,
    borderTopColor: '#e8e8e8',
    borderTopWidth: 1,
    borderLeftColor: '#e8e8e8',
    borderLeftWidth: 1,
    borderRightColor: '#e8e8e8',
    borderRightWidth: 1,
  },

});

export default LeadersContainer;
