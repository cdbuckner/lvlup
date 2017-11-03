import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('messages', function tasksPublication() {
    return Messages.find({});
  });
}

export default Messages;

Meteor.methods({
  'messages.friendInvite'(from, to) {

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.insert({
      from: from,
      to: to,
      type: 'friend invite',
      _id: Random.id(),
      createdAt: new Date(),
    });
  },
  'messages.friendInviteApproved'(messageId, from, to) {

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.insert({
      from: from,
      to: to,
      type: 'friend invite approved',
      _id: Random.id(),
      createdAt: new Date(),
    });

    Messages.remove(messageId);
  },
  'messages.friendInviteDeclined'(messageId, to, from) {

    Messages.insert({
      from: from,
      to: to,
      type: 'friend invite declined',
      _id: Random.id(),
      createdAt: new Date(),
    });

    Messages.remove(messageId);
  },
  'messages.requestVerification'(from, to) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.insert({
      from: from,
      to: to,
      type: 'verification request',
      _id: Random.id()
    });
  },
  'messages.reactToActivity'(from, to, reaction) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.insert({
      from: from,
      to: to,
      reaction: reaction,
      type: 'reaction',
      _id: Random.id()
    });
  },
  'messages.hide'(messageId) {

    Messages.remove(messageId);
  },
});
