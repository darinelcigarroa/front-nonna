import { defineBoot } from '#q-app/wrappers'
import { defineAsyncComponent } from 'vue'

export default defineBoot(({ app }) => {
    app.component('CanRoles', defineAsyncComponent(() => import('components/CanRoles.vue')))
})
