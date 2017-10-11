import React from 'react';
import { TextInput, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Form, ListItem, CheckBox, Body, Item, Input, Button } from 'native-base';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Meteor, { createContainer } from 'react-native-meteor';

let {height, width} = Dimensions.get('window');

class SelectedExercise extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { exercise, index, addSet, removeExercise, removeSet, editing } = this.props;

    return (
      <View style={styles.exerciseContainer}>
        <View style={styles.exerciseTitleSection}>
          <View style={styles.exerciseTitle}>
            <Text>
              { exercise.workoutType }
            </Text>
          </View>
          <TouchableOpacity style={styles.historyButton}>
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
                Previous
              </Text>
            </View>
            <View style={styles.setWieghtHeader}>
              <Text>
                Weight
              </Text>
            </View>
            <View style={styles.setMeasurementHeader}>
              <Text>
                Reps
              </Text>
            </View>
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
                      <Text>
                        { set.previous }
                      </Text>
                    </View>
                    <TextInput
                      value={ set.weight }
                      style={styles.setWieghtSection}
                      keyboardType={'numeric'}
                    />
                    <TextInput
                      value={ set.measurement }
                      style={styles.setMeasurementSection}
                      keyboardType={'numeric'}
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
    width: width * 0.25
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
    width: width * 0.25
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
  }
});

export default SelectedExercise;
