import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('users', function tasksPublication() {
    return Meteor.users.find({}, {fields: {
      username: true,
      profile: true
    }});
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
  'users.updateHealthkitData'(weight, age, sex) {
    let userId = Meteor.userId();

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Meteor.users.update({_id: userId}, {$set: {"profile.sex": sex}});
    Meteor.users.update({_id: userId}, {$set: {"profile.age": age}});
    Meteor.users.update({_id: userId}, {$set: {"profile.weight": weight}});
  },
  'users.verifyInfo'(privacy, sharing, age, sex, weight) {
    let userId = Meteor.userId();

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Meteor.users.update({_id: userId}, {$set: {"profile.sex": sex}});
    Meteor.users.update({_id: userId}, {$set: {"profile.age": age}});
    Meteor.users.update({_id: userId}, {$set: {"profile.weight": weight}});
    Meteor.users.update({_id: userId}, {$set: {"profile.privacy": privacy}});
    Meteor.users.update({_id: userId}, {$set: {"profile.sharing": sharing}});
  },
  'user.makeFriends'(toId, fromId) {
    Meteor.users.update({_id: toId}, { $push: { 'profile.friends': fromId } });
    Meteor.users.update({_id: fromId}, { $push: { 'profile.friends': toId } });
  }
});
