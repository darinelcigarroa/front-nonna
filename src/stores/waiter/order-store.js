import { defineStore, acceptHMRUpdate } from 'pinia'
import orderService from 'src/services/orderService'
import { notifyWarning } from '@/utils/notify'
import { reactive } from 'vue'
import { notifyError, notifyInfo, notifySuccess } from 'src/utils/notify'
import { useDishTypeStore } from '@/stores/waiter/dish-type'
import orderItemService from 'src/services/orderItemService'
import { useAuthStore } from '../auth-store'

export const useOrderStore = defineStore('order', {
  state: () => ({
    currentOrder: reactive({
      numberDiners: 1,
      quantity: 1,
      observations: [],
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
    async storeOrder() {
      const orders = this.activeOrders
      const autStore = useAuthStore()
      console.log('send orders', orders)

      const payload = {
        num_dinners: this.currentOrder.numberDiners,
        table_id: this.currentOrder.table.id,
        orders: orders
      }

      const response = await orderService.store(payload)

      if (response.success) {
        autStore.user.orders.push(response.data.order)
      }

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
        observations: [],
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

      // Buscar el platillo existente en la lista
      const existingOrder = this.orders.find(
        (item) => item.dish.id == dish.id && [1, 2].includes(item.status_id)
      );

      if (existingOrder) {
        // Si el platillo ya existe, sumar la cantidad y concatenar la observación
        existingOrder.quantity += quantity;
      } else {
        // Si es un nuevo platillo, crear observación inicial como "Platillo 1"
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
          notifyError(response.message)
        }
        return
      }
      this.orders.splice(orderItem.originalIndex, 1)
    },
    editOrderItem(data) {
      const dishTypeStore = useDishTypeStore()
      const dishType = dishTypeStore.dishType.find((item) => item.id == data.dish.dish_type_id)

      Object.assign(this.currentOrder, {
        orderItemID: data.id,
        quantity: data.quantity,
        observations: data.observations ?? [],
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
    handleOrderUpdated(event) {
      console.log('event', event)
      if (+event.orderId == +this.currentOrder.orderID) {

        const updatedDishes = [];

        this.orders.forEach(item => {
          const updatedItem = event.orderItems.find(updated => +updated.id === +item.id);
          if (updatedItem) {
            updatedDishes.push(updatedItem.dish_name);
            Object.assign(item, updatedItem);
          }
        });
        if (updatedDishes.length > 0) {
          const message = `
            <div>
              <p>Los siguientes platillos han sido actualizados por el chef:</p>
              <ul>
                ${updatedDishes.map(dish => `<li>${dish}</li>`).join('')}
              </ul>
            </div>
          `;
          notifyInfo(message, { html: true, timeout: 5000 }); // 10 segundos
        }

      }
    }
  },

  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
}
