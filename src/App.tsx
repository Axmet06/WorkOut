import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { NotificationProvider } from './components/ui';
import { I18nProvider } from './contexts/I18nContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import JobDetailPage from './pages/JobDetailPage';
import CreateJobPage from './pages/CreateJobPage';
import ChatPage from './pages/ChatPage';
import AdminPage from './pages/AdminPage';
// Footer page components
import HowItWorksPage from './pages/HowItWorksPage';
import PricingPage from './pages/PricingPage';
import SupportPage from './pages/SupportPage';
import BecomeExecutorPage from './pages/BecomeExecutorPage';
import TipsPage from './pages/TipsPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import PressPage from './pages/PressPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import FaqPage from './pages/FaqPage';
import DisputePage from './pages/DisputePage';
import SitemapPage from './pages/SitemapPage';
import ApiPage from './pages/ApiPage';
import StatusPage from './pages/StatusPage';
import ReviewsPage from './pages/ReviewsPage';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <I18nProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/job/:id" element={<JobDetailPage />} />
                <Route path="/create-job" element={<CreateJobPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/chat/:id" element={<ChatPage />} />
                <Route path="/jobs" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                {/* Footer pages */}
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/become-executor" element={<BecomeExecutorPage />} />
                <Route path="/tips" element={<TipsPage />} />
                <Route path="/success-stories" element={<SuccessStoriesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/press" element={<PressPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/dispute" element={<DisputePage />} />
                <Route path="/sitemap" element={<SitemapPage />} />
                <Route path="/api" element={<ApiPage />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                
                {/* Дополнительные маршруты можно добавить позже */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </div>
          </Router>
        </I18nProvider>
      </NotificationProvider>
    </Provider>
  );
}

export default App;