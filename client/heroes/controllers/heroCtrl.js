angular.module('dota2stats').controller('heroCtrl', ['$scope', '$stateParams', '$reactive', '$location',
function($scope, $stateParams, $reactive, $location) {
  $reactive(this).attach($scope);

  var vs = this;

  this.hero_name = $stateParams.hero_name;
  this.hero_id = 0;
  this.showinfo = false;
  this.infotext = true;
  this.infoval = "Loading hero data.."

  var off = $scope.$on('$stateChangeStart', function(evt,  toState, toParams, fromState, fromParams) {
   evt.preventDefault();
   $state.params = toParams;
   angular.copy($state.params, $stateParams);
   off();
  });
  off();

  this.helpers({
    hero: () => {
      return Heroes.findOne({
        name: 'npc_dota_hero_' + this.getReactively('hero_name')
      });
    },
    hero_matches: () => {
      return Matches.find({
        herolist: this.getReactively('hero_id')
      });
    },
    analytics: () => {
      return Analytics.findOne({
        type: "hero",
        hero_id: this.getReactively('hero_id')
      })
    },
    herosearch: () => {
      return Heroes.find({}).fetch();
    }
  });

  this.changeHero = function(heroname){
      vs.hero_name = heroname.replace(/ /g,"_").toLowerCase();
      $location.path('/hero/' + vs.hero_name).replace();
  }

  this.searchSelected = function(selected) {
    if (selected) {
      vs.changeHero(selected.description.name.substr(14));
    }
  };

  this.searchChanged = function(changes){
    vs.searchField = changes;
  }

  this.search = function() {
    vs.changeHero(vs.searchField);
  };


  this.autorun(() => {
    if (!this.hero){
      vs.showinfo = false;
      vs.infotext = true;
      if(vs.hero_id != undefined){
        vs.infoval = "This hero doesn't exist in our database"
        vs.placeholdertxt = "Type hero name.."
      }
      return;
    }

    if (!this.analytics)
      return;

    this.showinfo = true;
    this.infotext = false;

    vs.hero_id = this.getReactively('hero.hero_id');
    var wl_ratio = this.analytics.wl_ratio.toFixed(2);
    vs.placeholdertxt = this.hero.localized_name;

    $scope.wl_labels = ["Win", "Lose"];
    $scope.wl_data = [wl_ratio, 1 - wl_ratio];
    $scope.wl_colour = ["#1ae716", "#da1111"];

    this.range_type = "Melee";
    if (this.hero.herostat.Range > 128) {
      this.range_type = "Range";
    }

    this.primary_stat = "Strength";
    switch (this.hero.herostat.PrimaryStat) {
      case 1:
        this.primary_stat = "Agility";
        break;
      case 2:
        this.primary_stat = "Intelligence";
        break;
    }
  });
}]);
