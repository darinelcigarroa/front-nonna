<template>
  <q-card class="no-shadow q-pa-sm">
    <q-item class="q-pb-none q-pt-xs">
      <q-item-section>
        <q-item-label class="text-h4" style="font-weight: 500; letter-spacing: 3px;">
          {{ value }}
        </q-item-label>
        <q-item-label :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'" style="letter-spacing: 1px;">
          {{ label }}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-icon :name="icon" :class="iconClass" size="60px"></q-icon>
      </q-item-section>
    </q-item>
    <q-item class="q-py-xs" style="min-height: unset">
      <q-item-section>
        <div class="progress-base q-my-sm">
          <div :class="[`progress-bar-${index + 1}`]" :style="{ width: progress + '%' }"></div>
        </div>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar';

defineProps({
  value: Number,
  label: String,
  icon: String,
  iconClass: String,
  progress: Number,
  index: Number,
});

const $q = useQuasar();
</script>

<style scoped>
.progress-base {
  height: 8px;
  border-radius: 3px;
  background-color: #e9ecef;
}

.progress-bar-1 {
  height: 8px;
  border-radius: 3px;
  background: #17ead9;
  background: -webkit-linear-gradient(45deg, #17ead9, #6078ea) !important;
  background: linear-gradient(45deg, #17ead9, #6078ea) !important;
}

.progress-bar-2 {
  height: 8px;
  border-radius: 3px;
  background: #f54ea2;
  background: -webkit-linear-gradient(45deg, #f54ea2, #ff7676) !important;
  background: linear-gradient(45deg, #f54ea2, #ff7676) !important;
}

.progress-bar-3 {
  height: 8px;
  border-radius: 3px;
  background: #42e695;
  background: -webkit-linear-gradient(45deg, #42e695, #3bb2b8) !important;
  background: linear-gradient(45deg, #42e695, #3bb2b8) !important;
}

.progress-bar-4 {
  height: 8px;
  border-radius: 3px;
  background: #ffdf40;
  background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
  background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
}
</style>
