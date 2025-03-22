import { defineStore, acceptHMRUpdate } from 'pinia'
import dishService from 'src/services/catalogs/dishService'
export const useDishStore = defineStore('dish', {
    state: () => ({
        dish: {
            name: '',
            description: '',
            price: 0,
            status: false,
            dish_type_id: null,
        },
        dataDishes: [],
        editModal: false,
        createModal: false
    }),

    getters: {
    },

    actions: {
        async getDishes(pagination) {
            const response = await dishService.index(pagination)
            const data = response.data.dishes
            this.dataDishes = data.data

            return data
        },
        async saveDish() {
            const response = await dishService.store(this.dish)

            if (response.success) {
                if (this.dataDishes.length == 5) this.dataDishes.pop()
                this.dataDishes.unshift(response.data.dish)
                this.createModal = false
                this.resetDish()
            }

            return response
        },
        async updateDish() {
            const response = await dishService.update(this.dish)
            if (response.success) {
                const index = this.dataDishes.findIndex((dish) => dish.id == response.data.dish.id)

                if (index !== -1) {
                    this.dataDishes[index] = response.data.dish
                }

                this.editModal = false
                this.resetDish()
            }
            return response

        },
        async deleteDish(id) {
            const response = await dishService.delete(id)
            return response
        },
        aditDish(id) {
            const dish = this.dataDishes.find((dish) => dish.id == id);
            this.dish = { ...dish }; // Crea una copia superficial sin reactividad
            this.editModal = true;
        },
        onCancel() {
            this.resetDish()
        },
        resetDish() {
            this.dish = {
                name: '',
                capacity: '',
                description: '',
                status: false
            }
        }
    },
    persist: true
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDishStore, import.meta.hot))
}
