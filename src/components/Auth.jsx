import React, { useState } from 'react';

function Auth({ onLogin, onRegister }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            onLogin({
                email: formData.email,
                password: formData.password
            });
        } else {
            if (formData.password !== formData.confirmPassword) {
                alert('Пароли не совпадают!');
                return;
            }
            onRegister({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
        }

        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        <div className="auth-page min-vh-100 d-flex align-items-center justify-content-center bg-gradient-primary">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card shadow-lg border-0">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <h1 className="h2 fw-bold text-gradient mb-2">
                                        {isLogin ? 'Добро пожаловать' : 'Создать аккаунт'}
                                    </h1>
                                    <p className="text-muted">
                                        {isLogin ? 'Войдите в свой аккаунт' : 'Зарегистрируйтесь чтобы начать'}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {!isLogin && (
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Имя</label>
                                            <input
                                                value={formData.name}
                                                onChange={handleChange}
                                                type="text"
                                                id="name"
                                                className="form-control form-control-lg"
                                                placeholder="Ваше имя"
                                            />
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email"
                                            id="email"
                                            className="form-control form-control-lg"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Пароль</label>
                                        <input
                                            value={formData.password}
                                            onChange={handleChange}
                                            type="password"
                                            id="password"
                                            className="form-control form-control-lg"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>

                                    {!isLogin && (
                                        <div className="mb-3">
                                            <label htmlFor="confirmPassword" className="form-label">Подтвердите пароль</label>
                                            <input
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                type="password"
                                                id="confirmPassword"
                                                className="form-control form-control-lg"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    )}

                                    <button type="submit" className="btn btn-lg btn-primary w-100 mb-3">
                                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                                    </button>
                                </form>

                                <div className="text-center">
                                    {isLogin ? (
                                        <p className="text-muted mb-0">
                                            Нет аккаунта?{' '}
                                            <button type="button" onClick={() => setIsLogin(false)} className="btn btn-link p-0 text-decoration-none">
                                                Зарегистрируйтесь
                                            </button>
                                        </p>
                                    ) : (
                                        <p className="text-muted mb-0">
                                            Уже есть аккаунт?{' '}
                                            <button type="button" onClick={() => setIsLogin(true)} className="btn btn-link p-0 text-decoration-none">
                                                Войдите
                                            </button>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
        .auth-page {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
        }
      `}</style>
        </div>
    );
}

export default Auth;
