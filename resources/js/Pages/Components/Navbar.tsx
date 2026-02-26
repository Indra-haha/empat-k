export default function Navbar() {
    return (
        <nav className="w-full bg-gray-800 text-white p-4">
            <ul className="flex flex-row space-x-4">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
                <li>
                    <a href="/login">Login</a>
                </li>
            </ul>
        </nav>
    );
}
