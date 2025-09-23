import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">InovaBeing — Demo</h1>
      <p className="mb-4">Starter app for the assignment. Use the links below to open the app.</p>
      <div className="flex gap-2">
        <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded">Login</Link>
        <Link href="/register" className="px-4 py-2 bg-green-600 text-white rounded">Register</Link>
        <Link href="/campaigns" className="px-4 py-2 bg-gray-600 text-white rounded">Campaigns</Link>
        <Link href="/dashboard" className="px-4 py-2 bg-purple-600 text-white rounded">Dashboard</Link>
      </div>
    </div>
  );
}
