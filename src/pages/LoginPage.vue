<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card style="background: transparent;" v-bind:style="$q.screen.lt.md ? { width: '80%' } : { width: '50%' }">

          <div class="background">
            <div class="shape"></div>
            <div class="shape"></div>
          </div>
          <q-card-section class="card-login full-width">

            <q-card-section class="text-center">
              <q-avatar size="103px" class="shadow-10">
                <img src="profile.svg" />
              </q-avatar>
              <div class="text-h6 q-pt-lg text-white">Iniciar sesión</div>
            </q-card-section>

            <q-card-section>
              <q-form @submit="login" class="q-gutter-md form">
                <q-input outlined bg-color="faint-white" color="white" label-color="white" text-color="white"
                  v-model="form.user_name" :label="$t('user_name')" lazy-rules
                  :rules="[val => !!val || 'Campo obligatorio']" :input-style="{ color: 'white' }" />


                <q-input outlined class="input-password" bg-color="faint-white" color="white" label-color="white"
                  text-color="white" v-model="form.password" autocomplete="password" :label="$t('password')"
                  type="password" lazy-rules :rules="[val => !!val || 'Campo obligatorio']"
                  :input-style="{ color: 'white' }" />

                <div>
                  <q-btn text-color="black" label="Iniciar sesión" class="full-width" type="submit" color="white"
                    :loading="loading" />
                </div>
              </q-form>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'
import { notifyError, notifySuccess } from 'src/utils/notify'

const auth = useAuthStore()
const form = ref({ user_name: '', password: '' })
const loading = ref(false)
const router = useRouter()
const isSoundEnabled = ref(true)
const login = async () => {
  loading.value = true
  const result = await auth.login(form.value.user_name, form.value.password)

  if (result.success) {
    notifySuccess(result.message)

    if (auth.roles.includes('super-admin')) {
      // router.push('/dashboard')
      router.push({ name: 'dashboard' })

    } else {
      router.push('/')
    }

  } else {
    notifyError(result.message)
  }

  loading.value = false
}
onMounted(() => {
  document.addEventListener("click", () => {
    isSoundEnabled.value = true
  }, { once: true })
});

</script>

<style scoped>
.q-input__error {
  color: white !important;
  /* Cambia el color de los mensajes de error */
}

.q-field__messages {
  color: white !important;
}

.bg-image {
  background-color: #000;
  /* background-image: linear-gradient(132deg, #080808 0%, #16A085 100%); */
  /* background-color: #00DBDE; */
  /* background-color: #121717; */
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Asegurar que el background esté por detrás */
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1 !important;
}

.background .shape {
  height: 150px;
  width: 150px;
  position: absolute;
  border-radius: 50%;
  z-index: 1;
}

.shape:first-child {
  /* background: linear-gradient(var(--q-primary), var(--q-accent)); */
  background: var(--q-secondary);
  left: -70px;
  top: -60px;
}

.shape:last-child {
  /* background: linear-gradient(to right, #155E95, #A64D79); */
  background: var(--q-teal);
  right: -30px;
  bottom: -70px;
}

/* Asegurar que el card-login esté adelante */
.card-login {
  background: rgba(255, 255, 255, 0.13);
  border-radius: 10px !important;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  position: relative;
  z-index: 3 !important;
}

.section-form {
  z-index: 3 !important;
}
</style>
