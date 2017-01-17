import angular from 'angular';

export class FooterComponent {}

export default angular.module('directives.footer', [])
  .component('footers', {
    template: require('./footer.html'),
    controller: FooterComponent
  })
  .name;
