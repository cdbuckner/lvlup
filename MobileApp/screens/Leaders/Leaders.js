import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import UserListItem from "../../components/UserListItem";
import Icon from 'react-native-vector-icons/Ionicons';
import Meteor, { createContainer } from 'react-native-meteor';

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
          <View style={styles.listOfUsers}>
            {
              users.map((user, index) => {
                return (
                  <UserListItem user={user} index={index} navigation={this.props.navigation}/>
                )
              })
            }
          </View>
        </ScrollView>
        <View style={styles.filterContainer}>
          <ScrollView horizontal={true} style={styles.filterScroll} contentContainerStyle={styles.filterScrollContentContainer}>
            <Text style={styles.filterButtonText}>Area:</Text>
            {
              this.state.areaFilters.map((filter) => {
                return (
                  <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>
                      {filter}
                    </Text>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
          <ScrollView horizontal={true} style={styles.filterScroll} contentContainerStyle={styles.filterScrollContentContainer}>
            <Text style={styles.filterButtonText}>Age:</Text>
            {
              this.state.ageFilters.map((filter) => {
                return (
                  <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>
                      {filter}
                    </Text>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
          <ScrollView horizontal={true} style={styles.filterScroll} contentContainerStyle={styles.filterScrollContentContainer}>
            <Text style={styles.filterButtonText}>Gender:</Text>
            {
              this.state.genderFilters.map((filter) => {
                return (
                  <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>
                      {filter}
                    </Text>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
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
  filterScroll: {
    width: width,
    paddingLeft: SIZING.mediumGutter,
    paddingRight: SIZING.mediumGutter,
    paddingTop: SIZING.smallGutter,
    paddingBottom: SIZING.smallGutter,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  },
  filterScrollContentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  filterContainer: {
    backgroundColor: COLORS.primaryBackground,
    marginBottom: SIZING.mediumGutter,
    marginTop: 20 + SIZING.mediumGutter,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: 'absolute',
  },
  filterButton: {
    paddingLeft: SIZING.mediumGutter,
    paddingRight: SIZING.mediumGutter,
    paddingTop: SIZING.smallGutter,
    paddingBottom: SIZING.smallGutter
  },
  filterButtonText: {
    fontSize: SIZING.p1,
    lineHeight: SIZING.p1
  },
  listOfUsers: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 20 + ( SIZING.mediumGutter * 2 ) + (SIZING.smallGutter * 12) + (SIZING.p1 * 3)
  },

});

export default LeadersContainer;
