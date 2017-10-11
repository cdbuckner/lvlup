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
            <Text>{user.level}</Text>
          </View>
        </View>
        <Text style={styles.userName}>
          {user.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  userContainer: {
    width: width,
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
    fontSize: SIZING.h2,
    marginRight: SIZING.mediumGutter
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
  userName: {

  }
});

export default UserListItem;
