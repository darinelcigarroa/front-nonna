import { defineStore, acceptHMRUpdate } from 'pinia'
import tableService from 'src/services/tableService'

export const useTableStore = defineStore('table', {
    state: () => ({
        table: {
            name: '',
            capacity: '',
            status: false
        },
        dataTables: [],
        editModal: false,
        createModal: false
    }),

    getters: {
    },

    actions: {
        async getTables(pagination) {
            const response = await tableService.index(pagination)
            const data = response.data.tables
            this.dataTables = data.data

            return data
        },
        async saveTable() {
            const response = await tableService.store(this.table)

            if (response.success) {
                if (this.dataTables.length == 5) this.dataTables.pop()
                this.dataTables.unshift(response.data.table)
                this.createModal = false
                this.resetTable()
            }

            return response
        },
        async updateTable() {
            const response = await tableService.update(this.table)
            if (response.success) {
                const index = this.dataTables.findIndex((table) => table.id == response.data.table.id)

                if (index !== -1) {
                    this.dataTables[index] = response.data.table
                }

                this.editModal = false
                this.resetTable()
            }
            return response

        },
        async deleteTable(id) {
            const response = await tableService.delete(id)
            return response
        },
        aditTable(id) {
            const table = this.dataTables.find((table) => table.id == id);
            this.table = { ...table }; // Crea una copia superficial sin reactividad
            this.editModal = true;
        },
        onCancel() {
            this.resetTable()
        },
        resetTable() {
            this.table = {
                name: '',
                capacity: '',
                status: false
            }
        }
    },
    persist: true
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTableStore, import.meta.hot))
}
