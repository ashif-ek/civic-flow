import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { PlusCircle, Search, Clock, CheckCircle2, AlertTriangle, FileText, ChevronRight, RefreshCw } from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const [grievances, setGrievances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');

  const fetchGrievances = async () => {
    setLoading(true);
    try {
      const res = await api.get('/citizen/grievances/');
      setGrievances(res.data.results || res.data || []);
    } catch (err) {
      console.error('Error fetching citizen grievances:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  const total = grievances.length;
  const pending = grievances.filter(g => g.status !== 'Resolved').length;
  const resolved = grievances.filter(g => g.status === 'Resolved').length;

  const filtered = grievances.filter(g => {
    if (filterStatus === 'ALL') return true;
    return g.status === filterStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">Submitted</span>;
      case 'Under Review':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">Under Review</span>;
      case 'In Progress':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">In Progress</span>;
      case 'Resolved':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Resolved</span>;
      case 'Reopened':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">Reopened</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Citizen Grievance Portal</h1>
          <p className="text-sm text-slate-500 mt-1">Submit, monitor and review redressal actions for your community grievances.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchGrievances}
            className="p-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 transition"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            to="/citizen/submit"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-4 py-2 rounded-lg text-sm transition shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            File New Grievance
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-100 text-slate-700 rounded-lg">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{total}</div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Submissions</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-700 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{pending}</div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active / Pending</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{resolved}</div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Resolved Cases</div>
          </div>
        </div>
      </div>

      {/* Grievances List Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-base font-semibold text-slate-900">Your Grievance History</h2>
          <div className="flex items-center gap-2 text-xs">
            {['ALL', 'Submitted', 'Under Review', 'In Progress', 'Resolved'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  filterStatus === st
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-slate-500">Loading your grievances...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-700">No grievances found</p>
            <p className="text-xs text-slate-500 mt-1">Submit your first complaint regarding infrastructure or public services.</p>
            <Link
              to="/citizen/submit"
              className="inline-flex items-center gap-2 mt-4 text-xs font-semibold bg-emerald-700 text-white px-3 py-2 rounded-lg hover:bg-emerald-800 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Submit Grievance Now
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Ref Number</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Submitted On</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-mono font-medium text-emerald-800">{g.reference_number}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-900 max-w-xs truncate">{g.subject}</td>
                    <td className="py-3.5 px-4 text-slate-600">{g.district}</td>
                    <td className="py-3.5 px-4 text-slate-600">{g.assigned_department_name || <span className="text-slate-400 italic">Pending Assignment</span>}</td>
                    <td className="py-3.5 px-4">{getStatusBadge(g.status)}</td>
                    <td className="py-3.5 px-4 text-slate-500 text-xs">{new Date(g.created_at).toLocaleDateString()}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/citizen/grievance/${g.id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:underline"
                      >
                        Details <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
