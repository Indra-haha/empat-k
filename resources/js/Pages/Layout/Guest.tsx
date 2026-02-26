import Navbar from "../Components/Navbar";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <header>
                <Navbar />
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; 2023 Our Website</p>
            </footer>
        </main>
    );
}
