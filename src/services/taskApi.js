// Mock API Service для управления задачами
// Это заглушка бэкенда, которая эмулирует API

const STORAGE_KEY = 'tasks_data'

// Имитация задержки сети
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Инициализация хранилища
const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
  }
}

// Получить все задачи пользователя
export const getTasks = async (userId) => {
  await delay(300) // Имитируем сетевую задержку
  initStorage()

  const allTasks = JSON.parse(localStorage.getItem(STORAGE_KEY))
  return allTasks.filter(task => task.userId === userId)
}

// Создать новую задачу
export const createTask = async (userId, taskData) => {
  await delay(200)
  initStorage()

  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY))

  const newTask = {
    id: Date.now().toString(),
    userId,
    ...taskData,
    createdAt: new Date().toISOString(),
    completed: false
  }

  tasks.push(newTask)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))

  return newTask
}

// Обновить задачу
export const updateTask = async (userId, taskId, updates) => {
  await delay(200)
  initStorage()

  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY))
  const taskIndex = tasks.findIndex(t => t.id === taskId && t.userId === userId)

  if (taskIndex === -1) {
    throw new Error('Task not found')
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))

  return tasks[taskIndex]
}

// Удалить задачу
export const deleteTask = async (userId, taskId) => {
  await delay(200)
  initStorage()

  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY))
  const filteredTasks = tasks.filter(t => !(t.id === taskId && t.userId === userId))

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTasks))

  return { success: true }
}

// Получить статистику задач
export const getTaskStats = async (userId) => {
  await delay(200)

  const tasks = await getTasks(userId)

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

// Поиск задач
export const searchTasks = async (userId, query) => {
  await delay(200)

  const tasks = await getTasks(userId)

  return tasks.filter(task =>
    task.text.toLowerCase().includes(query.toLowerCase()) ||
    task.category.toLowerCase().includes(query.toLowerCase())
  )
}

// Сортировка задач
export const sortTasks = async (userId, sortBy = 'date') => {
  await delay(200)

  const tasks = await getTasks(userId)

  const priorityOrder = { high: 0, medium: 1, low: 2 }

  switch (sortBy) {
    case 'priority':
      return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    case 'date':
      return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    case 'name':
      return tasks.sort((a, b) => a.text.localeCompare(b.text))
    default:
      return tasks
  }
}

// Сбросить все задачи (для демонстрации)
export const resetTasks = async () => {
  await delay(300)
  localStorage.removeItem(STORAGE_KEY)
  return { success: true }
}
