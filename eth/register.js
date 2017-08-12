var Accounts = require('./utils/accounts.js');
var Web3 = require('web3');

//var Index = 0;

function createAccount(callback){
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//    var newAccount = web3.personal.newAccount("111");
//    console.log("newAccount: ", newAccount);
//    web3.personal.unlockAccount(newAccount, "111", 15000);
    var addressList = web3.eth.accounts;
    console.log("addressList: ", addressList);
    callback(null, {"status": "200", "address": addressList});
}

//createAccount(function(err, res){console.log("addr[]: "+res.address);});
module.exports = createAccount;

