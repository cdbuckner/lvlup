import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Moment from 'moment';
import Meteor, { createContainer } from 'react-native-meteor';


var {height, width} = Dimensions.get('window');

class FriendRequestReactionCard extends React.Component {
  constructor(props) {
    super(props);

    this.dismissMessage = this.dismissMessage.bind(this);
  }

  dismissMessage() {
    let {data} = this.props;
    
    Meteor.call('messages.hide', data._id, (err) => {
      if (err) {
        console.log(err);
      }
    })
  }

  render() {
    let {data} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.verificationSection}>
          {
            data.type == 'friend invite approved' ?
              <Text style={styles.verificationSectionText}>
                {data.from.username + ' accepted your friend request!'}
              </Text> :
              <Text style={styles.verificationSectionText}>
                {data.from.username + ' declined your friend request.'}
              </Text>
          }
        </View>
        <View style={styles.lowerDeckContainer}>
          <TouchableOpacity style={styles.cardButton} onPress={ this.dismissMessage }>
            <View style={styles.cardButtonInner}>
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
  lowerDeckContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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

export default FriendRequestReactionCard;
