require('dotenv').config();

const AutoBsw = artifacts.require('autoBsw');


module.exports = async function(deployer) {

  await deployer.deploy(
    AutoBsw,
    process.env.BSW_TOKEN,
    process.env.MASTER_CHEF,
    process.env.ADMIN_ADDRESS,
    process.env.TREASURY_ADDRESS
  );

}
