import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const getToken = () => localStorage.getItem('auth_token') || '';
console.log('key', import.meta.env.VITE_REVERB_APP_KEY)
console.log('wsHost', import.meta.env.VITE_REVERB_HOST)
console.log('wsPort', import.meta.env.VITE_REVERB_PORT)
console.log('ok', `${import.meta.env.VITE_API_BASE_URL || ''}/broadcasting/auth`)
console.log(`Bearer ${getToken()}`)
const echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    cluster: import.meta.env.VITE_REVERB_APP_CLUSTER,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: '',
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/broadcasting/auth`,
    auth: {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
});

// ✅ Método para actualizar el token
export const updateEchoToken = () => {
    echo.options.auth.headers.Authorization = `Bearer ${getToken()}`;
};

// ✅ Método para activar/reiniciar Echo
export const activateEcho = () => {

    // Si ya hay una conexión activa, primero la cerramos
    if (echo.connector) {
        echo.disconnect();
    }

    // Actualizamos el token antes de conectar
    updateEchoToken();

    // Volvemos a conectar
    echo.connect();

    echo.connector.pusher.connection.bind('connected', () => {
        console.log('Echo reconectado correctamente');
    });
};

// ✅ Método para desconectar Echo
export const deactivateEcho = () => {
    echo.disconnect();
};

export default async ({ app }) => {
    app.config.globalProperties.$echo = echo;
};

export { echo };
