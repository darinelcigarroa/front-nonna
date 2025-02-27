<template>
  <q-img src="/wave-5.svg" style="bottom:  1px;"></q-img>
  <div class="q-px-xl">
    <q-timeline color="secondary">
      <q-timeline-entry heading body="November, 2017" />
      <q-timeline-entry color="secondary">
        <div class="row justify-between items-center full-width">
          <div class="text-weight-bold">February 22, 1986</div>
          <div class="text-grey-7 text-caption">30min</div>
        </div>
        <q-expansion-item class="no-padding text-weight-bold" label="Mesa 1">
          <q-card flat bordered class="q-pa-sm" style="border-radius: 10px;">
            <q-card v-for="(item, index) in platillos" :key="index"
              class="col-lg-4 fit col-md-4 col-sm-12 col-xs-12 no-shadow q-px-sm q-mt-xs no-border custom-card"
              :class="{ 'border-bottom': index === platillos.length - 1 }">
              <q-item>
                <q-item-section avatar>
                  <q-avatar size="60px" class="shadow-4">
                    <img src="/chef/sarten-1.svg" style="object-fit: contain; width: 85%; height: 85%;" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-grey-8 text-weight-bold">{{ item.nombre }}</q-item-label>
                  <q-item-label class="text-grey-8">
                    Cantidad: {{ item.cantidad }}
                  </q-item-label>
                  <q-item-label>
                    <q-chip color="red-2" text-color="dark" dense class="text-weight-bold text-center" square
                      style="width: 85px">{{ item.status }}
                    </q-chip>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label>
                    <q-btn size="sm" dense flat round icon="mdi-chef-hat" class="bg-accent text-white">
                      <q-tooltip class="bg-blue-1 text-dark" transition-show="rotate" transition-hide="rotate">
                        Preparando!
                      </q-tooltip>
                    </q-btn>
                  </q-item-label>
                  <q-item-label>
                    <q-btn size="sm" dense flat round icon="mdi-check" class="bg-mulberry text-white">
                      <q-tooltip class="bg-green-1 text-dark" transition-show="rotate" transition-hide="rotate">
                        Listo!
                      </q-tooltip>
                    </q-btn>
                  </q-item-label>

                </q-item-section>
              </q-item>
            </q-card>
            <div class="row justify-between items-center q-pt-sm">
              <q-btn size="12px" outline rounded color="primary" label="En curso" />
              <!-- <q-btn outline rounded color="primary" label="Listo" /> -->
            </div>
          </q-card>
        </q-expansion-item>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>
<script setup>
const platillos = [
  { nombre: "Filete de res", cantidad: 2, status: 'Cocina' },
  { nombre: "Pescado empapelado", cantidad: 1, status: 'Cocina' },
  { nombre: "Hamburguesa", cantidad: 4, status: 'Cocina' },
  { nombre: "Enchiladas", cantidad: 1, status: 'Concina' }
];
</script>
<style scoped>
.principal-card {
  width: 100%;
  box-shadow: none !important;
  border-radius: 15px;
}

:deep(.q-expansion-item .q-item) {
  min-height: 0px !important;
  padding: 16px 0px !important;
}

.q-card__section {
  border-radius: 15px !important;
}

.custom-card {
  border: none !important;
  /* border-bottom: 2px dashed #000 !important; */
  border-bottom: 1px dashed rgb(140, 140, 140) !important;
}

.border-bottom {
  border-bottom: none !important;
}
</style>
