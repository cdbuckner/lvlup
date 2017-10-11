import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('messages', function tasksPublication() {
    return Messages.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}


Meteor.methods({
  'messages.new'(messageId, message, activity) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.insert({
      message,
      activity,
      acknowledged: false,
      createdAt: new Date(),
      from: Meteor.userId(),
    });
  },
  'messages.hide'(activityId) {
    check(activityId, String);

    const activity = Activities.findOne(activityId);
    if (activity.private && activity.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Activities.remove(activityId);
  },
});
