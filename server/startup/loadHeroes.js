// Insert heroes data into out databases

Meteor.startup(function () {
  Heroes._ensureIndex({ "HeroesID": 1});
   if (Heroes.find().count() === 0) {
     HTTP.call( 'GET', 'http://api.herostats.io/heroes/all', {}, function( error, response ) {
       var result = JSON.parse(response.content);
       for(var s in result){
         result[s].HeroesID = result[s].ID;
         delete(result[s].ID);
         Heroes.insert(result[s]);
       }
     });
   }
 });
