/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/stalls              ->  index
 * POST    /api/stalls              ->  create
 * GET     /api/stalls/:id          ->  show
 * PUT     /api/stalls/:id          ->  upsert
 * PATCH   /api/stalls/:id          ->  patch
 * DELETE  /api/stalls/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Order from './order.model';
// import _ from 'lodash';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}
// function unsetDishes(entity){
//   if(entity) {
//     console.log(entity[0].obj.image);
//     _.unset(entity[0].obj, 'image');
//     delete entity[0].obj.image;
//     Reflect.deleteProperty(entity[0].obj, 'image');
//     console.log(entity[0].obj.image);
//   }
//   return entity;
// }
// function removeDishes(res, statusCode) {
//   statusCode = statusCode || 200;
//   return function(entity) {
//     if(entity) {
//       return unsetDishes(entity);
//       // entity.forEach(function(item) {
//       //   console.log(item.obj.image);
//       //   var result = _.unset(item, 'obj.image');
//       //   console.log(result);
//       //   // delete item.obj.image;
//       //   //Reflect.deleteProperty(item.obj, 'image');
//       //   console.log(item.obj.image);
//       // });
//       // _.forEach(entity, function(item) {
//       //
//       // });
//       //return entity;
//     }
//     return null;
//   };
// }

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of stalls
export function index(req, res) {
  return Order.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function getStallOrders(req, res) {
  return Order.find(
    {
      stall: req.params.stallid,
      status: 'open',
    })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function getUserOrders(req, res) {
  var _status = req.query.status;// || 'open';
  var query = {customer: req.params.userId};
  if(_status) {
    query.status = {
      $eq: _status
    };
  }
  return Order.find(query)
    .sort({ orderTime: -1})
    .limit(10)
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function getNumOfQueueByStall(req, res) {
  var stallId = req.params.stallId;
  return Order.count(
    {
      stall: stallId,
      status: 'open',
    })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function getNumOfQueueByOrder(req, res) {
  var _orderId = parseInt(req.params.orderId, 10);
  Order.findOne({
    orderId: _orderId
  }).exec()
  .then(handleEntityNotFound(res))
  .then(order => {
    if(order) {
      var _stallid = order.stall;
      console.log('_stallid:' + _stallid + ' _orderId:' + _orderId);

      // return Order.count(
      //   {
      //     stall: _stallid,
      //     status: 'open',
      //     orderId: { $gt: _orderId }
      //   }).exec();
      Order.count(
        {
          stall: _stallid,
          status: 'open',
          orderId: { $gt: _orderId }
        },
        function(err, c) {
          console.log('count:' + c);
          if(err){
            return res.status(500).send(err);
          }
          return res.status(200).json(c);
        });
    }else {
      console.log('order not found:' + _orderId);
      res.status(404).end();
      return null;
    }
  })
  // .then(handleEntityNotFound(res))
  // .then(respondWithResult(res))
  .catch(handleError(res));
}
// Gets a single stall from the DB
// export function show(req, res) {
//   return stall.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }
export function show(req, res) {
  Order.findOne({
    orderId: req.params.id
  })
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Creates a new stall in the DB
export function create(req, res) {
  return Order.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given stall in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Order.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing stall in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Order.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a stall from the DB
export function destroy(req, res) {
  return Order.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
