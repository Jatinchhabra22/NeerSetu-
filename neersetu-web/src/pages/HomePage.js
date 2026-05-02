import React from 'react';
import LanguageSelector from '../components/LanguageSelector';

const features = [
  { label: 'Data collection from clinics, ASHA workers, and volunteers', tab: 'reports' },
  { label: 'AI/ML-based outbreak prediction', tab: 'analytics' },
  { label: 'IoT-based water quality monitoring', tab: 'water' },
  { label: 'Real-time alerts to authorities', tab: 'alerts' },
  { label: 'Multilingual support', tab: 'settings' },
  { label: 'Dashboard for hotspot tracking', tab: 'home' },
];

const flow = [
  {
    title: 'Collect',
    text: 'Community and clinic data, combined with IoT sensor readings, is continuously aggregated.',
  },
  {
    title: 'Analyze',
    text: 'AI models detect anomaly patterns and predict potential disease outbreaks in advance.',
  },
  {
    title: 'Act',
    text: 'Authorities receive targeted alerts and can respond quickly in high-risk zones.',
  },
];

const HomePage = ({ onGetStarted, onNavigateFeature }) => {
  return (
    <div className="landing-shell">
      <div className="bg-orb bg-orb-one" />
      <div className="bg-orb bg-orb-two" />

      <header className="landing-nav glass-card">
        <div className="brand-mark">
          <span className="brand-dot" />
          <span>NeerSetu</span>
        </div>
        <div className="landing-nav-actions">
          <LanguageSelector />
          <button className="cta-btn" onClick={onGetStarted}>
            Open Platform
          </button>
        </div>
      </header>

      <main className="landing-content">
        <section className="hero-section glass-card">
          <p className="section-kicker">Smart Public Health Infrastructure</p>
          <h1>A Smart Health Surveillance and Early Warning System</h1>
          <p className="section-copy">
            Detecting and preventing water-borne diseases using AI, IoT, and
            community data.
          </p>
          <button className="cta-btn large" onClick={onGetStarted}>
            Launch Dashboard Experience
          </button>
        </section>

        <section className="glass-card">
          <p className="section-kicker">About The Problem</p>
          <h2>Why NeerSetu Matters</h2>
          <p className="section-copy">
            Rural and remote regions face frequent outbreaks of cholera,
            diarrhea, and typhoid, especially during monsoon seasons. NeerSetu
            bridges surveillance gaps with real-time intelligence and community
            connected monitoring.
          </p>
        </section>

        <section className="glass-card">
          <p className="section-kicker">Features</p>
          <h2>Built For Field Impact</h2>
          <div className="feature-grid">
            {features.map((item) => (
              <article
                className="feature-card"
                key={item.label}
                onClick={() => onNavigateFeature?.(item.tab)}
                style={{ cursor: onNavigateFeature ? 'pointer' : 'default' }}
              >
                <span className="feature-bullet" />
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-card">
          <p className="section-kicker">How It Works</p>
          <div className="flow-grid">
            {flow.map((step) => (
              <article className="flow-card" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-card dashboard-preview">
          <p className="section-kicker">Dashboard Preview</p>
          <h2>Operational Visibility In One Place</h2>
          <div className="preview-grid">
            <div>
              <h4>Hotspot Tracking</h4>
              <p>Live risk heat layers and priority village segmentation.</p>
            </div>
            <div>
              <h4>Outbreak Forecasting</h4>
              <p>Trend intelligence with AI-driven early warning indicators.</p>
            </div>
            <div>
              <h4>Actionable Alerts</h4>
              <p>Escalation-ready notifications for district response teams.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>NeerSetu - Building resilient water-borne disease defense systems.</p>
      </footer>
    </div>
  );
};

export default HomePage;
