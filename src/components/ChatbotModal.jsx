import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Sparkles,
  BarChart3,
  HelpCircle,
  Zap
} from 'lucide-react';
import { findAnswer, getSuggestedQuestions } from '../mock/chatbotQA.js';
import ChartMessageBubble from './ChartMessageBubble.jsx';

const ChatbotModal = ({ isOpen, onClose, userRole }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && userRole) {
      const welcomeMessage = {
        id: Date.now(),
        type: 'bot',
        text: 'Hi! I\'m your ' + (userRole === 'admin' ? 'Admin' : 'Student') + ' AI Assistant. 🤖 I can help you with dashboard insights and analytics. What would you like to know?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages([welcomeMessage]);

      const suggestions = getSuggestedQuestions(userRole);
      setSuggestedQuestions(suggestions);
      setShowSuggestions(true);

      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, userRole]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText = null) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Hide suggestions while bot is typing
    setShowSuggestions(false);

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(async () => {
      const response = findAnswer(userRole, text);

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);

      if (response.hasChart && response.chartType) {
        setTimeout(() => {
          const chartMessage = {
            id: Date.now() + 2,
            type: 'bot',
            chart: response.chartType,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          setMessages(prev => [...prev, chartMessage]);
          setIsTyping(false);
          setShowSuggestions(true);   // 👈 suggestions reappear
        }, 800);
      } else {
        setIsTyping(false);
        setShowSuggestions(true);     // 👈 suggestions reappear
      }
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuestionClick = (question) => {
    handleSendMessage(question);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col border border-slate-200 dark:border-slate-700 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-bounce-gentle">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                {userRole === 'admin' ? 'Admin' : 'Student'} AI Assistant
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Online • Ready to help
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={'flex ' + (message.type === 'user' ? 'justify-end' : 'justify-start')}
            >
              <div className={'max-w-[85%] ' + (message.type === 'user' ? 'order-2' : 'order-1')}>
                {/* Message Header */}
                <div className={'flex items-center gap-2 mb-1 text-xs text-slate-500 dark:text-slate-400 ' + 
                  (message.type === 'user' ? 'justify-end' : 'justify-start')}>
                  {message.type === 'user' ? (
                    <>
                      <span>{message.timestamp}</span>
                      <span>•</span>
                      <span>You</span>
                      <User className="w-3 h-3" />
                    </>
                  ) : (
                    <>
                      <Bot className="w-3 h-3" />
                      <span>AI Assistant</span>
                      <span>•</span>
                      <span>{message.timestamp}</span>
                    </>
                  )}
                </div>

                {/* Message Content */}
                {message.text && (
                  <div className={'chat-bubble-' + message.type + ' px-4 py-3 max-w-full shadow-sm'}>
                    {message.text}
                  </div>
                )}

                {/* Chart Message */}
                {message.chart && (
                  <ChartMessageBubble 
                    chartType={message.chart}
                    title={(userRole === 'admin' ? 'Admin' : 'Student') + ' Analytics'}
                  />
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[85%]">
                <div className="flex items-center gap-2 mb-1 text-xs text-slate-500 dark:text-slate-400">
                  <Bot className="w-3 h-3" />
                  <span>AI Assistant</span>
                  <span>•</span>
                  <span>typing...</span>
                </div>
                <div className="chat-bubble-bot px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="spinner"></div>
                    <span>Analyzing your request...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {showSuggestions && suggestedQuestions.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 animate-slide-up">
            <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Quick Questions
            </div>
            <div className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  className="w-full text-left p-3 text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {question.includes('chart') || question.includes('show') || question.includes('analytics') ? (
                    <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  ) : (
                    <HelpCircle className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                  )}
                  <span className="flex-1">{question}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 text-xs text-slate-500 dark:text-slate-500 text-center">
              💡 Click any question above or type your own
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={'Ask me about your ' + userRole + ' dashboard...'}
                disabled={isTyping}
                className="w-full px-4 py-2 pr-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className={'absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all duration-200 ' + 
                  (inputValue.trim() && !isTyping 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-110 shadow-md' 
                    : 'bg-slate-200 dark:bg-slate-600 text-slate-400 dark:text-slate-500 cursor-not-allowed')
                }
              >
                {isTyping ? (
                  <div className="w-4 h-4 border border-slate-300 dark:border-slate-600 border-t-slate-600 dark:border-t-slate-300 rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center justify-center gap-1">
            <Zap className="w-3 h-3" />
            <span> • Role-based responses • Interactive charts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
