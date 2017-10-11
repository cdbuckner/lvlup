import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Activities } from '../api/activities.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
  }

  addAnActivity() {
    Meteor.call('activities.new', "Running", "10", true, true, (err, res) => {
      alert('activities.new', err, res);
    });
  }

  render() {

    return (
      <div className="container">
        <p>OMG it worked.</p>
        <button onClick={this.addAnActivity.bind(this)}>

        </button>
      </div>
    );
  }
}

App.propTypes = {

};

export default App;
