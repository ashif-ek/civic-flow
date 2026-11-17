import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      q: 'Who can file a grievance on CivicFlow?',
      a: 'Any resident or citizen can register an account using their email and mobile number, and submit grievances regarding public infrastructure, health, water supply, electricity, transport, or local administration.'
    },
    {
      q: 'How does the AI assistant assist during submission?',
      a: 'CivicFlow uses the official Google Gemini API to analyze the grievance title and description in real-time. It predicts the appropriate government department, assesses severity priority (Low/Medium/High), and generates a concise executive brief for the CMO.'
    },
    {
      q: 'Can AI make binding decisions or reject my complaint?',
      a: 'No. AI strictly assists with triage and categorization. All assignments, investigation evaluations, and case resolution approvals remain 100% under human administrative authority (CMO administrators and department officers).'
    },
    {
      q: 'Can I track a complaint without logging in?',
      a: 'Yes. Any citizen with a valid Grievance Reference Number (e.g. KL-GRV-DEMO01) can view the public timeline and resolution status using the Track Grievance page without revealing personal identity.'
    },
    {
      q: 'What happens if a department officer fails to inspect the problem?',
      a: 'The Chief Minister\'s Office reviews delayed or critical cases on the Apex Console and can officially escalate the grievance to High Priority, expediting field response.'
    },
    {
      q: 'Can I provide feedback after my case is marked resolved?',
      a: 'Yes. Once the CMO approves resolution, the citizen can inspect the completed work and submit a 1 to 5-star satisfaction rating and qualitative comments.'
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Citizen Guide</span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Frequently Asked Questions</h1>
        <p className="text-sm text-slate-600 mt-2">
          Everything you need to know about filing, monitoring, and resolving grievances on CivicFlow.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 hover:bg-slate-50 transition"
            >
              <span className="font-semibold text-slate-900 text-sm">{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openIdx === idx ? 'rotate-180 text-emerald-700' : ''}`} />
            </button>
            {openIdx === idx && (
              <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
