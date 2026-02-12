'use client';
import Link from 'next/link';
import Logout from './logout';
import { usePathname } from 'next/navigation';

const Nav = () => {

    const pathname = usePathname()

    if (pathname.startsWith('/admin')) {
        return
    }

    return (
        <ul className="ios-card flex items-center gap-4 px-4 fixed! rounded-none! top-0 left-0 z-100 shadow-none! h-14 w-full!">
            <Link href="/">Home</Link>
            <Link href="/auth/signin">signin</Link>
            <Link href="/auth/signup">signup</Link>
            <Link href="/dashboard">dashboard</Link>
            <Link href="/admin/dashboard">Admin-dashboard</Link>
            <Link href="/admin/customers">Admin-users</Link>
            <Logout />
        </ul>
    )
}

export default Nav