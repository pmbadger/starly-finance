require('dotenv').config();
const BiswapFactory = artifacts.require("BiswapFactory");


module.exports = async function (deployer) {
  
  await deployer.deploy(BiswapFactory, process.env.FEE_TO_SETTER);
  const factory = await BiswapFactory.deployed();
  
  const INIT_CODE_HASH = await factory.INIT_CODE_HASH.call();
  console.log('INIT_CODE_HASH: ', INIT_CODE_HASH)

  await factory.setFeeTo(process.env.FEE_TO);
  const feeTo = await factory.feeTo.call();
  console.log('Fee to: ', feeTo)
};
