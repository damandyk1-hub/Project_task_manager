import React, { useState, useRef, useEffect } from 'react';

function TaskItem({ task, onToggle, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState('');
    const editInputRef = useRef(null);

    useEffect(() => {
        if (isEditing && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [isEditing]);

    const startEdit = () => {
        setEditText(task.text);
        setIsEditing(true);
    };

    const saveEdit = () => {
        if (editText.trim() && editText !== task.text) {
            onUpdate(task.id, editText.trim());
        }
        setIsEditing(false);
    };

    const cancelEdit = () => {
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    };

    const getPriorityColor = (priority) => {
        const colors = {
            high: '#dc3545',
            medium: '#ffc107',
            low: '#28a745'
        };
        return colors[priority] || '#667eea';
    };

    const getPriorityText = (priority) => {
        const texts = {
            high: 'Высокий',
            medium: 'Средний',
            low: 'Низкий'
        };
        return texts[priority] || 'Неизвестно';
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' });
    };

    return (
        <div className={`card task-item shadow-sm ${task.completed ? 'border-success' : ''}`}>
            <div className="card-body py-3">
                <div className="d-flex align-items-start gap-3">
                    {/* Checkbox */}
                    <div className="form-check">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggle(task.id)}
                            className="form-check-input"
                            style={{ width: '1.5rem', height: '1.5rem' }}
                        />
                    </div>

                    {/* Task Content */}
                    <div className="flex-grow-1">
                        {/* Task Text */}
                        {!isEditing ? (
                            <div
                                className={`task-text ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}
                                onDoubleClick={startEdit}
                            >
                                {task.text}
                            </div>
                        ) : (
                            <input
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onBlur={saveEdit}
                                ref={editInputRef}
                                className="form-control form-control-sm"
                            />
                        )}

                        {/* Task Meta */}
                        <div className="d-flex gap-2 mt-2 flex-wrap">
                            <span
                                className="badge"
                                style={{ backgroundColor: getPriorityColor(task.priority) }}
                            >
                                {getPriorityText(task.priority)}
                            </span>
                            <span className="badge bg-light text-dark">
                                {task.category}
                            </span>
                            {task.deadline && (
                                <span className="badge bg-secondary">
                                    📅 {formatDate(task.deadline)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="d-flex gap-2">
                        <button onClick={startEdit} className="btn btn-sm btn-outline-secondary" title="Редактировать">
                            ✏️
                        </button>
                        <button onClick={() => onDelete(task.id)} className="btn btn-sm btn-outline-danger" title="Удалить">
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
        .task-item {
          transition: all 0.2s ease;
          border: 2px solid #e9ecef;
        }
        .task-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        .task-text {
          cursor: pointer;
          font-size: 1.05rem;
          font-weight: 500;
        }
      `}</style>
        </div>
    );
}

export default TaskItem;
