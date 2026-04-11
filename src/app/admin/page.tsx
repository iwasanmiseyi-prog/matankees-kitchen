"use client";

import React, { useState } from "react";
import { Download, Search, CheckCircle, Clock } from "lucide-react";

// Mock Data for Admin
const dummyOrders = [
  { id: "ORD-001", customer: "John Doe", method: "delivery", total: 45.00, status: "pending", date: "2024-05-15T18:30:00Z" },
  { id: "ORD-002", customer: "Sarah Smith", method: "pickup", total: 125.00, status: "preparing", date: "2024-05-15T19:00:00Z" },
  { id: "ORD-003", customer: "Mike Johnson", method: "delivery", total: 70.00, status: "delivered", date: "2024-05-15T16:15:00Z" },
];

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState(dummyOrders);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "matankees2024") { // Mock simple auth
      setAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const exportCSV = () => {
    const headers = ["Order ID,Customer,Method,Total,Status,Date"];
    const rows = orders.map(o => `${o.id},${o.customer},${o.method},${o.total},${o.status},${o.date}`);
    const csvValue = headers.concat(rows).join("\n");
    
    const blob = new Blob([csvValue], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'matankees_orders.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!authenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-card border border-wood-light rounded-xl p-8 shadow-xl max-w-sm w-full">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-wood-dark border border-wood-light rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="Enter admin password"
              />
            </div>
            <button type="submit" className="w-full bg-primary text-wood-dark py-3 rounded-lg font-bold hover:bg-golden-hover transition-colors">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Order Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your incoming orders and operations.</p>
        </div>
        <button 
          onClick={exportCSV}
          className="flex items-center space-x-2 bg-wood-dark border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors font-medium"
        >
          <Download size={18} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-card border border-wood-light rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-wood-light flex justify-between items-center bg-wood-dark">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="pl-10 pr-4 py-2 bg-wood border border-wood-light rounded-lg text-sm text-white focus:ring-1 focus:ring-primary outline-none w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white">
            <thead className="bg-wood-dark text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Method</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-wood-light/50 hover:bg-wood/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 capitalize">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      order.method === 'delivery' ? 'bg-blue-900/40 text-blue-400' : 'bg-purple-900/40 text-purple-400'
                    }`}>
                      {order.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-1 ${
                      order.status === 'delivered' ? 'text-green-400' : 
                      order.status === 'preparing' ? 'text-primary' : 'text-yellow-500'
                    }`}>
                      {order.status === 'delivered' ? <CheckCircle size={14} /> : <Clock size={14} />}
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">£{order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {order.status !== 'delivered' && (
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="bg-wood-dark border border-wood-light text-white text-xs rounded p-1 outline-none focus:border-primary"
                      >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
