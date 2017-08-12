var Web3 = require('web3');

var provider;

var Web3Provider = function(){
//    if (typeof provider !== 'undefined'){
//        console.log("Using exist provider.");
//        provider = Web3.currentProvider;
//    }else{
        console.log("Creating new provider.");
        //provider = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));    //This return a we3 inistance
        provider = new Web3.providers.HttpProvider("http://localhost:8545");    //This return a web3 provider
//    }
    return provider;
}

module.exports = Web3Provider;
