import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { store } from './redux/store';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Contacts from './pages/Contacts';
import Accounts from './pages/Accounts';
import Tasks from './pages/Tasks';
import Deals from './pages/Deals';
import Support from './pages/Support';
import Analytics from './pages/Analytics';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';
import AddLead from './pages/AddLead';
import EditLead from './pages/EditLead';
import AddAccount from './pages/AddAccount';
import EditAccount from './pages/EditAccount';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import Settings from './pages/Settings';
import TaskCalendar from './pages/TaskCalendar';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Create a client for TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Toaster 
            position="top-right"
            richColors
            closeButton
            duration={4000}
            toastOptions={{
              style: {
                background: 'white',
                border: '1px solid #e5e7eb',
                color: '#374151',
              },
            }}
          />
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="leads" element={
                <ProtectedRoute>
                  <Leads />
                </ProtectedRoute>
              } />
              <Route path="leads/add" element={
                <ProtectedRoute>
                  <AddLead />
                </ProtectedRoute>
              } />
              <Route path="leads/edit/:id" element={
                <ProtectedRoute>
                  <EditLead />
                </ProtectedRoute>
              } />
              <Route path="accounts" element={
                <ProtectedRoute>
                  <Accounts />
                </ProtectedRoute>
              } />
              <Route path="accounts/add" element={
                <ProtectedRoute>
                  <AddAccount />
                </ProtectedRoute>
              } />
              <Route path="accounts/edit/:id" element={
                <ProtectedRoute>
                  <EditAccount />
                </ProtectedRoute>
              } />
              <Route path="tasks" element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              } />
              <Route path="tasks/add" element={
                <ProtectedRoute>
                  <AddTask />
                </ProtectedRoute>
              } />
              <Route path="tasks/edit/:id" element={
                <ProtectedRoute>
                  <EditTask />
                </ProtectedRoute>
              } />
              <Route path="deals" element={
                <ProtectedRoute>
                  <Deals />
                </ProtectedRoute>
              } />
              <Route path="support" element={
                <ProtectedRoute>
                  <Support />
                </ProtectedRoute>
              } />
              <Route path="analytics" element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="calendar" element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              } />
              <Route path="contacts">
                <Route index element={
                  <ProtectedRoute>
                    <Contacts />
                  </ProtectedRoute>
                } />
                <Route path="add" element={
                  <ProtectedRoute>
                    <AddContact />
                  </ProtectedRoute>
                } />
                <Route path="edit/:id" element={
                  <ProtectedRoute>
                    <EditContact />
                  </ProtectedRoute>
                } />
              </Route>
              <Route path="settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;