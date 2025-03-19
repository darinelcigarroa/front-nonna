<template>
  <transition appear enter-active-class="animated zoomIn slower" leave-active-class="animated zoomOut slower">
    <q-page class="q-pa-md flex flex-center">
      <q-card class="col-12" style="border-radius: 10px; min-width: 90%;">
        <q-card-section class="col-lg-6 col-md-6 col-sm-12 col-xs-12 flex flex-center column">
          <q-avatar size="12rem">
            <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <span style="font-size: 2em;" class="text-uppercase q-my-sm">{{ fullName }}</span>
          <div v-for="(role, index) in authStore.roles" :key="index">
            <q-chip class="text-uppercase" :color="$q.dark.isActive ? 'grey' : 'green-2'">{{ role }}</q-chip>
          </div>
          <q-btn @click="isVisible = true" class="q-my-xs" rounded color="accent" label="Cambiar contrasena" />
        </q-card-section>
        <q-card-section class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-form @submit="updateUser" class="q-gutter-md">
            <q-input filled v-model="authStore.user.user_name" :label="$t('user_name')" />

            <q-input filled v-model="authStore.user.employee.name" :label="$t('name')" />

            <q-input filled v-model="authStore.user.employee.first_surname" :label="$t('first_name')" />

            <q-input filled v-model="authStore.user.employee.second_surname" :label="$t('second_surname')" />

            <q-input filled v-model="authStore.user.email" :label="$t('email')" />

            <div class="flex flex-center">
              <q-btn rounded :label="$t('update')" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>

      </q-card>
      <q-dialog v-model="isVisible" persistent>
        <q-card class="row q-pa-md q-dialog-card">
          <!-- Línea superior -->
          <div class="top-line bg-primary" />

          <!-- Icono flotante -->
          <div class="icon-container bg-primary">
            <q-icon name="mdi-account" color="white" size="lg" />
          </div>

          <q-card-section class="col-12 text-center">
            <div class="text-h6 q-mt-sm">
              Cambio de contraseña
            </div>
          </q-card-section>
          <q-card-section class="col-12">
            <q-form class="col-12">
              <q-input filled label="Contraseña actual" :type="isCurrentPasswordVisible ? 'text' : 'password'"
                v-model="form.currentPassword">
                <template v-slot:append>
                  <q-icon :name="isCurrentPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'" class="cursor-pointer"
                    @click="isCurrentPasswordVisible = !isCurrentPasswordVisible" />
                </template>
              </q-input>

              <q-input class="q-my-sm" filled label="Nueva contraseña"
                :type="isNewPasswordVisible ? 'text' : 'password'" v-model="form.newPassword">
                <template v-slot:append>
                  <q-icon :name="isNewPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'" class="cursor-pointer"
                    @click="isNewPasswordVisible = !isNewPasswordVisible" />
                </template>
              </q-input>

              <q-input class="q-my-sm" filled label="Confirmar contraseña"
                :type="isConfirmPasswordVisible ? 'text' : 'password'" v-model="form.newPassword_confirmation">
                <template v-slot:append>
                  <q-icon :name="isConfirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'" class="cursor-pointer"
                    @click="isConfirmPasswordVisible = !isConfirmPasswordVisible" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>


          <q-card-actions class="col-12" align="center">
            <q-btn color="accent" flat label="Cancelar" v-close-popup class="cancel-btn" />
            <q-btn outline @click="updatePassword" style="color: var(--q-primary);" label="Confirmar" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </transition>
</template>

<script setup>
import authService from 'src/services/authService';
import userService from 'src/services/userService';
import { useAuthStore } from 'src/stores/auth-store';
import { computed, ref } from 'vue';
import { notifyError, notifySuccess } from 'src/utils/notify';


const authStore = useAuthStore()
const isVisible = ref(false)
const form = ref({
  currentPassword: '',
  newPassword: '',
  newPassword_confirmation: ''
})
const isCurrentPasswordVisible = ref(false);
const isNewPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

const updateUser = async () => {
  try {
    const result = await userService.update(authStore.user.id, authStore.user)
    if (result.success) {
      notifySuccess(result.message)
    } else {
      notifyError(result.message)
    }
  } catch (e) {
    notifyError(e)
  }
}
const updatePassword = async () => {
  try {
    const result = await authService.updatePassword(form.value)
    if (result.success) {
      notifySuccess(result.message)
      isVisible.value = false
    } else {
      notifyError(result.message)
    }
  } catch (e) {
    notifyError(e)
  }
}

const fullName = computed(() => authStore.fullName);

</script>

<style scoped>
.q-dialog-card {
  max-width: 500px;
  border-radius: 12px;
  overflow: visible;
  /* Permitir que el icono sobresalga */
  position: relative;
}

.icon-container {
  position: absolute;
  top: -28px;
  /* Lo saca fuera del contenedor */
  left: 50%;
  transform: translateX(-50%);
  padding: 12px;
  border-radius: 50% !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.delete-btn {
  width: 100px;
  color: white;
}

.cancel-btn {
  width: 100px;
  color: #888;
}

.q-card-actions {
  gap: 12px;
}

.top-line {
  /* border-radius: 12px; */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  border-top-left-radius: 12px !important;
  border-top-right-radius: 12px !important;
}
</style>
