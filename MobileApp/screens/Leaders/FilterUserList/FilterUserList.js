import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../../styles";
import Dimensions from 'Dimensions';
import UserListItem from "../../../components/UserListItem";
import Icon from 'react-native-vector-icons/Ionicons';
import Meteor, { createContainer } from 'react-native-meteor';
import BackButton from "../../../components/BackButton";

var {height, width} = Dimensions.get('window');

class FilterUserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areaFilters: ['Your Friends', 'Global', 'Regional', 'Local'],
      ageFilters: ['All','Under 18', '19-26', '27-34', '35-42', '43-50', '51-58', '59-66', 'Over 66'],
      genderFilters: ['All', 'Men', 'Women'],
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#f8f8f8',
      borderBottomColor: '#f8f8f8',
      borderBottomWidth: 0,
      shadowRadius: 0,
      shadowOffset: {
          height: 0,
      },
      shadowOpacity: 0,
      shadowColor: 'rgba(0,0,0,0)',
      elevation: 0
    },
    headerLeft: <BackButton type={'close-x'} navigation={navigation} confirmation={false}/>,
  });

  render() {
    let { user, users, userCount } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.filterContainer}>
            <Text style={styles.screenTitle}>Filter</Text>
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Area</Text>
              <View style={styles.filterScroll}>
                {
                  this.state.areaFilters.map((filter) => {
                    return (
                      <TouchableOpacity style={ filter.isSelected ? styles.filterButtonSelected : styles.filterButton }>
                        <Text style={styles.filterButtonText}>
                          {filter}
                        </Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </View>
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Age</Text>
              <View style={styles.filterScroll}>

                {
                  this.state.ageFilters.map((filter) => {
                    return (
                      <TouchableOpacity style={ filter.isSelected ? styles.filterButtonSelected : styles.filterButton }>
                        <Text style={styles.filterButtonText}>
                          {filter}
                        </Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </View>
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Gender</Text>
              <View style={styles.filterScroll}>
                {
                  this.state.genderFilters.map((filter) => {
                    return (
                      <TouchableOpacity style={ filter.isSelected ? styles.filterButtonSelected : styles.filterButton }>
                        <Text style={styles.filterButtonText}>
                          {filter}
                        </Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

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
  filterSection: {
    width: width,
    paddingLeft: SIZING.mediumGutter,
    paddingRight: SIZING.mediumGutter,
    paddingTop: SIZING.smallGutter,
    paddingBottom: SIZING.smallGutter,
  },
  filterScroll: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  filterContainer: {
    marginBottom: SIZING.mediumGutter,
  },
  filterButton: {
    padding: SIZING.smallGutter,
    marginRight: SIZING.smallGutter,
    marginBottom: SIZING.smallGutter,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 2
  },
  filterButtonSelected: {
    padding: SIZING.smallGutter,
    marginRight: SIZING.smallGutter,
    marginBottom: SIZING.smallGutter,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 2
  },
  filterButtonText: {
    fontSize: SIZING.p1,
    lineHeight: SIZING.p1
  },
  filterTitle: {
    fontSize: SIZING.h3,
    lineHeight: SIZING.h3,
    marginBottom: SIZING.smallGutter,
  },
  screenTitle: {
    fontSize: SIZING.h1,
    lineHeight: SIZING.h1,
    fontWeight: '800',
    marginTop: SIZING.mediumGutter,
    marginBottom: SIZING.mediumGutter,
    marginLeft: SIZING.mediumGutter,
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
    marginTop: 20 + ( SIZING.mediumGutter * 2 ) + (SIZING.smallGutter * 12) + (SIZING.p1 * 3)
  },

});

export default FilterUserList;
