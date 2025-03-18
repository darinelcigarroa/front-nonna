import { defineStore, acceptHMRUpdate } from 'pinia'
import employeeService from 'src/services/employeeService'

export const useEmployeeStore = defineStore('employee', {
    state: () => ({
        formEmployee: {
            id: null,
            name: '',
            first_surname: '',
            second_surname: '',
            position_id: '',
            salary: '',
        },
        dataEmployees: [],
        editModal: false,
        createModal: false
    }),

    getters: {
    },

    actions: {
        async getEmployee(pagination) {
            const response = await employeeService.index(pagination)
            const data = response.data.employees
            this.dataEmployees = data.data

            return data
        },
        async saveEmployee() {
            const response = await employeeService.store(this.formEmployee)

            if (response.success) {
                if (this.dataEmployees.length == 5) this.dataEmployees.pop()
                this.dataEmployees.unshift(response.data.employee)
                this.createModal = false
                this.resetEmployee()
            }

            return response
        },
        async updateEmployee() {
            const response = await employeeService.update(this.formEmployee)
            if (response.success) {
                const index = this.dataEmployees.findIndex((employee) => employee.id == response.data.employee.id)

                if (index !== -1) {
                    this.dataEmployees[index] = response.data.employee
                }

                this.editModal = false
                this.resetEmployee()
            }
            return response

        },
        async deleteEmployee(id) {
            const response = await employeeService.delete(id)
            return response
        },
        aditEmployee(id) {
            const employee = this.dataEmployees.find((employee) => employee.id == id)
            this.formEmployee = { ...employee }
            this.editModal = true
        },
        onCancel() {
            this.resetEmployee()
        },
        resetEmployee() {
            this.formEmployee = {
                name: '',
                first_surname: '',
                second_surname: '',
                position_id: '',
                salary: '',
            }
        }
    },
    persist: true
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useEmployeeStore, import.meta.hot))
}
