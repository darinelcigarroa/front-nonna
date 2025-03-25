<template>
  <q-layout view="lHh LpR lFf">
    <q-header reveal :class="$q.dark.isActive ? 'header_dark' : 'header_normal'">
      <q-toolbar>
        <q-btn @click="left = !left" flat round dense icon="menu" class="q-mr-sm" />
        <q-toolbar-title>
          <router-link :to="{ name: 'home' }" style="text-decoration: none;" class="text-white">
            LA NONNA
          </router-link>
        </q-toolbar-title>

        <q-btn class="q-mr-xs" flat round @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'" />
        <q-btn flat round dense icon="mdi-logout" @click="logout" to="/" />
      </q-toolbar>
    </q-header>
    <q-drawer class="left-navigation text-white bg-secondary" show-if-above v-model="left" side="left" elevated>
      <div class="full-height" :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'">
        <div style="height: calc(100% - 117px);padding:10px;">
          <q-toolbar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>

            <q-toolbar-title>{{ auth.fullName }}</q-toolbar-title>
          </q-toolbar>
          <hr />
          <q-scroll-area style="height:100%;">
            <q-list padding>
              <CanRoles v-for="(group, index) in menuGroups" :key="index" :roles="group.roles">
                <q-item v-for="(item, idx) in group.items" :key="idx" active-class="tab-active"
                  :to="{ name: item.route }" class="q-ma-sm navigation-item" clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon :name="item.icon" />
                  </q-item-section>

                  <q-item-section>
                    {{ $t(item.label) }}
                  </q-item-section>
                </q-item>
              </CanRoles>
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>


    <q-page-container>
      <q-page :class="[{ 'page-dark': $q.dark.isActive }]">

        <router-view />
        <q-dialog v-model="isVisible" persistent>
          <q-card class="q-pa-xl q-dialog-card">
            <!-- Línea superior -->
            <div class="top-line bg-accent" />

            <!-- Icono flotante -->
            <div class="icon-container bg-accent">
              <q-icon name="mdi-food-fork-drink" color="white" size="lg" />
            </div>

            <q-card-section class="q-pt-none text-center">
              <div class="text-h5 text-weight-bold q-mt-md ">
                ¡Orden lista!
              </div>
              <div v-for="(order, index) in ordersReady" :key="index" class="q-mt-sm">
                <span class="text-bold" style="font-size: 17px;">{{ order.folio }} - {{ order.table }}</span>
              </div>
            </q-card-section>

            <q-card-actions align="center" class="q-mt-md">
              <q-btn label="Confirmar" v-close-popup color="accent" @click="confirm" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth-store'
import { useQuasar } from 'quasar';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { useRouter } from 'vue-router';
import { echo } from 'boot/echo';
import { useOrderStore } from '@/stores/waiter/order-store';

const $q = useQuasar();
const left = ref(false)
const auth = useAuthStore()
const router = useRouter()
const orderStore = useOrderStore();
const isVisible = ref(false)
const ordersReady = ref([])
const menuGroups = [
  {
    roles: ["super-admin"],
    items: [
      { route: "dashboard", label: "dashboard", icon: "dashboard" },
      { route: "indexEmployee", label: "employees", icon: "mdi-account-group" },
      { route: "adminCatalogs", label: "catalogs", icon: "mdi-apps" },
    ],
  },
  {
    roles: ["waiter"],
    items: [
      { route: "create-order", label: "create_order", icon: "mdi-order-bool-descending-variant" },
      { route: "active-tables", label: "active_services", icon: "mdi-table-chair" },
    ],
  },
  {
    roles: ["chef"],
    items: [
      { route: "kitchen-orders", label: "kitchen_orders", icon: "mdi-silverware-fork-knife" },
    ],
  },
  {
    roles: ["super-admin"],
    items: [
      { route: "index-order", label: "completed_orders", icon: "mdi-order-bool-ascending" },
    ],
  },
  {
    roles: ["super-admin", "chef", "waiter"],
    items: [
      { route: "profile", label: "profile", icon: "mdi-account" },
    ],
  },
];

// Methods
const logout = (async () => {
  $q.loading.show();
  const result = await auth.logout()
  if (result.success) {
    notifySuccess(result.message)
    router.push({ name: 'login' })
  } else {
    notifyError(result.message)
  }
  $q.loading.hide();
})
const confirm = () => {
  isVisible.value = true
  ordersReady.value = []
}
// Función para reproducir el sonido
const playNotificationSound = () => {
  if (!isSoundEnabled.value) {
    return;
  }

  const audio = new Audio("/sounds/notificationOrderReady.mp3");
  audio.play()
};

const isSoundEnabled = ref(false);

const notificationOrdersReady = () => {
  if (auth.roles.includes('waiter')) {
    echo.private('order-items-updated')
      .stopListening('OrderItemsUpdated')
      .listen('OrderItemsUpdated', (event) => {
        showNotification(event)
      });
  }
}

const showNotification = (event) => {
  const order = auth.user.orders.find((order) => order.id == event.orderId)
  if (event.completed && order !== undefined) {
    ordersReady.value.push({ folio: order.folio, table: order.table.name })
    isVisible.value = true
    playNotificationSound();
  }
  orderStore.handleOrderUpdated(event);
}

const enabledSound = () => {
  document.addEventListener("click", () => {
    isSoundEnabled.value = true
  }, { once: true })
}

onMounted(() => {
  enabledSound()
  notificationOrdersReady()
});

</script>

<style>
.drawer_normal {
  background-color: rgba(1, 1, 1, 0.75);
}

.drawer_dark {
  background-color: #010101f2;
}

.navigation-item {
  border-radius: 5px;
}

.tab-active {
  background: var(--q-primary);
}

body {
  background: #f1f1f1 !important;
}

.header_normal {
  /* background: linear-gradient(145deg,
      #000 20%,
      var(--q-secondary) 70%); */
  background: var(--q-primary);
}

.page-dark {
  /* background: rgb(37 20 20); */
  background: #000;
}

.header_dark {
  background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%);
}

/* DIALOG */
.q-dialog-card {
  max-width: 500px;
  /* border-radius: 15px !important; */
  overflow: visible !important;
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
  border-radius: 12px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  /* border-top-left-radius: 15px;
  border-top-right-radius: 15px; */
}
</style>
