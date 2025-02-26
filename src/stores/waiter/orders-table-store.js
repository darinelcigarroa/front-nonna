import { defineStore, acceptHMRUpdate } from 'pinia'
import { useOrderStore } from '@/stores/waiter/order-store'
import { notifyError, notifyWarning } from 'src/utils/notify'

export const useOrdersTableStore = defineStore('ordersTable', {
  state: () => ({
    data: [],
  }),

  getters: {},

  actions: {
    set() {
      const orderStore = useOrderStore()

      if (!orderStore.order || !orderStore.order.dishe) {
        notifyWarning('Intento de agregar una orden inválida.')
        return
      }

      const dishIndex = this.data.findIndex((dish) => dish.dishe.id === orderStore.order.dishe.id)

      if (dishIndex !== -1) {
        this.data[dishIndex].quantity += orderStore.order.quantity || 1
      } else {
        this.data.push({
          ...orderStore.order,
          status: 'created',
        })
      }
    },

    edit(item) {
      console.log('edit', item)
    },

    delete(index) {
      if (index >= 0 && index < this.data.length) {
        this.data.splice(index, 1)
      } else {
        notifyError('Error al intentar eliminar.')
      }
    },

    resetState() {
      this.$reset()
    },
  },

  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrdersTableStore, import.meta.hot))
}
