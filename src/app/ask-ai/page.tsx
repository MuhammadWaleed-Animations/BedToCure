'use client';

import { useState } from 'react';
import axios from 'axios';
import { SendHorizonal } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export default function AskAIPage() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setMessages((prevMessages) => [...prevMessages, { text: question, isUser: true }]);
    setLoading(true);
    try {
      const response = await axios.post('/api/ask-ai', { question });
      const answer = response.data.answer;
      setMessages((prevMessages) => [...prevMessages, { text: answer, isUser: false }]);
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Something went wrong. Please try again.', isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
    setQuestion('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAsk();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#e8f5e9', // Green background with medical touch
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        marginTop: '1.5rem',
        textAlign: 'center',
        color: '#2e7d32', // Dark green header
        marginBottom: '1rem',
      }}>
        Get medical help from <span style={{ color: '#8e24aa' }}>AI ✨</span>
      </h1>
      <p style={{
        fontSize: '0.875rem',
        color: '#5e35b1',
        marginTop: '1rem',
        marginBottom: '2rem',
      }}>
        Powered by <span style={{ color: '#ef5350' }}>Gemini</span>
      </p>

      {/* Chat Container */}
      <div style={{
        width: '100%',
        maxWidth: '650px',
        backgroundColor: '#fff',
        padding: '1.5rem 2rem',
        borderRadius: '1.25rem',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}>
        <div style={{
          overflowY: 'auto',
          flexGrow: 1,
          maxHeight: '500px', // Limit height to make it scrollable
          paddingRight: '1rem',
        }}>
          {messages.length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: '#9e9e9e',
              fontSize: '1rem',
              fontStyle: 'italic',
            }}>
              Ask your medical question and get instant answers.
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                marginBottom: '0.75rem',
              }}>
                <div style={{
                  maxWidth: '75%',
                  padding: '1rem 1.25rem',
                  borderRadius: '1.25rem',
                  backgroundColor: message.isUser ? '#43a047' : '#8e24aa',
                  color: '#fff',
                  wordWrap: 'break-word',
                  textAlign: message.isUser ? 'right' : 'left',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}>
                  {message.text}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid #e5e7eb',
          paddingTop: '1.25rem',
        }}>
          <Input
            placeholder="Tell me about your medical situation"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{
              flex: 1,
              borderRadius: '50px',
              padding: '1rem 1.5rem',
              backgroundColor: '#fff',
              border: '1px solid #cfd8dc',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
              fontSize: '1rem',
              color: '#455a64',
              transition: 'border 0.3s ease',
            }}
          />
          <Button
            onClick={handleAsk}
            style={{
              marginLeft: '1rem',
              backgroundColor: '#8e24aa', // Purple button
              padding: '1rem',
              borderRadius: '50%',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'background-color 0.3s ease',
            }}
            disabled={loading}
          >
            <SendHorizonal style={{ color: '#fff', fontSize: '1.25rem' }} />
          </Button>
        </div>
      </div>
    </div>
  );
}
