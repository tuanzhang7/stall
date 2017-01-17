'use strict';

import angular from 'angular';
import LoginController from './login.controller';
import LoginModalController from './login.modal.controller';
export default angular.module('stallApp.login', [])
  .controller('LoginController', LoginController)
  .controller('LoginModalController', LoginModalController)
  .name;
