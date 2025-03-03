<template>
  <q-layout view="lHh LpR lFf">
    <q-header reveal :class="$q.dark.isActive ? 'header_dark' : 'header_normal'">
      <q-toolbar>
        <q-btn @click="left = !left" flat round dense icon="menu" class="q-mr-sm" />
        <!-- <q-toolbar-title to="/home">Dinamico</q-toolbar-title> -->
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth-store'
import { useQuasar } from 'quasar';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const left = ref(false)
const auth = useAuthStore()
const router = useRouter()

const menuGroups = [
  {
    roles: ["super-admin"],
    items: [
      { route: "dashboard", label: "dashboard", icon: "dashboard" },
      { route: "createEmployee", label: "employees", icon: "mdi-account-group" },
      { route: "createTables", label: "tables", icon: "table_bar" },
      { route: "createDishes", label: "dishes", icon: "local_dining" },
    ],
  },
  {
    roles: ["super-admin", "waiter"],
    items: [
      { route: "create-order", label: "create_order", icon: "mdi-order-bool-descending-variant" },
      { route: "active-tables", label: "active_services", icon: "mdi-table-chair" },
    ],
  },
  {
    roles: ["super-admin", "chef"],
    items: [
      { route: "kitchen-orders", label: "kitchen_orders", icon: "mdi-silverware-fork-knife" },
    ],
  },
  {
    roles: ["super-admin", "chef", "waiter"],
    items: [
      { route: "profile", label: "profile", icon: "mdi-account" },
    ],
  },
];

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
</style>
