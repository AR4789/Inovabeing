import api from '../../lib/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function CampaignDetail(){
  const r = useRouter(); const id = r.query.id;
  const [leads, setLeads] = useState([]);
  const [email, setEmail] = useState('');
  useEffect(()=>{ if(!id) return; api.get(`/leads?campaign=${id}`).then(res=>setLeads(res.data)).catch(()=>{}) },[id]);
  async function add(e){ e.preventDefault();
    try{
      const res = await api.post(`/leads/campaigns/${id}/leads`, { email });
      setLeads([res.data,...leads]); setEmail('');
    }catch(err){ alert('add failed') }
  }
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl">Campaign {id}</h1>
      <form onSubmit={add} className="my-4 flex gap-2">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="lead email" className="flex-1 p-2 border" />
        <button className="px-3 py-2 bg-green-600 text-white rounded">Add lead</button>
      </form>
      <table className="w-full mt-4 table-auto border-collapse">
        <thead><tr className="text-left"><th className="py-1">ID</th><th>Email</th><th>Stage</th><th>Score</th></tr></thead>
        <tbody>{leads.map(l=> <tr key={l.id} className="border-t"><td className="py-1">{l.id}</td><td>{l.email}</td><td>{l.stage}</td><td>{l.score}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
