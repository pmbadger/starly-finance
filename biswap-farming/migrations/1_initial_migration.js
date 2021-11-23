require('dotenv').config();

const BSWToken = artifacts.require("BSWToken");
const MastefChef = artifacts.require('MasterChef');


module.exports = async function(deployer) {

  await deployer.deploy(BSWToken)
  const bswToken = await BSWToken.deployed()

  await deployer.deploy(MastefChef, 
    bswToken.address,
    process.env.DEV_ADDRESS,
    process.env.REF_ADDRESS,
    process.env.SAFU_ADDRESS,
    process.env.BSW_PER_BLOCK,
    process.env.START_BLOCK,
    process.env.STAKING_PERCENT,
    process.env.DEV_PERCENT,
    process.env.REF_PERCENT,
    process.env.SAFU_PERCENT,
  );
  
  const masterChef = await MastefChef.deployed()
  await bswToken.addMinter(masterChef.address)

};
