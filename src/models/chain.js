'use strict';

const Web3 = require('web3');
const net = require('net');
const utils = require('web3-utils');
// const util = require('ethereumjs-util');
// const path = require('path');
// const fs = require('fs');
// const solc = require('solc');

const config = require('../config');

module.exports = class Chain {
    constructor() {
        this.claims = []
        this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        // this.web3 = new Web3("ws://127.0.0.1:8546");
        // this.web3 = new Web3('/var/folders/pc/5vsq970n2d97k5z30bl3klx40000gn/T/ethereum_dev_mode/geth.ipc', net);
        this.mainContract = this.deployContract();
    }

    deployContract() {
      return new this.web3.eth.Contract(config.abiArray, config.contractAddress, {
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
      });
    }

    claimCoinsForAddress(address, amount, id) {
      if (!utils.isAddress(address)) {
        return false;
      }
      let promise = new Promise((resolve, reject) => {
        let owner = this.mainContract.methods.owner().call({}, (error, owner) => {
          this.web3.eth.personal.unlockAccount(owner, config.password);
          this.mainContract.methods.sendPersonalSportReward(address, amount, id).send(
            {from: owner},
            (error, result) => {
              if (error) {
                reject(error)
              } else {
                resolve(result);
              }
            });
      })
    });
    return promise;
  }
};
