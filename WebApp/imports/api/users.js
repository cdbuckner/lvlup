import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('allUsers', function tasksPublication() {
    return Meteor.users.find({}, {fields:{username: true}});
  });
}

Meteor.methods({
  'users.new'(messageId, message, activity) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

  },
});
