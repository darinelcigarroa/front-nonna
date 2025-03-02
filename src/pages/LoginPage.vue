<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }">
          <q-card-section class="text-center">
            <q-avatar size="103px" class="shadow-10">
              <img src="profile.svg" />
            </q-avatar>
            <div class="text-h6 q-pt-lg">Log in</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="login" class="q-gutter-md">
              <q-input v-model="form.email" filled :label="$t('user_name')" autocomplete="current-username" lazy-rules
                :rules="[val => !!val || 'Campo obligatorio']" />

              <q-input v-model="form.password" filled autocomplete="current-password" :label="$t('password')"
                type="password" lazy-rules :rules="[val => !!val || 'Campo obligatorio']" />
              <div>

                <q-btn label="Iniciar sesión" class="full-width" type="submit" color="primary" :loading="loading" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'
import { notifyError, notifySuccess } from 'src/utils/notify'

const auth = useAuthStore()
const form = ref({ email: '', password: '' })
const loading = ref(false)
const router = useRouter()

const login = async () => {
  loading.value = true
  const result = await auth.login(form.value.email, form.value.password)

  if (result.success) {
    notifySuccess(result.message)
    router.push('/')
  } else {
    notifyError(result.message)
  }

  loading.value = false
}
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #000 0%, var(--q-secondary) 100%);
}
</style>
