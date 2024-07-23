const express = require('express');
const app = express();
const Web3 = require('web3');
const path = require('path');
const fs = require('fs');
const generateNonce = require('./generateNonce');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const contractJsonPath = path.resolve(__dirname, '../build/contracts/EHR.json');
const contractJson = JSON.parse(fs.readFileSync(contractJsonPath, 'utf8'));
const abi = contractJson.abi;
const contractAddress = '0x1fcAA03a96982C8AF023F6a1ac3eb5761D77ae22'; 
const contract = new web3.eth.Contract(abi, contractAddress);

app.use(express.json());
app.use(express.static(path.
    join(__dirname, 'public')));

// Middleware to set nonce and CSP headers
app.use((req, res, next) => {
    res.locals.nonce = generateNonce(16);
    res.setHeader('Content-Security-Policy', `default-src 'self'; script-src 'self' 'nonce-${res.locals.nonce}'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com`);
    next();
});

// Endpoint to add a doctor
app.post('/addDoctor', async (req, res) => {
    const { doctorAddress, hospital } = req.body;
    try {
        const accounts = await web3.eth.getAccounts();
        const senderAccount = accounts[0];
        const gas = await contract.methods.addDoctor(hospital).estimateGas({ from: senderAccount });
        await contract.methods.addDoctor(hospital).send({ from: senderAccount, gas });
        res.status(200).send('personnel added successfully.');
    } catch (err) {
        console.error('Error adding doctor:', err);
        res.status(500).send('Error adding personnel.');
    }
});

// Endpoint to add a patient record
app.post('/addRecord', async (req, res) => {
    const {patientAddress, patientName, data } = req.body;
    try {
        const accounts = await web3.eth.getAccounts();
        const senderAccount = accounts[0];
        const gas = await contract.methods.addRecord(patientAddress, patientName, data).estimateGas({ from: senderAccount });
        await contract.methods.addRecord(patientAddress, patientName, data).send({ from: senderAccount, gas });
        res.status(200).send('Record added successfully.');
    } catch (err) {
        console.error('Error adding record:', err);
        res.status(500).send('Error adding record.');
    }
});

// Endpoint to fetch patient records
app.get('/records/:patientAddress', async (req, res) => {
    const { patientAddress } = req.params;
    try {
        const records = await contract.methods.getRecords(patientAddress).call();
        console.log('Fetched Records from Blockchain:', records); // Log the data
        res.json(records);
    } catch (err) {
        console.error('Error fetching records:', err);
        res.status(500).send('Error fetching records.');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'script.js'));
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
