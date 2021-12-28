const STLYToken = artifacts.require("STLYToken");
const MastefChef = artifacts.require('MasterChef');


module.exports = async function(deployer){
  const stlyToken = await STLYToken.deployed()

  await deployer.deploy(MastefChef,
    stlyToken.address,
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
  await stlyToken.addMinter(masterChef.address)
}
