'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// require('font-awesome/css/font-awesome.css');
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';
import angularMoment from 'angular-moment';
import dialogsMain from 'angular-dialog-service';
require('angular-recaptcha');

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import myfilter from '../components/filter/myFilter.js';
import util from '../components/util/util.module';


import main from './main/main.component';
import constants from './app.constants';

import './app.css';

angular.module('stallApp',
  [ngCookies, ngResource, ngAnimate, ngSanitize, uiRouter, uiBootstrap,
   _Auth, account, admin, navbar,
    footer, main, constants, util, angularMoment, dialogsMain, 'vcRecaptcha',
    myfilter
  ])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth, $uibModalStack) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      $uibModalStack.dismissAll();
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });

    $rootScope.page = {
      setTitle(title) {
        this.title = title;
      }
    };
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      $rootScope.page.setTitle(toState.title || 'FReportDB');
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['stallApp'], {
      strictDi: true
    });
  });
