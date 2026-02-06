// Chatbot Interaction Handler

document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chatForm');
    const questionInput = document.getElementById('questionInput');
    const chatMessages = document.getElementById('chatMessages');
    const guidanceContent = document.getElementById('guidanceContent');

    // Handle chat form submission
    chatForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const question = questionInput.value.trim();
        
        if (!question) {
            return;
        }

        // Display user message
        addUserMessage(question);
        
        // Clear input
        questionInput.value = '';

        // Show typing indicator
        const typingId = showTypingIndicator();

        try {
            const response = await fetch('/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: question })
            });

            const data = await response.json();

            // Remove typing indicator
            removeTypingIndicator(typingId);

            if (response.ok) {
                // Display bot response
                addBotMessage(data.answer);
                
                // Update study guidance
                updateGuidance(data);
            } else {
                addBotMessage(data.error || 'Sorry, I encountered an error. Please try again.');
            }
        } catch (error) {
            removeTypingIndicator(typingId);
            addBotMessage('Sorry, I encountered an error. Please make sure you have uploaded a PDF first.');
            console.error('Chat error:', error);
        }
    });

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${escapeHtml(text)}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${escapeHtml(text)}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'bot-message typing-indicator';
        typingDiv.id = 'typing-' + Date.now();
        typingDiv.innerHTML = `
            <div class="message-content">
                <p>Thinking...</p>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
        return typingDiv.id;
    }

    function removeTypingIndicator(id) {
        const typingDiv = document.getElementById(id);
        if (typingDiv) {
            typingDiv.remove();
        }
    }

    function updateGuidance(data) {
        let html = '';

        // Summary section
        if (data.summary) {
            html += `
                <div class="guidance-section">
                    <h3>📝 Summary</h3>
                    <p>${escapeHtml(data.summary)}</p>
                </div>
            `;
        }

        // Key points section
        if (data.key_points && data.key_points.length > 0) {
            html += `
                <div class="guidance-section">
                    <h3>🔑 Key Points</h3>
                    <ul class="key-points">
            `;
            data.key_points.forEach(point => {
                html += `<li>${escapeHtml(point)}</li>`;
            });
            html += `
                    </ul>
                </div>
            `;
        }

        // Learning outcome section
        if (data.learning_outcome) {
            html += `
                <div class="guidance-section">
                    <h3>🎯 Learning Outcome</h3>
                    <div class="learning-outcome">
                        ${escapeHtml(data.learning_outcome)}
                    </div>
                </div>
            `;
        }

        // Possible questions section
        if (data.possible_questions && data.possible_questions.length > 0) {
            html += `
                <div class="guidance-section">
                    <h3>❓ Related Questions</h3>
                    <ul class="key-points">
            `;
            data.possible_questions.forEach(q => {
                html += `<li style="cursor:pointer;color:#667eea;font-weight:600;" onclick="document.getElementById('questionInput').value='${q.replace(/'/g, "\\'")}'">${escapeHtml(q)}</li>`;
            });
            html += `
                    </ul>
                </div>
            `;
        }

        // Additional resources section
        if (data.additional_resources) {
            html += `
                <div class="guidance-section">
                    <h3>📚 Explore Further</h3>
                    <p>${escapeHtml(data.additional_resources)}</p>
                </div>
            `;
        }

        // Real world example section
        if (data.real_world_example) {
            html += `
                <div class="guidance-section" style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%); border-left-color: #764ba2;">
                    <h3>🌍 Real-World Example</h3>
                    <p style="font-style: italic;">${escapeHtml(data.real_world_example)}</p>
                </div>
            `;
        }

        guidanceContent.innerHTML = html;
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
