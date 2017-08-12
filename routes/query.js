'use strict';

/*
 * TolakCoin Query Program
 */
var express = require('express');
var router = express.Router();
var hfc = require('fabric-client');
var path = require('path');
var fs = require('fs');
var queryAsset = require('../eth/query.js');

router.post('/', function(req, res, next) {
    var id = req.body.queryUser;

    queryAsset(id, function(err, response){
        if (response.status !== "200") {
                console.log("No payloads were returned from query");
                res.status(404).json({msg: 'Bad requery response.'});
		return;
        }
        var asset = response.result;
        console.log("eth query result: ", asset);
        //reply to client
        res.status(200).json({"id":id,"asset":asset});
    });

/*
    var data = fs.readFileSync(path.join(__dirname, '../public/users/'+id+'.json'));
*/
});

module.exports = router;


