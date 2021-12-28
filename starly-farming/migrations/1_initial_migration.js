require('dotenv').config();
const STLYToken = artifacts.require("STLYToken");


module.exports = async function(deployer) {

  await deployer.deploy(STLYToken);

};
