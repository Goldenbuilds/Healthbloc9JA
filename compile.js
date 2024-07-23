const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'EHR.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'EHR.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode']
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contract = output.contracts['EHR.sol'].EHR;

fs.ensureDirSync(path.resolve(__dirname, 'build', 'contracts'));
fs.outputJSONSync(
    path.resolve(__dirname, 'build', 'contracts', 'EHR.json'),
    contract
);
