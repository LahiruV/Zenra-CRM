import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { store } from './redux/store';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Contacts from './pages/Contacts';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';
import Settings from './pages/Settings';

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
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="leads" element={<Leads />} />
              <Route path="contacts">
                <Route index element={<Contacts />} />
                <Route path="add" element={<AddContact />} />
                <Route path="edit/:id" element={<EditContact />} />
              </Route>
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;