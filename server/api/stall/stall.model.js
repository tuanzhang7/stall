'use strict';

import mongoose from 'mongoose';

var StallSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  postcode: {type: String, required: true},
  loc: {
    type: {type: String},
    coordinates: []
  },
  image: String,
  category: String,
  selfService: {type: Boolean, default: true},
  active: {type: Boolean, default: true},
  dishes: [
    {
      dish: String,
      image: String,
      prices: [
        {portion: String, price: Number}
      ],
      options: [String]
    }
  ]
});
StallSchema.index({loc: '2dsphere'});
export default mongoose.model('Stall', StallSchema);
