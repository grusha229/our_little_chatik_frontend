import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import MessagesPage from './pages/MessagesPage/MessagesPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';
import PublicRoute from './pages/PublicRoute/PublicRoute';
import ErrorPage from './pages/404Page/404Page';
import ActivationPage from './pages/ActivationPage/ActivationPage';
import AuthRedirect from './pages/AuthRedirect/AuthRedirect';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<AuthRedirect />} />
                    <Route path="/" element={<PublicRoute />} errorElement={<ErrorPage />}>
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
