
import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, CornerDownLeft, Loader } from 'lucide-react';
import type { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'CSTP online. How can I assist with your cybersecurity analysis today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(input.trim(), messages);
      const modelMessage: ChatMessage = { role: 'model', text: responseText };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg h-[calc(100vh-8rem)] flex flex-col shadow-lg shadow-cyan-500/5">
      <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
        <Bot className="w-6 h-6 text-cyan-400" />
        <h2 className="font-semibold text-white">AI Assistant</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start space-x-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-cyan-900/50 flex items-center justify-center flex-shrink-0"><Bot className="w-5 h-5 text-cyan-400" /></div>}
              <div className={`p-3 rounded-lg max-w-sm ${msg.role === 'model' ? 'bg-gray-700/50 text-gray-300' : 'bg-blue-600/50 text-white'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
              {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0"><User className="w-5 h-5 text-gray-200" /></div>}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-cyan-900/50 flex items-center justify-center flex-shrink-0"><Bot className="w-5 h-5 text-cyan-400" /></div>
              <div className="p-3 rounded-lg bg-gray-700/50 text-gray-300 flex items-center space-x-2">
                 <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                 <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150"></span>
                 <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-gray-700 bg-gray-900/50 rounded-b-lg">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about threats, IPs, or mitigation..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 pr-20 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 bottom-2 bg-cyan-600 text-white p-2 rounded-md hover:bg-cyan-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 flex items-center">
            Press <CornerDownLeft className="w-3 h-3 mx-1"/> to send. Shift + <CornerDownLeft className="w-3 h-3 mx-1"/> for new line.
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
