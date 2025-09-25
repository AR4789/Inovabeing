import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen p-4">
      <nav className="mb-6 flex gap-2">
        <Link href="/" className="px-3 py-2 bg-indigo-600 text-white rounded">
          Home
        </Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
