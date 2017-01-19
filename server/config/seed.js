/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Stall from '../api/stall/stall.model';
import mongoose from 'mongoose';

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
var id = mongoose.Types.ObjectId('507f1f77bcf86cd799439011');
Stall.find({}).remove()
  .then(() => {
    var stalls = [
      {
        _id: id,
        name: '香港油鸡饭面',
        address: '335 Smith St,#02-125, Chinatown Food Complex, Singapore 050335',
        postcode: '050335',
        loc: {
          type: 'Point',
          coordinates: [103.843422, 1.282159]
        },
        image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfdk5PVlEweG93bDA',
        category: 'Chicken Rice',
        selfService: true,
        isOpenNow: false,
        active: true,
        dishes: [{
          dish: '油鸡 Soya Sauce Chicken',
          image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfcktJS2dUbl8wb3c',
          prices: [{
            portion: '1只 1',
            price: 14.00
          }, {
            portion: '半只 half',
            price: 7.00
          }]
        }, {
          dish: '油鸡面 Soya Sauce Chicken Noodle',
          image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfam5scTlnM29oQzA',
          prices: [
            {price: 2.5}
          ],
          options: ['mee kia', 'mee boo']
        }, {
          dish: '油鸡饭 Soya Sauce Chicken Rice',
          image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfb3ZrenVfVjVmVms',
          prices: [
            {price: 2.5}
          ],
        }, {
          dish: '叉烧面 Char Siew Noodle',
          image: 'cha_shao_main.jpg',
          prices: [
            {price: 2.5}
          ],
        }, {
          dish: '水饺面 Dumpling Noodle',
          image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfSUxiS3RJcU54Q28',
          prices: [
            {price: 3.0}
          ],
        }, {
          dish: '油鸡河粉 Soya Sauce Chicken Hor Fen',
          image: 'he_fen.jpg ',
          prices: [
            {price: 2.5}
          ],
        }]
      },
      {
        _id: mongoose.Types.ObjectId('58807a4c8e9d3a2b3492955e'),
        name: '张记鱼汤',
        address: '335 Smith St,#02-125, Chinatown Food Complex, Singapore 050335',
        postcode: '050335',
        loc: {
          type: 'Point',
          coordinates: [103.843422, 1.282159]
        },
        image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfdk5PVlEweG93bDA',
        category: 'Fish Soap',
        selfService: true,
        isOpenNow: false,
        active: true,
        dishes: [
          {
            dish: '鱼片汤 Sliced Fish Soap',
            image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfcktJS2dUbl8wb3c',
            options: ['粗米粉 Thick Bee Hoon', '幼米粉 Bee Hoon', '伊面 Ee Mian', '面线 Mee Sua'],
            prices: [{
              portion: '',
              price: 4.00
            }, {
              portion: '',
              price: 5.00
            }, {
              portion: '',
              price: 6.00
            }]
          },
          {
            dish: '炸鱼汤 Fried Fish Soap',
            image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfcktJS2dUbl8wb3c',
            options: ['粗米粉 Thick Bee Hoon', '幼米粉 Bee Hoon', '伊面 Ee Mian', '面线 Mee Sua'],
            prices: [{
              portion: '',
              price: 4.00
            }, {
              portion: '',
              price: 5.00
            }, {
              portion: '',
              price: 6.00
            }]
          },
          {
            dish: '双鱼汤 Double Fish Soap',
            image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfcktJS2dUbl8wb3c',
            options: ['粗米粉 Thick Bee Hoon', '幼米粉 Bee Hoon', '伊面 Ee Mian', '面线 Mee Sua'],
            prices: [{
              portion: '',
              price: 4.00
            }, {
              portion: '',
              price: 5.00
            }, {
              portion: '',
              price: 6.00
            }]
          }
        ]
      }
    ];
    Stall.create(stalls);
  });
