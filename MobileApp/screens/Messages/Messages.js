import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import FriendRequestCard from "../../components/FriendRequestCard";
import VerificationRequestCard from "../../components/VerificationRequestCard";
import ReactionCard from "../../components/ReactionCard";
import FriendRequestReactionCard from "../../components/FriendRequestReactionCard";
import { NavigationActions } from 'react-navigation';
import Meteor, { createContainer } from 'react-native-meteor';
import NoFriends from "../../components/NoFriends";
import NoMessages from "../../components/NoMessages";

var {height, width} = Dimensions.get('window');

class Messages extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let { user, userMessages } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.listOfMessages} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.userNameContainer}>
              <Text style={styles.screenTitle}>Messages</Text>
              <Text style={styles.screenSubtitle}>
                UPDATES JUST FOR YOU
              </Text>
            </View>
          </View>
          <View>
            {
              userMessages.length > 0 ?
                userMessages.map((message) => {
                  if (message.type == 'friend invite') {
                    return ( <FriendRequestCard data={message} /> )
                  } else if (message.type == 'verification request') {
                    return ( <VerificationRequestCard data={message} /> )
                  } else if (message.type == 'reaction') {
                    return ( <ReactionCard data={message} /> )
                  } else if (message.type == 'friend invite approved' || message.type == 'friend invite declined' ) {
                    return ( <FriendRequestReactionCard data={message} /> )
                  }
                }) : <NoMessages />
            }
          </View>
        </ScrollView>
        <View style={styles.bumper}>
        </View>
      </View>
    );
  }
}

const MessagesContainer = createContainer( () => {
  let user = Meteor.user(),
      handle = Meteor.subscribe('messages'),
      ready = handle.ready(),
      userMessages = [];

  if ( ready ) {
    if ( user ) {
      userMessages = Meteor.collection('messages').find(
        { 'to._id': user._id },
        { sort: { createdAt: -1 } });
    }
  }

  return {
    user: user,
    userMessages: userMessages,
  };
}, Messages);

MessagesContainer.navigationOptions = {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryBackground,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: width,
    paddingLeft: SIZING.largeGutter,
    paddingBottom: SIZING.largeGutter,
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
  listOfMessages: {
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

});

export default MessagesContainer;
