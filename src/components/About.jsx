import React from 'react';

function About() {
    return (
        <div className="about-page">
            <div className="container py-5">
                {/* Header */}
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-gradient mb-3">О приложении</h1>
                    <p className="lead text-muted">Task Manager - современное приложение для управления вашими задачами</p>
                </div>

                {/* About Section */}
                <div className="card shadow-sm mb-5">
                    <div className="card-body p-4 text-center">
                        <div className="mb-3" style={{ fontSize: '3rem' }}>📋</div>
                        <h2 className="h4 mb-3">Что такое Task Manager?</h2>
                        <p className="text-muted">
                            Task Manager - это элегантное приложение для управления задачами с красивым интерфейсом
                            и удобной функциональностью. Создавайте, редактируйте и отслеживайте ваши задачи
                            с различными приоритетами и категориями.
                        </p>
                    </div>
                </div>

                {/* Features */}
                <div className="mb-5">
                    <h2 className="h3 text-center mb-4">Возможности</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body text-center p-4">
                                    <div className="mb-3" style={{ fontSize: '2.5rem' }}>✓</div>
                                    <h3 className="h5 mb-3">Управление задачами</h3>
                                    <p className="text-muted mb-0">Добавляйте, редактируйте и удаляйте задачи в реальном времени</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body text-center p-4">
                                    <div className="mb-3" style={{ fontSize: '2.5rem' }}>⚡</div>
                                    <h3 className="h5 mb-3">Приоритеты</h3>
                                    <p className="text-muted mb-0">Установите приоритет задачи: высокий, средний или низкий</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body text-center p-4">
                                    <div className="mb-3" style={{ fontSize: '2.5rem' }}>🏷️</div>
                                    <h3 className="h5 mb-3">Категории</h3>
                                    <p className="text-muted mb-0">Организуйте задачи по категориям для лучшей структуры</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body text-center p-4">
                                    <div className="mb-3" style={{ fontSize: '2.5rem' }}>📅</div>
                                    <h3 className="h5 mb-3">Сроки</h3>
                                    <p className="text-muted mb-0">Установите дедлайны для ваших задач и не забывайте о них</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body text-center p-4">
                                    <div className="mb-3" style={{ fontSize: '2.5rem' }}>🔒</div>
                                    <h3 className="h5 mb-3">Аутентификация</h3>
                                    <p className="text-muted mb-0">Безопасная система регистрации и входа в личный кабинет</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body text-center p-4">
                                    <div className="mb-3" style={{ fontSize: '2.5rem' }}>💾</div>
                                    <h3 className="h5 mb-3">Сохранение данных</h3>
                                    <p className="text-muted mb-0">Все ваши задачи сохраняются локально и синхронизируются</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Authors */}
                <div className="mb-5">
                    <h2 className="h3 text-center mb-4">Авторы проекта</h2>
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-5">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body text-center p-4">
                                    <div className="mb-3">
                                        <div className="avatar-circle mx-auto">
                                            <span style={{ fontSize: '3rem' }}>👩‍💻</span>
                                        </div>
                                    </div>
                                    <h3 className="h5 fw-bold mb-2">Амандыкова Диана</h3>
                                    <p className="text-primary fw-semibold mb-3">Frontend Developer</p>
                                    <p className="text-muted">Разработка пользовательского интерфейса, дизайн компонентов и реализация взаимодействия с пользователем</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body text-center p-4">
                                    <div className="mb-3">
                                        <div className="avatar-circle mx-auto">
                                            <span style={{ fontSize: '3rem' }}>👩‍💼</span>
                                        </div>
                                    </div>
                                    <h3 className="h5 fw-bold mb-2">Бауржанкызы Аружан</h3>
                                    <p className="text-primary fw-semibold mb-3">Frontend Developer</p>
                                    <p className="text-muted">Проектирование архитектуры приложения, разработка бизнес-логики и функциональности</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Info */}
                <div className="mb-5">
                    <h2 className="h3 text-center mb-4">О проекте</h2>
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <h5 className="fw-bold mb-2">Архитектура</h5>
                                    <p className="text-muted mb-0">Single Page Application (SPA) на базе React с компонентным подходом</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h5 className="fw-bold mb-2">Паттерны</h5>
                                    <p className="text-muted mb-0">Hooks, State Management, разделение на компоненты</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h5 className="fw-bold mb-2">Хранение данных</h5>
                                    <p className="text-muted mb-0">LocalStorage для персистентности, mock API для эмуляции бэкенда</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h5 className="fw-bold mb-2">UI Framework</h5>
                                    <p className="text-muted mb-0">Bootstrap 5 для адаптивного и кроссбраузерного интерфейса</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-5">
                    <h2 className="h3 text-center mb-4">Технологический стек</h2>
                    <div className="row g-3 justify-content-center">
                        <div className="col-6 col-md-2">
                            <div className="card shadow-sm border-0 text-center p-3">
                                <div style={{ fontSize: '2.5rem' }}>⚛️</div>
                                <p className="fw-semibold mb-0 small">React</p>
                            </div>
                        </div>
                        <div className="col-6 col-md-2">
                            <div className="card shadow-sm border-0 text-center p-3">
                                <div style={{ fontSize: '2.5rem' }}>⚡</div>
                                <p className="fw-semibold mb-0 small">Vite</p>
                            </div>
                        </div>
                        <div className="col-6 col-md-2">
                            <div className="card shadow-sm border-0 text-center p-3">
                                <div style={{ fontSize: '2.5rem' }}>🎨</div>
                                <p className="fw-semibold mb-0 small">Bootstrap 5</p>
                            </div>
                        </div>
                        <div className="col-6 col-md-2">
                            <div className="card shadow-sm border-0 text-center p-3">
                                <div style={{ fontSize: '2.5rem' }}>💾</div>
                                <p className="fw-semibold mb-0 small">LocalStorage</p>
                            </div>
                        </div>
                        <div className="col-6 col-md-2">
                            <div className="card shadow-sm border-0 text-center p-3">
                                <div style={{ fontSize: '2.5rem' }}>🚀</div>
                                <p className="fw-semibold mb-0 small">ES6+</p>
                            </div>
                        </div>
                        <div className="col-6 col-md-2">
                            <div className="card shadow-sm border-0 text-center p-3">
                                <div style={{ fontSize: '2.5rem' }}>📱</div>
                                <p className="fw-semibold mb-0 small">Responsive</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
        .avatar-circle {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }
        .card {
          transition: transform 0.2s ease;
        }
        .card:hover {
          transform: translateY(-5px);
        }
      `}</style>
        </div>
    );
}

export default About;
