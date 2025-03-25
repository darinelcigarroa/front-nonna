import { defineStore, acceptHMRUpdate } from 'pinia'
import dashboardStatsService from 'src/services/dashboardStatsService'

export const useDashboardStatsStore = defineStore('dashboardStats', {
    state: () => ({
        totalDinners: 0,
        dinnersConsumed: 0,

        totalDishes: 0,
        dishesConsumed: 0,

        totalTables: 0,
        tablesConsumed: 0,

        totalEmployees: 0,
        currentMonthTotal: 0,
        totalDishesMonth: 0,
        totalCanceledOrders: 0
    }),

    getters: {
    },

    actions: {
        async getStats() {
            const result = await dashboardStatsService.index()

            if (result.success) {
                this.dinnersConsumed = result.data.dinnersConsumed
                this.totalDinners = result.data.totalDinners

                this.dishesConsumed = result.data.dishesConsumed
                this.totalDishes = result.data.totalDishes

                this.tablesConsumed = result.data.tablesConsumed
                this.totalTables = result.data.totalTables

                this.totalEmployees = result.data.totalEmployees
                this.currentMonthTotal = result.data.currentMonthTotal
                this.totalDishesMonth = result.data.totalDishesMonth
                this.totalCanceledOrders = result.data.totalCanceledOrders
            }
        }
    },

    persist: true,
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDashboardStatsStore, import.meta.hot))
}
