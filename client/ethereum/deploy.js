const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const ElectionFactory = require('./build/ElectionFactory.json');

const provider = new HDWalletProvider(
  'antique earth response guide doctor boat round wrong cross very hundred media',
  'https://rinkeby.infura.io/jdB8eYrUu7JtKBOst4lG'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(ElectionFactory.interface))
  .deploy({ data: ElectionFactory.bytecode })
  .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};

deploy();


