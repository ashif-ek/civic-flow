import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Sparkles, Send, Upload, AlertCircle, CheckCircle, ShieldCheck, HelpCircle } from 'lucide-react';

const KERALA_DISTRICTS = [
  'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha',
  'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad',
  'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'
];

const CATEGORIES = [
  'Roads & Bridges', 'Public Health & Sanitation', 'Water Supply',
  'Electricity & Energy', 'General Education', 'Public Transport',
  'Revenue & Land', 'Local Self Government', 'Law & Order'
];

export const GrievanceSubmit: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    district: 'Thiruvananthapuram',
    category: 'Roads & Bridges',
    subject: '',
    description: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submittedGrievance, setSubmittedGrievance] = useState<any | null>(null);

  const handleAiAnalyze = async () => {
    if (!formData.description.trim()) {
      setError('Please provide a complaint description to run AI analysis.');
      return;
    }
    setError('');
    setIsAnalyzing(true);
    try {
      const res = await api.post('/ai/analyze/', {
        subject: formData.subject,
        description: formData.description
      });
      setAiAnalysis(res.data);
      if (res.data.category && CATEGORIES.includes(res.data.category)) {
        setFormData(prev => ({ ...prev, category: res.data.category }));
      }
    } catch (err: any) {
      console.error('AI Analysis failed:', err);
      setError('Could not run AI analysis at this moment. You can still submit the grievance.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await api.post('/citizen/grievances/', formData);
      const created = res.data;

      // Upload file if selected
      if (file) {
        const fileData = new FormData();
        fileData.append('file', file);
        try {
          await api.post(`/grievances/${created.id}/attachments/`, fileData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } catch (uploadErr) {
          console.error('Attachment upload failed:', uploadErr);
        }
      }

      setSubmittedGrievance(created);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to submit grievance. Please verify your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedGrievance) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white p-8 rounded-2xl border border-emerald-200 shadow-sm text-center space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Grievance Registered Successfully</h2>
            <p className="text-sm text-slate-600 mt-1">Your complaint has been logged in the State Grievance Repository.</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-left space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase text-slate-500 font-semibold tracking-wider">Reference Number</span>
              <span className="font-mono text-base font-bold text-emerald-800">{submittedGrievance.reference_number}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Subject:</span>
              <span className="font-medium text-slate-900">{submittedGrievance.subject}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">District:</span>
              <span className="font-medium text-slate-900">{submittedGrievance.district}</span>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(`/citizen/grievance/${submittedGrievance.id}`)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition"
            >
              View Grievance Status
            </button>
            <button
              onClick={() => navigate('/citizen-dashboard')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm px-5 py-2.5 rounded-lg transition"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lodge a Public Grievance</h1>
        <p className="text-sm text-slate-600 mt-1">
          Provide accurate details about the civic problem. AI will help triage and suggest relevant authorities.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              District
            </label>
            <select
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {KERALA_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Subject / Headline
          </label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g. Dangerously deep pothole on MG Road near Secretariat"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Detailed Description
            </label>
            <button
              type="button"
              onClick={handleAiAnalyze}
              disabled={isAnalyzing || !formData.description.trim()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-md transition disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              {isAnalyzing ? 'Analyzing with Gemini...' : 'Analyze with AI'}
            </button>
          </div>
          <textarea
            required
            rows={5}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Provide exact location, timeline, severity of the problem, and affected public..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        {/* AI Suggestions Box */}
        {aiAnalysis && (
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              AI Assistant Triage Preview
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
              <div>
                <span className="text-slate-500">Suggested Dept:</span>
                <p className="font-semibold text-slate-900">{aiAnalysis.suggested_department || 'Public Works Department'}</p>
              </div>
              <div>
                <span className="text-slate-500">Assessed Priority:</span>
                <p className="font-semibold text-emerald-800">{aiAnalysis.priority || 'Medium'}</p>
              </div>
              <div>
                <span className="text-slate-500">Suggested Category:</span>
                <p className="font-semibold text-slate-900">{aiAnalysis.category || 'Infrastructure'}</p>
              </div>
            </div>
            <div className="text-xs text-slate-700 pt-1">
              <span className="font-medium text-slate-900">Summary: </span>
              {aiAnalysis.summary}
            </div>
            {aiAnalysis.is_fallback && (
              <div className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200 mt-1">
                Notice: System standard triage rules applied (AI Fallback mode).
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Supporting Document / Image (Optional)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">Supports PNG, JPG, PDF up to 10MB.</p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition disabled:opacity-50"
          >
            {isSubmitting ? 'Registering Grievance...' : 'Submit Grievance'}
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
