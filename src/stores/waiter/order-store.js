import { defineStore, acceptHMRUpdate } from 'pinia'
import orderService from 'src/services/orderService'
import { notifyWarning } from '@/utils/notify'
import { reactive } from 'vue'
import { notifyError, notifySuccess } from 'src/utils/notify'
import { useDishTypeStore } from '@/stores/waiter/dish-type'
import orderItemService from 'src/services/orderItemService'

export const useOrderStore = defineStore('order', {
  state: () => ({
    currentOrder: reactive({
      numberDiners: 1,
      quantity: 1,
      observations: null,
      dish: null,
      typeDish: null,
      edit: false
    }),
    orders: [],
  }),

  getters: {
    activeOrders: (state) => {
      return state.orders.filter((item) => [1, 2].includes(item.status_id) || item.edit)
    }
  },

  actions: {
    sendOrder() {
      const orders = this.activeOrders

      console.log('send orders', orders)

      const payload = {
        num_dinners: this.currentOrder.numberDiners,
        table_id: this.currentOrder.table.id,
        orders: orders
      }

      const response = orderService.store(payload)

      return response
    },
    async editOrder(orderID) {
      const result = await orderService.edit(orderID)

      if (result.success) {
        const data = result.data
        this.currentOrder = data.order
        this.orders = data.orderItems
      }

      return result
    },
    async updateOrder() {
      const orderID = this.currentOrder.orderID
      const dataOrders = this.orders.filter((item) => [1, 2].includes(item.status_id) || item.edit == true)
      const response = await orderService.update(orderID, { orders: dataOrders })
      if (response.success) {
        this.editOrder(orderID)
      }
      return response
    },
    async cancelEditingOrder(orderID) {
      console.log('orderId', orderID)
      return await orderService.cancelEditing(orderID)
    },
    resetCurrentOrder() {
      Object.assign(this.currentOrder, {
        quantity: 1,
        observations: null,
        dish: null,
        typeDish: null,
        edit: false
      });
    },
    resetState() {
      this.$reset()
    },
    // Functions orderItem
    setOrder() {
      console.log('set order')
      const { dish, quantity = 1, typeDish, observations } = this.currentOrder || {};

      if (!dish) {
        notifyWarning('Intento de agregar una orden inválida.');
        return;
      }

      const existingOrder = this.orders.find(
        (item) => item.dish.id == dish.id && [1, 2].includes(item.status_id)
      );

      if (existingOrder) {
        existingOrder.quantity += quantity;
      } else {
        this.orders.push({
          dish,
          quantity,
          observations,
          typeDish,
          status_id: dish?.status_id ?? 1,
        });
      }

      this.resetCurrentOrder();
    },
    async deleteOrderItem(orderItem) {
      if (orderItem.status_id == 2) {
        const response = await orderItemService.delete(orderItem.id)
        if (response.success) {
          notifySuccess(response.message)
          this.orders.splice(orderItem.originalIndex, 1)
        } else {
          console.log('response', response)
          notifyError(response.message)
        }
      }
    },
    editOrderItem(data) {
      const dishTypeStore = useDishTypeStore()
      const dishType = dishTypeStore.dishType.find((item) => item.id == data.dish.dish_type_id)

      Object.assign(this.currentOrder, {
        orderItemID: data.id,
        quantity: data.quantity,
        observations: data.observations,
        dish: data.dish,
        typeDish: dishType,
        originalIndex: data.originalIndex,
        edit: true
      });
    },
    updateOrderTable() {

      console.log('update order')
      const updateIndex = this.currentOrder.originalIndex

      if (!this.currentOrder || !this.currentOrder.dish) {
        notifyWarning('Intento de agregar una orden inválida.');
        return;
      }

      this.orders[updateIndex].dish = this.currentOrder.dish
      this.orders[updateIndex].observations = this.currentOrder.observations
      this.orders[updateIndex].quantity = this.currentOrder.quantity
      this.orders[updateIndex].edit = true

      this.resetCurrentOrder()
    },
  },

  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
}
