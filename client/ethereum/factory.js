import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';


const instance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0x460e24724d55634D53e6b282B5104633F3a21930'
);

export default instance;
