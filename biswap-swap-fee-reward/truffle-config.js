require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');


module.exports = {
  networks: {
    ropsten: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
      ),
      network_id: 3,
      gas: 7000000,
      gasPrice: 2200000000
    }
  },
  compilers: {
    solc: {
      version: "0.6.6",   
      settings: {          
        optimizer: {
          enabled: true,
          runs: 9999999
        },
        evmVersion: "istanbul"
      }
    }
  },
  db: {
    enabled: false
  }
};
