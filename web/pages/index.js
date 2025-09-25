import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem('token'); // clear JWT
    router.push('/login'); // redirect to login
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">InovaBeing — Demo</h1>
      <p className="mb-4">Starter app for the assignment. Use the links below to open the app.</p>
      <div className="flex gap-2 flex-wrap">
        <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded">Login</Link>
        <Link href="/register" className="px-4 py-2 bg-green-600 text-white rounded">Register</Link>
        <Link href="/campaigns" className="px-4 py-2 bg-gray-600 text-white rounded">Campaigns</Link>
        <Link href="/dashboard" className="px-4 py-2 bg-purple-600 text-white rounded">Dashboard</Link>
        
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
