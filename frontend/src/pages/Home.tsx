import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, CheckCircle2, ArrowRight, Clock, Award,
  Cpu, FileCheck, Layers, HelpCircle, PhoneCall
} from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-emerald-900/50 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" /> Next-Gen AI Grievance Governance
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Transparent, Accountable Public Grievance Management
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              CivicFlow centralizes citizen complaints across public infrastructure, health, water supply and state utilities. Powered by AI triage and monitored directly by the Chief Minister's Office.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/citizen/submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-emerald-900/40 transition flex items-center gap-2 text-sm"
              >
                Submit Grievance <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/track"
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold px-6 py-3 rounded-xl transition text-sm"
              >
                Track by Reference Number
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How Grievances Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700">Structured Governance</h2>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            End-to-End Redressal Lifecycle
          </p>
          <p className="text-sm text-slate-600 mt-2">Every submission follows an enforceable, auditable 10-step protocol.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm">1</div>
            <h3 className="font-bold text-slate-900 text-base">Citizen Filing & AI Triage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Citizen submits complaint. Google Gemini AI automatically classifies department, priority, and generates an executive summary.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 font-bold flex items-center justify-center text-sm">2</div>
            <h3 className="font-bold text-slate-900 text-base">CMO Assignment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              CMO Administrators review AI recommendations and assign complaints to relevant department officers with official directives.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 font-bold flex items-center justify-center text-sm">3</div>
            <h3 className="font-bold text-slate-900 text-base">Field Investigation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designated department officers conduct on-site inspections, log progress updates, and submit an Action-Taken Report.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm">4</div>
            <h3 className="font-bold text-slate-900 text-base">Verification & Feedback</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              CMO approves resolution or reopens cases. Citizen inspects completed work and provides a verified satisfaction rating.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Departments */}
      <section className="bg-slate-100/70 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700">Connected Services</h2>
              <p className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Key Public Departments</p>
            </div>
            <Link to="/departments" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { code: 'PWD', name: 'Public Works Department', desc: 'Roads, bridges, flyovers and state public buildings.' },
              { code: 'KWA', name: 'Kerala Water Authority', desc: 'Drinking water distribution pipelines and municipal supply.' },
              { code: 'KSEB', name: 'State Electricity Board', desc: 'Power transmission, sub-stations and safety hazard management.' },
              { code: 'LSGD', name: 'Local Self Government', desc: 'Solid waste management, local drainage and street lighting.' }
            ].map((d) => (
              <div key={d.code} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold font-mono px-2 py-0.5 bg-slate-100 text-slate-800 rounded">{d.code}</span>
                <h4 className="font-bold text-slate-900 text-sm">{d.name}</h4>
                <p className="text-xs text-slate-500">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demonstration Statistics (Clearly Identified Demonstration Records) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-4 mb-6">
            <div>
              <h3 className="font-bold text-base text-white">Demonstration Performance Metrics</h3>
              <p className="text-xs text-slate-400">Illustrative pilot benchmarks for grievance resolution efficiency.</p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
              DEMONSTRATION SAMPLE METRICS
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-emerald-400">94.8%</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">Triage Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-emerald-400">&lt; 48 Hrs</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">Avg Initial Inspection</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-emerald-400">14</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">Districts Covered</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">Audit Trail Coverage</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
