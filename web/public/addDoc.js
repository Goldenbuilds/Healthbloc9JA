document.addEventListener('DOMContentLoaded', () => {
    const addDoctorForm = document.getElementById('addDoctorForm');

    addDoctorForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const doctorAddress = document.getElementById('doctorAddress').value;
        const hospital = document.getElementById('hospital').value;
    
        try {
            const response = await fetch('/addDoctor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ doctorAddress, hospital })
            });
    
            if (response.ok) {
                alert('Personnel added successfully');
            } else {
                alert('Failed to add Personnel');
            }
        } catch (error) {
            console.error('Error adding doctor:', error);
            alert('Failed to add doctor');
        }
    });
});

