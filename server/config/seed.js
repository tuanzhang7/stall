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
// var id = mongoose.Types.ObjectId('507f1f77bcf86cd799439011');
Stall.find({}).remove()
  .then(() => {
    var stalls = [
      {
        number: 4,
        name: '文庆肉脞面 Boon Keng Minced Meat Noodle',
        address: 'UE Print Food Court 61 Tai Seng Ave, Singapore 534167',
        postcode: '534167',
        loc: {
          type: 'Point',
          coordinates: [103.887362, 1.338815]
        },
        image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfMWkzUjd4WUlrNEk',
        category: 'Noodle',
        selfService: true,
        isOpenNow: true,
        active: true,
        dishes: [
          {
            dish: '肉脞面 Minced Meat Noodle',
            image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfOEZZbHhMcDlBZUU',
            prices: [
              {
                portion: '干 Dry',
                price: 3.5
              },
              {
                portion: '汤 Soup',
                price: 3.5
              }]
          },
          {
            dish: '鱼圆面 Fishball Noodle',
            image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfUHNjY0tGeUNoUkE',
            prices: [
              {
                portion: '干 Dry',
                price: 3.0
              },
              {
                portion: '汤 Soup',
                price: 3.0
              }
            ]
          },
          {
            dish: '小锅面/饭 Mini Pot Noodle/Rice',
            image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfVVJDenRIS184cW8',
            prices: [
              {
                price: 4.5
              }],
            options: ['面 Noodle', '饭 Rice']
          }
        ]
      },
      {
        number: 1,
        name: '闽南抢滩排骨虾面 Pork Rip Prawn Noodle',
        address: 'St83 Seng Poh Rd ,#02-31, Singapore 168898',
        postcode: '168898',
        loc: {
          type: 'Point',
          coordinates: [103.832667, 1.284981]
        },
        image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfa0Q1QjJNM1VMQms',
        category: 'Prawn Noodle',
        selfService: true,
        isOpenNow: false,
        active: true,
        dishes: [
          {
            dish: '抢滩排骨虾面 (汤) Pork Rip Prawn Noodle (Soup)',
            image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfRGk5OE5jRUlSbkE',
            prices: [
              {
                price: 4.5
              }, {
                price: 5.5
              }]
          },
          {
            dish: '抢滩排骨虾面 (干) Pork Rip Prawn Noodle (Dry)',
            image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfczhiMk1Rc3RXckk',
            prices: [
              {
                price: 4.5
              }, {
                price: 5.5
              }]
          },
          {
            dish: '抢滩猪尾汤 Pig\'s Tail Soup',
            image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfWGxZZURFM3hLTms',
            prices: [
              {
                price: 4.0
              }, {
                price: 5.0
              }]
          },
          {
            dish: '虾面 (汤) Prawn Noodle (Soup)',
            image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfRmlkNzNmOFNQeUk',
            prices: [
              {
                price: 3.0
              }, {
                price: 4.0
              }]
          },
          {
            dish: '虾面 (干) Prawn Noodle (Dry)',
            image: 'https://drive.google.com/open?id=0B8UHjrLAAKYfRmlkNzNmOFNQeUk',
            prices: [
              {
                price: 3.0
              }, {
                price: 4.0
              }]
          }
        ]
      },
      {
        name: '香港油鸡饭面',
        number: 2,
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
        number: 3,
        address: '12 New Industrial Rd, Singapore 536202',
        postcode: '536202',
        loc: {
          type: 'Point',
          coordinates: [103.885723, 1.342685]
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
