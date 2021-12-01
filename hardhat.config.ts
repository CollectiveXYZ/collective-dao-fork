import {HardhatUserConfig, task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import '@typechain/hardhat';
import "hardhat-abi-exporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-solhint";
import "@nomiclabs/hardhat-etherscan";
import '@nomiclabs/hardhat-ethers';
import "hardhat-abi-exporter";
import "@nomiclabs/hardhat-solhint";
import "@nomiclabs/hardhat-etherscan";
import '@typechain/hardhat';

// enable dotenv
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const walletPrivateKey = process.env.PRIVATE_KEY || 'no wallet';

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const cfg: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      gasPrice: 0,
      initialBaseFeePerGas: 0,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [walletPrivateKey]
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [walletPrivateKey]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },

  solidity: {
    version: '0.5.3',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  abiExporter: {
    path: './src/abi',
    clear: true,
    flat: true,
    spacing: 2,
    pretty: true,
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
};

export default cfg;