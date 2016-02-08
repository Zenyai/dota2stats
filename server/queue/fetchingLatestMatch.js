Meteor.startup(function () {
  var getData = function (){
    dota.getByHeroID(12, function(err, res){
      if(!err){
        // for ( property in res.matches ) {
        //   console.log( property ); // Outputs: foo, fiz or fiz, foo
        // }
        var match_id = res.matches[1].match_id;
        console.log(match_id);
        dota.getMatchDetails(match_id, function(err, res){
          for(r in res){
            console.log(r);
          }
        });
      }
    });
  }

  Queue.add({command: getData()});
});
