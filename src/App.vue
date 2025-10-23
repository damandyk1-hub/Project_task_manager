<template>
  <div id="app">
    <template v-if="!isAuthenticated">
      <Auth @login="handleLogin" @register="handleRegister" />
    </template>
    <template v-else>
      <nav class="navbar navbar-expand-lg navbar-dark bg-gradient-primary shadow-sm sticky-top">
        <div class="container-fluid px-4">
          <a class="navbar-brand fw-bold fs-4" href="#">✓ Task Manager</a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: currentPage === 'home' }"
                  @click="currentPage = 'home'"
                  href="#"
                >
                  📋 Задачи
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: currentPage === 'about' }"
                  @click="currentPage = 'about'"
                  href="#"
                >
                  ℹ️ О нас
                </a>
              </li>
            </ul>

            <div class="d-flex align-items-center gap-3">
              <span class="text-white">{{ currentUser.name || currentUser.email }}</span>
              <button @click="handleLogout" class="btn btn-outline-light btn-sm">
                Выход
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main class="container py-4">
        <TaskManager v-if="currentPage === 'home'" :userId="currentUser.email" />
        <About v-else-if="currentPage === 'about'" />
      </main>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Auth from './components/Auth.vue'
import TaskManager from './components/TaskManager.vue'
import About from './components/About.vue'

const isAuthenticated = ref(false)
const currentPage = ref('home')
const currentUser = ref({
  name: '',
  email: ''
})

const handleLogin = (credentials) => {
  currentUser.value = {
    name: credentials.email.split('@')[0],
    email: credentials.email
  }
  isAuthenticated.value = true
  currentPage.value = 'home'
  localStorage.setItem('user', JSON.stringify(currentUser.value))
}

const handleRegister = (data) => {
  currentUser.value = {
    name: data.name,
    email: data.email
  }
  isAuthenticated.value = true
  currentPage.value = 'home'
  localStorage.setItem('user', JSON.stringify(currentUser.value))
}

const handleLogout = () => {
  isAuthenticated.value = false
  currentPage.value = 'home'
  currentUser.value = {
    name: '',
    email: ''
  }
  localStorage.removeItem('user')
}

// Проверяем наличие сохраненной сессии при загрузке
const savedUser = localStorage.getItem('user')
if (savedUser) {
  currentUser.value = JSON.parse(savedUser)
  isAuthenticated.value = true
}
</script>

<style scoped>
/* Минимальные стили для Bootstrap */
</style>
