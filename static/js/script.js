document.addEventListener('DOMContentLoaded', () => {
    // File Upload Logic
    const uploadForm = document.getElementById('uploadForm');
    const pdfInput = document.getElementById('pdfInput');
    const fileNameDisplay = document.getElementById('fileName');

    if (pdfInput) {
        pdfInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                fileNameDisplay.textContent = `Selected: ${e.target.files[0].name}`;
            }
        });
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const file = pdfInput.files[0];
            if (!file) {
                alert("Please select a PDF file first.");
                return;
            }

            const formData = new FormData();
            formData.append('pdf', file);

            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (data.message) {
                    alert(data.message);
                    window.location.href = '/chat';
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error("Upload failed:", error);
                alert("An error occurred during upload.");
            }
        });
    }

    // Chat Logic
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const guidanceContent = document.getElementById('guidanceContent');
    const outcomeText = document.getElementById('outcomeText');
    const careerText = document.getElementById('careerText');

    if (sendBtn) {
        const sendMessage = async () => {
            const question = userInput.value.trim();
            if (!question) return;

            // Append User Message
            appendMessage('user', question);
            userInput.value = '';

            try {
                const response = await fetch('/ask', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ question })
                });
                const data = await response.json();

                if (data.response) {
                    appendMessage('bot', data.response);
                    if (data.guidance) {
                        updateGuidance(data.guidance);
                    }
                }
            } catch (error) {
                console.error("Chat failed:", error);
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function appendMessage(role, text) {
        const div = document.createElement('div');
        div.className = `message ${role}`;
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function updateGuidance(guidance) {
        guidanceContent.innerHTML = `
            <div class="summary-box">
                <h4>Topic Summary:</h4>
                <p>${guidance.summary}</p>
            </div>
        `;
        outcomeText.textContent = guidance.outcome;
        
        // Dynamic Career Connection Mock
        const careerPaths = [
            "This concept is vital for Data Scientists who analyze patterns in complex datasets.",
            "Software Engineers use this logic to optimize system performance and scalability.",
            "Project Managers apply these principles to streamline workflows and reduce overhead.",
            "AI Researchers study this to build more efficient and ethical neural networks."
        ];
        careerText.textContent = careerPaths[Math.floor(Math.random() * careerPaths.length)];
    }
});
