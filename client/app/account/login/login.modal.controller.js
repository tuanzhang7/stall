'use strict';
// @flow

type User = {
  name: string;
  email: string;
  password: string;
};

export default class LoginModalController {
  user: User = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor(Auth, $state, $uibModalInstance) {
    this.Auth = Auth;
    this.$state = $state;
    this.$uibModalInstance = $uibModalInstance;
  }

  login(form) {
    this.submitted = true;
    if(form.$valid) {
      this.Auth.login({
        // email: this.user.email,
        username: this.user.name,
        password: this.user.password
      })
        .then(() => {
          // Logged in, redirect to home
          if(this.$state.is('login')){
            this.$state.go('main');
          }
          console.log('login');
          this.$uibModalInstance.dismiss('cancel');
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }

  cancel(){
    this.$uibModalInstance.dismiss('cancel');
  }
}
