var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));    //This return a web3 inistance

var getAccounts = function(){
    return web3.eth.accounts;
}

var Accounts = getAccounts();

module.exports = Accounts;
