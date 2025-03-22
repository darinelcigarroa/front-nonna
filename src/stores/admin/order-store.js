
import { defineStore, acceptHMRUpdate } from "pinia";
import orderService from "src/services/orderService";

export const useOrderStore = defineStore('storeAdmin', {
    state: () => ({
        orders: [],
        pagination: {
            rowsPerPage: 5,
            page: 1,
            rowsNumber: 0
        },
        filterStatuses: [],
        search: null
    }),
    actions: {
        async index() {

            const { page, rowsPerPage } = this.pagination

            const response = await orderService.index({
                page: page,
                per_page: rowsPerPage,
                filters: this.filterStatuses,
                search: this.search
            })

            this.orders = response.data.orders.data
            this.pagination.rowsNumber = response.data.orders.total
        },
        async applyFilter() {
            await this.index()
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
}
