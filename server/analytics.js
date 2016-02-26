Meteor.publish("analytics", function() {
  return Analytics.find({});
});
