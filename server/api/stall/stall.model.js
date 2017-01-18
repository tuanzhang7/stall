'use strict';

import mongoose from 'mongoose';

var StallSchema = new mongoose.Schema({
  name: String,
  address: String,
  postcode: String,
  loc: {
    coordinates: [],
    type: {type: String}
  },
  image: String,
  category: String,
  selfService: Boolean,
  isOpenNow: Boolean,
  active: Boolean
});
StallSchema.index({loc: '2dsphere'});
export default mongoose.model('Stall', StallSchema);
