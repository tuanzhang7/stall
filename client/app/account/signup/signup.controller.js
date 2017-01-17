'use strict';
// @flow

import angular from 'angular';

type User = {
  name: string;
  //email: string;
  password: string;
  confirmPassword: string;
};

export default class SignupController {
  user: User = {
    name: '',
    //email: '',
    password: '',
    confirmPassword: ''
  };
  errors = {};
  submitted = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor(Auth, $state, appConfig) {
    this.Auth = Auth;
    this.$state = $state;
    this.gRecaptchaResponse = null;
    this.model = {
      key: appConfig.recaptcha.key
    };
    console.log('recaptcha.key:' + appConfig.recaptcha.key);
  }

  register(form) {
    this.submitted = true;

    if(form.$valid) {
      return this.Auth.createUser({
        name: this.user.name,
        //email: this.user.email,
        password: this.user.password,
        reCaptchaResponse: this.gRecaptchaResponse
      })
      .then(() => {
        // Account created, redirect to home
        this.$state.go('main');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};
        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
}
