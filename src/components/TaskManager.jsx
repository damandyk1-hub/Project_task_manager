import React, { useState, useEffect, useMemo } from 'react';
import TaskItem from './TaskItem';
import { getTasks, createTask, updateTask as updateTaskApi, deleteTask as deleteTaskApi } from '../services/taskApi';

function TaskManager({ userId, showToast }) {
    const [newTask, setNewTask] = useState('');
    const [newTaskCategory, setNewTaskCategory] = useState('работа');
    const [newTaskPriority, setNewTaskPriority] = useState('medium');
    const [newTaskDeadline, setNewTaskDeadline] = useState('');
    const [filter, setFilter] = useState('all');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['работа', 'личное', 'покупки', 'учеба', 'здоровье', 'другое'];

    const loadTasks = async () => {
        setLoading(true);
        try {
            const fetchedTasks = await getTasks(userId);
            setTasks(fetchedTasks);
        } catch (error) {
            console.error('Error loading tasks:', error);
            showToast('Не удалось загрузить задачи', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, [userId]);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (newTask.trim()) {
            try {
                const taskData = {
                    text: newTask.trim(),
                    category: newTaskCategory,
                    priority: newTaskPriority,
                    deadline: newTaskDeadline || null
                };

                await createTask(userId, taskData);
                await loadTasks();

                setNewTask('');
                setNewTaskCategory('работа');
                setNewTaskPriority('medium');
                setNewTaskDeadline('');
                showToast('Задача успешно добавлена!', 'success');
            } catch (error) {
                console.error('Error creating task:', error);
                showToast('Не удалось создать задачу', 'error');
            }
        }
    };

    const toggleTask = async (id) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            try {
                await updateTaskApi(userId, id, { completed: !task.completed });
                await loadTasks();
                showToast(
                    task.completed ? 'Задача отмечена как активная' : 'Задача выполнена!',
                    'success'
                );
            } catch (error) {
                console.error('Error toggling task:', error);
                showToast('Не удалось обновить статус задачи', 'error');
            }
        }
    };

    const deleteTask = async (id) => {
        try {
            await deleteTaskApi(userId, id);
            await loadTasks();
            showToast('Задача удалена', 'success');
        } catch (error) {
            console.error('Error deleting task:', error);
            showToast('Не удалось удалить задачу', 'error');
        }
    };

    const updateTask = async (id, newText) => {
        try {
            await updateTaskApi(userId, id, { text: newText });
            await loadTasks();
            showToast('Задача обновлена', 'success');
        } catch (error) {
            console.error('Error updating task:', error);
            showToast('Не удалось обновить задачу', 'error');
        }
    };

    const activeTasks = useMemo(() => tasks.filter(t => !t.completed), [tasks]);
    const completedTasks = useMemo(() => tasks.filter(t => t.completed), [tasks]);

    const filteredTasks = useMemo(() => {
        let result = tasks;

        if (filter === 'active') {
            result = activeTasks;
        } else if (filter === 'completed') {
            result = completedTasks;
        }

        if (searchQuery.trim()) {
            result = result.filter(task =>
                task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return [...result].sort((a, b) => {
            const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
            if (priorityDiff !== 0) return priorityDiff;
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    }, [tasks, filter, searchQuery, activeTasks, completedTasks]);

    const noTasksMessage = useMemo(() => {
        if (filter === 'active') return 'У вас нет активных задач';
        if (filter === 'completed') return 'Вы пока не завершили ни одну задачу';
        return 'У вас нет задач. Создайте первую задачу!';
    }, [filter]);

    return (
        <div className="task-manager">
            {/* Header with Stats */}
            <div className="card shadow-sm mb-4">
                <div className="card-body bg-gradient-primary text-white rounded">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <h2 className="mb-0">Мои задачи</h2>
                        </div>
                        <div className="col-md-8">
                            <div className="row text-center g-3">
                                <div className="col-4">
                                    <div className="stat-box">
                                        <div className="stat-value">{tasks.length}</div>
                                        <div className="stat-label">Всего</div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="stat-box">
                                        <div className="stat-value">{activeTasks.length}</div>
                                        <div className="stat-label">Активных</div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="stat-box">
                                        <div className="stat-value">{completedTasks.length}</div>
                                        <div className="stat-label">Завершено</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Task Form */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h5 className="card-title mb-3">Добавить задачу</h5>
                    <form onSubmit={handleAddTask}>
                        <div className="row g-2">
                            <div className="col-12">
                                <input
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    placeholder="Название задачи..."
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <select value={newTaskCategory} onChange={(e) => setNewTaskCategory(e.target.value)} className="form-select">
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)} className="form-select">
                                    <option value="low">Низкий</option>
                                    <option value="medium">Средний</option>
                                    <option value="high">Высокий</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <input
                                    value={newTaskDeadline}
                                    onChange={(e) => setNewTaskDeadline(e.target.value)}
                                    type="date"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn btn-primary w-100">
                                    + Добавить
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Search */}
                    <div className="mt-3">
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="🔍 Поиск задач..."
                        />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="btn-group mb-3 w-100" role="group">
                <button
                    onClick={() => setFilter('all')}
                    className={`btn btn-outline-primary ${filter === 'all' ? 'active' : ''}`}
                >
                    📋 Все ({tasks.length})
                </button>
                <button
                    onClick={() => setFilter('active')}
                    className={`btn btn-outline-primary ${filter === 'active' ? 'active' : ''}`}
                >
                    ⚡ Активные ({activeTasks.length})
                </button>
                <button
                    onClick={() => setFilter('completed')}
                    className={`btn btn-outline-primary ${filter === 'completed' ? 'active' : ''}`}
                >
                    ✓ Завершенные ({completedTasks.length})
                </button>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </div>
                </div>
            ) : (
                /* Task List */
                <div className="task-list">
                    {filteredTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                            onUpdate={updateTask}
                        />
                    ))}

                    {/* No Tasks Message */}
                    {filteredTasks.length === 0 && (
                        <div className="text-center py-5">
                            <div className="mb-3" style={{ fontSize: '3rem' }}>📝</div>
                            <p className="text-muted">{noTasksMessage}</p>
                        </div>
                    )}
                </div>
            )}
            <style>{`
        .stat-box {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          padding: 0.75rem;
        }
        .stat-value {
          font-size: 1.75rem;
          font-weight: bold;
        }
        .stat-label {
          font-size: 0.875rem;
          opacity: 0.9;
        }
        .task-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
      `}</style>
        </div>
    );
}

export default TaskManager;
