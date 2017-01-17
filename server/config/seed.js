/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Stall from '../api/stall/stall.model';

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'editor',
      email: 'stalldb@gmail.com',
      password: '1qazxsW@'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
Stall.find({}).remove()
  .then(() => {
    var stalls = [{
      id: '42',
      stall: '香港油鸡饭面',
      address: '335 Smith St,#02-125, Chinatown Food Complex, Singapore 050335',
      lat: 1.282159,
      long: 103.843422,
      menu: [{
        dish: '油鸡 Soya Sauce Chicken',
        image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfcktJS2dUbl8wb3c',
        Types: [{
          Portion: '1只 1',
          price: 14
        }, {
          Portion: '半只 half',
          price: 7
        }]
      }, {
        dish: '油鸡面 Soya Sauce Chicken Noodle',
        image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfam5scTlnM29oQzA',
        price: 2.5
      }, {
        dish: '油鸡饭 Soya Sauce Chicken Rice',
        image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfb3ZrenVfVjVmVms',
        price: 2.5
      }, {
        dish: '叉烧面 Char Siew Noodle',
        image: 'cha_shao_main.jpg',
        price: 2.5
      }, {
        dish: '水饺面 Dumpling Noodle',
        image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfSUxiS3RJcU54Q28',
        price: 3.0
      }, {
        dish: '油鸡河粉 Soya Sauce Chicken Hor Fen',
        image: 'he_fen.jpg ',
        price: 2.5
      }]
    }];
    Stall.create(stalls);
  });
