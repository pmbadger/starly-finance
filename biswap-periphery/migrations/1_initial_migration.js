require('dotenv').config();
const BiswapRouter02 = artifacts.require("BiswapRouter02");


module.exports = async function (deployer) {
  
  await deployer.deploy(BiswapRouter02, process.env.FACTORY_ADDRESS, process.env.WETH_ADDRESS);
  
};
