document.addEventListener('DOMContentLoaded', () => {
    const addRecordForm = document.getElementById('addRecordForm');

    
    addRecordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const doctorAddress = document.getElementById('doctorAddressRecord').value;
        const patientAddress = document.getElementById('patientAddress').value;
        const patientName = document.getElementById('patientName').value;
        const data = document.getElementById('data').value;
    
        try {
            const response = await fetch('/addRecord', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ doctorAddress, patientAddress, patientName, data })
            });
    
            if (response.ok) {
                alert('Record added successfully');
            } else {
                alert('Failed to add record');
            }
        } catch (error) {
            console.error('Error adding record:', error);
            alert('Failed to add record');
        }
    });

});

