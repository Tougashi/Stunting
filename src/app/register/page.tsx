'use client';

import React, { useState } from 'react';
import { Layout } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert('Password tidak sama');
    setLoading(true);
    // TODO: integrate API
    setTimeout(() => {
      setLoading(false);
      router.push('/login');
    }, 700);
  };

  return (
    <Layout>
      <div className="min-h-screen relative overflow-x-hidden">
        <div className="relative z-20 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md -mt-16 md:-mt-12">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8" style={{ boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D' }}>
              <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">Daftar</h1>
              <p className="text-center text-gray-600 mb-6">Buat akun baru untuk mulai menggunakan aplikasi</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Lengkap"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#407A81] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#407A81] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kata Sandi</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#407A81] focus:border-transparent outline-none pr-12"
                    />
                    <button type="button" onClick={() => setShowPassword((v)=>!v)} className="absolute inset-y-0 right-0 px-3 text-[#407A81]">
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ulangi Kata Sandi</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#407A81] focus:border-transparent outline-none pr-12"
                    />
                    <button type="button" onClick={() => setShowConfirm((v)=>!v)} className="absolute inset-y-0 right-0 px-3 text-[#407A81]">
                      {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-[#407A81] text-white py-3 rounded-lg hover:bg-[#326269] transition-colors font-semibold disabled:opacity-50">
                  {loading ? 'Memproses...' : 'Daftar'}
                </button>
              </form>

              <div className="text-center text-sm text-gray-600 mt-6">
                Sudah punya akun?{' '}
                <Link href="/login" className="text-[#407A81] font-semibold hover:underline">Masuk</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}


