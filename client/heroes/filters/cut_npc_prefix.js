angular.module('dota2stats').filter('cut_npc_prefix', function() {
      return function(str) {
        return str.substring(14);
      }
    }
  );
