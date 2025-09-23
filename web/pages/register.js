import { useState } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/router';

export default function Register(){
  const [email,setEmail] = useState('');
  const [pass,setPass]=useState('');
  const r = useRouter();
  async function submit(e){ e.preventDefault();
    try{
      const res = await api.post('/auth/register',{email,password:pass});
      localStorage.setItem('token', res.data.token);
      r.push('/campaigns');
    }catch(err){ alert(err?.response?.data?.error || 'register failed') }
  }
  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <input className="mb-2 w-full p-2 border" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="mb-2 w-full p-2 border" placeholder="password" value={pass} onChange={e=>setPass(e.target.value)} type="password" />
      <button className="px-4 py-2 bg-green-600 text-white rounded">Register</button>
    </form>
  );
}
