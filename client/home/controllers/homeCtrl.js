angular.module('dota2stats').controller('homeCtrl', ['$scope', '$stateParams', '$reactive', '$location', '$state',
function($scope, $stateParams, $reactive, $location, $state) {
  $reactive(this).attach($scope);

  var vs = this;

  this.helpers({
    herosearch: () => {
      return Heroes.find({}).fetch();
    }
  });

  this.changeHero = function(heroname){
      $state.go('heroDetails', {'name': heroname.replace(/ /g,"_").toLowerCase()});
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


}]);
