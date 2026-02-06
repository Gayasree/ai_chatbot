// PDF Upload Handler

document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const pdfFile = document.getElementById('pdfFile');
    const fileName = document.getElementById('fileName');
    const messageDiv = document.getElementById('message');

    // Update file name display
    pdfFile.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileName.textContent = this.files[0].name;
        } else {
            fileName.textContent = 'Choose PDF File';
        }
    });

    // Handle form submission
    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const file = pdfFile.files[0];
        
        if (!file) {
            showMessage('Please select a PDF file', 'error');
            return;
        }

        if (!file.name.toLowerCase().endsWith('.pdf')) {
            showMessage('Please select a valid PDF file', 'error');
            return;
        }

        // Show loading message
        showMessage('Uploading and processing PDF...', 'info');

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('PDF uploaded successfully! Redirecting to chatbot...', 'success');
                setTimeout(() => {
                    window.location.href = '/chatbot';
                }, 1500);
            } else {
                showMessage(data.error || 'Upload failed', 'error');
            }
        } catch (error) {
            showMessage('Error uploading file. Please try again.', 'error');
            console.error('Upload error:', error);
        }
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = 'message ' + type;
        messageDiv.style.display = 'block';
    }
});
