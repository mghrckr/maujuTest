import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store';
import { Auth, Contain } from "@/layouts";
import PrivateRoute from '@/components/PrivateRouter';


function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
        <Route path="/contain/*" element={<PrivateRoute element={Contain} />} />
      </Routes>
    </Provider>
  );
}

export default App;
