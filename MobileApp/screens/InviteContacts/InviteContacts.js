import React, { Component } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, View, ListView, ScrollView, TextInput, TouchableOpacity, Platform, Keyboard } from 'react-native';
import _ from 'lodash';
import Icon from '../../node_modules/react-native-vector-icons/MaterialIcons';
import Contact from "./Contact";
import NoResults from "./NoResults";
import Dimensions from 'Dimensions';
const { height, width } = Dimensions.get('window');
import { COLORS, SIZING } from "../../styles";
var Contacts = require('react-native-contacts');
import Communications from 'react-native-communications';


class SelectContacts extends Component {
  constructor(props) {
    super(props);

    this.selectContact = this.selectContact.bind(this);
    this.sendInvites = this.sendInvites.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.onInput = this.onInput.bind(this);
    this.updateLists = this.updateLists.bind(this);
    this.updateSelectedNumbers = this.updateSelectedNumbers.bind(this);
    this.updateSelectedNumberByContact = this.updateSelectedNumberByContact.bind(this);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2
    });

    let userContacts = [];

    this.state = {
      originalData: userContacts,
      newData: userContacts,
      data: userContacts,
      selectedContacts: [],
      selectedNumbers: [],
      dataSource: ds.cloneWithRowsAndSections(userContacts),
      submitButtonDisabled: true,
      numberOfResults: 24,
      shouldOnEndReachedFire: true
    };

  }

  async componentDidMount() {
    let newContacts = [],
        newContactsWithSections = {},
        subset = [],
        subsetWithSections = {};

    try {
      newContacts = await this.getContacts();

      subset = _.slice(newContacts, 0, this.state.numberOfResults );

      newContactsWithSections = this.addSections(newContacts);
      subsetWithSections = this.addSections(subset);

      setContactDatabase(newContacts);
    } catch (err) {
      newContactsWithSections = {};
    }

    this.setState({
      selectedContacts: [],
      data: newContacts,
      newData: newContacts,
      originalData: newContacts,
      numberOfResults: 24,
      dataSource: this.state.dataSource.cloneWithRowsAndSections(subsetWithSections)
    })
  }

  addSections(data) {
    let dataWithSections = {};

    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z","Other"].forEach((letter) => {

      if(!dataWithSections[letter]) {
        dataWithSections[letter] = [];
      }

      dataWithSections[letter] = data
        .filter((contact) => {
          if (contact.familyName) {
            if ( contact.familyName.charAt(0).toLowerCase() == letter ) {
              return contact
            }
          } else if (contact.givenName) {
            if ( contact.givenName.charAt(0).toLowerCase() == letter ) {
              return contact
            }
          }
        })
    })

    return dataWithSections;
  }

  async getContacts() {
    return new Promise((resolve, reject) => {
      Contacts.getAllWithoutPhotos((err, contacts) => {
        if (err) {
          reject(err);
        } else {
          resolve(contacts);
        }
      });
    });
  }

  onEndReached() {
    let subset = [],
        subsetWithSections = {};

    //only load more if not searching for specific person
    if ( this.state.shouldOnEndReachedFire ) {

      this.setState({
        numberOfResults: this.state.numberOfResults + 25
      });

      subset = _.slice(this.state.data, 0, this.state.numberOfResults );
      subsetWithSections = this.addSections(subset);

      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(subsetWithSections)
      });
    }
  }

  //filters the list of contacts, fires when anything is typed in the search bar
  onInput(text) {
    let matchingContacts = []
        contactsMinusMatchingContacts = [],
        newContacts = [],
        fakeContacts = [],
        newContactsWithSections = {},
        resetDataWithSections = {},
        newData = _.cloneDeep(this.state.data),
        subset = [];

    if (text) {

      Contacts.getContactsMatchingString(text, (err, contacts) => {
        if(err === 'denied'){
          // x.x
        } else {

          //compare selected contacts (without the isSelected property) to contacts searched for
          fakeSelectedContacts = _.cloneDeep(this.state.selectedContacts);

          _.forEach(fakeSelectedContacts, (value,key) => {
            delete fakeSelectedContacts[key].isSelected;
          })

          matchingContacts = _.intersectionWith(contacts, fakeSelectedContacts, _.isEqual);
          contactsMinusMatchingContacts = _.differenceWith(contacts, matchingContacts, _.isEqual);

          //mark any searched for contacts which are already selected as selected
          _.forEach(matchingContacts, (value,key) => {
            matchingContacts[key].isSelected = true;
          })

          //make a new list with the correct contacts selected and no duplicates
          newContacts = _.union(matchingContacts, contactsMinusMatchingContacts)
          newContactsWithSections = this.addSections(newContacts)

          this.setState({
            newData: newContacts,
            dataSource: this.state.dataSource.cloneWithRowsAndSections(newContactsWithSections),
            shouldOnEndReachedFire: false
          })
        }
      });
    } else {

      subset = _.slice(newData, 0, this.state.numberOfResults );
      resetDataWithSections = this.addSections(subset)

      //refresh the feed if no text
      this.setState({
        newData: newData,
        dataSource: this.state.dataSource.cloneWithRowsAndSections(resetDataWithSections),
        shouldOnEndReachedFire: true
      })
    }
  }

  //fires when any contact in the list is tapped
  selectContact(contact) {
    let alertButtonArray = [];

    if (!contact.isSelected) {

      //fire alerts based on how many numbers there are
      if (contact.phoneNumbers.length == 0) {
        Alert.alert(
          'No numbers listed',
          'This contact does not have a phone number so we are unable to add them.',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        )
      } else if (contact.phoneNumbers.length == 1) {
        this.updateLists(contact);
        this.updateSelectedNumbers(contact.phoneNumbers[0].number);
      } else if (contact.phoneNumbers.length > 1) {

        _.forEach(contact.phoneNumbers, (numberObject) => {
          let item = {text: numberObject.number, onPress:() => { this.updateLists(contact); this.updateSelectedNumbers(numberObject.number); }}
          alertButtonArray = _.concat(alertButtonArray, [item]);
        })

        Alert.alert(
          'Which number is best?',
          'This is the number we will send the invite to',
          alertButtonArray
        )
      }
    } else {
      this.updateLists(contact);
      this.updateSelectedNumberByContact(contact);
    }
  }

  updateSelectedNumberByContact(contact) {
    let newSelectedNumbers = _.cloneDeep(this.state.selectedNumbers);

    _.forEach(contact.phoneNumbers, (numberObject) => {
      if (  _.includes(this.state.selectedNumbers, numberObject.number ) ) {
        newSelectedNumbers = _.differenceWith(this.state.selectedNumbers, [ numberObject.number ], _.isEqual);
      } else {
        newSelectedNumbers = _.unionWith(this.state.selectedNumbers, [ numberObject.number ], _.isEqual);
      }
    })

    this.setState({
      selectedNumbers: newSelectedNumbers,
    })
  }

  updateSelectedNumbers(number) {
    let newSelectedNumbers = _.cloneDeep(this.state.selectedNumbers);

    //check if this number is already in the list of selected numbers, and correct the list accordingly
    if (  _.some(this.state.selectedNumbers, number ) ) {
      newSelectedNumbers = _.differenceWith(this.state.selectedNumbers, [ number ], _.isEqual);
    } else {
      newSelectedNumbers = _.unionWith(this.state.selectedNumbers, [ number ], _.isEqual);
    }

    this.setState({
      selectedNumbers: newSelectedNumbers,
    })
  }

  updateLists(contact) {
    let newData = _.cloneDeep(this.state.data),
        tempData = _.cloneDeep(this.state.newData),
        newSelectedContacts = _.cloneDeep(this.state.selectedContacts),
        submitButtonActive = this.state.submitButtonActive,
        cleanContact = _.cloneDeep(contact);

    cleanContact.isSelected = true;

    //check if this contact is already in the list of selected contacts, and correct the list accordingly
    if (  _.some(this.state.selectedContacts, cleanContact ) ) {
      newSelectedContacts = _.differenceWith(this.state.selectedContacts, [ cleanContact ], _.isEqual);
    } else {
      newSelectedContacts = _.unionWith(this.state.selectedContacts, [ cleanContact ], _.isEqual);
    }

    //change the source of truth list
    _.forEach(newData, (value,key) => {
      if (_.isEqual(value,contact)) {
        newData[key].isSelected = !newData[key].isSelected;
      }
    })

    //change the currently visible list
    _.forEach(tempData, (value,key) => {
      if (_.isEqual(value,contact)) {
        tempData[key].isSelected = !tempData[key].isSelected;
      }
    })

    //check if there are any selected contacts
    if (newSelectedContacts.length > 0) {
      submitButtonDisabled = false;
    } else {
      submitButtonDisabled = true;
    }

    newSelectedContactsWithSections = this.addSections(tempData);

    this.setState({
      selectedContacts: newSelectedContacts,
      submitButtonDisabled: submitButtonDisabled,
      newData: tempData,
      data: newData,
      dataSource: this.state.dataSource.cloneWithRowsAndSections(newSelectedContactsWithSections)
    })
  }

  sendInvites() {
    let listOfNumbers = [],
        uri = "",
        newSelectedNumbers = _.cloneDeep(this.state.selectedNumbers);

    //react-native-communications doesn't natively allow for multiple numbers, but this hack works
    if (Platform.OS === 'ios') {
        uri = "/open?addresses=" + _.join(newSelectedNumbers, ",");
    } else {
        uri = _.join(newSelectedNumbers, ";");
    }

    Communications.textWithoutEncoding(uri, "This is the best fitness app ever! It'll tell you your fitness level, connects with other fitness apps, and will let you record gym workouts! If you join too we can taunt and cheer eachother. Check it out:");
  }

  renderSectionHeader(sectionData, sectionHeader) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionHeaderText]}>
          {sectionHeader.toUpperCase()}
        </Text>
      </View>
    );
  }

  renderContacts() {
    let { navigator, contactSearchLoading, setContactResultsShowing, contactResultsShowing } = this.props;

    // if we are loading search suggestions then show loading screen
    if(contactSearchLoading && contactSearchText.length > 2) {
      return ( <Loading /> );
    }

    return (
      <View>
        { this.state.dataSource ?
          <ListView
            removeClippedSubviews={false}
            dataSource={this.state.dataSource}
            renderSectionHeader={this.renderSectionHeader}
            keyboardDismissMode='on-drag'
            onEndReached={() => this.onEndReached()}
            renderRow={(rowData, sectionId, rowId) => {
              return (
                <Contact
                  contact={ rowData }
                  rowId={ rowId }
                  selected={ rowData.isSelected }
                  toggleSelected = { this.selectContact }
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
    let { navigator, disabled, ready, contactSearchLoading, contactSearchResults, contactSearchText } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.bumper}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title]}>Invite people to your group</Text>
          </View>
        </View>

        <TextInput
          style={ styles.input }
          onChangeText={ (text) => { this.onInput(text) } }
          placeholder="Search for contacts..."
          placeholderTextColor="#fff"
          selectionColor="#2bf9b5"
          returnKeyType="search"
          autoFocus={ false }
          blurOnSubmit={ false }
          underlineColorAndroid="rgba(0,0,0,0)"
          selectTextOnFocus={ true }
          autoCorrect={ false }
        />

        <Icon name={"search"} color="rgba(0,0,0,0.6)" size={16} style={styles.inputIcon}/>

        { this.renderContacts() }

        <KeyboardAvoidingView behavior={"padding"} style={ styles.inviteContactsButtonContainer }>

          {this.state.selectedContacts.length > 0 ?

            <ScrollView horizontal={true} style={styles.selectedContactContainer} contentContainerStyle={styles.selectedContactContainerStyle}>
              {
                this.state.selectedContacts.map((selectedContact) => {
                  return  (
                    <TouchableOpacity style={styles.selectedContact} onPress={ () => { this.updateLists(selectedContact); this.updateSelectedNumberByContact(selectedContact); } }>
                      <Icon name={"clear"} color="#fff" size={12} style={styles.removeSelectedContactIcon}/>
                      <Text style={[styles.selectedContactText]}>
                        {selectedContact.givenName + " " + selectedContact.familyName}
                      </Text>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView> : null
          }

          <TouchableOpacity
              disabled={ this.state.submitButtonDisabled }
              onPress={ this.sendInvites }
              style={ [styles.inviteContactsButton, this.state.submitButtonDisabled && styles.inviteContactsButtonDisabled] }
          >
            <View>
              <Text style={ [styles.inviteContactsButtonText, disabled && styles.inviteContactsButtonTextDisabled] }>
                {"INVITE " + this.state.selectedContacts.length + " PEOPLE"}
              </Text>
            </View>
          </TouchableOpacity>

        </KeyboardAvoidingView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    modal: {
        height: 300,
        backgroundColor: COLORS.background
    },
    container: {
        height: height,
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
        paddingLeft: SIZING.largeGutter + 40 + SIZING.mediumGutter ,
        fontSize: SIZING.p1
    },
    inputIcon: {
        position: "absolute",
        top: 93,
        left: SIZING.largeGutter + 15,
        backgroundColor: "rgba(0,0,0,0)"
    },
    inviteContactsButton: {
        width: width,
        backgroundColor: COLORS.green,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: SIZING.mediumGutter
    },
    inviteContactsButtonText: {
        fontSize: SIZING.h3
    },
    inviteContactsButtonDisabled: {
        backgroundColor: COLORS.darkgrey
    },
    inviteContactsButtonTextDisabled: {
        color: "rgba(255,255,255,0.4)"
    },
    inviteContactsButtonContainer: {
        position: "absolute",
        bottom: 0,
        left: 0
    },
    selectedContactContainer: {
        backgroundColor: "#222",
        width: width,
        height: 35,
        padding: 5,
    },
    selectedContactContainerStyle:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    selectedContact: {
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
    selectedContactText: {
        color: "#fff",
        fontSize: SIZING.p3
    },
    removeSelectedContactIcon: {
        marginRight: 5
    },
    sectionHeader: {
        width: width,
        height: 20,
        paddingLeft: SIZING.largeGutter + 40 + SIZING.mediumGutter ,
        backgroundColor: COLORS.darkgrey,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    sectionHeaderText: {
        color: "#fff",
        fontSize: SIZING.p3

    }
});

export default SelectContacts;
