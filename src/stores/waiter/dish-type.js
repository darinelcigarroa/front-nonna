import { defineStore, acceptHMRUpdate } from 'pinia'
import dishTypeService from '@/services/dishTypeService';


export const useDishTypeStore = defineStore('dishType', {
    state: () => ({
        dishType: [],
    }),

    getters: {},

    actions: {
        async index() {
            const response = await dishTypeService.index()

            if (response.success) {
                this.dishType = response.data.dishTypes
            }
        },
    },

    persist: true,
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDishTypeStore, import.meta.hot))
}
