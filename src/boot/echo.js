import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const token = localStorage.getItem('auth_token');

const echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    cluster: import.meta.env.VITE_REVERB_APP_CLUSTER || 'mt1',

    wsHost: import.meta.env.VITE_REVERB_HOST || '127.0.0.1',
    wsPort: import.meta.env.VITE_REVERB_PORT || 8080,
    wssPort: import.meta.env.VITE_REVERB_PORT || 8080,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],

    authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/broadcasting/auth`,

    auth: {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
});


export default ({ app }) => {
    app.config.globalProperties.$echo = echo;
};

export { echo };
