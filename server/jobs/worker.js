// var getData = function (hero_id){
//   console.log("Get data hero_id" + hero_id);
//   dota.getByHeroID(hero_id, Meteor.bindEnvironment(function(err, res){
//     if(!err){
//       for(i = 0; i < res.matches.length; i++){
//           var match_id = res.matches[i].match_id;
//           var count = Matches.find({match_id: match_id}).count();
//           if (count === 0){
//             dota.getMatchDetails(match_id, Meteor.bindEnvironment(function(err, res){
//
//               var players = res.players;
//               res.heroes = [];
//               for(j = 0; j < players.length; j++){
//                 res.heroes.push(players[j].hero_id);
//               }
//
//               Matches.insert(res);
//             }));
//           }
//       }
//     }
//   }));
// };
//
// var getMatches = function(){
//   var allHeroes = Heroes.find().fetch();
//   for(i = 0; i < allHeroes.length; i++){
//     var hero = allHeroes[i];
//     Queue.add({ command: 'getData(' + hero.hero_id + ');' });
//   }
//   Queue.run();
// }
//
// getMatches();
// Queue.setInterval('getMatches', 'getMatches()', 600000);
