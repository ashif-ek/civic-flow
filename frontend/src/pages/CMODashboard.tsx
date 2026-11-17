import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  Shield, AlertTriangle, CheckCircle2, Clock, Users,
  BarChart2, Filter, Search, ChevronRight, AlertOctagon, Send, UserCheck, Paperclip
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#059669', '#d97706', '#dc2626', '#2563eb', '#7c3aed'];

export const CMODashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [grievances, setGrievances] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrievance, setSelectedGrievance] = useState<any | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [overdueFilter, setOverdueFilter] = useState(false);

  // Assignment Modal
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState('');
  const [selectedOfficerId, setSelectedOfficerId] = useState('');
  const [instructions, setInstructions] = useState('');
  const [assignPriority, setAssignPriority] = useState('');
  const [assigning, setAssigning] = useState(false);

  // Resolution Modal
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('Resolved');
  const [statusRemarks, setStatusRemarks] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, grievancesRes, deptsRes] = await Promise.all([
        api.get('/cmo/stats/'),
        api.get(`/cmo/grievances/?search=${search}&status=${statusFilter}&priority=${priorityFilter}&overdue=${overdueFilter ? 'true' : ''}`),
        api.get('/departments/')
      ]);
      setStats(statsRes.data);
      setGrievances(grievancesRes.data.results || grievancesRes.data || []);
      setDepartments(deptsRes.data.results || deptsRes.data || []);
    } catch (err) {
      console.error('Error fetching CMO data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [search, statusFilter, priorityFilter, overdueFilter]);

  const openDetails = async (id: string) => {
    try {
      const res = await api.get(`/cmo/grievances/${id}/`);
      setSelectedGrievance(res.data);
    } catch (err) {
      console.error('Failed to load grievance detail:', err);
    }
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGrievance || !selectedDeptId) return;
    setAssigning(true);
    try {
      await api.post(`/cmo/grievances/${selectedGrievance.id}/assign/`, {
        department_id: selectedDeptId,
        officer_id: selectedOfficerId || null,
        instructions,
        priority: assignPriority || null
      });
      setAssignModalOpen(false);
      setInstructions('');
      setSelectedOfficerId('');
      await openDetails(selectedGrievance.id);
      fetchDashboardData();
    } catch (err) {
      console.error('Assignment failed:', err);
    } finally {
      setAssigning(false);
    }
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGrievance) return;
    setUpdatingStatus(true);
    try {
      await api.post(`/cmo/grievances/${selectedGrievance.id}/status/`, {
        status: newStatus,
        remarks: statusRemarks
      });
      setStatusModalOpen(false);
      setStatusRemarks('');
      await openDetails(selectedGrievance.id);
      fetchDashboardData();
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleEscalate = async () => {
    if (!selectedGrievance) return;
    try {
      await api.post(`/cmo/grievances/${selectedGrievance.id}/escalate/`, {
        reason: 'Escalated by Chief Minister Office Executive Desk.'
      });
      await openDetails(selectedGrievance.id);
      fetchDashboardData();
    } catch (err) {
      console.error('Escalation failed:', err);
    }
  };

  // Find officers for selected department in modal
  const activeDeptObj = departments.find(d => d.id === selectedDeptId);
  const deptOfficers = activeDeptObj?.officers || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-900 text-white uppercase tracking-wider">CMO APEX CONSOLE</span>
            <span className="text-xs text-slate-500">Live PostgreSQL Metrics</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Chief Minister's Grievance Redressal Cell</h1>
          <p className="text-xs text-slate-500">State-wide oversight, departmental routing and escalation monitoring.</p>
        </div>
      </div>

      {/* KPI Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase">Total Logged</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{stats.total_grievances}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold text-amber-600 uppercase">Pending Action</div>
            <div className="text-2xl font-bold text-amber-700 mt-1">{stats.pending_grievances}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold text-emerald-600 uppercase">Resolved Cases</div>
            <div className="text-2xl font-bold text-emerald-700 mt-1">{stats.resolved_grievances}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold text-rose-600 uppercase">Escalated Priority</div>
            <div className="text-2xl font-bold text-rose-700 mt-1">{stats.escalated_grievances}</div>
          </div>
          <div
            onClick={() => setOverdueFilter(!overdueFilter)}
            className={`p-4 rounded-xl border shadow-sm cursor-pointer transition ${
              overdueFilter ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-500' : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="text-xs font-semibold text-rose-700 uppercase flex items-center justify-between">
              <span>Overdue (SLA)</span>
              <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            </div>
            <div className="text-2xl font-bold text-rose-800 mt-1">{stats.overdue_grievances || 0}</div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">{overdueFilter ? 'Filter active (Click to reset)' : 'Click to filter'}</span>
          </div>
        </div>
      )}

      {/* Analytics Charts */}
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Grievance Distribution by District</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.district_stats}>
                  <XAxis dataKey="district" tick={{ fontSize: 10 }} interval={0} angle={-30} textAnchor="end" height={60} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Priority & Urgency Split</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.priority_stats}
                    dataKey="count"
                    nameKey="priority"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {stats.priority_stats.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Grievance Management Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">All State Grievances</h2>
            <p className="text-xs text-slate-500">Filter and assign complaints across all 14 Kerala districts.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Search ref or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg"
            >
              <option value="">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Reopened">Reopened</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Ref Number</th>
                <th className="py-3 px-4">Citizen</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Assigned Dept / Officer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {grievances.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50 transition cursor-pointer" onClick={() => openDetails(g.id)}>
                  <td className="py-3 px-4 font-mono font-medium text-emerald-800">
                    {g.reference_number}
                    {g.is_overdue && (
                      <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.2 bg-rose-100 text-rose-800 rounded">OVERDUE</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-medium">{g.citizen_name}</td>
                  <td className="py-3 px-4 text-slate-600">{g.district}</td>
                  <td className="py-3 px-4 text-slate-900 max-w-xs truncate">{g.subject}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded font-medium ${
                      g.priority === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {g.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <div>{g.assigned_department_name || <span className="text-amber-600 italic">Unassigned</span>}</div>
                    {g.assigned_officer_name && (
                      <div className="text-[10px] text-slate-400">Officer: {g.assigned_officer_name}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {g.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetails(g.id);
                      }}
                      className="text-emerald-700 font-semibold hover:underline"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Grievance Management Drawer */}
      {selectedGrievance && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex justify-end z-50">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <span className="font-mono text-emerald-800 font-bold">{selectedGrievance.reference_number}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedGrievance.subject}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Citizen: {selectedGrievance.citizen_name} ({selectedGrievance.citizen_email} • {selectedGrievance.citizen_mobile || 'No phone'})
                </p>
              </div>
              <button onClick={() => setSelectedGrievance(null)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">
                ✕
              </button>
            </div>

            {/* AI Suggestion Box & Duplicate Alert */}
            {selectedGrievance.ai_summary && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs space-y-2">
                <div className="font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-700" /> AI Classification & Suggestions
                </div>
                <p><span className="font-semibold">Suggested Department:</span> {selectedGrievance.ai_suggested_department}</p>
                <p><span className="font-semibold">Assessed Priority:</span> {selectedGrievance.ai_priority}</p>
                <p><span className="font-semibold">Summary:</span> {selectedGrievance.ai_summary}</p>
                <p><span className="font-semibold">Recommended Action:</span> {selectedGrievance.ai_suggested_action}</p>

                {selectedGrievance.potential_duplicates && selectedGrievance.potential_duplicates.length > 0 && (
                  <div className="mt-2 p-2.5 bg-amber-50 border border-amber-300 rounded text-amber-900">
                    <span className="font-bold">⚠️ Potential Duplicate Alert:</span> AI flagged possible overlap with reference(s):{' '}
                    <span className="font-mono font-bold">{selectedGrievance.potential_duplicates.join(', ')}</span>.
                    Please cross-verify before assigning separate field crews.
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="text-xs space-y-1">
              <span className="font-bold uppercase tracking-wider text-slate-500">Citizen Description</span>
              <p className="p-3 bg-slate-50 rounded-lg text-slate-800 whitespace-pre-line border border-slate-200">
                {selectedGrievance.description}
              </p>
            </div>

            {/* Supporting Attachments */}
            {selectedGrievance.attachments && selectedGrievance.attachments.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5" /> Supporting Attachments ({selectedGrievance.attachments.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedGrievance.attachments.map((att: any) => (
                    <a
                      key={att.id}
                      href={att.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-between text-emerald-800 font-medium truncate"
                    >
                      <span className="truncate">{att.filename}</span>
                      <span className="text-[10px] text-slate-400 ml-2">View File</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Current State & Action Buttons */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Assigned Department:</span>
                <span className="font-bold text-slate-800">{selectedGrievance.assigned_department_name || 'Unassigned'}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Assigned Officer:</span>
                <span className="font-bold text-slate-800">{selectedGrievance.assigned_officer_name || 'None Assigned'}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Current Status:</span>
                <span className="font-bold text-emerald-800">{selectedGrievance.status}</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedDeptId(selectedGrievance.assigned_department || '');
                    setSelectedOfficerId(selectedGrievance.assigned_officer || '');
                    setAssignModalOpen(true);
                  }}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg"
                >
                  Assign Department & Officer
                </button>
                <button
                  onClick={() => setStatusModalOpen(true)}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-3.5 py-2 rounded-lg"
                >
                  Approve Resolution / Reopen Case
                </button>
                {!selectedGrievance.is_escalated && (
                  <button
                    onClick={handleEscalate}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold px-3 py-2 rounded-lg"
                  >
                    Escalate to High Priority
                  </button>
                )}
              </div>
            </div>

            {/* Department Action Reports */}
            {selectedGrievance.action_reports && selectedGrievance.action_reports.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Action Reports Submitted</h4>
                {selectedGrievance.action_reports.map((ar: any) => (
                  <div key={ar.id} className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1">
                    <div className="font-semibold text-slate-800">{ar.department_name} — Officer {ar.officer_name}</div>
                    <p><span className="text-slate-500">Investigation:</span> {ar.investigation_summary}</p>
                    <p><span className="text-slate-500">Action:</span> {ar.action_taken}</p>
                    {ar.field_visit_conducted && (
                      <span className="inline-block px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">Site Visit Verified</span>
                    )}
                    <span className="text-[10px] text-slate-400 block">{new Date(ar.submitted_at).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}

            {/* History Trail */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Status History Audit Trail</h4>
              <div className="space-y-3 border-l-2 border-slate-200 pl-3">
                {selectedGrievance.history && selectedGrievance.history.map((h: any) => (
                  <div key={h.id} className="text-xs">
                    <span className="font-semibold text-slate-800">{h.new_status}</span>
                    <span className="text-slate-400 text-[10px] ml-2">{new Date(h.timestamp).toLocaleString()}</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">{h.remarks}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Modal with Department & Officer Select */}
      {assignModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-xl shadow-xl space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Assign Grievance to Department & Officer</h3>
            <form onSubmit={handleAssign} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Target Department</label>
                <select
                  required
                  value={selectedDeptId}
                  onChange={(e) => {
                    setSelectedDeptId(e.target.value);
                    setSelectedOfficerId('');
                  }}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Specific Officer (Optional)</label>
                <select
                  value={selectedOfficerId}
                  onChange={(e) => setSelectedOfficerId(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                  disabled={!selectedDeptId}
                >
                  <option value="">Assign to Department General Desk</option>
                  {deptOfficers.map((o: any) => (
                    <option key={o.id} value={o.id}>{o.full_name} ({o.email})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Priority Override (Optional)</label>
                <select
                  value={assignPriority}
                  onChange={(e) => setAssignPriority(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                >
                  <option value="">Keep Existing Priority</option>
                  <option value="High">High (3-Day SLA)</option>
                  <option value="Medium">Medium (7-Day SLA)</option>
                  <option value="Low">Low (14-Day SLA)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">CMO Directives / Instructions</label>
                <textarea
                  rows={3}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Official instructions for field verification..."
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAssignModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={assigning}
                  className="px-3 py-1.5 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 disabled:opacity-50"
                >
                  {assigning ? 'Assigning...' : 'Confirm Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {statusModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-xl shadow-xl space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Update Grievance Resolution State</h3>
            <form onSubmit={handleUpdateStatus} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                >
                  <option value="Resolved">Resolved (Approve Action Report & Close Case)</option>
                  <option value="In Progress">In Progress (Require Additional Investigation)</option>
                  <option value="Reopened">Reopened (Reject Action Report)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Administrative Remarks</label>
                <textarea
                  required
                  rows={3}
                  value={statusRemarks}
                  onChange={(e) => setStatusRemarks(e.target.value)}
                  placeholder="Official reasons for resolution or reopen..."
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStatusModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingStatus}
                  className="px-3 py-1.5 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-900 disabled:opacity-50"
                >
                  {updatingStatus ? 'Updating...' : 'Apply Status'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
