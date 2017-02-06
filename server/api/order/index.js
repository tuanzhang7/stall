'use strict';

var express = require('express');
var controller = require('./order.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/stall/:stallId', controller.getStallOrders);
router.get('/customer/:userId', controller.getUserOrders);
router.get('/queue/stall/:stallId', controller.getNumOfQueueByStall);
router.get('/queue/order/:orderId', controller.getNumOfQueueByOrder);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
