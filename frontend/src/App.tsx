import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LogtoProvider } from '@logto/react';
import UserManager from './components/UserManager';
import Callback from './components/Callback';
import './App.css';

const config = {
  endpoint: process.env.REACT_APP_LOGTO_ENDPOINT || 'https://your-logto-endpoint.logto.app',
  appId: process.env.REACT_APP_LOGTO_APP_ID || 'your-app-id',
  resources: process.env.REACT_APP_LOGTO_RESOURCE ? [process.env.REACT_APP_LOGTO_RESOURCE] : [],
};

function App() {
  return (
    <LogtoProvider config={config}>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Full Stack CRUD App</h1>
          </header>
          <main>
            <Routes>
              <Route path="/callback" element={<Callback />} />
              <Route path="/" element={<UserManager />} />
            </Routes>
          </main>
        </div>
      </Router>
    </LogtoProvider>
  );
}

export default App;
