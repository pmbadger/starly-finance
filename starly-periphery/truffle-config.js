require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     
      port: 7545,            
      network_id: "97",     
      gas: 6721975,
    },
    ropsten: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
      ),
      network_id: 3,
      gas: 7000000,
      gasPrice: 2200000000
    },
    bsc_mainnet: {
      provider: () => new HDWalletProvider(
          process.env.PRIVATE_KEY,
          "https://bsc-dataseed2.binance.org/"
      ),
      network_id: 56,
      gas: 5300000,
      gasPrice: 5000000000
    },
    bsc_testnet: {
      provider: () => new HDWalletProvider(
          process.env.PRIVATE_KEY,
          "https://data-seed-prebsc-1-s1.binance.org:8545/"
      ),
      network_id: 97,
      gas: 7000000,
      gasPrice: 22000000000
    },
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
