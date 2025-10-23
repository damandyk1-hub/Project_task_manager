<template>
  <div class="card task-item shadow-sm" :class="{ 'border-success': task.completed }">
    <div class="card-body py-3">
      <div class="d-flex align-items-start gap-3">
        <!-- Checkbox -->
        <div class="form-check">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="$emit('toggle', task.id)"
            class="form-check-input"
            style="width: 1.5rem; height: 1.5rem;"
          />
        </div>

        <!-- Task Content -->
        <div class="flex-grow-1">
          <!-- Task Text -->
          <div v-if="!isEditing" class="task-text" :class="{ 'text-decoration-line-through text-muted': task.completed }" @dblclick="startEdit">
            {{ task.text }}
          </div>

          <input
            v-else
            v-model="editText"
            @keyup.enter="saveEdit"
            @keyup.esc="cancelEdit"
            @blur="saveEdit"
            ref="editInput"
            class="form-control form-control-sm"
          />

          <!-- Task Meta -->
          <div class="d-flex gap-2 mt-2 flex-wrap">
            <span
              class="badge"
              :style="{ backgroundColor: getPriorityColor(task.priority) }"
            >
              {{ getPriorityText(task.priority) }}
            </span>
            <span class="badge bg-light text-dark">
              {{ task.category }}
            </span>
            <span v-if="task.deadline" class="badge bg-secondary">
              📅 {{ formatDate(task.deadline) }}
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="d-flex gap-2">
          <button @click="startEdit" class="btn btn-sm btn-outline-secondary" title="Редактировать">
            ✏️
          </button>
          <button @click="$emit('delete', task.id)" class="btn btn-sm btn-outline-danger" title="Удалить">
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'delete', 'update'])

const isEditing = ref(false)
const editText = ref('')
const editInput = ref(null)

const startEdit = () => {
  editText.value = props.task.text
  isEditing.value = true
  nextTick(() => {
    editInput.value?.focus()
  })
}

const saveEdit = () => {
  if (editText.value.trim() && editText.value !== props.task.text) {
    emit('update', props.task.id, editText.value.trim())
  }
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
}

const getPriorityColor = (priority) => {
  const colors = {
    high: '#dc3545',
    medium: '#ffc107',
    low: '#28a745'
  }
  return colors[priority] || '#667eea'
}

const getPriorityText = (priority) => {
  const texts = {
    high: 'Высокий',
    medium: 'Средний',
    low: 'Низкий'
  }
  return texts[priority] || 'Неизвестно'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })
}
</script>

<style scoped>
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
</style>
