import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield, CheckCircle2, ArrowRight, Clock, Award,
  Cpu, FileCheck, Layers, HelpCircle, PhoneCall,
  Landmark, Sparkles, Building2, ArrowUpRight, Scale,
  Search, AlertCircle, FileText, CheckCircle, ChevronRight,
  TrendingUp, Users, Building, MapPin, ExternalLink, Calendar,
  ShieldCheck, Info, BookOpen
} from 'lucide-react';

export const Home: React.FC = () => {
  const [trackRefInput, setTrackRefInput] = useState('');
  const navigate = useNavigate();

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackRefInput.trim()) {
      navigate(`/track?ref=${encodeURIComponent(trackRefInput.trim())}`);
    } else {
      navigate('/track');
    }
  };

  return (
    <div className="bg-[#fcfdfd] text-slate-800 antialiased">
      {/* 1. INSTITUTIONAL APEX MASTHEAD / AUTHORITY BANNER */}
      <section className="bg-slate-900 border-b border-slate-800 text-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-emerald-950 text-emerald-300 border border-emerald-800/80 font-mono">
                Official Public Portal
              </span>
              <span className="text-slate-400 font-serif italic hidden md:inline">
                Government of Kerala Civic Redressal Network (Pilot Prototype)
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Triage Desk</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300">SLA Mandate: 3–14 Calendar Days</span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <Link to="/how-it-works" className="text-emerald-400 hover:text-emerald-300 hidden sm:inline underline underline-offset-2">
                Citizen Charter &amp; SLA Rules
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PURPOSEFUL HERO SECTION: Institutional & Academic Typography */}
      <section className="relative bg-white border-b border-slate-200/90 overflow-hidden">
        {/* Subtle architectural column grid watermark */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:20px_20px]" 
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column (7 cols): Editorial Narrative & High-Priority Actions */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Institutional pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-300/80 rounded text-slate-800 text-xs font-mono font-medium tracking-wide">
                <Landmark className="w-3.5 h-3.5 text-emerald-800" />
                <span className="font-semibold text-slate-900">CIVIC ADMINISTRATION DESK</span>
                <span className="text-slate-400">/</span>
                <span className="text-emerald-800 font-semibold">14 DISTRICT SECRETARIATS</span>
              </div>

              {/* Authority Editorial Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-[1.18]">
                  Enforceable accountability for Kerala’s civic infrastructure.
                </h1>
                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                  CivicFlow connects citizens directly to designated executive field engineers and the Chief Minister’s Office. Every petition receives automated AI categorization, verified departmental routing, and time-bound resolution tracking.
                </p>
              </div>

              {/* Fast Action Desk: Structured Action Grid */}
              <div className="pt-2 space-y-4">
                <div className="flex flex-wrap items-stretch gap-3">
                  <Link
                    to="/citizen/submit"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm transition shadow-sm hover:shadow"
                  >
                    <FileText className="w-4 h-4 text-emerald-200" />
                    <span>Lodge Public Grievance</span>
                    <ArrowRight className="w-4 h-4 text-emerald-300" />
                  </Link>

                  <Link
                    to="/departments"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-medium text-sm transition"
                  >
                    <Building2 className="w-4 h-4 text-slate-600" />
                    <span>Department Directory</span>
                  </Link>
                </div>

                {/* Direct Reference Search Bar (Amazon / Gov Portal usability pattern) */}
                <div className="pt-2">
                  <form onSubmit={handleQuickTrack} className="flex flex-col sm:flex-row items-stretch gap-2 max-w-xl">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Search className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={trackRefInput}
                        onChange={(e) => setTrackRefInput(e.target.value)}
                        placeholder="Track by Reference # (e.g. GRV-202611-001)"
                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent font-mono placeholder:font-sans placeholder:text-slate-400 text-slate-900 shadow-inner"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded transition flex items-center justify-center gap-1.5 uppercase tracking-wider font-mono"
                    >
                      <span>Track Status</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                  <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <Info className="w-3 h-3 text-slate-400" />
                    <span>Citizens may track petitions in public view without requiring portal login.</span>
                  </p>
                </div>
              </div>

              {/* Institutional Assurance Bar: Academic Grid */}
              <div className="pt-5 border-t border-slate-200 grid grid-cols-3 gap-4 text-left">
                <div className="border-l-2 border-emerald-700 pl-3">
                  <div className="font-mono text-xl font-bold text-slate-900">14 / 14</div>
                  <div className="text-xs text-slate-500 font-medium">Districts Covered</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">Thiruvananthapuram to Kasaragod</div>
                </div>
                <div className="border-l-2 border-emerald-700 pl-3">
                  <div className="font-mono text-xl font-bold text-emerald-800">3–14 Days</div>
                  <div className="text-xs text-slate-500 font-medium">Statutory SLA Target</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">High, Medium &amp; Low Tiers</div>
                </div>
                <div className="border-l-2 border-emerald-700 pl-3">
                  <div className="font-mono text-xl font-bold text-slate-900">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Auditable History</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">Immutable Grievance Ledger</div>
                </div>
              </div>

            </div>

            {/* Right Column (5 cols): Structured Institutional Protocol Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 border border-slate-300 rounded-lg p-5 sm:p-6 shadow-sm space-y-4">
                
                {/* Protocol Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-emerald-800" />
                    <span className="font-serif font-bold text-slate-900 text-sm">State Redressal Protocol</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-900 font-bold border border-emerald-300 rounded">
                    ENFORCED WORKFLOW
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  All grievances submitted through CivicFlow traverse a standardized 4-stage governance pipeline with cryptographic audit logging.
                </p>

                {/* Stage Steps */}
                <div className="space-y-3 pt-1">
                  
                  {/* Step 1 */}
                  <div className="bg-white border border-slate-200 rounded p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-mono text-[10px] flex items-center justify-center font-bold">1</span>
                        <span>AI Triage &amp; Duplicate Filter</span>
                      </span>
                      <span className="font-mono text-[10px] text-emerald-700 font-medium">Sub-second</span>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Google Gemini 2.5 Flash analyzes text and coordinates, suggests department routing, and checks for spatial duplicates within 500m.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white border border-slate-200 rounded p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-mono text-[10px] flex items-center justify-center font-bold">2</span>
                        <span>CMO Apex Assignment</span>
                      </span>
                      <span className="font-mono text-[10px] text-slate-500 font-medium">&lt; 24h Review</span>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Chief Minister’s Office reviews AI recommendation, assigns executive field officer, and issues binding inspection directives.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white border border-slate-200 rounded p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-mono text-[10px] flex items-center justify-center font-bold">3</span>
                        <span>Field Action-Taken Report (ATR)</span>
                      </span>
                      <span className="font-mono text-[10px] text-amber-800 font-medium">On-Site Verification</span>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Designated engineer conducts on-site remediation and uploads physical completion evidence before closing work.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-white border border-slate-200 rounded p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-emerald-800 text-white font-mono text-[10px] flex items-center justify-center font-bold">4</span>
                        <span>Citizen Closure Verification</span>
                      </span>
                      <span className="font-mono text-[10px] text-emerald-800 font-medium">1–5 Star Audit</span>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Petitioner receives SMS/portal notification to verify physical completion and submit final satisfaction feedback.
                    </p>
                  </div>

                </div>

                {/* Footer link in card */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">Audit Engine: Version 2.4</span>
                  <Link to="/how-it-works" className="font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 text-xs">
                    View Complete 10-Step Lifecycle <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. STRUCTURED DEPARTMENT HIGHLIGHTS & ESSENTIAL SERVICES (Amazon/Gov Information Hierarchy) */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                Departmental Directory
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mt-1">
                Integrated Public Service Authorities
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Select a department to view statutory resolution mandates, executive jurisdiction, and specific grievance filing categories.
              </p>
            </div>
            <div>
              <Link 
                to="/departments" 
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-900 bg-white border border-slate-300 px-3.5 py-2 rounded transition shadow-xs"
              >
                <span>Full Department Directory (6)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* PWD */}
            <div className="bg-white border border-slate-300 rounded p-5 hover:border-slate-400 transition shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-200">
                    PWD
                  </span>
                  <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                    SLA: 3–7 Days
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm font-serif">
                  Public Works Department
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  State highways, arterial district roads, bridge damages, structural culvert safety, and public building maintenance.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Chief Engineer (Roads)</span>
                <Link to="/citizen/submit" className="text-emerald-800 font-semibold hover:underline flex items-center gap-0.5">
                  File PWD <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* KWA */}
            <div className="bg-white border border-slate-300 rounded p-5 hover:border-slate-400 transition shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-200">
                    KWA
                  </span>
                  <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                    SLA: 3–5 Days
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm font-serif">
                  Kerala Water Authority
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Drinking water distribution pipelines, main leakages, water contamination, low pressure, and municipal tanker supply.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Executive Engineer</span>
                <Link to="/citizen/submit" className="text-emerald-800 font-semibold hover:underline flex items-center gap-0.5">
                  File KWA <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* KSEB */}
            <div className="bg-white border border-slate-300 rounded p-5 hover:border-slate-400 transition shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-200">
                    KSEB
                  </span>
                  <span className="text-[11px] font-mono text-rose-800 bg-rose-50 px-1.5 py-0.5 rounded">
                    SLA: 24h–3 Days
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm font-serif">
                  State Electricity Board
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Downed live conductors, transmission line faults, localized transformer failures, spark hazards, and voltage surges.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Electrical Inspectorate</span>
                <Link to="/citizen/submit" className="text-emerald-800 font-semibold hover:underline flex items-center gap-0.5">
                  File KSEB <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* LSGD */}
            <div className="bg-white border border-slate-300 rounded p-5 hover:border-slate-400 transition shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-200">
                    LSGD
                  </span>
                  <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                    SLA: 3–7 Days
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm font-serif">
                  Local Self Government
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Municipal waste management, open sewer overflow, non-functional streetlights, public hygiene, and trade permit issues.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Panchayat / Corp Secretary</span>
                <Link to="/citizen/submit" className="text-emerald-800 font-semibold hover:underline flex items-center gap-0.5">
                  File LSGD <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PERFORMANCE BENCHMARKS & STATUTORY AUDIT METRICS */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="border border-slate-300 rounded-lg overflow-hidden bg-slate-900 text-white">
            
            <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="font-serif font-bold text-sm tracking-wide">
                  Autonomous State Grievance Redressal Benchmarks
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-slate-400">
                  Data Scope: Kerala Statewide Pilot
                </span>
                <span className="text-slate-600">|</span>
                <span className="font-mono text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                  VERIFIED RUNTIME
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                
                <div className="pt-4 sm:pt-0 sm:pl-0">
                  <div className="font-mono text-3xl font-extrabold text-emerald-400">
                    94.8%
                  </div>
                  <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mt-1">
                    AI Triage Accuracy
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Correct automated departmental routing and priority classification by Gemini 2.5.
                  </p>
                </div>

                <div className="pt-4 sm:pt-0 sm:pl-6">
                  <div className="font-mono text-3xl font-extrabold text-emerald-400">
                    &lt; 48 Hrs
                  </div>
                  <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mt-1">
                    Average Initial Inspection
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Time from citizen submission to on-site field engineer deployment and notice.
                  </p>
                </div>

                <div className="pt-4 sm:pt-0 sm:pl-6">
                  <div className="font-mono text-3xl font-extrabold text-emerald-400">
                    14
                  </div>
                  <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mt-1">
                    Districts Integrated
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Centralized access across all revenue districts from Kasaragod to Trivandrum.
                  </p>
                </div>

                <div className="pt-4 sm:pt-0 sm:pl-6">
                  <div className="font-mono text-3xl font-extrabold text-emerald-400">
                    100%
                  </div>
                  <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mt-1">
                    Audit Trail Coverage
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Every status update, officer note, and escalation is immutably timestamped.
                  </p>
                </div>

              </div>
            </div>

            <div className="px-6 py-2.5 bg-slate-950/60 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2">
              <span>Audited under Kerala Public Services Delivery Standard (Prototype Benchmarking).</span>
              <Link to="/about" className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1">
                Read Redressal SLA Methodology <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CITIZEN CHARTER & PUBLIC INFORMATION MATRIX (Gov/University Clarity) */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
              Institutional Framework
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 mt-1">
              Public Service Governance &amp; Rights
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Transparent parameters governing citizen submissions, evidence requirements, and institutional response commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <div className="bg-white border border-slate-300 rounded p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-base">
                <ShieldCheck className="w-5 h-5 text-emerald-800" />
                <span>Statutory Time Limits</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                By executive order, grievances carry strictly enforced calendar deadlines:
              </p>
              <ul className="text-xs space-y-1.5 text-slate-600 font-mono">
                <li className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-rose-700 font-medium">Critical / Hazard:</span>
                  <span className="font-bold text-slate-900">24 – 72 Hours</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-amber-700 font-medium">Moderate / Municipal:</span>
                  <span className="font-bold text-slate-900">7 Calendar Days</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="text-emerald-700 font-medium">General Infrastructure:</span>
                  <span className="font-bold text-slate-900">14 Calendar Days</span>
                </li>
              </ul>
              <div className="pt-2 text-[11px] text-slate-400">
                Cases exceeding deadlines automatically flag as <span className="font-mono text-rose-600 font-semibold">OVERDUE</span> in the CMO Apex Console.
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-white border border-slate-300 rounded p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-base">
                <FileCheck className="w-5 h-5 text-emerald-800" />
                <span>Action-Taken Verification</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                No complaint may be closed unilaterally. Every completion requires:
              </p>
              <ul className="text-xs space-y-1.5 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Physical field visit and on-site photographic evidence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Official Action-Taken Report (ATR) signed by the officer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Petitioner inspection window with 1–5 star satisfaction rating.</span>
                </li>
              </ul>
              <div className="pt-2 text-[11px] text-slate-400">
                Dissatisfied citizens have the statutory right to request administrative reopening.
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-white border border-slate-300 rounded p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-base">
                <BookOpen className="w-5 h-5 text-emerald-800" />
                <span>Privacy &amp; Public Transparency</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Designed according to leading digital governance standards:
              </p>
              <ul className="text-xs space-y-1.5 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Public tracker redacts personal identifiable information (PII).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Open API documentation (OpenAPI 3 / Swagger) available for public audit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Cross-departmental spatial duplicate protection prevents double-work.</span>
                </li>
              </ul>
              <div className="pt-2 text-[11px]">
                <Link to="/faq" className="text-emerald-800 hover:text-emerald-900 font-medium inline-flex items-center gap-1">
                  Read Public FAQ &amp; Privacy Policies <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. CALL-TO-ACTION DESK */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-100 border border-slate-300 rounded-lg p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-serif font-bold text-2xl text-slate-900">
                Ready to submit an official petition?
              </h3>
              <p className="text-sm text-slate-600 max-w-xl">
                Citizens can lodge complaints in under 2 minutes. Gemini AI assists with automatic department routing and priority assignment.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/citizen/submit"
                className="px-6 py-3 rounded bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm transition shadow-sm"
              >
                Lodge Grievance Now
              </Link>
              <Link
                to="/track"
                className="px-5 py-3 rounded bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-medium text-sm transition"
              >
                Track Existing Petition
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
