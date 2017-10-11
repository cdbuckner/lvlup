/**
 * Created by tsadykhov on 4/10/17.
 */

import React, { Component } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, View, ListView, ScrollView, TextInput, TouchableOpacity, Platform, Keyboard } from 'react-native';
import _ from 'lodash';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import Exercise from "./Exercise";
import NoResults from "./NoResults";
import StartSearching from "./StartSearching";
import BackButton from "../../../components/BackButton";
import EXERCISES from './ExerciseData'
import Dimensions from 'Dimensions';
const {height, width} = Dimensions.get('window');
import { COLORS, SIZING } from "../../../styles";
import Fuse from 'fuse.js';

class SelectExercises extends Component {
    constructor(props) {
      super(props);

      this.onEndReached = this.onEndReached.bind(this);
      this.onInput = this.onInput.bind(this);
      this.updateLists = this.updateLists.bind(this);
      this.updateSelectedNumbers = this.updateSelectedNumbers.bind(this);
      this.updateSelectedNumberByExercise = this.updateSelectedNumberByExercise.bind(this);

      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged : (s1, s2) => s1 !== s2
      });

      let userExercises = [];

      this.state = {
        originalData: userExercises,
        newData: userExercises,
        data: userExercises,
        selectedExercises: [],
        selectedNumbers: [],
        dataSource: ds.cloneWithRowsAndSections(userExercises),
        submitButtonDisabled: true,
        numberOfResults: 24,
        shouldOnEndReachedFire: true
      };
    }

    static navigationOptions = ({ navigation }) => ({
      title: 'Select Exercise',
      headerLeft: <BackButton type={'close-x'} navigation={navigation} />,
      mode: 'modal'
    });

    componentDidMount() {
      let baseExercises = [],
          baseExercisesWithSections = {},
          subset = [],
          subsetWithSections = {};

      baseExercises = EXERCISES;
      subset = _.slice(baseExercises, 0, this.state.numberOfResults );
      subsetWithSections = this.addSections(subset);

      this.setState({
        selectedExercises: [],
        data: baseExercises,
        newData: baseExercises,
        originalData: baseExercises,
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
          .filter((exercise) => {
            if ( exercise.name.charAt(0).toLowerCase() == letter ) {
              return exercise
            }
          })
      })

      return dataWithSections;
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

    //filters the list of exercises, fires when anything is typed in the search bar
    onInput(text) {
      let exercises = [],
          matchingExercises = [],
          exercisesMinusMatchingExercises = [],
          newExercises = [],
          fakeExercises = [],
          newExercisesWithSections = {},
          resetDataWithSections = {},
          newData = _.cloneDeep(this.state.data),
          subset = [],
          options = {
            tokenize: true,
            threshold: 0.1,
            matchAllTokens: true,
            keys: ['name'],
          },
          fuse = new Fuse(newData, options);

      if (text) {
        exercises = fuse.search(text)

        //compare selected exercises (without the isSelected property) to exercises searched for
        fakeSelectedExercises = _.cloneDeep(this.state.selectedExercises);

        _.forEach(fakeSelectedExercises, (value,key) => {
          delete fakeSelectedExercises[key].isSelected;
        })

        matchingExercises = _.intersectionWith(exercises, fakeSelectedExercises, _.isEqual);
        exercisesMinusMatchinExercises = _.differenceWith(exercises, matchingExercises, _.isEqual);

        //mark any searched for exercises which are already selected as selected
        _.forEach(matchingExercises, (value,key) => {
          matchingExercises[key].isSelected = true;
        })

        //make a new list with the correct exercises selected and no duplicates
        newExercises = _.union(matchingExercises, exercisesMinusMatchinExercises)
        newExercisesWithSections = this.addSections(newExercises)

        this.setState({
          newData: newExercises,
          dataSource: this.state.dataSource.cloneWithRowsAndSections(newExercisesWithSections),
          shouldOnEndReachedFire: false
        })
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

    updateSelectedNumberByExercise(exercise) {
      let newSelectedNumbers = _.cloneDeep(this.state.selectedNumbers);

      _.forEach(exercise.phoneNumbers, (numberObject) => {
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

    updateLists(exercise) {
      let newData = _.cloneDeep(this.state.data),
          tempData = _.cloneDeep(this.state.newData),
          newSelectedExercises = _.cloneDeep(this.state.selectedExercises),
          submitButtonActive = this.state.submitButtonActive,
          cleanExercise = _.cloneDeep(exercise);

      cleanExercise.isSelected = true;

      //check if this exercise is already in the list of selected exercises, and correct the list accordingly
      if (  _.some(this.state.selectedExercises, cleanExercise ) ) {
        newSelectedExercises = _.differenceWith(this.state.selectedExercises, [ cleanExercise ], _.isEqual);
      } else {
        newSelectedExercises = _.unionWith(this.state.selectedExercises, [ cleanExercise ], _.isEqual);
      }

      //change the source of truth list
      _.forEach(newData, (value,key) => {
        if (_.isEqual(value,exercise)) {
          newData[key].isSelected = !newData[key].isSelected;
        }
      })

      //change the currently visible list
      _.forEach(tempData, (value,key) => {
        if (_.isEqual(value,exercise)) {
          tempData[key].isSelected = !tempData[key].isSelected;
        }
      })

      //check if there are any selected exercises
      if (newSelectedExercises.length > 0) {
        submitButtonDisabled = false;
      } else {
        submitButtonDisabled = true;
      }

      newSelectedExercisesWithSections = this.addSections(tempData);

      this.setState({
        selectedExercises: newSelectedExercises,
        submitButtonDisabled: submitButtonDisabled,
        newData: tempData,
        data: newData,
        dataSource: this.state.dataSource.cloneWithRowsAndSections(newSelectedExercisesWithSections)
      })
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

    renderExercises() {
      let { navigator, exerciseSearchLoading, setExerciseResultsShowing, exerciseResultsShowing } = this.props;

      // if we are loading search suggestions then show loading screen
      if(exerciseSearchLoading && exerciseSearchText.length > 2) {
        return ( <Loading /> );
      }

      return (
        <View>
          {this.state.dataSource ?
            <ListView
              removeClippedSubviews={false}
              dataSource={this.state.dataSource}
              renderSectionHeader={this.renderSectionHeader}
              keyboardDismissMode='on-drag'
              onEndReached={() => this.onEndReached()}
              renderRow={(rowData, sectionId, rowId) => {
                return (
                  <Exercise
                    exercise={ rowData }
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
      let { disabled } = this.props;

      return (
        <View style={styles.container}>

          <TextInput
            style={ styles.input }
            onChangeText={ (text) => { this.onInput(text) } }
            placeholder="Search for exercises..."
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

          { this.renderExercises() }

          <KeyboardAvoidingView behavior={"padding"} style={ styles.addExercisesButtonContainer }>

            {this.state.selectedExercises.length > 0 ?

              <ScrollView horizontal={true} style={styles.selectedExerciseContainer} contentContainerStyle={styles.selectedExerciseContainerStyle}>
                {this.state.selectedExercises.map((selectedExercise) => {
                  return  (
                    <TouchableOpacity style={styles.selectedExercise} onPress={ () => { this.updateLists(selectedExercise); this.updateSelectedNumberByExercise(selectedExercise); } }>
                      <Icon name={"ios-close-outline"} color="#fff" size={20} style={styles.removeSelectedExerciseIcon}/>
                      <Text style={[styles.selectedExerciseText]}>
                        { selectedExercise.name }
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
              : null
            }

            <TouchableOpacity
              disabled={ this.state.submitButtonDisabled }
              onPress={ () => this.props.navigation.state.params.addExercises(this.state.selectedExercises) }
              style={ [styles.addExercisesButton, this.state.submitButtonDisabled && styles.addExercisesButtonDisabled] }
            >
              <View>
                <Text style={ [styles.addExercisesButtonText, disabled && styles.addExercisesButtonTextDisabled] }>
                  {"ADD " + this.state.selectedExercises.length + " EXERCISE(S)"}
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
    addExercisesButton: {
      width: width,
      backgroundColor: "#e8e8e8",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: SIZING.mediumGutter
    },
    addExercisesButtonText: {
      fontSize: SIZING.h3
    },
    addExercisesButtonDisabled: {
      backgroundColor: "#e8e8e8",
    },
    addExercisesButtonTextDisabled: {
      color: "rgba(255,255,255,0.4)"
    },
    addExercisesButtonContainer: {
      position: "absolute",
      bottom: 0,
      left: 0
    },
    selectedExerciseContainer: {
      backgroundColor: "#222",
      width: width,
      height: 35,
      padding: 5,
    },
    selectedExerciseContainerStyle:{
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start"
    },
    selectedExercise: {
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
    selectedExerciseText: {
      color: "#fff",
      fontSize: SIZING.p3
    },
    removeSelectedExerciseIcon: {
      marginRight: 5
    },
    sectionHeader: {
      width: width,
      height: 20,
      paddingLeft: SIZING.mediumGutter ,
      backgroundColor: COLORS.darkgrey,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    sectionHeaderText: {
      color: "#000",
      fontSize: SIZING.p3
    }
});

export default SelectExercises;
