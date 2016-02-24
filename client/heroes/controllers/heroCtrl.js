angular.module('dota2stats').controller('heroCtrl', ['$scope', '$stateParams', '$reactive', function($scope, $stateParams, $reactive) {
  $reactive(this).attach($scope);

  this.hero_name = $stateParams.hero_name;

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
    hero_matches_count: () => {
      return Matches.find({
        herolist: this.getReactively('hero_id')
      }).count();
    }
  });

  this.autorun(() => {
    if (!this.hero)
      return;

    this.hero_id = this.hero.hero_id;

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
