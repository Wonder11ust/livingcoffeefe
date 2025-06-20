import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

let echoInstance = null;

if (typeof window !== 'undefined') {
  window.Pusher = Pusher;

  const echoConfig = {
    broadcaster: 'pusher',
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    forceTLS: true,
  };

  // Jika kamu pakai Laravel WebSockets lokal (non-pusher.com)
  if (process.env.NEXT_PUBLIC_PUSHER_HOST) {
    echoConfig.wsHost = process.env.NEXT_PUBLIC_PUSHER_HOST;
    echoConfig.wsPort = parseInt(process.env.NEXT_PUBLIC_PUSHER_PORT || "6001", 10);
    echoConfig.wssPort = parseInt(process.env.NEXT_PUBLIC_PUSHER_PORT || "6001", 10);
    echoConfig.disableStats = true;
    echoConfig.enabledTransports = ['ws', 'wss'];
    echoConfig.forceTLS = false;
  }

  console.log('Echo config:', echoConfig);

  echoInstance = new Echo(echoConfig);

  echoInstance.connector.pusher.connection.bind('connected', () => {
    console.log('✓ Pusher connected!');
  });

  echoInstance.connector.pusher.connection.bind('error', (err) => {
    console.error('✗ Pusher connection error:', err);
  });
} else {
  console.warn("⚠️ Echo not initialized: running on server");
}

export default echoInstance;
