'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
  orderId: {type: Number, required: true, unique: true},
  customer: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
  stall: {type: Schema.Types.ObjectId, required: true, ref: 'Stall'},
  stallName: {type: String, required: true},
  customerPhone: {type: Number},
  orderTime: {type: Date, required: true},
  // queueNumer: {type: Number, required: true},
  totalAmount: {type: Number, required: true},
  notes: {type: String},
  customerLoc: {
    type: {type: String},
    coordinates: []
  },
  takeAway: {type: Boolean, default: false},
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
  ],
  status: {type: String, enum: ['open', 'canceled', 'closed'],
    default: ['open'], required: true}
});
OrderSchema.index({customerLoc: '2dsphere'});
export default mongoose.model('Order', OrderSchema);
