import { useQuasar } from 'quasar';

export const getTextColor = (lightColor = 'text-grey-7', darkColor = 'text-white') => {
    const $q = useQuasar();
    return $q.dark.isActive ? darkColor : lightColor;
};
