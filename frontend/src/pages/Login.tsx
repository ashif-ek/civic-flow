import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Shield, ArrowRight, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login/', { email, password });
      const { access, refresh, user } = res.data;
      login(access, user, refresh);

      if (user.role === 'CMO_ADMIN') {
        navigate('/cmo-dashboard');
      } else if (user.role === 'DEPARTMENT_OFFICER') {
        navigate('/officer-dashboard');
      } else {
        navigate('/citizen-dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="inline-flex p-3 bg-emerald-100 text-emerald-800 rounded-xl mb-3 shadow-inner">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sign in to CivicFlow</h2>
          <p className="mt-1 text-sm text-slate-600">Access Citizen, Department Officer or CMO Admin Portal</p>
        </div>

        {/* Demo Fast Logins Banner */}
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Quick Demo Credentials (Pre-seeded in Neon DB)
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => fillDemoAccount('citizen.rajesh@gmail.com', 'Citizen@123')}
              className="px-2 py-1.5 bg-white border border-emerald-300 rounded text-emerald-800 font-medium hover:bg-emerald-100 text-center"
            >
              Citizen
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('cmo.admin@civicflow.gov.in', 'Admin@123')}
              className="px-2 py-1.5 bg-white border border-emerald-300 rounded text-emerald-800 font-medium hover:bg-emerald-100 text-center"
            >
              CMO Admin
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('officer.pwd@civicflow.gov.in', 'Officer@123')}
              className="px-2 py-1.5 bg-white border border-emerald-300 rounded text-emerald-800 font-medium hover:bg-emerald-100 text-center"
            >
              PWD Officer
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-6 space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              placeholder="e.g. citizen.rajesh@gmail.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 px-4 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-sm text-slate-600">
          New citizen?{' '}
          <Link to="/register" className="font-semibold text-emerald-700 hover:text-emerald-800">
            Register an account
          </Link>
        </div>
      </div>
    </div>
  );
};
