// Real API Service connecting to Python Backend

const API_URL = '/api';

// Helper to handle response
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Something went wrong' }));
    throw new Error(error.detail || 'API Error');
  }
  return response.json();
};

// --- Auth ---

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
}

// --- Tasks ---

export const getTasks = async (userId) => {
  const response = await fetch(`${API_URL}/tasks/${userId}`);
  return handleResponse(response);
}

export const createTask = async (userId, taskData) => {
  const response = await fetch(`${API_URL}/tasks/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
}

export const updateTask = async (userId, taskId, updates) => {
  const response = await fetch(`${API_URL}/tasks/${userId}/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
}

export const deleteTask = async (userId, taskId) => {
  const response = await fetch(`${API_URL}/tasks/${userId}/${taskId}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}

// Client-side helpers (no backend change needed for these yet)
export const getTaskStats = async (userId) => {
  const tasks = await getTasks(userId);
  return {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
    highPriority: tasks.filter(t => t.priority === 'high' && !t.completed).length,
    byCategory: Object.fromEntries(
      [...new Set(tasks.map(t => t.category))].map(cat => [
        cat,
        tasks.filter(t => t.category === cat).length
      ])
    )
  }
}

export const searchTasks = async (userId, query) => {
  const tasks = await getTasks(userId);
  return tasks.filter(task =>
    task.text.toLowerCase().includes(query.toLowerCase()) ||
    task.category.toLowerCase().includes(query.toLowerCase())
  )
}

export const sortTasks = async (userId, sortBy = 'date') => {
  const tasks = await getTasks(userId);
  const priorityOrder = { high: 0, medium: 1, low: 2 };

  switch (sortBy) {
    case 'priority':
      return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    case 'date':
      return tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    case 'name':
      return tasks.sort((a, b) => a.text.localeCompare(b.text))
    default:
      return tasks
  }
}

export const resetTasks = async () => {
  console.warn('Reset tasks not implemented in backend mode');
  return { success: true };
}
