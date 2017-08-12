var contract = require('truffle-contract');
var web3Provider = require('./utils/web3provider.js');
var contractAddress = require('./address.json');
var abiJson = require('./build/contracts/TolakCoin.json');

function query(addr, callback){
    var MyContract = contract(abiJson);
    MyContract.setProvider(web3Provider());
    var contractInstance = MyContract.at(contractAddress.address);

    console.log("query at: ", contractAddress.address);
    console.log("query id: ", addr);
    contractInstance.balanceOf.call(addr).then((result) => {
        callback(null, {"status": "200", "result": result.toNumber()});
    }, (err) => {
        console.error("query error: ", err);
    });
}

//var Accounts = require('./utils/accounts.js');
//query(Accounts[0], function(err, res){console.log("addr[0]: ", res.result);});
module.exports = query; 
