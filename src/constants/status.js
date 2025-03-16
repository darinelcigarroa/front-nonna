export const ORDER_ITEM_STATUS = {
    CREATED: 1,
    IN_KITCHEN: 2,
    PREPARING: 3,
    READY_TO_SERVE: 4,
    CANCELED: 5
};

export const ORDER_STATUS = {
    PENDING: 1,
    COMPLETED: 2,
    SENT: 2,
    PAID: 3,
    EDIT: 5,
    CANCELED: 6
};
export const DISH_TYPES = {
    POSTRE: 1,
    PLATO_FUERTE: 2,
    ENTRADA: 3,
    BEBIDA: 4,
};

export const DISH_TYPES_ICON = {
    [DISH_TYPES.ENTRADA]: 'mdi-pot-mix',
    [DISH_TYPES.PLATO_FUERTE]: 'mdi-food-turkey',
    [DISH_TYPES.POSTRE]: 'mdi-cupcake',
    [DISH_TYPES.BEBIDA]: 'mdi-cup'
}

export const STATUS_COLORS = {
    [ORDER_ITEM_STATUS.CREATED]: 'grey-5',
    [ORDER_ITEM_STATUS.IN_KITCHEN]: 'yellow-2',
    [ORDER_ITEM_STATUS.PREPARING]: 'blue-2',
    [ORDER_ITEM_STATUS.READY_TO_SERVE]: 'green-2',
    [ORDER_ITEM_STATUS.CANCELED]: 'red-3'
}

export const STATUS_ICONS = {
    [ORDER_ITEM_STATUS.CREATED]: 'mdi-cart',
    [ORDER_ITEM_STATUS.IN_KITCHEN]: 'mdi-pot',
    [ORDER_ITEM_STATUS.PREPARING]: 'mdi-chef-hat',
    [ORDER_ITEM_STATUS.READY_TO_SERVE]: 'mdi-silverware-fork-knife',
    [ORDER_ITEM_STATUS.CANCELED]: 'mdi-close-circle-outline'
}


export const getStatusDishIcon = (string) => {
    const statusId = DISH_TYPES[string.toUpperCase().replace(/\s+/g, '_')]
    return DISH_TYPES_ICON[statusId] || 'mdi-food-fork-drink'
}

export const getStatusColor = (statusId) => {
    return STATUS_COLORS[statusId] || 'grey-5'
}

export const getStatusIcon = (statusId) => {
    return STATUS_ICONS[statusId] || 'mdi-help-circle-outline'
}
