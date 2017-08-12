var contract = require("truffle-contract");
var web3Provider = require('./utils/web3provider.js');
var Accounts = require('./utils/accounts.js');
var abiJson = require('./build/contracts/TolakCoin.json');

var CoinDeploy = function() {
    var TolakCoin = contract(abiJson);
    
    TolakCoin.setProvider(web3Provider());
    TolakCoin.new(10000, 'Tolak Bank', 1, 'TLK', {
        from: Accounts[0],
        gas: 3141592
    }).then((newToken) => {
        if(typeof newToken !== 'undefined'){
            console.log('Get TolakCoin instance successfully');
        }else{
            return Promise.reject(new Error("Failed to deploy contract!"));
        }
        return Promise.resolve(newToken);
    }).then((ctr) => {
        return ctr.balanceOf.call(Accounts[0]);
    }).then((result) => {
        if(result.toNumber() !== 10000){
            return Promise.reject(new Error("Failed to construct TolakCoin"));
        }else{
            console.log("Balance of Account[0]: ", result.toNumber());
        }
    }).catch((err) => {
        console.error("Catch error when deployed: ", err);
    });
}

CoinDeploy();
module.exports = CoinDeploy;
