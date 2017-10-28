'use strict';

const Web3 = require('web3');
const util = require('ethereumjs-util');
const path = require('path');
const fs = require('fs');
const solc = require('solc');

module.exports = class Claim {
    constructor() {
        this.claims = []
        this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        this.input = fs.readFileSync(path.join(__dirname, '../../../bc/smart_contracts/sportcoin.sol'), 'utf8');
    }

    deployContract() {
      let output = solc.compile(this.input, 1);
      let abi = JSON.parse(output.contracts[':SPORTCoin'].interface);
      // let bytecode = output.contracts[':SPORTCoin'].bytecode;
      // let gasEstimate = this.web3.eth.estimateGas({data: bytecode}).then(console.log);
      let MyContract = new this.web3.eth.Contract(abi)
      return abi;

    }

    claimCoinsForAddress(address, amount) {
      if (!web3.isAddress(address)) {
        return false;
      }
      var MyContract = web3.eth.contract(abi);
    }
};
