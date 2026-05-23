import { useState } from "react";

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  function handleSubmit() {
    if (!name || !email || !message) {
      setFeedback('Completează toate câmpurile!');
    } else {
      setFeedback('Mulțumim, ' + name + '!');
    }
  }

  // Stiluri formular
  const formContainerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '25px',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    background: 'var(--code-bg)',
    boxShadow: 'var(--shadow)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    textAlign: 'left'
  };

  const inputStyle = {
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    color: 'var(--text-h)',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const textareaStyle = {
    ...inputStyle,
    height: '120px',
    resize: 'vertical'
  };

  const buttonStyle = {
    background: 'var(--accent)',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'opacity 0.2s'
  };

  return (
    <div style={formContainerStyle}>
      <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-h)' }}>Trimite-mi un mesaj</h3>
      
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: 'var(--text)' }}>Nume</label>
        <input 
          style={inputStyle} 
          placeholder="Numele tău"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: 'var(--text)' }}>Email</label>
        <input 
          style={inputStyle} 
          type="email"
          placeholder="adresa@email.com"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: 'var(--text)' }}>Mesaj</label>
        <textarea 
          style={textareaStyle} 
          placeholder="Scrie mesajul tău aici..."
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
      </div>

      <button style={buttonStyle} onClick={handleSubmit}>Trimite Mesajul</button>
      
      {feedback && (
        <p style={{ 
          marginTop: '10px', 
          padding: '10px', 
          borderRadius: '5px', 
          backgroundColor: feedback.includes('Completează') ? 'rgba(220, 53, 69, 0.1)' : 'rgba(40, 167, 69, 0.1)',
          color: feedback.includes('Completează') ? '#dc3545' : '#28a745',
          textAlign: 'center',
          fontWeight: '500'
        }}>
          {feedback}
        </p>
      )}
    </div>
  );
}

export default ContactForm;