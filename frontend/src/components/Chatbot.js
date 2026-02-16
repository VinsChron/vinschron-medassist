import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';
import { validateQuery, getValidationFeedback } from '../utils/validation';

function Chatbot({ patientId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sampleQueries, setSampleQueries] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch available queries
    axios.get('/api/queries')
      .then((response) => {
        if (response.data.success) {
          setSampleQueries(response.data.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching queries:', err);
      });

    // Initial greeting message
    setMessages([
      {
        type: 'bot',
        text: 'Hello! 👋 I\'m your MedAssist AI Assistant. I\'m here to help you with questions about your health records, medications, appointments, and personalized health recommendations. Feel free to click on any of the sample questions below or type your own question.',
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSampleQuery = (query) => {
    handleSendMessage(query);
  };

  const handleSendMessage = async (query) => {
    if (!query.trim()) return;

    // Validate input
    const validation = validateQuery(query);
    if (!validation.isValid) {
      setError(validation.error);
      setTimeout(() => setError(null), 5000);
      return;
    }

    setError(null);
    const userMessage = {
      type: 'user',
      text: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post('/api/query', {
        query: query,
        patientId: patientId,
      });

      if (response.data.success) {
        const botMessage = {
          type: 'bot',
          text: response.data.response,
          isGeneric: response.data.isGeneric || false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (err) {
      const errorMessage = {
        type: 'error',
        text: err.response?.data?.error || 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <h2>💬 Chat with Medical Assistant</h2>
        <p className="response-time">Typical Response Time: &lt;3 seconds</p>
      </div>

      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message message-${message.type}`}>
            <div className="message-content">
              {message.type === 'bot' && <span className="message-icon">🤖</span>}
              {message.type === 'user' && <span className="message-icon">👤</span>}
              {message.type === 'error' && <span className="message-icon">⚠️</span>}
              <div className="message-text">
                {message.text}
                {message.isGeneric && (
                  <div className="generic-note">
                    ℹ️ <em>This is a general response. For specific information, please contact your doctor.</em>
                  </div>
                )}
              </div>
            </div>
            <div className="message-time">{message.timestamp.toLocaleTimeString()}</div>
          </div>
        ))}
        {loading && (
          <div className="message message-bot loading">
            <div className="message-content">
              <span className="message-icon">🤖</span>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-queries">
        <p className="queries-label">📋 Sample Questions:</p>
        <div className="queries-grid">
          {sampleQueries.map((q, index) => (
            <button
              key={index}
              className="query-button"
              onClick={() => handleSampleQuery(q.query)}
              disabled={loading}
            >
              {q.query}
            </button>
          ))}
        </div>
      </div>

      <div className="chatbot-input-area">
        <QueryInput onSend={handleSendMessage} disabled={loading} />
      </div>

      {error && <div className="error-message">Error: {error}</div>}
    </div>
  );
}

function QueryInput({ onSend, disabled }) {
  const [input, setInput] = useState('');
  const [validationFeedback, setValidationFeedback] = useState(null);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
    
    // Get real-time validation feedback
    const feedback = getValidationFeedback(newValue);
    setValidationFeedback(feedback);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
      setValidationFeedback(null);
    }
  };

  const isValid = validationFeedback?.isValid;
  const hasWarning = validationFeedback?.warning;

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <div className="input-wrapper">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your health question here..."
          className={`input-field ${isValid === false ? 'input-invalid' : ''}`}
          disabled={disabled}
          maxLength="500"
          aria-label="Health question input"
        />
        {hasWarning && (
          <div className={`validation-feedback ${isValid ? 'warning' : 'error'}`}>
            {validationFeedback.warning}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="send-button"
        disabled={disabled || !input.trim() || isValid === false}
        title={isValid === false ? 'Please enter a valid question' : 'Send query'}
      >
        {disabled ? '⏳' : '📤'} Send
      </button>
    </form>
  );
}

export default Chatbot;
