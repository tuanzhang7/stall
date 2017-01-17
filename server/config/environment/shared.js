'use strict';

exports = module.exports = {
  // List of user roles
  userRoles: ['guest', 'user', 'admin'],
  recaptcha: {
    key: process.env.recaptchaSiteKey || '6Ld7oSATAAAAAPZbDnU_m5x-jmFEQoKgxIXFIWmy'
    //prod
    // key: '6Ld7oSATAAAAAPZbDnU_m5x-jmFEQoKgxIXFIWmy'
    //local
    //key: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
  },
  ageEnum: [
    {key: 1, value: '18 ~ 25'},
    {key: 2, value: '25 ~ 35'},
    {key: 3, value: '>35'}
  ],
  pageSize: 10
};
