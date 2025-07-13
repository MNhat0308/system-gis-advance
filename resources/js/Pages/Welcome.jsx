import GuestLayout from '@/Layouts/GuestLayout.jsx';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <GuestLayout>
                <div className="p-6">
                    <h1 className="text-3xl font-semibold">BUS MAP</h1>
                </div>
            </GuestLayout>
        </>
    );
}
