import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Route.jsx';
import AuthoProvider from './providers/AuthoProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthoProvider>
      <RouterProvider router={router}>
        
          <App />
        
      </RouterProvider>
    </AuthoProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
