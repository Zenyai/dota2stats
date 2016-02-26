angular.module('dota2stats').controller('homeCtrl', ['$scope', '$stateParams', '$reactive', '$location', '$state',
  function($scope, $stateParams, $reactive, $location, $state) {
    $reactive(this).attach($scope);

    var vs = this;
    this.subscribe("hero");
    this.subscribe("analytics");

    this.helpers({
      herosearch: () => {
        return Heroes.find({}).fetch();
      },
      analytics: () => {
        return Analytics.findOne({
          type: "overall"
        })
      },
    });

    this.autorun(() => {
      if (this.getReactively('analytics')) {
        this.start_date = moment(this.getReactively('analytics.first_match')).format('MMM Do YY');
        this.end_date = moment(this.getReactively('analytics.latest_match')).format('MMM Do YY');
      }
    });

    this.changeHero = function(heroname) {
      $state.go('heroDetails', {
        'name': heroname.replace(/ /g, "_").toLowerCase()
      });
    }

    this.searchSelected = function(selected) {
      if (selected) {
        vs.changeHero(selected.description.name.substr(14));
      }
    };

    this.searchChanged = function(changes) {
      vs.searchField = changes;
    }

    this.search = function() {
      vs.changeHero(vs.searchField);
    };


  }
]);
