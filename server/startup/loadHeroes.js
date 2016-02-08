// Insert heroes data into out databases

Meteor.startup(function () {
  Heroes._ensureIndex({ "heroID": 1});
   if (Heroes.find().count() === 0) {
    dota.getHeroes(Meteor.bindEnvironment(function(err, res){
      if(!err){
        var result = res.heroes;
         for(var s in result){
           result[s].heroID = result[s].id;
           delete(result[s].id);
           Heroes.insert(result[s]);
         }
      }
    }));
   }
 });
