import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Form, ListItem, CheckBox, Body, Item, Input, Button } from 'native-base';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelect from "../../components/MultipleSelectInput";
import Meteor, { createContainer } from 'react-native-meteor';

var {height, width} = Dimensions.get('window');

const items = [{
  id: '1',
  name: 'Bench Press',
}, {
  id: '2',
  name: 'Leg Pess',
}, {
  id: '3',
  name: 'Biking',
}, {
  id: '4',
  name: 'Running',
}, {
  id: '5',
  name: 'Swimming',
}, {
  id: '6',
  name: 'Push Ups',
}, {
  id: '7',
  name: 'Sit Ups',
}, {
  id: '8',
  name: 'Pull Ups',
}, {
  id: '9',
  name: 'Hamstring Flexibility',
}];

class AddPersonalBest extends React.Component {
  constructor(props) {
    super(props);

    this.createActivity = this.createActivity.bind(this);
    this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this);

    this.state = {
      activity: "Running",
      text: "",
      measurement: "14 minutes",
      needsVerification: false,
      owner: this.props.navigation.state.params.user,
      private: false
    }
  }

  onSelectedItemsChange(selectedItems) {
    this.setState({
      activity: selectedItems[0].name,
    });
  }

  createActivity() {
    Meteor.call('activities.new', this.state.activity, this.state.text, this.state.measurement, this.state.needsVerification, this.state.owner, this.state.private, (err, res) => {});
    this.props.navigation.navigate('Feed');
  }

  static navigationOptions = {
    title: 'Add Accomplishment',
  };

  render() {

    return (
      <View style={styles.container}>
        <Tabs>
          <Tab heading="Step 1">
            <View style={styles.titleSection}>
              <Text style={styles.titleSectionText}>
                Good work! What activity did you do?
              </Text>
            </View>
            <MultiSelect
              items={items}
              uniqueKey="id"
              fixedHeight={true}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={[]}
              selectText="Search for activities"
              searchInputPlaceholderText="Search Items..."
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              submitButtonColor="#CCC"
              submitButtonText="Submit"
              single={true}
            />
          </Tab>
          <Tab heading="Step 2">
            <View style={styles.titleSection}>
              <Text style={styles.titleSectionText}>
                How many reps?
              </Text>
            </View>
            <Item underline>
              <Input placeholder="Number" />
            </Item>
          </Tab>
          <Tab heading="Submit">
            <Form>
              <ListItem>
                <Body>
                  <Text>Make this private?</Text>
                </Body>
                <CheckBox checked={true} />
              </ListItem>
              <ListItem>
                <Body>
                  <Text>Needs verification?</Text>
                </Body>
                <CheckBox checked={true} />
              </ListItem>
            </Form>
            <Button rounded block onPress={this.createActivity}>
              <Text>Submit</Text>
            </Button>
          </Tab>
        </Tabs>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackground,
    width: width,
  },
  picker: {
    paddingLeft: 0,
    paddingBottom: 10
  },
  titleSection:{
    height: 150,
    padding: SIZING.mediumGutter,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  titleSectionText:{
    fontSize: 36
  }
});

export default AddPersonalBest;
