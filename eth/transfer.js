var contract = require('truffle-contract');
var contractAddress = require('./address.json');
var abiJson = require('./build/contracts/TolakCoin.json');
var web3Provider = require('./utils/web3provider.js');
var Accounts = require('./utils/accounts.js');
var Web3 = require('web3');

function transfer(from, to, amount, callback) {
    var MyContract = contract(abiJson);
    MyContract.setProvider(web3Provider());

    var contractInstance = MyContract.at(contractAddress.address);
//    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//    web3.personal.unlockAccount(newAccount, "111", 60);
//    web3.personal.unlockAccount(newAccount, "111", 60);
//    console.log("coinBase: ", Accounts.coinBase());
//    if(contractInstance.transferTest(from, to, amount, {from: Accounts[0]}) === false){
//        console.error("transferTest: contract execute failed");
//        callback(new Error("contract execute failed"), {"status": '404'});
//    }
//    contractInstance.transferTest(from, to, amount, {from: Accounts[0]});
    contractInstance.transfer(to, amount, {from: from});
    callback(null, {"status": '200'});
}

//var Accounts = require('./utils/accounts.js');
//transfer(Accounts[0], Accounts[1], 1000, function(err, result){console.log("after transfer, status: ", result.status);});
module.exports = transfer;

