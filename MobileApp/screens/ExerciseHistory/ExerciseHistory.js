import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActionSheet } from "native-base";
import Moment from 'moment';
import { NavigationActions } from 'react-navigation';
import Meteor, { createContainer } from 'react-native-meteor';
import BackButton from "../../components/BackButton";

class ExerciseHistory extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Exercise History',
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
    headerLeft: <BackButton type={'close-down'} navigation={navigation} confirmation={false}/>
  })

  componentDidMount() {
    console.log(this.props.navigation);
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.description}>You have no history with this exercise.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: SIZING.mediumGutter
  },
  description: {
    margin: SIZING.mediumGutter,
    color: "rgba(0,0,0,0.2)",
    textAlign: 'center'
  },
});

export default ExerciseHistory;
