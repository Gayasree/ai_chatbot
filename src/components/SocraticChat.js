import React, { useState, useRef, useEffect } from 'react';
import { Send, Zap, Brain, MessageSquare } from 'lucide-react';

const SocraticChat = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hello! I've analyzed your lecture notes on Neural Networks. Instead of giving you answers, I'll help you reason through the concepts. What part of the architecture are you curious about?",
      type: 'socratic'
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate Socratic Response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "That's a great question. Think about how a human learns from mistakes. If you were to adjust your guess based on the error you made, what mathematical operation would represent that 'adjustment'?",
        type: 'socratic'
      }]);
    }, 1000);
  };

  return (
    <div className="card glass-card rounded-4 h-100 d-flex flex-column">
      <div className="card-header bg-transparent border-0 p-4 pb-0 d-flex justify-content-between align-items-center">
        <div>
          <h5 className="fw-bold mb-1 d-flex align-items-center">
            <Brain className="text-indigo me-2" size={24} />
            Socratic Companion
          </h5>
          <span className="badge bg-success-soft text-success rounded-pill px-2 py-1" style={{ fontSize: '10px' }}>
            <Zap size={10} className="me-1" /> ACTIVE LEARNING MODE
          </span>
        </div>
        <button className="btn btn-light rounded-pill btn-sm">
          <MessageSquare size={16} />
        </button>
      </div>

      <div className="card-body chat-container overflow-auto p-4 flex-grow-1">
        {messages.map((msg, i) => (
          <div key={i} className={`d-flex mb-4 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
            <div className={`p-3 rounded-4 ${
              msg.role === 'user' 
                ? 'bg-indigo text-white shadow-sm' 
                : 'bg-white border text-dark shadow-sm'
            }`} style={{ maxWidth: '85%' }}>
              <div className="small mb-1 opacity-75 fw-bold" style={{ fontSize: '10px' }}>
                {msg.role === 'user' ? 'YOU' : 'SOAL AI'}
              </div>
              <div className="fw-normal">{msg.content}</div>
              {msg.type === 'socratic' && (
                <div className="mt-2 pt-2 border-top border-light opacity-75 italic small">
                  <i className="bi bi-lightbulb-fill text-warning me-1"></i>
                  Hint: Look at Chapter 4, Page 12
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="card-footer bg-transparent border-0 p-4 pt-0">
        <form onSubmit={handleSend} className="input-group bg-white rounded-pill shadow-sm p-1 border">
          <input 
            type="text" 
            className="form-control border-0 rounded-pill px-4 py-2 shadow-none" 
            placeholder="Explain the backpropagation logic..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-indigo rounded-circle p-2 ms-2 d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SocraticChat;