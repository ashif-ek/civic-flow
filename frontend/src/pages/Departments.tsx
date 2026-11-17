import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Building2, Phone, Mail, ExternalLink } from 'lucide-react';

export const Departments: React.FC = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const res = await api.get('/departments/');
        setDepartments(res.data.results || res.data || []);
      } catch (err) {
        console.error('Failed to fetch departments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDepts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Public Administration</span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Integrated Government Departments</h1>
        <p className="text-sm text-slate-600 mt-2">
          State departments and municipal agencies active on the CivicFlow centralized redressal network.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500 text-sm">Loading department directories from database...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div key={dept.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded">
                  {dept.code}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{dept.name}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{dept.description}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{dept.contact_email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{dept.contact_phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
