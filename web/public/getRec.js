document.addEventListener('DOMContentLoaded', () => {
    const getRecordsForm = document.getElementById('getRecordsForm');
    const recordsTableBody = document.getElementById('recordsTableBody');

    
    getRecordsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const patientAddress = document.getElementById('patientAddressGet').value;
    
        try {
            const response = await fetch(`/records/${patientAddress}`);
            if (!response.ok) {
                throw new Error('Failed to fetch records');
            }
    
            const records = await response.json();
            console.log(records); // Log to inspect the structure
            displayRecords(records);
    
        } catch (error) {
            console.error('Error fetching records:', error);
            alert('Failed to fetch records, Address doesn\'t exist!');
        }
    });
    
    function displayRecords(records) {
        let html = '';
    
        records.forEach(record => {
            console.log('Record:', record);
            console.log('Doctor Address:', record[0]);
            console.log('Patient Name:', record[1]);
            console.log('Data:', record[2]);
    
            html += `
                <tr>
                    <td>${record[0]}</td>
                    <td>${record[1]}</td>
                    <td>${record[2]}</td>
                </tr>
            `;
        });
    
        recordsTableBody.innerHTML = html;
    }

});

