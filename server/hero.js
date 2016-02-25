Meteor.publish("hero", function () {
  return Heroes.find({});
});
