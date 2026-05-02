import React, { useState, useEffect } from 'react';
import './App.css';
import { LanguageProvider } from './contexts/LanguageContext';
import HomePage from './pages/HomePage';

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Mock data for demonstration
const mockUser = {
  id: '1',
  username: 'demo_user',
  email: 'demo@neersetu.com',
  role: 'villager',
  village: 'Demo Village',
  state: 'Assam',
  district: 'Demo District',
  phone: '+91-9876543210',
};

const mockAlerts = [
  {
    id: '1',
    type: 'High Risk',
    message: 'High turbidity detected in Village A water source.',
    timestamp: '2 hours ago',
    color: '#f44336',
  },
  {
    id: '2',
    type: 'Moderate Risk',
    message: 'Increased diarrhea cases in Village B.',
    timestamp: '1 day ago',
    color: '#ff9800',
  },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('home');

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const openFeatureFromLanding = (tab = 'home') => {
    setIsAuthenticated(true);
    setCurrentTab(tab);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <LanguageProvider>
        <div className="loading-screen">
          <div className="loading-content">
            <div className="logo">💧</div>
            <h1>NeerSetu</h1>
            <p>Smart Community Health Monitoring</p>
            <div className="loading-spinner"></div>
          </div>
        </div>
      </LanguageProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <LanguageProvider>
        <HomePage onGetStarted={handleLogin} onNavigateFeature={openFeatureFromLanding} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="header-left">
              <div className="logo">💧</div>
              <h1>NeerSetu</h1>
            </div>
            <div className="header-right">
              <span>Welcome, {mockUser.username}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="navigation">
          {[
            { id: 'home', label: 'Home', icon: '🏠' },
            { id: 'reports', label: 'Reports', icon: '📋' },
            { id: 'water', label: 'Water Quality', icon: '💧' },
            { id: 'awareness', label: 'Awareness', icon: '📚' },
            { id: 'chatbot', label: 'Chatbot', icon: '🤖' },
            { id: 'alerts', label: 'Alerts', icon: '🔔' },
            { id: 'analytics', label: 'Analytics', icon: '📊' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ].map(tab => (
            <button
              key={tab.id}
              className={`nav-item ${currentTab === tab.id ? 'active' : ''}`}
              onClick={() => setCurrentTab(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main className="main-content">
          {currentTab === 'home' && (
            <HomePage
              onGetStarted={() => setCurrentTab('reports')}
              onNavigateFeature={(tab: string) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'reports' && (
            <div className="reports-screen">
              <h2>Health Reports</h2>
              <div className="report-form">
                <h3>Submit Health Report</h3>
                <div className="form-group">
                  <label>Symptoms</label>
                  <textarea placeholder="Describe your symptoms..."></textarea>
                </div>
                <div className="form-group">
                  <label>Severity</label>
                  <select>
                    <option>Mild</option>
                    <option>Moderate</option>
                    <option>Severe</option>
                  </select>
                </div>
                <button className="submit-btn">Submit Report</button>
              </div>
            </div>
          )}

          {currentTab === 'water' && (
            <div className="water-screen">
              <h2>Water Quality Monitoring</h2>
              <div className="water-stats">
                <div className="stat-card">
                  <h4>pH Level</h4>
                  <div className="stat-value">7.2</div>
                </div>
                <div className="stat-card">
                  <h4>Turbidity</h4>
                  <div className="stat-value">5.8</div>
                </div>
                <div className="stat-card">
                  <h4>Bacteria Level</h4>
                  <div className="stat-value">Low</div>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'awareness' && (
            <div className="awareness-screen">
              <h2>Health Awareness</h2>
              <div className="awareness-content">
                <div className="quiz-section">
                  <h3>Health Quiz</h3>
                  <p>Test your knowledge about water-borne diseases</p>
                  <button className="quiz-btn">Start Quiz</button>
                </div>
                <div className="tips-section">
                  <h3>Prevention Tips</h3>
                  <ul>
                    <li>Always boil drinking water</li>
                    <li>Wash hands frequently</li>
                    <li>Use clean water for cooking</li>
                    <li>Maintain proper sanitation</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'chatbot' && (
            <div className="chatbot-screen">
              <h2>AI Health Assistant</h2>
              <div className="chat-container">
                <div className="chat-messages">
                  <div className="message bot-message">
                    <p>Hello! I'm your AI health assistant. How can I help you today?</p>
                  </div>
                </div>
                <div className="chat-input">
                  <input type="text" placeholder="Ask me anything about health..." />
                  <button>Send</button>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'alerts' && (
            <div className="alerts-screen">
              <h2>Health Alerts</h2>
              <div className="alerts-list">
                {mockAlerts.map(alert => (
                  <div key={alert.id} className="alert-item">
                    <div className="alert-header">
                      <span className="alert-type" style={{ color: alert.color }}>{alert.type}</span>
                      <span className="alert-time">{alert.timestamp}</span>
                    </div>
                    <p className="alert-message">{alert.message}</p>
                    <button className="acknowledge-btn">Acknowledge</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentTab === 'analytics' && (
            <div className="analytics-screen">
              <h2>Health Analytics</h2>
              <div className="analytics-grid">
                <div className="chart-card">
                  <h3>Disease Trends</h3>
                  <div className="chart-placeholder">📊 Chart will be displayed here</div>
                </div>
                <div className="chart-card">
                  <h3>Water Quality Trends</h3>
                  <div className="chart-placeholder">📈 Chart will be displayed here</div>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'settings' && (
            <div className="settings-screen">
              <h2>Settings</h2>
              <div className="settings-content">
                <div className="setting-item">
                  <label>Language</label>
                  <select>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Assamese</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Notifications</label>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="setting-item">
                  <label>Dark Mode</label>
                  <input type="checkbox" />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;