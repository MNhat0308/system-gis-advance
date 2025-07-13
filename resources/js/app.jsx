import '../css/app.css';
import './bootstrap';

import { AppProvider } from '@/Pages/Map/contexts/AppContext.jsx';
import { FlashProvider } from '@/Pages/Map/contexts/FlashContext.jsx';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <FlashProvider>
                <AppProvider>
                    <App {...props} />
                </AppProvider>
            </FlashProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
