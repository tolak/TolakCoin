//var ConvertLib = artifacts.require("./ConvertLib.sol");
//var MetaCoin = artifacts.require("./MetaCoin.sol");
//var Test = artifacts.require("./Test.sol");
//var Token = artifacts.require("Token.sol");
var StandardToken = artifacts.require("StandardToken.sol");
var TolakCoin = artifacts.require("./TolakCoin.sol");
var SampleRecipientSuccess = artifacts.require("SampleRecipientSuccess.sol");

module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  //deployer.deploy(MetaCoin);
  //deployer.deploy(Test);
  //deployer.deploy(Token);
  deployer.deploy(StandardToken);
  deployer.deploy(TolakCoin);
  deployer.deploy(SampleRecipientSuccess);
};
