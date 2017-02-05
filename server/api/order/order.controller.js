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
import Stall from './stall.model';
import _ from 'lodash';

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
  return Stall.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
// Gets a list of stalls
export function nearby(req, res) {
  var coord = req.params.coord;
  var LatLng = coord.split(',');
  var lat = parseFloat(LatLng[0]);
  var lng = parseFloat(LatLng[1]);
  // console.log('lat:' + lat + 'lng:' + lng);
  var point = { type: 'Point', coordinates: [lng, lat] };
  //var point = [lng, lat];
  //maxDistance in meter
  Stall.geoNear(point,
    {
      maxDistance: 500,
      spherical: true,
      query: {active: true},
      num: 10
    }, function(err, results) {
      if(err){
        return res.status(500).send(err);
      }else{
        if(results) {
          var stalls = [];
          // var stall = results[0].obj.toObject();
          _.forEach(results, function(item) {
            var stall = item.obj.toObject();
            _.unset(stall, ['dishes']);
            item.obj = stall;
            stalls.push(item);
          });

          return res.status(200).json(stalls);
        }
        return null;
      }
    });
  // unsetDishes(stalls);
  // return Stall.geoNear(point,
  //   {
  //     maxDistance: 500,
  //     spherical: true,
  //     query: {isOpenNow: true, active: true},
  //     num: 10
  //   })
  //   .then(removeDishes(res))
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
}

// Gets a single stall from the DB
// export function show(req, res) {
//   return stall.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }
export function show(req, res) {
  Stall.findOne({
    number: req.params.id
  })
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Creates a new stall in the DB
export function create(req, res) {
  return Stall.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given stall in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Stall.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing stall in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Stall.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a stall from the DB
export function destroy(req, res) {
  return Stall.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
