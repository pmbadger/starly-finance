require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "97",       // Any network (default: none)
    },
    ropsten: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
      ),
      network_id: 3,
      gas: 7000000,
      gasPrice: 22000000000
    },
    bsc_mainnet: {
      provider: () => new HDWalletProvider(
          process.env.PRIVATE_KEY,
          "https://bsc-dataseed2.binance.org/"
      ),
      network_id: 56,
      gas: 3000000,
      gasPrice: 5000000000
    },
    bsc_testnet: {
      provider: () => new HDWalletProvider(
          process.env.PRIVATE_KEY,
          "https://data-seed-prebsc-1-s1.binance.org:8545/"
      ),
      network_id: 97,
      gas: 3000000,
      gasPrice: 5000000000
    },
  },
  compilers: {
    solc: {
      version: "0.6.12",    
      settings: {         
        optimizer: {
          enabled: true,
          runs: 999999
        },
        evmVersion: "istanbul"
      }
    }
  },
  db: {
    enabled: false
  }
};
