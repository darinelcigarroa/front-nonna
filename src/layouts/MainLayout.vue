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
        <q-btn flat round dense icon="mdi-logout" @click="logoutNotify" to="/" />
      </q-toolbar>
    </q-header>
    <q-drawer class="left-navigation text-white bg-secondary" show-if-above v-model="left" side="left" elevated>
      <div class="full-height" :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'">
        <div style="height: calc(100% - 117px);padding:10px;">
          <q-toolbar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>

            <q-toolbar-title>Mayank Patel</q-toolbar-title>
          </q-toolbar>
          <hr />
          <q-scroll-area style="height:100%;">
            <q-list padding>

              <q-item active-class="tab-active" :to="{ name: 'dashboard' }" exact class="q-ma-sm navigation-item"
                clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="dashboard" />
                </q-item-section>

                <q-item-section>
                  {{ $t('Dashboard') }}
                </q-item-section>
              </q-item>

              <q-item active-class="tab-active" :to="{ name: 'createEmployee' }" class="q-ma-sm navigation-item"
                clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="mdi-account-group" />
                </q-item-section>

                <q-item-section>
                  {{ $t('employees') }}
                </q-item-section>
              </q-item>

              <q-item active-class="tab-active" :to="{ name: 'createTables' }" class="q-ma-sm navigation-item" clickable
                v-ripple>
                <q-item-section avatar>
                  <q-icon name="table_bar" />
                </q-item-section>

                <q-item-section>
                  {{ $t('tables') }}
                </q-item-section>
              </q-item>

              <q-item active-class="tab-active" :to="{ name: 'createDishes' }" class="q-ma-sm navigation-item" clickable
                v-ripple>
                <q-item-section avatar>
                  <q-icon name="local_dining" />

                </q-item-section>

                <q-item-section>
                  {{ $t('dishes') }}
                </q-item-section>
              </q-item>

              <q-item active-class="tab-active" :to="{ name: 'admin-profile' }" class="q-ma-sm navigation-item"
                clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="drafts" />
                </q-item-section>

                <q-item-section>
                  {{ $t('profile') }}
                </q-item-section>
              </q-item>
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

<script>
export default {
  data() {
    return {
      left: false
    };
  },
  methods: {
    logoutNotify() {
      this.$q.notify({
        message: "Logged out"
      });
    }
  }
};
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
