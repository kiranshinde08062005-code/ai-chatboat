
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const initialData = [
  { name: 'DDoS', count: 120 },
  { name: 'Phishing', count: 210 },
  { name: 'Malware', count: 150 },
  { name: 'Ransomware', count: 45 },
  { name: 'SQLi', count: 80 },
  { name: 'Zero-Day', count: 12 },
];

const colors = ['#38bdf8', '#fbbf24', '#f87171', '#c084fc', '#4ade80', '#f472b6'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-2 rounded-md text-sm">
        <p className="label text-white">{`${label} : ${payload[0].value}`}</p>
        <p className="intro text-gray-400">Threats detected</p>
      </div>
    );
  }
  return null;
};


const ThreatChart: React.FC = () => {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => prevData.map(item => ({
                ...item,
                count: item.count + Math.floor(Math.random() * 5) - 1,
            })));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 h-80">
      <h3 className="text-sm font-medium text-gray-400 mb-4">Threats by Type (Last 24h)</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThreatChart;
