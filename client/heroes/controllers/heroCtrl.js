angular.module('dota2stats').controller('heroCtrl', ['$scope', '$stateParams', '$reactive', '$location',
  function($scope, $stateParams, $reactive, $location) {
    $reactive(this).attach($scope);

    this.subscribe("hero");
    this.subscribe("analytics");
    var vs = this;

    this.changeHero = function(heroname) {
      vs.hero_name = heroname.replace(/ /g, "_").toLowerCase();
      $scope.$broadcast('angucomplete-alt:clearInput');
      $location.search({
        'name': vs.hero_name
      })
      vs.infoval = "This hero doesn't exist in our database"
      vs.placeholdertxt = "Type hero name.."
    }

    if ($stateParams.name) {
      this.changeHero($stateParams.name);
    }

    this.hero_name = $location.search().name;
    if (!this.hero_name) {
      vs.infoval = "This hero doesn't exist in our database"
      vs.placeholdertxt = "Type hero name.."
    } else {
      vs.infoval = "Loading hero data.."
    }
    this.hero_id = 0;
    this.showinfo = false;
    this.infotext = true;

    this.helpers({
      hero: () => {
        return Heroes.findOne({
          name: 'npc_dota_hero_' + this.getReactively('hero_name')
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

    this.autorun(() => {
      if (!this.getReactively('hero') || !this.getReactively('analytics')) {
        vs.showinfo = false;
        vs.infotext = true;
        return;
      }

      vs.firstload = true;
      this.showinfo = true;
      this.infotext = false;

      vs.hero_id = this.getReactively('hero.hero_id');
      var wl_ratio = this.getReactively('analytics').wl_ratio.toFixed(2);
      vs.placeholdertxt = this.getReactively('hero').localized_name;

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
  }
]);
