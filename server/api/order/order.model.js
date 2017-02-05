'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
  orderId: {type: String, required: true, unique: true},
  customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
  stall: {type: Schema.Types.ObjectId, ref: 'Stall'},
  orderTime: {type: Date, required: true},
  totalAmount: {type: Number, required: true},
  notes: {type: String, required: true},
  customerLoc: {
    type: {type: String},
    coordinates: []
  },
  isTakeAway: {type: Boolean, default: false},
  dishes: [
    {
      _id: String,
      dish: String,
      image: String,
      qty: {type: Number, required: true},
      price: {type: Number, required: true},
      portion: String,
      options: String
    }
  ]
});
OrderSchema.index({customerLoc: '2dsphere'});
export default mongoose.model('Order', OrderSchema);
