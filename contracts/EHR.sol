// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EHR {
    struct Doctor {
        string hospital;
    }

    struct Record {
        address doctorAddress;
        string patientName;
        string data;
    }

    mapping(address => Doctor) public doctors;
    mapping(address => Record[]) public patientRecords;

    event RecordAdded(address indexed patientAddress, address indexed doctorAddress, string patientName, string data);

    // Function to add a new doctor
    function addDoctor(string memory _hospital) public {
        doctors[msg.sender] = Doctor(_hospital);
    }

    // Function to add a record for a patient
    function addRecord(address _patientAddress, string memory _patientName, string memory _data) public {
        require(bytes(doctors[msg.sender].hospital).length != 0, "Doctor not registered");
        patientRecords[_patientAddress].push(Record(msg.sender, _patientName, _data));
        emit RecordAdded(_patientAddress, msg.sender, _patientName, _data);
    }

    // Function to get records of a patient
    function getRecords(address _patientAddress) public view returns (Record[] memory) {
        return patientRecords[_patientAddress];
    }
}
