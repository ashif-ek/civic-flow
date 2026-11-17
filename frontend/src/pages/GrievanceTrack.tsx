import React, { useState } from 'react';
import api from '../services/api';
import { Search, Shield, CheckCircle2, Clock, AlertCircle, ArrowRight } from 'lucide-react';

export const GrievanceTrack: React.FC = () => {
  const [refNumber, setRefNumber] = useState('');
  const [grievance, setGrievance] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refNumber.trim()) return;

    setError('');
    setGrievance(null);
    setLoading(true);

    try {
      const res = await api.get(`/grievances/track/${refNumber.trim()}/`);
      setGrievance(res.data);
    } catch (err: any) {
      setError('No grievance found matching this reference number. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Public Grievance Tracker</h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Enter your unique Grievance Reference Number (e.g. <span className="font-mono font-semibold text-emerald-800">KL-GRV-DEMO01</span>) to view real-time administrative progress.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleTrack} className="flex gap-2 max-w-lg mx-auto">
        <input
          type="text"
          value={refNumber}
          onChange={(e) => setRefNumber(e.target.value)}
          placeholder="Enter reference number (e.g. KL-GRV-DEMO01)"
          className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-sm uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition flex items-center gap-1.5 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Track'}
          <Search className="w-4 h-4" />
        </button>
      </form>

      {error && (
        <div className="max-w-lg mx-auto flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Result Display */}
      {grievance && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="font-mono font-bold text-lg text-emerald-800">{grievance.reference_number}</span>
              <h2 className="text-base font-bold text-slate-900 mt-1">{grievance.subject}</h2>
              <div className="text-xs text-slate-500 mt-0.5">{grievance.district} • {grievance.category}</div>
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {grievance.status}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-500 block">Department</span>
              <span className="font-semibold text-slate-800">{grievance.assigned_department_name || 'Pending Review'}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-500 block">Priority</span>
              <span className="font-semibold text-slate-800">{grievance.priority}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-500 block">Submitted On</span>
              <span className="font-semibold text-slate-800">{new Date(grievance.created_at).toLocaleDateString()}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-500 block">Last Update</span>
              <span className="font-semibold text-slate-800">{new Date(grievance.updated_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Workflow history log */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Public Audit Trail</h3>
            <div className="space-y-4 border-l-2 border-emerald-200 pl-4 ml-1">
              {grievance.history && grievance.history.map((h: any) => (
                <div key={h.id} className="relative text-xs space-y-0.5">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
                  <div className="font-semibold text-slate-900">{h.new_status}</div>
                  <div className="text-[11px] text-slate-500">{new Date(h.timestamp).toLocaleString()}</div>
                  {h.remarks && <p className="text-slate-600 text-[11px] mt-0.5">{h.remarks}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
