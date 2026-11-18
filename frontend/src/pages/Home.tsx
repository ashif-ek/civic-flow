import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, CheckCircle2, ArrowRight, Clock, Award,
  Cpu, FileCheck, Layers, HelpCircle, PhoneCall,
  Landmark, Sparkles, Building, ArrowUpRight, Scale
} from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Editorial & Modern Civic Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle architectural background grid & radial light */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Editorial Headline & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Civic Authority Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-emerald-400 text-xs font-mono font-medium tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>CENTRALIZED PUBLIC GRIEVANCE NETWORK</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">KERALA PILOT</span>
              </div>

              {/* Title with Strong Editorial Character */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Direct civic accountability, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  from petition to field resolution.
                </span>
              </h1>

              {/* Refined Descriptive Subhead */}
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                CivicFlow unites citizens, department field engineers, and the Chief Minister’s Office in a transparent, auditable redressal ecosystem. Powered by Gemini AI triage with strict time-bound service level agreements.
              </p>

              {/* High-Impact Actions */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/citizen/submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-emerald-950/50 transition-all flex items-center gap-2 text-sm"
                >
                  <span>Lodge Public Grievance</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/track"
                  className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-semibold px-5 py-3 rounded-xl transition text-sm flex items-center gap-2"
                >
                  <span>Public Ref Tracker</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Micro Confidence Metrics */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="font-mono text-base font-bold text-white">14</div>
                  <div className="text-[11px] text-slate-400 font-medium">Districts Integrated</div>
                </div>
                <div>
                  <div className="font-mono text-base font-bold text-emerald-400">3–14 Days</div>
                  <div className="text-[11px] text-slate-400 font-medium">Enforced SLA Rules</div>
                </div>
                <div>
                  <div className="font-mono text-base font-bold text-white">100%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Auditable History</div>
                </div>
              </div>
            </div>

            {/* Right Column: Governance Architecture Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/70 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                    <Scale className="w-4 h-4 text-emerald-400" />
                    <span>State Redressal Protocol</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                    ACTIVE DESK
                  </span>
                </div>

                {/* Workflow Sequence Preview */}
                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700/50 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <div className="font-semibold text-slate-200">AI Triage & Categorization</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Gemini extracts department routing & urgency priority.</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700/50 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <div className="font-semibold text-slate-200">CMO Ministerial Assignment</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Directives issued directly to designated executive officers.</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700/50 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <div className="font-semibold text-slate-200">On-Site Action-Taken Report</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Verified field visits & physical completion documentation.</div>
                    </div>
                  </div>
                </div>

                {/* Verification Notice */}
                <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-700/50 flex items-center justify-between">
                  <span>CMO Apex Oversight: Verified</span>
                  <Link to="/how-it-works" className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1">
                    Full Protocol <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
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

      {/* Demonstration Statistics */}
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
