import angular from 'angular';

export default angular.module('stallApp.filter.myfilter', [])
  .filter('capitalize', function() {
    return function(input) {
      return input ? input.charAt(0).toUpperCase() + input.substr(1) : '';
    };
  })
  .filter('mins', function() {
    return function(input) {
      return input ? input + ' mins' : '';
    };
  })
  .filter('yesno', function() {
    return function(input) {
      return input ? 'Yes' : 'No';
    };
  })
  .name;
