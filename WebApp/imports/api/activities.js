import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';

export const Activities = new Mongo.Collection('activities');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('activities', function tasksPublication() {
    return Activities.find({});
  });
}

export default Activities;

Meteor.methods({
  'activities.new'(activity, text, measurement, needsVerification, owner, private) {
    check(text, String);

    console.log({message: 'activities.new fired',
                  text: text,
                  activity: activity,
                  measurement: measurement,
                  needsVerification: needsVerification,
                  private: private,
                  tauntedBy: [],
                  cheeredBy: [],
                  verified: false,
                  owner: owner,
                  username: owner.username,
                  _id: Random.id() });

    Activities.insert({
      text,
      activity,
      measurement,
      needsVerification,
      private,
      tauntedBy: [],
      cheeredBy: [],
      verified: false,
      createdAt: new Date(),
      owner: 1,
      username: owner.username,
      _id: Random.id()
    });
  },
  'activities.delete'(activityId) {
    check(activityId, String);

    const activity = Activities.findOne(activityId);
    if (activity.private && activity.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Activities.remove(activityId);
  },
  'activities.cheer'(activityId, userName) {

    Activities.update(activityId, { $push: { cheeredBy: userName } });
  },
  'activities.taunt'(activityId, userName) {

    Activities.update(activityId, { $push: { tauntedBy: userName } });
  },
  'activities.setToPrivate'(activityId, setToPrivate) {
    check(activityId, String);
    check(setToPrivate, Boolean);

    const activity = Activities.findOne(activityId);

    // Make sure only the task owner can make a task private
    if (activity.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Activities.update(activityId, { $set: { private: setToPrivate } });
  },
});
