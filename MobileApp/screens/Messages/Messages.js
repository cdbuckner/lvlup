import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import VerificationRequestCard from "../../components/VerificationRequestCard";
import ReactionCard from "../../components/ReactionCard";
import { NavigationActions } from 'react-navigation'

var {height, width} = Dimensions.get('window');


class Messages extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Messages',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Icon
        size={24}
        name={'ios-chatbubbles-outline'}
        color={tintColor}
      />
    ),
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.listOfMessages} contentContainerStyle={styles.contentContainer}>
          <VerificationRequestCard />
          <ReactionCard />
        </ScrollView>
        <View style={styles.bumper}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryBackground,
  },
  listOfMessages: {
    flex: 1,
    backgroundColor: COLORS.secondaryBackground,
    marginTop: SIZING.mediumGutter,
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
  upperDeckContainer: {
    width: width,
    paddingLeft: SIZING.mediumGutter,
    paddingRight: SIZING.mediumGutter,
    paddingTop: SIZING.mediumGutter,
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
});

export default Messages;
