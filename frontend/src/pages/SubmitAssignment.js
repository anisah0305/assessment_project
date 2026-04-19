import React, { useState } from 'react';
import "../App.css";

const SubmitAssignment = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const formData = {
            student_id: "S23A0158",
            content: text,
            assignment_id: 101
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("✅ Submitted successfully! AI is processing your grade.");
                setText('');
            } else {
                setMessage("❌ Error: " + data.message);
            }
        } catch (error) {
            setMessage("❌ Connection to server failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.headerBar}></div>
                <h2 style={styles.title}>Submit Assignment</h2>
                <p style={styles.subtitle}>Please provide your answer/essay below for assessment.</p>

                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Assignment Content</label>
                        <textarea
                            style={styles.textarea}
                            placeholder="Paste your essay here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            ...styles.button,
                            backgroundColor: loading ? '#a0c4ff' : '#0056b3'
                        }}
                    >
                        {loading ? 'Processing...' : 'Submit to Lecturer'}
                    </button>
                </form>

                {message && (
                    <div style={{
                        ...styles.message,
                        backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
                        color: message.includes('✅') ? '#155724' : '#721c24'
                    }}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};


const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5', 
        padding: '20px'
    },
    card: {
        width: '100%',
        maxWidth: '700px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        padding: '40px',
        position: 'relative'
    },
    headerBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '5px',
        backgroundColor: '#0056b3' // Blue accent bar
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: '10px'
    },
    subtitle: {
        textAlign: 'center',
        color: '#666',
        marginBottom: '30px',
        fontSize: '14px'
    },
    inputGroup: {
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        color: '#444'
    },
    textarea: {
        width: '100%',
        height: '250px',
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '14px',
        boxSizing: 'border-box',
        fontFamily: 'inherit'
    },
    button: {
        width: '100%',
        padding: '12px',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    },
    message: {
        marginTop: '20px',
        padding: '12px',
        borderRadius: '4px',
        textAlign: 'center',
        fontSize: '14px'
    }
};

export default SubmitAssignment;