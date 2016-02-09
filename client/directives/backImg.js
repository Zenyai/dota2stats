angular.module('dota2stats').directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background': 'linear-gradient(rgba(20, 16, 40, 0.25),rgba(17, 13, 19, 0.25)), url(' + value +')',
                'background-size' : 'cover'
            });
        });
    };
});
