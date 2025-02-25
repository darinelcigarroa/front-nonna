<template>
  <div class="q-pa-md">
    <div class="row q-my-md shadow" style="border-radius: 4px; border: 1px solid rgba(0, 0, 0, 0.12);">
      <div v-for="(item) in restaurantStatus" :key="item.id"
        :class="['box_' + item.id, 'col-md-4', 'col-lg-4', 'col-sm-12', 'col-xs-12']">
        <q-card class="no-shadow q-pa-sm">
          <q-item class="q-pb-none q-pt-xs">
            <q-item-section>
              <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">
                {{ item.total }}
              </q-item-label>
              <q-item-label :class="!$q.dark.isActive ? 'text-dark' : 'text-white'" style="letter-spacing: 1px;">
                {{ $t(item.name) }}
              </q-item-label>
              <q-item-label :class="[!$q.dark.isActive ? `box_${item.id}` : 'text-white', 'text-weight-medium']"
                style="letter-spacing: 1px;">
                {{ $t('available') }} {{ (item.total - item.consumed) }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon :name="item.icon" :class="['box_' + item.id]" size="60px" />
            </q-item-section>
          </q-item>
          <q-item class="q-py-xs" style="min-height: unset">
            <q-item-section>
              <div class="progress-base q-my-sm">
                <div :class="['progress-bar-' + item.id]"
                  :style="{ backgroundColor: item.color, width: capacity(item) }">
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>

    <q-card v-for="table in tableCards" :key="table" class="no-shadow q-mb-md shadow rounded-borders">
      <div class="row items-center q-pa-md no-wrap">
        <div class="column">
          <q-icon name="mdi-table-furniture" size="4em" :class="[`box_${table.number}`]"></q-icon>
          <div :class="!$q.dark.isActive ? 'text-dark' : 'text-white'">{{ table.time }}</div>
        </div>
        <div class="q-ml-auto column items-end">
          <div :class="[!$q.dark.isActive ? 'text-dark' : 'text-white', 'flex', 'text-h5', 'flex-center']">
            <span class="q-mx-xs">{{ table.title }}</span>
          </div>
          <div>
            <q-btn :to="{ name: 'edit-order', params: { id: table.id } }"
              :class="[`box_button_${table.number}`, 'base_box_button']" rounded align="between" size="sm"
              class="text-weight-bolder btn-fixed-width q-mt-xs" :label="`${table.plates} platillo(s)`" icon="edit" />
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
let tableCards = ref([])
onMounted(() => {
  tableCards.value = [
    {
      id: 1,
      icon: 'mdi-table-furniture',
      time: 'Today 11:45 AM',
      title: 'Mesa T11',
      plates: 2
    },
    {
      id: 2,
      icon: 'mdi-silverware-fork-knife',
      time: 'Today 12:30 PM',
      title: 'Mesa T5',
      plates: 3
    },
    {
      id: 3,
      icon: 'mdi-food',
      time: 'Today 01:15 PM',
      title: 'Mesa T9',
      plates: 5
    },
    {
      id: 4,
      icon: 'mdi-coffee-outline',
      time: 'Today 02:00 PM',
      title: 'Mesa T3',
      plates: 1
    },
    {
      id: 5,
      icon: 'mdi-beer-outline',
      time: 'Today 02:45 PM',
      title: 'Mesa T7',
      plates: 4
    }
  ];

  tableCards.value.forEach((table, index) => {
    table.number = (index % 3) + 1;
  });
})

const restaurantStatus = ref([
  { id: 1, name: 'total_tables', icon: 'mdi-table-chair', total: 25, consumed: 20 },
  { id: 2, name: 'total_dishes', icon: 'mdi-bowl-mix-outline', total: 35, consumed: 20 },
  { id: 3, name: 'total_diners', icon: 'mdi-account-multiple-outline', total: 50, consumed: 20 },
])

const capacity = ((item) => {
  const porcent = (item.consumed / item.total) * 100
  return String(porcent) + '%'
})
</script>

<style scoped>
.rounded-borders {
  border-radius: 12px;
}

.box_1 {
  color: var(--q-secondary);
}

.base_box_button {
  font-family: cursive;
  font-size: 12px !important;
}

.box_button_1 {
  color: var(--q-primary);
  background-color: #e8686862;

}

.box_2 {
  color: var(--q-accent);
}

.box_button_2 {
  color: var(--q-accent);
  background-color: #08446588;
}

.box_3 {
  color: var(--q-teal);
}

.box_button_3 {
  color: var(--q-teal);
  background-color: #087e8b80;
  /* background-color: rgba(8, 126, 139, 0.5); */
}

.permanent-flat.q-btn--actionable:not(.q-btn--disabled):hover::before,
.permanent-flat.q-btn--actionable:not(.q-btn--disabled):active::before {
  background-color: transparent !important;
  opacity: 0 !important;
}

.shadow {
  -webkit-box-shadow: 0 0 10px #bfbfbf !important;
  box-shadow: 0 0 10px #bfbfbf !important;
}

.progress-base {
  height: 8px;
  border-radius: 3px;
  background-color: #e9ecef;
}

.progress-bar-1 {
  height: 8px;
  border-radius: 3px;
  background: -webkit-linear-gradient(45deg, #780000, #de52a5) !important;
  background: linear-gradient(45deg, #780000, #de52a5) !important;
}

.progress-bar-2 {
  height: 8px;
  border-radius: 3px;
  background: -webkit-linear-gradient(45deg, #003049, #bb6aa3) !important;
  background: linear-gradient(45deg, #003049, #bb6aa3) !important;
}

.progress-bar-3 {
  height: 8px;
  border-radius: 3px;
  background: -webkit-linear-gradient(45deg, #087e8b, #85ba62) !important;
  background: linear-gradient(45deg, #087e8b, #85ba62) !important;
}
</style>
