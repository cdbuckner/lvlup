import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Toast, Container, Header, Content, Tab, Tabs, Form, ListItem, CheckBox, Body, Item, Input, Button } from 'native-base';
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

import EXERCISES from './ExerciseData'

var {height, width} = Dimensions.get('window');

class AddDetailedActivity extends React.Component {
  constructor(props) {
    super(props);

    this.addExercises = this.addExercises.bind(this);
    this.openSelectExercise = this.openSelectExercise.bind(this);
    this.addSet = this.addSet.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.removeSet = this.removeSet.bind(this);
    this.removeExercise = this.removeExercise.bind(this);
    this.cancelWorkout = this.cancelWorkout.bind(this);
    this.createActivity = this.createActivity.bind(this);
    this.startRestTimer = this.startRestTimer.bind(this);
    this.closeToast = this.closeToast.bind(this);
    this.openToast = this.openToast.bind(this);

    this.state = {
      name: "Workout",
      text: "",
      exercises: [],
      needsVerification: false,
      owner: Meteor.user(),
      private: false,
      editing: false,
      toastVisible: false,
      originalTime: 90000,
      remainingTime: 90000,
      timerText: ''
    }
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing
    });
  }

  static navigationOptions = ({ navigation }) => ({
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

  startRestTimer() {

    this.openToast();

    const endTime = new Date().getTime() + this.state.remainingTime;
    this.interval = setInterval(() => {
      const remaining = endTime - new Date();
      if(remaining <= 1000) {
        this.setState({remainingTime: 0});
        this.closeToast();
        clearInterval(this.interval);
        return;
      }

      let now = this.state.remainingTime;
      let msecs = now % 1000;

      if(msecs < 10) {
        msecs = `00${msecs}`;
      } else if(msecs < 100) {
        msecs = `0${msecs}`;
      }

      let seconds = Math.floor(now / 1000);
      let minutes = Math.floor(now / 60000);
      let hours = Math.floor(now / 3600000);
      seconds = seconds - (minutes * 60);
      minutes = minutes - (hours * 60);

      let formatted = `${minutes < 10 ?
          0 : ""}${minutes}:${seconds < 10 ?
            0 : ""}${seconds}`;

      this.setState({
        remainingTime: remaining,
        timerText: formatted });
    }, 1);

  }

  closeToast() {
    this.setState({
      toastVisible: false,
      remainingTime: 90000
    });
  }

  openToast() {
    this.setState({
      remainingTime: 90000,
      toastVisible: true,
    });
  }

  openSelectExercise() {
    this.props.navigation.navigate('SelectExercises', {addExercises: this.addExercises, data: EXERCISES, organize: this.addAreaSections });
  }

  addAreaSections(data) {
    let dataWithSections = {};

    ["Arms", "Back", "Cardio", "Chest", "Core", "Full Body", "Legs", "Shoulders"].forEach((area) => {

      if(!dataWithSections[area]) {
        dataWithSections[area] = [];
      }

      dataWithSections[area] = data
        .filter((exercise) => {
          if ( exercise.primaryMuscleGroup == area ) {
            return exercise
          }
        })
    })

    return dataWithSections;
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

  cancelWorkout() {
    this.props.navigation.dispatch( NavigationActions.back() );
  }

  createActivity() {
    Meteor.call('activities.new', this.state.name, this.state.text, this.state.exercises, this.state.needsVerification, this.state.owner, this.state.private, (err, res) => {});
    this.props.navigation.navigate('Feed');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.userNameContainer}>
              <Text style={styles.screenTitle}>Workout</Text>
              <Text style={styles.screenSubtitle}>
                ADD EXERCISES AS YOU DO THEM
              </Text>
            </View>
          </View>
          {
            this.state.exercises.map((exercise, index) => {
              return (
                <SelectedExercise
                  navigation={this.props.navigation}
                  exercise={exercise}
                  index={index}
                  addSet={ this.addSet }
                  removeSet={ this.removeSet }
                  editing={ this.state.editing }
                  removeExercise={this.removeExercise}
                />
              )
            })
          }
          <TouchableOpacity style={styles.addExerciseButton} onPress={ this.openSelectExercise }>
            <Text style={styles.addSetButtonText}>
              Add an exercise
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.finishWorkoutButton} onPress={ this.createActivity }>
            <Text style={styles.finishWorkoutButtonText}>
              Finish Workout
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelWorkoutButton} onPress={ this.cancelWorkout }>
            <Text style={styles.cancelWorkoutButtonText}>
              Cancel Workout
            </Text>
          </TouchableOpacity>
        </ScrollView>
        {
          this.state.toastVisible ?
          <View style={ styles.toastContainer}>
            <View style={styles.toastUpperDeck}>
              <View style={styles.timerTextSection}>
                <View style={[styles.timerVisualization, {width: ((width * 0.96) - 40) * (this.state.remainingTime / this.state.originalTime) }]}></View>
                <Text style={styles.timerText}>{this.state.timerText}</Text>
              </View>
              <TouchableOpacity style={styles.toastCancelButton} onPress={ this.closeToast }>
                <Icon size={24} name={'ios-close-outline'} color={'#fff'} style={styles.toastCancelButtonIcon}/>
              </TouchableOpacity>
            </View>
            <View style={styles.toastLowerDeck}>
              <TouchableOpacity style={styles.toastBottomButton}>
                <Text style={styles.toastBottomButtonText}>
                  - 30 seconds
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toastBottomButton}>
                <Text style={styles.toastBottomButtonText}>
                  + 30 seconds
                </Text>
              </TouchableOpacity>
            </View>
          </View> :
          <TouchableOpacity style={styles.cancelWorkoutButton} onPress={ this.startRestTimer }>
            <Text style={styles.cancelWorkoutButtonText}>
              Start rest timer
            </Text>
          </TouchableOpacity>
        }
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: width,
    paddingLeft: SIZING.largeGutter,
    paddingBottom: SIZING.mediumGutter,
    paddingRight: SIZING.largeGutter,
  },
  screenTitle: {
    fontSize: SIZING.h1,
    lineHeight: SIZING.h1,
    fontWeight: '800',
    marginTop: SIZING.mediumGutter,
    marginBottom: 5,
  },
  screenSubtitle: {
    fontSize: 10
  },
  headerButton: {

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
  addExerciseButton: {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: SIZING.smallGutter,
    margin: SIZING.smallGutter,
    width: width * 0.96,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  toastContainer: {
    position: 'absolute',
    bottom: SIZING.smallGutter,
    left: SIZING.smallGutter,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#181818',
    width: width * 0.96
  },
  toastUpperDeck: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: 'rgba(0,0,0,0.6)',
    borderBottomWidth: 1,
  },
  toastLowerDeck: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width * 0.96
  },
  toastCancelButton: {
    height: 40,
    width: 40,
    borderLeftColor: 'rgba(0,0,0,0.6)',
    borderLeftWidth: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  toastCancelButtonIcon: {

  },
  toastBottomButton: {
    height: 40,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerTextSection: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: (width * 0.96) - 40,
    height: 40
  },
  timerVisualization: {
    height: 40,
    backgroundColor: 'blue',
    opacity: 0.3,
    position: 'absolute',
    top: 0,
    left: 0
  },
  timerText: {
    color: '#fff',
    position: 'absolute',
    left: SIZING.mediumGutter,
    top: 10
  },
  toastBottomButtonText: {
    color: '#fff'
  }
});

export default AddDetailedActivity;
