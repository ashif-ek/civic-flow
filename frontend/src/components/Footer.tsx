import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3 text-white">
              <div className="bg-emerald-600 p-1.5 rounded">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Civic<span className="text-emerald-400">Flow</span></span>
            </div>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Unified AI-Powered Public Grievance Redressal Platform for prompt, accountable, and transparent civic administration.
            </p>
            <div className="text-xs text-amber-300/80 bg-amber-950/40 border border-amber-900/50 p-2.5 rounded">
              Recruitment Evaluation Assignment — Built autonomously with zero mock core data.
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-emerald-400 transition">About CivicFlow</Link></li>
              <li><Link to="/how-it-works" className="hover:text-emerald-400 transition">How Grievances Are Handled</Link></li>
              <li><Link to="/departments" className="hover:text-emerald-400 transition">Active Departments</Link></li>
              <li><Link to="/track" className="hover:text-emerald-400 transition">Public Tracker</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-400 transition">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">Key Departments</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Public Works Department (PWD)</li>
              <li>Kerala Water Authority (KWA)</li>
              <li>Kerala State Electricity Board (KSEB)</li>
              <li>Local Self Government (LSGD)</li>
              <li>Health & Family Welfare (HFW)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">Helpline & Secretariat</h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>CMO Citizen Toll-Free: 1800-425-1077</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>cmo.grievance@civicflow.gov.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Government Secretariat, Thiruvananthapuram</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-2">
          <p>© 2026 CivicFlow Platform. Designed for recruitment machine-test evaluation.</p>
          <p>Strictly non-governmental demonstration project.</p>
        </div>
      </div>
    </footer>
  );
};
