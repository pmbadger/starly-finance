require('dotenv').config();
const StarlyRouter02 = artifacts.require("StarlyRouter02");


module.exports = async function (deployer) {
  
  await deployer.deploy(StarlyRouter02, process.env.FACTORY_ADDRESS, process.env.WETH_ADDRESS);
  
};
