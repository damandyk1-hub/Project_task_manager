<template>
  <div class="task-manager">
    <!-- Header with Stats -->
    <div class="card shadow-sm mb-4">
      <div class="card-body bg-gradient-primary text-white rounded">
        <div class="row align-items-center">
          <div class="col-md-4">
            <h2 class="mb-0">Мои задачи</h2>
          </div>
          <div class="col-md-8">
            <div class="row text-center g-3">
              <div class="col-4">
                <div class="stat-box">
                  <div class="stat-value">{{ tasks.length }}</div>
                  <div class="stat-label">Всего</div>
                </div>
              </div>
              <div class="col-4">
                <div class="stat-box">
                  <div class="stat-value">{{ activeTasks.length }}</div>
                  <div class="stat-label">Активных</div>
                </div>
              </div>
              <div class="col-4">
                <div class="stat-box">
                  <div class="stat-value">{{ completedTasks.length }}</div>
                  <div class="stat-label">Завершено</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Task Form -->
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <h5 class="card-title mb-3">Добавить задачу</h5>
        <form @submit.prevent="addTask">
          <div class="row g-2">
            <div class="col-12">
              <input
                v-model="newTask"
                type="text"
                class="form-control"
                placeholder="Название задачи..."
                required
              />
            </div>
            <div class="col-md-3">
              <select v-model="newTaskCategory" class="form-select">
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <select v-model="newTaskPriority" class="form-select">
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
              </select>
            </div>
            <div class="col-md-3">
              <input
                v-model="newTaskDeadline"
                type="date"
                class="form-control"
              />
            </div>
            <div class="col-md-3">
              <button type="submit" class="btn btn-primary w-100">
                + Добавить
              </button>
            </div>
          </div>
        </form>

        <!-- Search -->
        <div class="mt-3">
          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="🔍 Поиск задач..."
          />
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="btn-group mb-3 w-100" role="group">
      <button
        @click="filter = 'all'"
        :class="{ active: filter === 'all' }"
        class="btn btn-outline-primary"
      >
        📋 Все ({{ tasks.length }})
      </button>
      <button
        @click="filter = 'active'"
        :class="{ active: filter === 'active' }"
        class="btn btn-outline-primary"
      >
        ⚡ Активные ({{ activeTasks.length }})
      </button>
      <button
        @click="filter = 'completed'"
        :class="{ active: filter === 'completed' }"
        class="btn btn-outline-primary"
      >
        ✓ Завершенные ({{ completedTasks.length }})
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>

    <!-- Task List -->
    <div v-else class="task-list">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @delete="deleteTask"
        @update="updateTask"
      />

      <!-- No Tasks Message -->
      <div v-if="filteredTasks.length === 0" class="text-center py-5">
        <div class="mb-3" style="font-size: 3rem;">📝</div>
        <p class="text-muted">{{ noTasksMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TaskItem from './TaskItem.vue'
import { getTasks, createTask, updateTask as updateTaskApi, deleteTask as deleteTaskApi } from '../services/taskApi'

const props = defineProps({
  userId: {
    type: String,
    default: () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'default'
  }
})

const newTask = ref('')
const newTaskCategory = ref('работа')
const newTaskPriority = ref('medium')
const newTaskDeadline = ref('')
const filter = ref('all')
const tasks = ref([])
const loading = ref(false)
const userId = ref('')
const searchQuery = ref('')

onMounted(async () => {
  userId.value = props.userId
  await loadTasks()
})

const loadTasks = async () => {
  loading.value = true
  try {
    tasks.value = await getTasks(userId.value)
  } catch (error) {
    console.error('Error loading tasks:', error)
  } finally {
    loading.value = false
  }
}

const addTask = async () => {
  if (newTask.value.trim()) {
    try {
      const taskData = {
        text: newTask.value.trim(),
        category: newTaskCategory.value,
        priority: newTaskPriority.value,
        deadline: newTaskDeadline.value || null
      }

      await createTask(userId.value, taskData)
      await loadTasks()

      newTask.value = ''
      newTaskCategory.value = 'работа'
      newTaskPriority.value = 'medium'
      newTaskDeadline.value = ''
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }
}

const toggleTask = async (id) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    try {
      await updateTaskApi(userId.value, id, { completed: !task.completed })
      await loadTasks()
    } catch (error) {
      console.error('Error toggling task:', error)
    }
  }
}

const deleteTask = async (id) => {
  try {
    await deleteTaskApi(userId.value, id)
    await loadTasks()
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}

const updateTask = async (id, newText) => {
  try {
    await updateTaskApi(userId.value, id, { text: newText })
    await loadTasks()
  } catch (error) {
    console.error('Error updating task:', error)
  }
}

const activeTasks = computed(() => tasks.value.filter(t => !t.completed))
const completedTasks = computed(() => tasks.value.filter(t => t.completed))

const filteredTasks = computed(() => {
  let result = tasks.value

  if (filter.value === 'active') {
    result = activeTasks.value
  } else if (filter.value === 'completed') {
    result = completedTasks.value
  }

  if (searchQuery.value.trim()) {
    result = result.filter(task =>
      task.text.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  const priorityOrder = { high: 0, medium: 1, low: 2 }
  return result.sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
    if (priorityDiff !== 0) return priorityDiff
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
})

const noTasksMessage = computed(() => {
  if (filter.value === 'active') return 'У вас нет активных задач'
  if (filter.value === 'completed') return 'Вы пока не завершили ни одну задачу'
  return 'У вас нет задач. Создайте первую задачу!'
})

const categories = ['работа', 'личное', 'покупки', 'учеба', 'здоровье', 'другое']
</script>

<style scoped>
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
</style>
