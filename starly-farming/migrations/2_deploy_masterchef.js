const STLYToken = artifacts.require("STLYToken");
const MastefChef = artifacts.require('MasterChef');
const StarlyReferral = artifacts.require('StarlyReferral');


module.exports = async function(deployer){
  const stlyToken = await STLYToken.deployed()

  await deployer.deploy(MastefChef,
    stlyToken.address,
    process.env.DEV_ADDRESS,
    process.env.REF_ADDRESS,
    process.env.SAFU_ADDRESS,
    process.env.STLY_PER_BLOCK,
    process.env.START_BLOCK,
    process.env.STAKING_PERCENT,
    process.env.DEV_PERCENT,
    process.env.REF_PERCENT,
    process.env.SAFU_PERCENT,
  );

  const masterChef = await MastefChef.deployed();
  await stlyToken.addMinter(masterChef.address);
  
  await deployer.deploy(StarlyReferral);
  const starlyReferral = await StarlyReferral.deployed();
  
  await starlyReferral.updateOperator(masterChef.address, true);
  await masterChef.setStarlyReferral(starlyReferral.address);
}
