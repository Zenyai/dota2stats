angular.module('dota2stats').controller('heroCtrl', ['$scope', '$stateParams', '$reactive', function($scope, $stateParams, $reactive) {
  $reactive(this).attach($scope);

  this.hero_name = $stateParams.hero_name;
  this.hero_id = 0;

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
        hero_id: this.getReactively('hero_id')
      })
    }
  });

  this.autorun(() => {
    if (!this.hero)
      return;

    if(!this.analytics)
      return;

    this.hero_id = this.hero.hero_id;
    var wl_ratio = this.analytics.wl_ratio.toFixed(2);

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
