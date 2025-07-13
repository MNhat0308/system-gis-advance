// resources/js/Components/Navbar.jsx
import NavLink from '@/Components/NavLink.jsx';

export default function Navbar({ auth }) {
    const user = auth?.user;

    return (
        <nav className="border-b bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    {/* Left: Logo */}
                    <div className="flex items-center">
                        <NavLink href="/">BUS MAP</NavLink>
                    </div>

                    {/* Right: Links */}
                    <div className="flex items-center space-x-4">
                        <NavLink
                            href={route('map.index')}
                            active={route().current('map.index')}
                        >
                            Map
                        </NavLink>

                        {user ? (
                            <>
                                <span className="text-gray-600">
                                    Hi, {user.name}
                                </span>
                                <NavLink
                                    href="/logout"
                                    method="post"
                                    as="button"
                                >
                                    Logout
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    href={route('login')}
                                    active={route().current('login')}
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    href={route('register')}
                                    active={route().current('register')}
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
