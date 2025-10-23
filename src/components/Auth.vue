<template>
  <div class="auth-page min-vh-100 d-flex align-items-center justify-content-center bg-gradient-primary">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="card shadow-lg border-0">
            <div class="card-body p-5">
              <div class="text-center mb-4">
                <h1 class="h2 fw-bold text-gradient mb-2">
                  {{ isLogin ? 'Добро пожаловать' : 'Создать аккаунт' }}
                </h1>
                <p class="text-muted">
                  {{ isLogin ? 'Войдите в свой аккаунт' : 'Зарегистрируйтесь чтобы начать' }}
                </p>
              </div>

              <form @submit.prevent="handleSubmit">
                <div v-if="!isLogin" class="mb-3">
                  <label for="name" class="form-label">Имя</label>
                  <input
                    v-model="formData.name"
                    type="text"
                    id="name"
                    class="form-control form-control-lg"
                    placeholder="Ваше имя"
                  />
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    v-model="formData.email"
                    type="email"
                    id="email"
                    class="form-control form-control-lg"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Пароль</label>
                  <input
                    v-model="formData.password"
                    type="password"
                    id="password"
                    class="form-control form-control-lg"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div v-if="!isLogin" class="mb-3">
                  <label for="confirmPassword" class="form-label">Подтвердите пароль</label>
                  <input
                    v-model="formData.confirmPassword"
                    type="password"
                    id="confirmPassword"
                    class="form-control form-control-lg"
                    placeholder="••••••••"
                  />
                </div>

                <button type="submit" class="btn btn-lg btn-primary w-100 mb-3">
                  {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
                </button>
              </form>

              <div class="text-center">
                <p v-if="isLogin" class="text-muted mb-0">
                  Нет аккаунта?
                  <button type="button" @click="isLogin = false" class="btn btn-link p-0 text-decoration-none">
                    Зарегистрируйтесь
                  </button>
                </p>
                <p v-else class="text-muted mb-0">
                  Уже есть аккаунт?
                  <button type="button" @click="isLogin = true" class="btn btn-link p-0 text-decoration-none">
                    Войдите
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['login', 'register'])

const isLogin = ref(true)
const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleSubmit = () => {
  if (isLogin.value) {
    emit('login', {
      email: formData.value.email,
      password: formData.value.password
    })
  } else {
    if (formData.value.password !== formData.value.confirmPassword) {
      alert('Пароли не совпадают!')
      return
    }
    emit('register', {
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password
    })
  }

  formData.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
}
</script>

<style scoped>
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
</style>
