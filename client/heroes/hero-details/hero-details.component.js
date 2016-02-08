angular.module('dota2stats').directive('heroDetails', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/heroes/hero-details/hero-details.html',
    controllerAs: 'heroDetails',
    controller: function ($scope, $stateParams, $reactive) {
      $reactive(this).attach($scope);

      this.hero = Heroes.findOne({hero_id: parseInt($stateParams.heroID)});

      this.range_type = "Melee";
      if(this.hero.herostat.Range > 128){
        this.range_type = "Range";
      }

    }
  };
});
