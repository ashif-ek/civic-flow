import React from 'react';
import { ArrowRight, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Citizen Grievance Submission',
      desc: 'The citizen registers and enters details regarding location, problem category, description, and optional photo evidence.'
    },
    {
      num: '02',
      title: 'Unique Reference & AI Triage',
      desc: 'The platform immediately generates a unique tracking number (e.g. KL-GRV-XXXXXX). Google Gemini AI analyzes the text, recommending the responsible department, urgency priority, and an executive briefing.'
    },
    {
      num: '03',
      title: 'CMO Review & Department Assignment',
      desc: 'The Chief Minister\'s Office reviews the complaint on the central dashboard, validates AI suggestions, and assigns it to the department officer with binding instructions.'
    },
    {
      num: '04',
      title: 'Field Investigation & Progress Updates',
      desc: 'The assigned officer receives the task, updates status to "In Progress", and conducts site inspections or repair work.'
    },
    {
      num: '05',
      title: 'Action-Taken Report Submission',
      desc: 'The officer submits a formal Action-Taken Report documenting the remedial measures and site findings.'
    },
    {
      num: '06',
      title: 'CMO Resolution Approval or Reopening',
      desc: 'CMO administrator evaluates the officer\'s report. If verified satisfactory, status is marked "Resolved"; otherwise, it is reopened for further intervention.'
    },
    {
      num: '07',
      title: 'Citizen Inspection & Feedback',
      desc: 'The citizen receives the resolution notification, tracks the entire history, and provides a satisfaction rating (1-5 stars) and comments.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Operational Framework</span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">How Grievance Redressal Works</h1>
        <p className="text-sm text-slate-600 mt-2">
          An explicit, multi-tier public grievance workflow guaranteeing accountability from submission to citizen confirmation.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((s) => (
          <div key={s.num} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
            <span className="font-mono text-emerald-700 font-extrabold text-base bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              {s.num}
            </span>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
