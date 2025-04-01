
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
        exportFilter: { date: '', status: [] },
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
        },
        async exportExcel() {
            const result = await orderService.exportOrderExcel(this.exportFilter);
            if (!result || result.sucsses === false) {
                console.error('Error al exportar:', result.message);
                return;
            }

            const url = window.URL.createObjectURL(result); // Usar directamente el blob recibido
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ordenes.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        },
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
}
