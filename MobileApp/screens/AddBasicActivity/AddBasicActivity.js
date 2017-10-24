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
import RightButton from "../../components/RightButton";
import { NavigationActions } from 'react-navigation';
import {TextInputMask} from 'react-native-masked-text';

import EXERCISES from './ExerciseData'

var {height, width} = Dimensions.get('window');

class AddBasicActivity extends React.Component {
  constructor(props) {
    super(props);

    this.addExercises = this.addExercises.bind(this);
    this.openSelectExercise = this.openSelectExercise.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.removeExercise = this.removeExercise.bind(this);
    this.cancelWorkout = this.cancelWorkout.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);

    this.state = {
      activityName: "",
      exercises: [],
      editing: false,
      isComplete: false
    }
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing
    });
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Record a Workout',
    headerTintColor: '#fff',
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
    headerLeft: <BackButton type={'close-down'} navigation={navigation} confirmation={true}/>,
    mode: 'modal'
  })

  addAreaSections(data) {
    let dataWithSections = {};

    ["Ball And Bat", "Ball And Hoop", "Ball Over Net", "Ball, No Net, No Racket", "Ball, Score in Net", "Board Sports", "Boating", "Climbing", "Combat Sports", "Cycling", "Disc Sports", "Golf", "Ice Sports", "Mixed Discipline Races", "Motor Sports", "Racket Sports", "Shooting Sports", "Snow Sports", "Walking/Running", "Water, Swimming Sports"].forEach((area) => {

      if(!dataWithSections[area]) {
        dataWithSections[area] = [];
      }

      dataWithSections[area] = data
        .filter((exercise) => {
          if ( exercise.exerciseType == area ) {
            return exercise
          }
        })
    })

    return dataWithSections;
  }

  openSelectExercise() {
    this.props.navigation.navigate('SelectExercises', {addExercises: this.addExercises, data: EXERCISES, organize: this.addAreaSections });
  }

  addExercises(newExercises) {
    let cleanNewExercises = _.cloneDeep(newExercises);
    let cleanCurrentExercises = _.cloneDeep(this.state.exercises);

    cleanNewExercises.map((exercise) => {
      exercise.sets = [{
        weight: '',
        reps: '',
        time: '',
        previous: '',
        oneRM: ''
      }]
    });

    this.setState({
      exercises: _.concat(cleanCurrentExercises, cleanNewExercises)
    });
  }

  removeExercise(exercise, index) {
    let exercises = _.cloneDeep(this.state.exercises);

    _.pullAt(exercises, index);

    this.setState({
      exercises: exercises
    });
  }

  onChangeTime(time) {
    this.state.exercises[0].sets[0].time = time;
    console.log(this.state.exercises);
  }

  cancelWorkout() {
    this.props.navigation.dispatch( NavigationActions.back() );
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
            this.state.exercises.length > 0 ?
              <View>
                <View style={styles.questionContainer}>
                  <View style={styles.questionWrapper}>
                    <Text style={styles.questionText}>
                      Nice work! Whatd you do?
                    </Text>
                  </View>
                  <View style={styles.selectedExerciseContainer}>
                    <Text style={styles.selectedExerciseText}>
                      { this.state.exercises[0].name }
                    </Text>
                  </View>
                </View>
                <View style={styles.questionContainer}>
                  <View style={styles.questionWrapper}>
                    <Text style={styles.questionText}>
                      For how long?
                    </Text>
                  </View>
                  <TextInputMask
            				ref={'exerciseTime'}
            				type={'datetime'}
            				options={{
            					format: 'HH:mm:ss'
            				}}
                    placeholder={'HH:MM:SS'}
                    onChangeText={this.onChangeTime}
                    style={styles.exerciseDetailButton}
                  />
                </View>
                {
                  this.state.exercises[0].measurement == 'time and distance' ?
                    <View style={styles.questionContainer}>
                      <View style={styles.questionWrapper}>
                        <Text style={styles.questionText}>
                          How far?
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.exerciseDetailButton} onPress={this.openSelectExercise}>
                        <Text style={styles.exerciseDetailButtonText}>
                          0.0 miles
                        </Text>
                      </TouchableOpacity>
                    </View> : null
                }
              </View> :
              <View style={styles.questionContainer}>
                <View style={styles.questionWrapper}>
                  <Text style={styles.questionText}>
                    Nice work! Whatd you do?
                  </Text>
                </View>
                <TouchableOpacity style={styles.addExerciseButton} onPress={this.openSelectExercise}>
                  <Text style={styles.addExerciseButtonText}>
                    Add an activity
                  </Text>
                </TouchableOpacity>
              </View>
          }
          <TouchableOpacity style={styles.finishWorkoutButton}>
            <Text style={styles.finishWorkoutButtonText}>
              Finish Workout
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
    backgroundColor: '#f8f8f8',
    width: width
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
  finishWorkoutButton: {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: SIZING.smallGutter,
    margin: SIZING.smallGutter,
    width: width * 0.96,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  finishWorkoutButtonText: {
    color: 'green',
  },
  exerciseDetailButton: {
    padding: SIZING.mediumGutter,
    margin: SIZING.smallGutter,
    width: width * 0.96,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgba(255,255,255,1)',
    fontSize: 24,
    textAlign: 'center',
  },
  addExerciseButton: {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: SIZING.mediumGutter,
    margin: SIZING.smallGutter,
    width: width * 0.96,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addExerciseButtonText: {
    color: 'rgba(0,0,0,1)',
    fontSize: 14
  },
  questionContainer: {
    marginTop: SIZING.largeGutter,
    marginBottom: SIZING.smallGutter,
  },
  questionWrapper: {
    paddingLeft: SIZING.mediumGutter,
    paddingRight: SIZING.mediumGutter,
    paddingTop: SIZING.smallGutter,
    paddingBottom: SIZING.smallGutter
  },
  questionText: {
    fontSize: 18,
    textAlign: 'center'
  },
  selectedExerciseContainer: {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: SIZING.mediumGutter,
    margin: SIZING.smallGutter,
    width: width * 0.96,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedExerciseText: {
    fontSize: 18,
    textAlign: 'center'
  }
});

export default AddBasicActivity;
