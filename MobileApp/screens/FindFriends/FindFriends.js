import React, { Component } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, View, FlatList, ListView, ScrollView, TextInput, TouchableOpacity, Platform, Keyboard } from 'react-native';
import _ from 'lodash';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import User from "./User";
import NoResults from "./NoResults";
import StartSearching from "./StartSearching";
import BackButton from "../../components/BackButton";
import Dimensions from 'Dimensions';
const {height, width} = Dimensions.get('window');
import { COLORS, SIZING } from "../../styles";
import Meteor, { createContainer } from 'react-native-meteor';


class FindFriends extends Component {
    constructor(props) {
      super(props);

      this.onInput = this.onInput.bind(this);
      this.updateLists = this.updateLists.bind(this);
      this.inviteFriends = this.inviteFriends.bind(this);

      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });

      let users = [];

      this.state = {
        originalData: users,
        newData: users,
        data: users,
        selectedUsers: [],
        dataSource: ds.cloneWithRows(users),
        submitButtonDisabled: true,
      };
    }

    //filters the list of users, fires when anything is typed in the search bar
    onInput(text) {
      let { users } = this.props,
          matchinguUsers = [],
          usersMinusMatchingUsers = [],
          newUsers = [],
          fakeUsers = [];

      if (text) {

        users = users.find({'username': new RegExp( text, 'i' )})

        //compare selected Users (without the isSelected property) to Users searched for
        fakeSelectedUsers = _.cloneDeep(this.state.selectedUsers);

        _.forEach(fakeSelectedUsers, (value,key) => {
          delete fakeSelectedUsers[key].isSelected;
        })

        matchingUsers = _.intersectionWith(users, fakeSelectedUsers, _.isEqual);
        usersMinusMatchinUsers = _.differenceWith(users, matchingUsers, _.isEqual);

        //mark any searched for users which are already selected as selected
        _.forEach(matchingUsers, (value,key) => {
          matchingUsers[key].isSelected = true;
        })

        //make a new list with the correct users selected and no duplicates
        newUsers = _.union(matchingUsers, usersMinusMatchinUsers)

        this.setState({
          newData: newUsers,
          dataSource: this.state.dataSource.cloneWithRows(newUsers),
        })
      } else {

        //refresh the feed if no text
        this.setState({
          newData: [],
          dataSource: this.state.dataSource.cloneWithRows([]),
        })
      }
    }

    updateLists(user) {
      let newData = _.cloneDeep(this.state.data),
          tempData = _.cloneDeep(this.state.newData),
          newSelectedUsers = _.cloneDeep(this.state.selectedUsers),
          submitButtonActive = this.state.submitButtonActive,
          cleanUser = _.cloneDeep(user);

      cleanUser.isSelected = true;

      //check if this user is already in the list of selected users, and correct the list accordingly
      if (  _.some(this.state.selectedUsers, cleanUser ) ) {
        newSelectedUsers = _.differenceWith(this.state.selectedUsers, [ cleanUser ], _.isEqual);
      } else {
        newSelectedUsers = _.unionWith(this.state.selectedUsers, [ cleanUser ], _.isEqual);
      }

      //change the source of truth list
      _.forEach(newData, (value,key) => {
        if (_.isEqual(value,user)) {
          newData[key].isSelected = !newData[key].isSelected;
        }
      })

      //change the currently visible list
      _.forEach(tempData, (value,key) => {
        if (_.isEqual(value,user)) {
          tempData[key].isSelected = !tempData[key].isSelected;
        }
      })

      //check if there are any selected users
      if (newSelectedUsers.length > 0) {
        submitButtonDisabled = false;
      } else {
        submitButtonDisabled = true;
      }

      this.setState({
        selectedUsers: newSelectedUsers,
        submitButtonDisabled: submitButtonDisabled,
        newData: tempData,
        data: newData,
        dataSource: this.state.dataSource.cloneWithRows(tempData)
      })
    }

    inviteFriends() {
      _.forEach(this.state.selectedUsers, (user) => {
        Meteor.call('messages.friendInvite', Meteor.user(), user, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('messages.friendInvite worked');
            this.props.navigation.goBack();
          }
        })
      })
    }

    renderUsers() {

      return (
        <View>
          { this.state.dataSource ?
              <ListView
                removeClippedSubviews={false}
                dataSource={this.state.dataSource}
                keyboardDismissMode='on-drag'
                renderRow={(rowData, sectionId, rowId) => {
                  return (
                    <User
                      user={ rowData }
                      rowId={ rowId }
                      selected={ rowData.isSelected }
                      toggleSelected = { this.updateLists }
                    />
                  );
                }}
              />
            : <NoResults />
          }
        </View>
      )
    }

    render() {
      return (
        <View style={styles.container}>

          <TextInput
            style={ styles.input }
            onChangeText={ (text) => { this.onInput(text) } }
            placeholder="Search for users..."
            placeholderTextColor="#fff"
            selectionColor="#2bf9b5"
            returnKeyType="search"
            autoFocus={ false }
            blurOnSubmit={ false }
            underlineColorAndroid="rgba(0,0,0,0)"
            selectTextOnFocus={ true }
            autoCorrect={ false }
          />

          <Icon name={"ios-search-outline"} color="rgba(0,0,0,0.6)" size={16} style={styles.inputIcon}/>

          { this.renderUsers() }

          <KeyboardAvoidingView behavior={"padding"} style={ styles.addUsersButtonContainer }>

            {this.state.selectedUsers.length > 0 ?

              <ScrollView horizontal={true} style={styles.selectedUserContainer} contentContainerStyle={styles.selectedUserContainerStyle}>
                {this.state.selectedUsers.map((selectedUser) => {
                  return  (
                    <TouchableOpacity style={styles.selectedUser} onPress={ () => { this.updateLists(selectedUser); } }>
                      <Icon name={"ios-close-outline"} color="#fff" size={20} style={styles.removeSelectedUserIcon}/>
                      <Text style={[styles.selectedUserText]}>
                        { selectedUser.username }
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
              : null
            }

            <TouchableOpacity
              disabled={ this.state.submitButtonDisabled }
              onPress={ this.inviteFriends }
              style={ [styles.addUsersButton, this.state.submitButtonDisabled && styles.addUsersButtonDisabled] }
            >
              <View>
                <Text style={ [styles.addUsersButtonText, this.state.submitButtonDisabled && styles.addUsersButtonTextDisabled] }>
                  {"ADD " + this.state.selectedUsers.length + " USER(S)"}
                </Text>
              </View>
            </TouchableOpacity>

          </KeyboardAvoidingView>

        </View>
      );
    }
}

const FindFriendsContainer = createContainer( () => {
  handle = Meteor.subscribe('users');
  ready = handle.ready();

  return {
    users: Meteor.collection('users'),
    ready: ready
  };
}, FindFriends);

FindFriendsContainer.navigationOptions = ({ navigation }) => ({
  title: 'Find Friends',
  headerLeft: <BackButton type={'close-x'} navigation={navigation} />,
  mode: 'modal'
});

const styles = StyleSheet.create({
    modal: {
      height: 300,
      backgroundColor: COLORS.background
    },
    container: {
      height: height - 60,
      width: width,
      zIndex: 1,
      backgroundColor: COLORS.background
    },
    bumper:{
      height: 80,
      width: width,
      backgroundColor: "#0d0d0d"
    },
    titleContainer: {
      height: 30,
      width: width - 130,
      backgroundColor: "rgba(0,0,0,0)",
      marginTop: 35,
      marginLeft: 65,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    title: {
      fontSize: 14,
      color: "#fff"
    },
    input: {
      top: 0,
      position: "relative",
      height: 43,
      backgroundColor: "#fff",
      paddingLeft: SIZING.mediumGutter + 16 + SIZING.mediumGutter ,
      fontSize: SIZING.p1
    },
    inputIcon: {
      position: "absolute",
      top: 13,
      left: SIZING.mediumGutter,
      backgroundColor: "rgba(0,0,0,0)"
    },
    addUsersButton: {
      width: width,
      backgroundColor: "#e8e8e8",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: SIZING.mediumGutter
    },
    addUsersButtonText: {
      fontSize: SIZING.h3
    },
    addUsersButtonDisabled: {
      backgroundColor: "#e8e8e8",
    },
    addUsersButtonTextDisabled: {
      color: "rgba(255,255,255,0.4)"
    },
    addUsersButtonContainer: {
      position: "absolute",
      bottom: 0,
      left: 0
    },
    selectedUserContainer: {
      backgroundColor: "#222",
      width: width,
      height: 35,
      padding: 5,
    },
    selectedUserContainerStyle:{
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start"
    },
    selectedUser: {
      backgroundColor: "rgba(255,255,255,0)",
      borderRadius: 2,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.6)",
      height: 25,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 5,
      paddingLeft: 5,
      paddingRight: 5
    },
    selectedUserText: {
      color: "#fff",
      fontSize: SIZING.p3
    },
    removeSelectedUserIcon: {
      marginRight: 5
    },
    sectionHeader: {
      width: width,
      padding: SIZING.mediumGutter ,
      backgroundColor: '#e8e8e8',
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    sectionHeaderText: {
      color: "#000",
      fontSize: SIZING.p3
    },
    accordionScrollViewStyle: {
      height: height - 155
    },
    accordionContentStyle: {
    }
});

export default FindFriendsContainer;
