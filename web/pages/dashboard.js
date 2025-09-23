import { useEffect, useState } from 'react';
import api from '../lib/api';
import { CSVLink } from 'react-csv';

export default function Dashboard(){
  const [kpis, setKpis] = useState({ total:0, qualifiedRate:0, winRate:0, avgScore:0 });
  const [leads, setLeads] = useState([]);
  useEffect(()=>{ async function load(){
    const all = await api.get('/leads').then(r=>r.data).catch(()=>[]);
    setLeads(all);
    const total = all.length;
    const qualified = all.filter(l=> l.stage === 'qualified').length;
    const wins = all.filter(l=> l.stage === 'won').length;
    const avg = total ? Math.round(all.reduce((s,x)=>s+(x.score||0),0)/total) : 0;
    setKpis({ total, qualifiedRate: total? Math.round(100*qualified/total):0, winRate: total? Math.round(100*wins/total):0, avgScore: avg });
  } load() }, []);
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 my-4">
        <div className="p-4 bg-white rounded shadow"><div>Total leads</div><div className="text-2xl">{kpis.total}</div></div>
        <div className="p-4 bg-white rounded shadow"><div>Qualified rate</div><div className="text-2xl">{kpis.qualifiedRate}%</div></div>
        <div className="p-4 bg-white rounded shadow"><div>Win rate</div><div className="text-2xl">{kpis.winRate}%</div></div>
        <div className="p-4 bg-white rounded shadow"><div>Avg score</div><div className="text-2xl">{kpis.avgScore}</div></div>
      </div>
      <CSVLink data={leads} filename={"leads.csv"} className="px-3 py-2 bg-blue-600 text-white rounded">Export CSV</CSVLink>
    </div>
  );
}
