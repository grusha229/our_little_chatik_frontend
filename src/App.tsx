import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './views/LoginPage/LoginPage';
import MessagesPage from './views/MessagesPage/MessagesPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import RegisterPage from './views/RegisterPage/RegisterPage';
import PrivateRoute from './views/PrivateRoute';
import PublicRoute from './views/PublicRoute';
import ErrorPage from './views/404/404';
import ActivationPage from './views/ActivationPage/ActivationPage';

function App() {
  return (
    <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<PublicRoute />} >
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/activation" element={<ActivationPage />} />
            </Route>

            <Route path="/" element={<PrivateRoute />} errorElement={<ErrorPage />}>
              <Route path="/messages" element={<MessagesPage />} errorElement={<ErrorPage />} />
              <Route path="/messages/:id" element={<MessagesPage />} errorElement={<ErrorPage />} />
            </Route>
          </Routes>
        </Router>
    </Provider>
  );
}

export default App;
