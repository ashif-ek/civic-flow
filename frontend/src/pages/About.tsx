import React from 'react';
import { Shield, Target, Users, CheckCircle, Eye, Compass, Flag } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Platform Mission</span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">About CivicFlow</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          CivicFlow is an AI-powered public grievance management platform created to eliminate administrative silos, speed up redressal of citizen grievances, and ensure total transparency in civic governance.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-xs text-amber-900 space-y-1">
        <div className="font-bold uppercase tracking-wide">Recruitment Assignment Disclosure</div>
        <p>
          This application is an independent technical prototype developed as part of a recruitment machine-test. It is not affiliated with or endorsed by the Government of Kerala.
        </p>
      </div>

      {/* Purpose, Vision, Mission, Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Our Purpose</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To provide an accessible, responsive, and accountable grievance registration mechanism that bridges citizens directly with administrative decision-makers, eliminating paper bureaucracy and administrative delays.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Our Vision</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            A state-wide civic governance model where every public concern—from hazardous potholes to drinking water disruptions—is transparently monitored, rapidly investigated, and verified by citizens upon completion.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Flag className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Our Mission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Harnessing cutting-edge artificial intelligence to automate complaint triage, enforce strict Service Level Agreements (SLAs), and empower field departments with actionable, verifiable resolution protocols.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Core Objectives</h3>
          <ul className="text-xs text-slate-600 space-y-1.5">
            <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> Immediate triage and priority suggestion via Gemini AI.</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> Real-time SLA tracking (3-day, 7-day, 14-day deadlines).</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> Chief Minister's Office direct oversight & case escalation.</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> Citizen post-resolution satisfaction verification (1–5 stars).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
