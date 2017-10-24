import React from 'react';
import { TextInput, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Form, ListItem, CheckBox, Body, Item, Input, Button } from 'native-base';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Meteor, { createContainer } from 'react-native-meteor';
import { NavigationActions } from 'react-navigation';

let {height, width} = Dimensions.get('window');

class SelectedExercise extends React.Component {
  constructor(props) {
    super(props);

    this.viewHistory = this.viewHistory.bind(this);
  }

  viewHistory() {
    this.props.navigation.navigate('ExerciseHistory');
  }

  renderColumns() {
    const { exercise } = this.props;

    if (exercise.measurement == 'reps basic') {
      return (
        <View style={styles.addedColumnHeaders}>
          <View style={styles.setWieghtHeader}>
            <Text>
              LBS
            </Text>
          </View>
          <View style={styles.setMeasurementHeader}>
            <Text>
              REPS
            </Text>
          </View>
        </View>
      )
    } else if (exercise.measurement == 'reps plus') {
      return (
        <View style={styles.addedColumnHeaders}>
          <View style={styles.setWieghtHeader}>
            <Text>
              (+LBS)
            </Text>
          </View>
          <View style={styles.setMeasurementHeader}>
            <Text>
              REPS
            </Text>
          </View>
        </View>
      )
    } else if (exercise.measurement == 'reps minus') {
      return (
        <View style={styles.addedColumnHeaders}>
          <View style={styles.setWieghtHeader}>
            <Text>
              (-LBS)
            </Text>
          </View>
          <View style={styles.setMeasurementHeader}>
            <Text>
              REPS
            </Text>
          </View>
        </View>
      )
    } else if (exercise.measurement == 'time basic') {
      return (
        <View style={styles.addedColumnHeaders}>
          <View style={styles.setWieghtHeader}>
            <Text>
              N/A
            </Text>
          </View>
          <View style={styles.setMeasurementHeader}>
            <Text>
              TIME
            </Text>
          </View>
        </View>
      )
    }
  }

