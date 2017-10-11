import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { TabNavigator } from "react-navigation";
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

var {height, width} = Dimensions.get('window');

class You extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characteristics: {
        'Speed': 20,
        'Cardio Endurance': 45,
        'Muscular Strength': 76,
        'Muscular Endurance': 63,
        'Flexability': 10,
        'Helpfulness': 67
      }
    }

  }

  static navigationOptions = {
    tabBarLabel: 'You',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Icon
        size={24}
        name={'ios-contact-outline'}
        color={tintColor}
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.basicDetailsContainer}>
            <View style={styles.userNameContainer}>
              <Text style={styles.userFirstName}>
                Stephanie
              </Text>
              <Text style={styles.userLastName}>
                SCAPA
              </Text>
            </View>
            <View style={styles.userImage}>
            </View>
          </View>

          <View style={styles.characteristicsContainer}>
            <View style={styles.levelAndTitleContainer}>
              <Text style={styles.levelText}>
                Level 72
              </Text>
              <Text style={styles.titleText}>
                LONG DISTANCE WIZARD
              </Text>
            </View>
            {
              Object.keys(this.state.characteristics).map((characteristic) => {
                return (
                  <View style={styles.characteristic}>
                    <Text style={styles.characteristicName}>
                      {characteristic}
                    </Text>
                    <View style={styles.currentRatingContainer}>
                      <View style={[styles.currentRatingBar, {width: ((width *  0.88) - 10) * (this.state.characteristics[characteristic] / 100)}]}>
                      </View>
                      <Text style={styles.currentRatingText}>
                        { this.state.characteristics[characteristic] }
                      </Text>
                    </View>
                  </View>
                )
              })
            }


          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryBackground
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bumper: {
    height: 20,
    backgroundColor: COLORS.primaryBackground,
    marginBottom: SIZING.mediumGutter,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: 'absolute',
    width: width,
    top: 0,
    left: 0
  },
  basicDetailsContainer: {
    padding: SIZING.mediumGutter,
    backgroundColor: COLORS.primaryBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: SIZING.mediumGutter,
  },
  messagesButton: {
    padding: SIZING.mediumGutter,
    backgroundColor: COLORS.primaryBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    marginBottom: SIZING.mediumGutter,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  messagesButtonText: {
    fontSize: SIZING.p1
  },
  userNameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  userFirstName: {
    fontSize: SIZING.h1
  },
  userLastName: {
    fontSize: SIZING.h3
  },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 40,
    backgroundColor: 'pink',
  },
  characteristicsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBackground,
    paddingBottom: SIZING.mediumGutter,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: SIZING.mediumGutter,
  },
  levelAndTitleContainer: {
    width: width,
    padding: SIZING.mediumGutter,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  levelText: {
    fontSize: SIZING.h1,
  },
  titleText: {
    fontSize: SIZING.h3,
  },
  characteristic: {
    width: width,
    paddingTop: SIZING.mediumGutter,
    paddingLeft: SIZING.mediumGutter,
    paddingRight: SIZING.mediumGutter,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  characteristicName: {
    fontSize: SIZING.h2,
    marginBottom: 5
  },
  currentRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: SIZING.fillMediumGutters
  },
  currentRatingBar: {
    height: 10,
    width: width * 0.4,
    backgroundColor: '#e8e8e8'
  },
  currentRatingText: {
    fontSize: SIZING.p1,
    lineHeight: SIZING.p1,
  }
});

export default You;
