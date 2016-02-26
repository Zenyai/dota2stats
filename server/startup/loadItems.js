  Meteor.startup(function() {
    if (Items.find().count() === 0) {

      HTTP.call('GET', 'https://api.steampowered.com/IEconDOTA2_570/GetGameItems/V001/?key=' + apikey + '&language=en', {}, function(err, res) {
        if (err) {
          console.log(err);
        } else {
          var result = JSON.parse(res.content);
          for (var s in result.result.items) {
            Items.insert(result.result.items[s]);
          }
        }
      });

    }
  });
