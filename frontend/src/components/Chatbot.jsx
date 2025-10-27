import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your hospital assistant. How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const hospitalResponses = {
    // Greetings
    'hello': "Hello! I'm here to help you with hospital information, doctor availability, and appointment booking. What would you like to know?",
    'hi': "Hi there! How can I assist you today?",
    'hey': "Hey! I'm your hospital assistant. What information do you need?",
    
    // Hospital Info
    'services': "Our hospital offers the following services:\n• General Medicine\n• Gynecology\n• Dermatology\n• Pediatrics\n• Neurology\n• Gastroenterology\n\nWould you like to know more about any specific service?",
    'location': "We are located at:\n54709 Willms Station\nSuite 350, Washington, USA\n\nYou can find us on the map in the Contact section.",
    'contact': "You can reach us at:\n📞 Tel: (415) 555‑0132\n✉️ Email: Prescripto@gmail.com\n\nOr visit our Contact page for more details.",
    'hours': "Our hospital is open:\n• Monday-Friday: 8:00 AM - 9:00 PM\n• Saturday: 9:00 AM - 6:00 PM\n• Sunday: 10:00 AM - 4:00 PM\n\nEmergency services are available 24/7.",
    'emergency': "For emergencies, please call 911 immediately or visit our Emergency Department which is open 24/7.",
    
    // Appointments
    'appointment': "To book an appointment:\n1. Browse our doctors in the 'All Doctors' section\n2. Select a doctor based on speciality\n3. Choose an available time slot\n4. Confirm your booking\n\nWould you like me to guide you to the doctors page?",
    'cancel appointment': "To cancel an appointment:\n1. Go to 'My Appointments'\n2. Find your appointment\n3. Click 'Cancel Appointment'\n\nNote: Please cancel at least 24 hours in advance.",
    'reschedule': "To reschedule an appointment:\n1. First cancel your current appointment\n2. Book a new appointment with your preferred time\n\nVisit 'My Appointments' to manage your bookings.",
    
    // Doctors
    'doctors': "We have expert doctors in:\n• General Medicine\n• Gynecology\n• Dermatology\n• Pediatrics\n• Neurology\n• Gastroenterology\n\nWould you like to see available doctors?",
    'speciality': "We offer these specialities:\n• General Physician - For general health issues\n• Gynecologist - Women's health\n• Dermatologist - Skin care\n• Pediatrician - Child health\n• Neurologist - Brain & nervous system\n• Gastroenterologist - Digestive system",
    
    // Payment
    'payment': "We accept:\n• Online payment via Razorpay\n• Cash payment at the hospital\n\nOnline payment is recommended for faster processing.",
    'fees': "Doctor consultation fees vary by speciality and experience. You can see the exact fees on each doctor's profile before booking.",
    
    // Account
    'login': "To access your account:\n1. Click 'Login' in the top menu\n2. Enter your email and password\n3. If new, click 'Create Account'\n\nNeed help logging in?",
    'profile': "To update your profile:\n1. Login to your account\n2. Go to 'My Profile'\n3. Click 'Edit' to update information\n4. Save your changes",
    
    // Default
    'default': "I'm not sure about that. You can ask me about:\n• Hospital services\n• Doctor availability\n• Appointment booking\n• Contact information\n• Payment options\n\nHow can I help you?"
  };

  const findBestResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(hospitalResponses)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }
    
    // Check for partial matches
    if (lowerInput.includes('book') || lowerInput.includes('appointment')) {
      return hospitalResponses['appointment'];
    }
    if (lowerInput.includes('doctor') || lowerInput.includes('specialist')) {
      return hospitalResponses['doctors'];
    }
    if (lowerInput.includes('where') || lowerInput.includes('address')) {
      return hospitalResponses['location'];
    }
    if (lowerInput.includes('call') || lowerInput.includes('phone') || lowerInput.includes('email')) {
      return hospitalResponses['contact'];
    }
    if (lowerInput.includes('pay') || lowerInput.includes('cost') || lowerInput.includes('price')) {
      return hospitalResponses['fees'];
    }
    if (lowerInput.includes('time') || lowerInput.includes('open') || lowerInput.includes('close')) {
      return hospitalResponses['hours'];
    }
    
    return hospitalResponses['default'];
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isBot: false
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Get bot response
    setTimeout(() => {
      const response = findBestResponse(inputText);
      const botMessage = {
        id: messages.length + 2,
        text: response,
        isBot: true
      };
      setMessages(prev => [...prev, botMessage]);

      // Check if we need to offer navigation
      if (inputText.toLowerCase().includes('doctor') && inputText.toLowerCase().includes('see')) {
        setTimeout(() => {
          const navigationMessage = {
            id: messages.length + 3,
            text: "Would you like me to take you to the doctors page?",
            isBot: true,
            showButtons: true
          };
          setMessages(prev => [...prev, navigationMessage]);
        }, 1000);
      }
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-dark transition-all z-50"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-lg">
            <h3 className="text-lg font-semibold">Hospital Assistant</h3>
            <p className="text-sm opacity-90">Ask me anything!</p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.isBot ? 'bg-gray-100 text-gray-800' : 'bg-primary text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
                {message.showButtons && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleNavigate('/doctors')}
                      className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary-dark transition"
                    >
                      Go to Doctors
                    </button>
                    <button
                      onClick={() => setMessages(prev => prev.filter(m => m.id !== message.id))}
                      className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm hover:bg-gray-300 transition"
                    >
                      No, thanks
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t">
            <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setInputText('What services do you offer?')}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200"
              >
                Services
              </button>
              <button
                onClick={() => setInputText('How do I book an appointment?')}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200"
              >
                Book Appointment
              </button>
              <button
                onClick={() => setInputText('What are your contact details?')}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:border-primary"
              />
              <button
                onClick={handleSend}
                className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