  render() {
    const { exercise, index, addSet, removeExercise, removeSet, editing } = this.props;

    return (
      <View style={styles.exerciseContainer}>
        <View style={styles.exerciseTitleSection}>
          <View style={styles.exerciseTitle}>
            <Text>
              { exercise.name }
            </Text>
            <View style={ styles.modificationsContainer }>
              {
                exercise.mods.map((mod) => {
                  return (
                    <View style={styles.modification}>
                      <Text style={styles.modificationText}>
                        { mod.toUpperCase() }
                      </Text>
                    </View>
                  )
                })
              }
            </View>
          </View>
          <TouchableOpacity style={styles.historyButton} onPress={ this.viewHistory }>
            <Text>
              History
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.setsContainer}>
          <View style={styles.columnHeaders}>
            <View style={styles.setNumberHeader}>
              <Text>
                #
              </Text>
            </View>
            <View style={styles.setPreviousHeader}>
              <Text>
                PREVIOUS
              </Text>
            </View>
            { this.renderColumns() }
          </View>
          {
            editing ?
            <TouchableOpacity style={styles.removeExerciseButton} onPress={ () => removeExercise(exercise, index) }>
              <Text>
                Remove exercise
              </Text>
            </TouchableOpacity>
            : null
          }
          {
            exercise.sets.map((set, setIndex) => {
              return (
                <View>
                  <View style={setIndex == (exercise.sets.length - 1) ? styles.setLastRow : styles.setRow }>
                    <View style={styles.setNumberSection}>
                      <Text>
                        { setIndex + 1 }
                      </Text>
                    </View>
                    <View style={styles.setPreviousSection}>
                      <Text style={styles.setPreviousSectionText}>
                        { set.previous ? set.previous : 'no previous' }
                      </Text>
                    </View>
                    <TextInput
                      style={styles.setWieghtSection}
                      placeholder={'add'}
                      keyboardType={'numeric'}
                      placeholderTextColor={'rgba(0,0,0,0.2)'}
                    />
                    <TextInput
                      style={styles.setMeasurementSection}
                      placeholder={'add'}
                      keyboardType={'numeric'}
                      placeholderTextColor={'rgba(0,0,0,0.2)'}
                    />
                  </View>
                  {
                    editing ?
                    <TouchableOpacity style={styles.removeSetButton} onPress={ () => removeSet(exercise, setIndex, index) }>
                      <Text>
                        Remove set
                      </Text>
                    </TouchableOpacity>
                    : null
                  }
                </View>
              )
            })
          }
          <TouchableOpacity style={styles.addSetButton} onPress={ () => addSet(exercise, index) }>
            <Text>
              Add a set
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  exerciseContainer: {

  },
  exerciseTitleSection: {
    padding: SIZING.mediumGutter,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  exerciseTitle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  historyButton: {

  },
  addSetButton: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: SIZING.smallGutter,
    marginLeft: SIZING.smallGutter,
    marginRight: SIZING.smallGutter,
    marginBottom: SIZING.mediumGutter,
    width: width * 0.96,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  removeSetButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: SIZING.smallGutter,
    marginLeft: SIZING.smallGutter,
    marginRight: SIZING.smallGutter,
    marginBottom: SIZING.mediumGutter,
    width: width * 0.96,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  removeExerciseButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: SIZING.smallGutter,
    marginLeft: SIZING.smallGutter,
    marginRight: SIZING.smallGutter,
    marginBottom: SIZING.mediumGutter,
    width: width * 0.96,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    width: width * 0.96,
    marginRight: SIZING.smallGutter,
    marginLeft: SIZING.smallGutter,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  },
  setLastRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    width: width * 0.96,
    marginRight: SIZING.smallGutter,
    marginLeft: SIZING.smallGutter
  },
  setNumberSection: {
    padding: SIZING.smallGutter,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.10,
    borderRightWidth: 1,
    borderRightColor: '#e8e8e8'
  },
  setPreviousSection: {
    padding: SIZING.smallGutter,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.36,
    borderRightWidth: 1,
    borderRightColor: '#e8e8e8'
  },
  setPreviousSectionText: {
    color: 'rgba(0,0,0,0.2)',
    fontSize: 12
  },
  setWieghtSection: {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.25,
    borderRightWidth: 1,
    borderRightColor: '#e8e8e8',
    borderLeftWidth: 0,
    borderLeftColor: '#e8e8e8',
    borderTopWidth: 0,
    borderTopColor: '#e8e8e8',
    borderBottomWidth: 0,
    borderBottomColor: '#e8e8e8',
    height: 30,
    margin: 0,
    width: width * 0.25,
    fontSize: 12
  },
  setMeasurementSection: {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.25,
    borderRightWidth: 0,
    borderRightColor: '#e8e8e8',
    borderLeftWidth: 0,
    borderLeftColor: '#e8e8e8',
    borderTopWidth: 0,
    borderTopColor: '#e8e8e8',
    borderBottomWidth: 0,
    borderBottomColor: '#e8e8e8',
    height: 30,
    margin: 0,
    width: width * 0.25,
    fontSize: 12
  },
  columnHeaders: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    width: width * 0.96,
    marginRight: SIZING.smallGutter,
    marginLeft: SIZING.smallGutter,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  },
  addedColumnHeaders: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
  },
  setNumberHeader: {
    padding: SIZING.smallGutter,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.10,
    borderRightWidth: 1,
    borderRightColor: '#e8e8e8'
  },
  setPreviousHeader: {
    padding: SIZING.smallGutter,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.36,
    borderRightWidth: 1,
    borderRightColor: '#e8e8e8'
  },
  setWieghtHeader: {
    padding: SIZING.smallGutter,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.25,
    borderRightWidth: 1,
    borderRightColor: '#e8e8e8'
  },
  setMeasurementHeader: {
    padding: SIZING.smallGutter,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.25
  },
  modificationsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  modification: {
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 2,
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    marginTop: 3,
    marginRight: 3
  },
  modificationText: {
    fontSize: 8,
    color: 'rgba(0,0,0,0.3)'
  },
});

export default SelectedExercise;
