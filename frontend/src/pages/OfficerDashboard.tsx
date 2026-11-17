import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  FileText, CheckCircle, Clock, AlertCircle, ChevronRight,
  Shield, Send, MapPin, CheckSquare, Upload
} from 'lucide-react';

export const OfficerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [grievances, setGrievances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrievance, setSelectedGrievance] = useState<any | null>(null);

  // Action report modal state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [investigationSummary, setInvestigationSummary] = useState('');
  const [actionTaken, setActionTaken] = useState('');
  const [fieldVisit, setFieldVisit] = useState(false);
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [submittingReport, setSubmittingReport] = useState(false);

  // Status update
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [officerStatus, setOfficerStatus] = useState('In Progress');
  const [statusRemarks, setStatusRemarks] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchGrievances = async () => {
    setLoading(true);
    try {
      const res = await api.get('/officer/grievances/');
      setGrievances(res.data.results || res.data || []);
    } catch (err) {
      console.error('Failed to fetch officer grievances:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  const openDetails = async (id: string) => {
    try {
      const res = await api.get(`/officer/grievances/${id}/`);
      setSelectedGrievance(res.data);
    } catch (err) {
      console.error('Failed to load detail:', err);
    }
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGrievance) return;
    setUpdatingStatus(true);
    try {
      await api.post(`/officer/grievances/${selectedGrievance.id}/status/`, {
        status: officerStatus,
        remarks: statusRemarks
      });
      setStatusModalOpen(false);
      setStatusRemarks('');
      await openDetails(selectedGrievance.id);
      fetchGrievances();
    } catch (err) {
      console.error('Failed to update officer status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGrievance) return;
    setSubmittingReport(true);
    try {
      const formData = new FormData();
      formData.append('investigation_summary', investigationSummary);
      formData.append('action_taken', actionTaken);
      formData.append('field_visit_conducted', String(fieldVisit));
      if (evidenceFile) {
        formData.append('evidence_document', evidenceFile);
      }

      await api.post(`/officer/grievances/${selectedGrievance.id}/action-report/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setReportModalOpen(false);
      setInvestigationSummary('');
      setActionTaken('');
      setFieldVisit(false);
      setEvidenceFile(null);
      await openDetails(selectedGrievance.id);
      fetchGrievances();
    } catch (err) {
      console.error('Report submission failed:', err);
    } finally {
      setSubmittingReport(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Officer Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-800 text-white uppercase tracking-wider">
              {user?.department?.name || 'Department Desk'}
            </span>
            <span className="text-xs text-slate-500">Field Investigation Console</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Officer {user?.full_name}
          </h1>
          <p className="text-xs text-slate-500">Authorized redressal desk for department-assigned public complaints.</p>
        </div>
      </div>

      {/* Grievances List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600">
            Assigned Grievances ({grievances.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading assigned cases...</div>
        ) : grievances.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No grievances currently assigned to your department.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Ref Number</th>
                  <th className="py-3 px-4">Citizen</th>
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {grievances.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50 transition cursor-pointer" onClick={() => openDetails(g.id)}>
                    <td className="py-3 px-4 font-mono font-medium text-emerald-800">{g.reference_number}</td>
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
                        Investigate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Grievance Investigation Drawer */}
      {selectedGrievance && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex justify-end z-50">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <span className="font-mono text-emerald-800 font-bold">{selectedGrievance.reference_number}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedGrievance.subject}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Citizen Contact: {selectedGrievance.citizen_name} ({selectedGrievance.citizen_mobile || 'No phone provided'})
                </p>
              </div>
              <button onClick={() => setSelectedGrievance(null)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">
                ✕
              </button>
            </div>

            {/* Description */}
            <div className="text-xs space-y-1">
              <span className="font-bold uppercase tracking-wider text-slate-500">Citizen Description</span>
              <p className="p-3 bg-slate-50 rounded-lg text-slate-800 whitespace-pre-line border border-slate-200">
                {selectedGrievance.description}
              </p>
            </div>

            {/* Officer Action Bar */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Current Status:</span>
                <span className="font-bold text-emerald-800">{selectedGrievance.status}</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setStatusModalOpen(true)}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-3.5 py-2 rounded-lg"
                >
                  Update Progress Status
                </button>
                <button
                  onClick={() => setReportModalOpen(true)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg"
                >
                  Submit Action-Taken Report
                </button>
              </div>
            </div>

            {/* Existing Action Reports */}
            {selectedGrievance.action_reports && selectedGrievance.action_reports.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Submitted Action Reports</h4>
                {selectedGrievance.action_reports.map((ar: any) => (
                  <div key={ar.id} className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1">
                    <div className="font-semibold text-slate-800">By {ar.officer_name} on {new Date(ar.submitted_at).toLocaleDateString()}</div>
                    <p><span className="text-slate-500">Investigation:</span> {ar.investigation_summary}</p>
                    <p><span className="text-slate-500">Remedial Action:</span> {ar.action_taken}</p>
                    {ar.field_visit_conducted && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-medium">Field Visit Verified</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Workflow Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">History Trail</h4>
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

      {/* Progress Status Modal */}
      {statusModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-xl shadow-xl space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Update Investigation Status</h3>
            <form onSubmit={handleUpdateStatus} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Status</label>
                <select
                  value={officerStatus}
                  onChange={(e) => setOfficerStatus(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                >
                  <option value="In Progress">In Progress (Field Work Active)</option>
                  <option value="Under Review">Under Review (Inspection Pending)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Investigation Remarks</label>
                <textarea
                  required
                  rows={3}
                  value={statusRemarks}
                  onChange={(e) => setStatusRemarks(e.target.value)}
                  placeholder="e.g. Field inspection team dispatched to site..."
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
                  {updatingStatus ? 'Updating...' : 'Save Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Action Taken Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-lg w-full p-6 rounded-xl shadow-xl space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Submit Action-Taken Report to CMO</h3>
            <form onSubmit={handleSubmitReport} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Site Findings / Investigation Summary</label>
                <textarea
                  required
                  rows={3}
                  value={investigationSummary}
                  onChange={(e) => setInvestigationSummary(e.target.value)}
                  placeholder="Detail condition observed upon site visit..."
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Corrective Action Taken</label>
                <textarea
                  required
                  rows={3}
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  placeholder="Detailed repairs, replacements or administrative interventions completed..."
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="fieldVisitCheck"
                  checked={fieldVisit}
                  onChange={(e) => setFieldVisit(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                <label htmlFor="fieldVisitCheck" className="text-slate-700 font-medium">
                  Physical field visit conducted by department staff
                </label>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Evidence Document / Completion Photo (Optional)</label>
                <input
                  type="file"
                  onChange={(e) => setEvidenceFile(e.target.files ? e.target.files[0] : null)}
                  className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-slate-100 file:text-slate-700"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReport}
                  className="px-3 py-1.5 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 disabled:opacity-50"
                >
                  {submittingReport ? 'Submitting...' : 'Submit Report to CMO'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
