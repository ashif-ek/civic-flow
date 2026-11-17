import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Shield, Clock, CheckCircle2, AlertCircle, FileText, ArrowLeft, Star, Send } from 'lucide-react';

export const GrievanceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [grievance, setGrievance] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComments, setFeedbackComments] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [error, setError] = useState('');

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/citizen/grievances/${id}/`);
      setGrievance(res.data);
    } catch (err: any) {
      setError('Could not load grievance details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingFeedback(true);
    try {
      await api.post(`/grievances/${id}/feedback/`, {
        rating: feedbackRating,
        comments: feedbackComments,
        is_satisfied: feedbackRating >= 3
      });
      setFeedbackSuccess(true);
      fetchDetail();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit feedback.');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-500">Loading grievance records...</div>;
  }

  if (!grievance) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-600">Grievance record not found.</p>
        <Link to="/citizen-dashboard" className="mt-4 inline-block text-emerald-700 font-medium">Return to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Link to="/citizen-dashboard" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Citizen Dashboard
      </Link>

      {/* Header Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-lg font-bold text-emerald-800">{grievance.reference_number}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {grievance.status}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-2">{grievance.subject}</h1>
          <p className="text-xs text-slate-500 mt-1">
            Submitted on {new Date(grievance.created_at).toLocaleString()} • {grievance.district} District
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Citizen Description</h2>
            <p className="text-sm text-slate-800 whitespace-pre-line leading-relaxed">{grievance.description}</p>
          </div>

          {/* AI Analysis Card */}
          {grievance.ai_summary && (
            <div className="bg-emerald-50/50 border border-emerald-200 p-5 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                <Shield className="w-4 h-4 text-emerald-700" />
                AI Triage & Assessment
              </div>
              <p className="text-xs text-slate-700 leading-relaxed"><span className="font-medium">Summary:</span> {grievance.ai_summary}</p>
              {grievance.ai_suggested_action && (
                <p className="text-xs text-slate-700 leading-relaxed"><span className="font-medium">Recommended Action:</span> {grievance.ai_suggested_action}</p>
              )}
            </div>
          )}

          {/* Action Taken Reports (if any) */}
          {grievance.action_reports && grievance.action_reports.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Department Action Reports</h2>
              {grievance.action_reports.map((report: any) => (
                <div key={report.id} className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-900">{report.department_name} (by {report.officer_name})</span>
                    <span className="text-slate-500">{new Date(report.submitted_at).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Investigation: </span>
                    <span className="text-slate-800">{report.investigation_summary}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Action Executed: </span>
                    <span className="text-slate-800">{report.action_taken}</span>
                  </div>
                  {report.field_visit_conducted && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-medium">Field Visit Completed</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Resolution Feedback Form */}
          {grievance.status === 'Resolved' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Citizen Satisfaction Feedback</h2>
              {grievance.feedback ? (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-xs space-y-1">
                  <div className="flex items-center gap-1 text-emerald-800 font-bold">
                    <span>Rating: {grievance.feedback.rating} / 5</span>
                    <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                  </div>
                  {grievance.feedback.comments && <p className="text-slate-700 italic">"{grievance.feedback.comments}"</p>}
                </div>
              ) : feedbackSuccess ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg">Feedback recorded. Thank you for helping improve civic services.</div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Rate the resolution (1-5 Stars)</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setFeedbackRating(star)}
                          className={`p-1.5 rounded ${feedbackRating >= star ? 'text-amber-500' : 'text-slate-300'}`}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Comments or remarks</label>
                    <textarea
                      rows={2}
                      value={feedbackComments}
                      onChange={(e) => setFeedbackComments(e.target.value)}
                      placeholder="Share your experience regarding the speed and quality of resolution..."
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submittingFeedback}
                    className="inline-flex items-center gap-1.5 bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-emerald-800 transition disabled:opacity-50"
                  >
                    <Send className="w-3 h-3" /> Submit Feedback
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Info (1 col) */}
        <div className="space-y-6">
          {/* Metadata */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 text-xs">
            <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Grievance Overview</h3>
            <div className="flex justify-between">
              <span className="text-slate-500">Category:</span>
              <span className="font-medium text-slate-800">{grievance.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Priority:</span>
              <span className="font-medium text-slate-800">{grievance.priority}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Department:</span>
              <span className="font-medium text-slate-800">{grievance.assigned_department_name || 'Pending'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Assigned Officer:</span>
              <span className="font-medium text-slate-800">{grievance.assigned_officer_name || 'Pending'}</span>
            </div>
            {grievance.is_escalated && (
              <div className="p-2 bg-rose-50 border border-rose-200 text-rose-800 rounded font-semibold text-center">
                Escalated by CMO
              </div>
            )}
          </div>

          {/* Lifecycle Timeline */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Workflow History</h3>
            <div className="space-y-4 border-l-2 border-emerald-200 pl-4 ml-1">
              {grievance.history && grievance.history.map((h: any) => (
                <div key={h.id} className="relative text-xs space-y-0.5">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
                  <div className="font-semibold text-slate-900">{h.new_status}</div>
                  <div className="text-[11px] text-slate-500">{new Date(h.timestamp).toLocaleString()}</div>
                  {h.remarks && <p className="text-slate-600 italic text-[11px] mt-0.5">{h.remarks}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
