import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// Task component - represents a single todo item
export default class Task extends Component {
  render() {

    return (
      <div></div>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};
