import { defineStore, acceptHMRUpdate } from 'pinia'
import { notifySuccess } from '@/utils/notify'
import { notifyError } from 'src/utils/notify'
// import { toRaw } from 'vue'

export const useChefOrdersStore = defineStore('chefOrders', {
  state: () => ({
    orders: [],
  }),

  getters: {},

  actions: {
    addOrder(payload) {
      try {
        const clonedPayload = JSON.parse(JSON.stringify(payload))

        clonedPayload.orders.forEach((item) => {
          item.status = 'kitchen'
        })

        this.orders.push(clonedPayload)
        notifySuccess()
      } catch (error) {
        notifyError(error)
      }
    },
  },
  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChefOrdersStore, import.meta.hot))
}
