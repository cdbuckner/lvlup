import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

var {height, width} = Dimensions.get('window');

class UserListItem extends React.Component {
  render() {
    let { user, index, navigation } = this.props;

    return (
      <TouchableOpacity style={styles.userContainer} onPress={() => navigation.navigate( 'User' ) }>
        <Text style={styles.userRank}>
          {index + 1}
        </Text>
        <View style={styles.userImageContainer}>
          <View style={styles.userImage}>
          </View>
          <View style={styles.userLevel}>
            <Text style={styles.userLevelText}>{user.profile.level}</Text>
          </View>
        </View>
        <Text style={styles.userName}>
          {user.username}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  userContainer: {
    width: width * 0.96,
    paddingLeft: SIZING.mediumGutter,
    paddingRight: SIZING.mediumGutter,
    paddingTop: SIZING.smallGutter,
    paddingBottom: SIZING.smallGutter,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1
  },
  userRank: {
    marginRight: SIZING.mediumGutter,
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
});

export default UserListItem;
