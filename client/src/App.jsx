import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';

import HomePage from './pages/HomePage';
import ProductPlatformPage from './pages/ProductPlatformPage';
import ProductSubPage from './pages/ProductSubPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import DocsPage from './pages/DocsPage';
import GenericPage from './pages/GenericPage';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

import DashboardHome from './pages/dashboard/DashboardHome';
import NewAnalysis from './pages/dashboard/NewAnalysis';
import JobsList from './pages/dashboard/JobsList';
import JobDetail from './pages/dashboard/JobDetail';
import SettingsPage from './pages/dashboard/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth — standalone layout */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Dashboard — protected + sidebar layout */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="new" element={<NewAnalysis />} />
          <Route path="jobs" element={<JobsList />} />
          <Route path="jobs/:jobId" element={<JobDetail />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Marketing — navbar + footer layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/platform" element={<ProductPlatformPage />} />
          <Route path="/product/:slug" element={<ProductSubPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/company/about" element={<AboutPage />} />
          <Route path="/company/careers" element={<CareersPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/company/partners" element={<GenericPage />} />
          <Route path="/company/events" element={<GenericPage />} />
          <Route path="/blog" element={<GenericPage />} />
          <Route path="/customers" element={<GenericPage />} />
          <Route path="/resources" element={<GenericPage />} />
          <Route path="/community" element={<GenericPage />} />
          <Route path="/startups" element={<GenericPage />} />
          <Route path="/showcase" element={<GenericPage />} />
          <Route path="/contact" element={<GenericPage />} />
          <Route path="/privacy" element={<GenericPage />} />
          <Route path="/terms" element={<GenericPage />} />
          <Route path="*" element={<GenericPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
