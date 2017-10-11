import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Form, ListItem, CheckBox, Body, Item, Input, Button } from 'native-base';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelect from "../../components/MultipleSelectInput";
import Meteor, { createContainer } from 'react-native-meteor';
import SelectedExercise from './SelectedExercise';
import BackButton from "../../components/BackButton";

var {height, width} = Dimensions.get('window');

class AddActivity extends React.Component {
  constructor(props) {
    super(props);

    this.addExercises = this.addExercises.bind(this);
    this.openSelectExercise = this.openSelectExercise.bind(this);
    this.addSet = this.addSet.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.removeSet = this.removeSet.bind(this);
    this.removeExercise = this.removeExercise.bind(this);

    this.state = {
      activityName: "",
      exercises: [],
      editing: false,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Record a Workout',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'lightblue',
      borderBottomColor: 'lightblue',
      borderBottomWidth: 0,
      shadowRadius: 0,
      shadowOffset: {
          height: 0,
      },
      shadowOpacity: 0,
      shadowColor: 'rgba(0,0,0,0)',
      elevation: 0
    },
    headerLeft: <BackButton type={'close-down'} navigation={navigation} />,
    mode: 'modal'
  })

  openSelectExercise() {
    this.props.navigation.navigate('SelectExercises', {addExercises: this.addExercises});
    console.log('SelectExercise fired');
  }

  addExercises(newExercises) {
    let currentExercises = _.cloneDeep(this.state.exercises);
    this.setState({
      exercises: _.concat(currentExercises, newExercises)
    });
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing
    });
  }

  addSet(exercise, index) {
    let sets = _.cloneDeep(exercise.sets);
    let exercises = _.cloneDeep(this.state.exercises);

    this.state.exercises.map((iteratedExercise) => {
      if (iteratedExercise == exercise) {
        exercises[index].sets = _.concat(sets, [{
          weight: 185,
          reps: 12,
          time: '',
          previous: '',
          oneRM: 100
        }])
      }
    })

    this.setState({
      exercises: exercises
    });

  }

  removeExercise(exercise, index) {
    let exercises = _.cloneDeep(this.state.exercises);

    _.pullAt(exercises, index);

    this.setState({
      exercises: exercises
    });
  }

  removeSet(exercise, setIndex, index) {
    let sets = _.cloneDeep(exercise.sets);
    let exercises = _.cloneDeep(this.state.exercises);

    this.state.exercises.map((iteratedExercise) => {
      if (iteratedExercise == exercise) {
        _.pullAt(sets, setIndex);
        exercises[index].sets = sets;
      }
    })

    this.setState({
      exercises: exercises
    });

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

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {
            this.state.exercises.map((exercise, index) => {
              return (
                <SelectedExercise exercise={exercise} index={index} addSet={ this.addSet } removeSet={ this.removeSet } editing={ this.state.editing } removeExercise={this.removeExercise}/>
              )
            })
          }
          <TouchableOpacity style={styles.addExerciseButton} onPress={this.openSelectExercise}>
            <Text style={styles.addSetButtonText}>
              Add an exercise
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelWorkoutButton} onPress={this.cancelWorkout}>
            <Text style={styles.cancelWorkoutButtonText}>
              Cancel Workout
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    width: width
  },
  addSetButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addSetButtonText: {
    color: 'rgba(0,0,0,1)',
  },
  cancelWorkoutButton: {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: SIZING.smallGutter,
    margin: SIZING.smallGutter,
    width: width * 0.96,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelWorkoutButtonText: {
    color: 'red',
  },
  addExerciseButton: {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: SIZING.smallGutter,
    margin: SIZING.smallGutter,
    width: width * 0.96,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AddActivity;
