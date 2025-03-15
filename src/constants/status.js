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
export const DISH_STATUS = {
    POSTRE: 1,
    ENTRADA: 2,
    BEBIDA: 3
};

export const STATUS_DISH_ICON = {
    [DISH_STATUS.POSTRE]: 'mdi-pot-steam',
    [DISH_STATUS.ENTRADA]: 'mdi-cupcake',
    [DISH_STATUS.BEBIDA]: 'mdi-cup'
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
    const statusId = DISH_STATUS[string.toUpperCase()]
    return STATUS_DISH_ICON[statusId] || 'mdi-food-fork-drink'
}

export const getStatusColor = (statusId) => {
    return STATUS_COLORS[statusId] || 'grey-5'
}

export const getStatusIcon = (statusId) => {
    return STATUS_ICONS[statusId] || 'mdi-help-circle-outline'
}
