import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import TaskManager from './components/TaskManager';
import About from './components/About';
import Toast from './components/Toast';
import { login as loginApi, register as registerApi } from './services/taskApi';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');
    const [currentUser, setCurrentUser] = useState({
        id: null,
        name: '',
        email: ''
    });
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const showToast = (message, type = 'info') => {
        console.log('showToast called:', { message, type });
        setToast({ message, type });
        console.log('toast state set');
    };

    const handleLogin = async (credentials) => {
        try {
            const user = await loginApi(credentials);
            setCurrentUser(user);
            setIsAuthenticated(true);
            setCurrentPage('home');
            localStorage.setItem('user', JSON.stringify(user));
            showToast(`Добро пожаловать, ${user.name || user.email}!`, 'success');
        } catch (error) {
            console.log('Login error:', error);
            console.log('Error message:', error.message);
            showToast(error.message || 'Произошла ошибка', 'error');
        }
    };

    const handleRegister = async (data) => {
        try {
            const user = await registerApi(data);
            setCurrentUser(user);
            setIsAuthenticated(true);
            setCurrentPage('home');
            localStorage.setItem('user', JSON.stringify(user));
            showToast(`Регистрация успешна! Добро пожаловать, ${user.name}!`, 'success');
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentPage('home');
        setCurrentUser({ id: null, name: '', email: '' });
        localStorage.removeItem('user');
    };

    if (!isAuthenticated) {
        return (
            <>
                <Auth onLogin={handleLogin} onRegister={handleRegister} />
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </>
        );
    }

    return (
        <div id="app">
            <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary shadow-sm sticky-top">
                <div className="container-fluid px-4">
                    <a className="navbar-brand fw-bold fs-4" href="#">✓ Task Manager</a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                                    onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}
                                    href="#"
                                >
                                    📋 Задачи
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
                                    onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }}
                                    href="#"
                                >
                                    ℹ️ О нас
                                </a>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center gap-3">
                            <span className="text-white">{currentUser.name || currentUser.email}</span>
                            <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
                                Выход
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container py-4">
                {currentPage === 'home' && <TaskManager userId={currentUser.id} showToast={showToast} />}
                {currentPage === 'about' && <About />}
            </main>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}

export default App;
