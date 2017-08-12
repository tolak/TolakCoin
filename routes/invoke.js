'use strict';

/*
 * Chaincode Invoke
 */
var express = require('express');
var router = express.Router();
var hfc = require('fabric-client');
var path = require('path');
var fs = require('fs');
var transfer = require('../eth/transfer.js');

router.post('/', function(req, res, next) {
    var from = req.body.from;
    var to = req.body.to;
    var amount = req.body.amount;

    console.log('catch post request at /invoke');
    console.log(from + "==>" + to + " : " + amount);

    transfer(from, to, amount, function(err, response){
        if (response.status === '200') {
            console.log('Successfully sent transaction.');
            res.status(200).json({msg: 'done'});
        } else {
            console.error('Failed to order the transaction. Error code: ' + response.status);
            res.status(404).json({msg: 'Bad proposal.'});
        }
    });
});


module.exports = router;
