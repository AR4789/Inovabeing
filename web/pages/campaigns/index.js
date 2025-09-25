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

  async function remove(id) {
    if (!confirm('Delete this campaign?')) return;
    try {
      await api.delete(`/campaigns/${id}`);
      setList(list.filter(c => c.id !== id)); // update state
    } catch (err) {
      alert('delete failed');
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
          <li key={c.id} className="py-2 border-b flex justify-between items-center">
            <Link href={`/campaigns/${c.id}`} className="text-blue-600">
              {c.name}
            </Link>
            <button
              onClick={() => remove(c.id)}
              className="ml-4 px-2 py-1 text-sm bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
