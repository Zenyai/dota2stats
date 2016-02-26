// Insert heroes data into out databases

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

Meteor.startup(function() {
  if (Heroes.find().count() === 0) {
    Heroes._ensureIndex({
      "hero_id": 1
    });

    HTTP.call('GET', 'http://api.herostats.io/heroes/all', {}, function(err1, res1) {
      if (err1) {
        console.log(err1);
      } else {
        var fullstat = JSON.parse(res1.content);

        HTTP.call('GET', 'http://api.herostats.io/heroes', {}, function(err2, res2) {
          if (err2) {
            console.log(err2);
          } else {
            var herostat = JSON.parse(res2.content);

            dota.getHeroes(Meteor.bindEnvironment(function(err3, res3) {
              if (!err3) {
                var result = res3.heroes;
                for (var s in result) {
                  result[s].hero_id = result[s].id;
                  result[s].herostat_id = getKeyByValue(herostat, result[s].localized_name);

                  // this is fix for herostat windrunner name
                  if (result[s].localized_name == "Windranger")
                    result[s].herostat_id = getKeyByValue(herostat, "Windrunner");

                  result[s].herostat = fullstat[result[s].herostat_id];
                  delete(result[s].id);
                  Heroes.insert(result[s]);
                }
              }
            }));
          }
        });
      }
    });


  }
});
