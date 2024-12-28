import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './views/LoginPage/LoginPage';
import MessagesPage from './views/MessagesPage/MessagesPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import RegisterPage from './views/RegisterPage/RegisterPage';

function App() {
  return (
    <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/messages" element={<MessagesPage />} />
          </Routes>
        </Router>
    </Provider>
  );
}

export default App;
