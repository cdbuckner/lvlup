import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('users', function tasksPublication() {
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
  'users.onboard'(userId, privacy, sharing, sex, age, weight) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Meteor.users.update({_id: userId}, {$set: {"profile.privacy": privacy}});
    Meteor.users.update({_id: userId}, {$set: {"profile.sharing": sharing}});
    Meteor.users.update({_id: userId}, {$set: {"profile.sex": sex}});
    Meteor.users.update({_id: userId}, {$set: {"profile.age": age}});
    Meteor.users.update({_id: userId}, {$set: {"profile.weight": weight}});
  },
});
