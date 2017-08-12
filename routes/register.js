var express = require('express');
var fs = require('fs');
var path = require('path');
var createAccount = require('../eth/register.js');

var router = express.Router();

/* create a new account of ethereum. */
router.post('/', function(req, res, next) {
    var id = req.body.id;
    if(id == "null"){
//        res.write("<script type='language'>alert('Invalid ID, try again!')</script>");
    }else{
        createAccount(function(err, response){
            if(err !== null){
                res.json(404, {msg: 'Failed to create account'});
            }else{
                if (response.status === '200') {
                    res.status(200).json({'addressList': response.address});
                } else {
                    console.error('Failed to create account, Error code: ' + response.status);
                    res.json(404, {msg: 'Failed to create account.'});
                }
            }
        });
    }
});

/* Register & Get Tolakcoin. */
router.get('/', function(req, res, next) {
    res.send('Method no soupport!');
    res.redirect('/newindex.html')
});

module.exports = router;
