import api from '../../lib/api';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Campaigns() {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    api.get('/campaigns')
      .then(r => setList(r.data))
      .catch(() => {});
  }, []);

  async function create(e) {
    e.preventDefault();
    try {
      const r = await api.post('/campaigns', { name });
      setList([r.data, ...list]);
      setName('');
    } catch (err) {
      alert('create failed');
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl">Campaigns</h1>
      <form onSubmit={create} className="my-4 flex gap-2">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="New campaign name"
          className="flex-1 p-2 border"
        />
        <button className="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
      </form>
      <ul>
        {list.map(c => (
          <li key={c.id} className="py-2 border-b">
            <Link href={`/campaigns/${c.id}`} className="text-blue-600">
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
