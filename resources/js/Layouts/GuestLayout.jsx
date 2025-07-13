import Navbar from '@/Components/Navbar.jsx';

export default function GuestLayout({ children }) {
    return (
        <>
            <Navbar />
            <div className="flex min-h-screen flex-col items-center bg-gray-100 sm:justify-center sm:pt-0 dark:bg-gray-900">
                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                    {children}
                </div>
            </div>
        </>
    );
}
