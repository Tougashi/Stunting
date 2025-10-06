'use client';

import React, { useMemo, useState } from 'react';
import { Layout } from '@/components';
import Image from 'next/image';
import { FiFilter, FiSearch, FiMoreVertical } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

type ParentProfile = {
  id: string;
  fatherName: string;
  motherName: string;
  nik: string;
  childrenCount: number;
  fatherImage: string;
  motherImage: string;
};

const parents: ParentProfile[] = Array.from({ length: 16 }).map((_, i) => ({
  id: String(i + 1),
  fatherName: 'Mustafa',
  motherName: 'Kharidah',
  nik: `06${String(123456789012 + i)}`,
  childrenCount: (i % 3) + 1,
  fatherImage: '/image/icon/pengukuran-anak.jpg',
  motherImage: '/image/icon/pengukuran-anak.jpg',
}));

export default function OrangTuaPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return parents.filter(p =>
      `${p.fatherName} ${p.motherName}`.toLowerCase().includes(query.toLowerCase()) ||
      p.nik.includes(query)
    );
  }, [query]);

  return (
    <Layout>
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Background */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-60 z-10"
          style={{
            background: `radial-gradient(ellipse at center top, rgba(158, 202, 214, 0.6) 0%, rgba(158, 202, 214, 0.3) 30%, rgba(158, 202, 214, 0.1) 50%, transparent 70%)`
          }}
        />

        <div className="relative z-20 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-black">Profile Orang Tua</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi
              </p>
            </div>

            {/* Actions Card */}
            <div 
              className="mb-4 bg-white rounded-xl border border-gray-200 shadow-sm"
              style={{ boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D' }}
            >
              <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <button onClick={() => window.location.href = '/orang-tua/tambah'} className="px-4 py-2 rounded-md bg-[#407A81] text-white hover:bg-[#326269] font-medium w-fit">
                  Tambah Orang Tua
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 w-fit">
                  <FiFilter className="text-gray-600" />
                  <span className="text-gray-700">Filter by</span>
                </button>

                <div className="relative flex-1 min-w-[240px]">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari Orang Tua"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#9ECAD6] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ParentCard key={p.id} parent={p} />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-10">Tidak ada data</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function ParentCard({ parent }: { parent: ParentProfile }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <div 
      className="relative bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all duration-200"
      style={{ boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D' }}
    >
      {/* menu */}
      <div className="absolute top-3 right-3">
        <button onClick={() => setOpen(v => !v)} className="p-1 text-[var(--color-primary)]/80 hover:text-[var(--color-primary)]">
          <FiMoreVertical size={18} />
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-20">
            <button onClick={() => router.push(`/orang-tua/${parent.id}`)} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">Lihat Detail</button>
            <button onClick={() => console.log('Edit', parent.id)} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">Edit</button>
            <button onClick={() => setConfirmOpen(true)} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">Hapus</button>
          </div>
        )}
      </div>
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setConfirmOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="text-center text-lg font-semibold text-gray-900 mb-4">Apakah anda yakin ingin menghapusnya?</div>
            <div className="space-y-3">
              <button onClick={() => { setConfirmOpen(false); console.log('hapus orang tua', parent.id); }} className="w-full px-4 py-2 rounded-full bg-[#407A81] text-white hover:bg-[#326269]">Hapus</button>
              <button onClick={() => setConfirmOpen(false)} className="w-full px-4 py-2 rounded-full border-2 border-[#407A81] text-[#407A81] hover:bg-[#E7F5F7]">Batalkan</button>
            </div>
          </div>
        </div>
      )}

      {/* Father row */}
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden">
          <Image src={parent.fatherImage} alt={`Foto ${parent.fatherName}`} fill className="object-cover" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 leading-tight">{parent.fatherName}</div>
        </div>
      </div>

      {/* Mother row */}
      <div className="flex items-center gap-4 mt-4">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden">
          <Image src={parent.motherImage} alt={`Foto ${parent.motherName}`} fill className="object-cover" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 leading-tight">{parent.motherName}</div>
        </div>
      </div>

      {/* Info lines */}
      <div className="mt-6 space-y-3 text-center">
        <div className="text-base">
          <span className="font-semibold text-[var(--color-primary)]">No KK:</span>
          <span className="ml-2 text-gray-500">{parent.nik}</span>
        </div>
        <div className="text-base">
          <span className="font-semibold text-[var(--color-primary)]">Jumlah Anak:</span>
          <span className="ml-2 text-gray-500">{parent.childrenCount} Anak</span>
        </div>
      </div>
    </div>
  );
}


