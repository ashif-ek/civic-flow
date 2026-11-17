import React from 'react';
import { Shield, Target, Users, CheckCircle } from 'lucide-react';

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Core Objectives</h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Provide citizens a direct channel to escalate civic bottlenecks.</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Leverage Gemini AI for immediate triage and priority analysis.</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Maintain unalterable audit histories across all status transitions.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Accountability Structure</h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Chief Minister's Office acts as the central review authority.</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Dedicated field officer assignments with mandatory action reports.</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Citizen verification and satisfaction scoring prior to closing.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
