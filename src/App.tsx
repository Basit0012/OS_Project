import React from 'react';
import { useAuthStore } from './store/authStore';
import { LoginForm } from './components/LoginForm';
import { ChatInterface } from './components/ChatInterface';

function App() {
  const user = useAuthStore(state => state.user);

  return (
    <div className="min-h-screen bg-gray-100">
      {user ? <ChatInterface /> : <LoginForm />}
    </div>
  );
}

export default App;