require('dotenv').config();

const Oracle = artifacts.require("Oracle");
const SwapFeeReward = artifacts.require("SwapFeeReward");


module.exports = async function (deployer) {

  await deployer.deploy(Oracle, process.env.FACTORY_ADDRESS, process.env.INIT_CODE_HASH, process.env.PRICE_UPDATER);
  let oracle = await Oracle.deployed();

  await deployer.deploy(
    SwapFeeReward,
      process.env.FACTORY_ADDRESS,
      process.env.ROUTER_ADDRESS,
      process.env.INIT_CODE_HASH,
      process.env.STLY_TOKEN,
      oracle.address,
      process.env.STLY_TOKEN
    );

};
