'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Layout } from '@/components';
import Link from 'next/link';
import { FiMoreVertical, FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { fetchParentDetailByNoKK } from '@/utils/database-clean';
import { useParams } from 'next/navigation';

// Helper function to format age display
const formatAge = (years: number, months: number): string => {
  if (years === 0 && months === 0) {
    return 'Baru lahir';
  } else if (years === 0) {
    return `${months} Bulan`;
  } else if (months === 0) {
    return `${years} Tahun`;
  } else {
    return `${years} Tahun ${months} Bulan`;
  }
};

export default function OrangTuaDetailPage() {
  const router = useRouter();
  const params = useParams();
  const parentId = params?.id as string;
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load parent data from database
  useEffect(() => {
    const loadParentData = async () => {
      if (!parentId) return;
      
      try {
        setLoading(true);
        setError('');
        
        // parentId should be no_kk (family number)
        const parentDetail = await fetchParentDetailByNoKK(parentId);
        
        if (!parentDetail) {
          setError('Data orang tua tidak ditemukan');
          return;
        }
        
        // Transform database data to component format
        const transformedData = {
          father: {
            name: parentDetail.father?.nama || 'Tidak ada',
            nik: parentDetail.father?.nik || '',
            phone: parentDetail.father?.no_hp || '',
            birthPlace: parentDetail.father?.tempat_lahir || '',
            birthDate: parentDetail.father?.tanggal_lahir || '',
            image: parentDetail.father?.image_orangtua || '/image/icon/pengukuran-anak.jpg',
          },
          mother: {
            name: parentDetail.mother?.nama || 'Tidak ada',
            nik: parentDetail.mother?.nik || '',
            phone: parentDetail.mother?.no_hp || '',
            birthPlace: parentDetail.mother?.tempat_lahir || '',
            birthDate: parentDetail.mother?.tanggal_lahir || '',
            image: parentDetail.mother?.image_orangtua || '/image/icon/pengukuran-anak.jpg',
          },
          family: {
            kk: parentDetail.family.no_kk,
            childrenCount: parentDetail.family.childrenCount,
          },
          address: {
            provinsi: parentDetail.address?.provinsi || '',
            kota: parentDetail.address?.kota || '',
            kecamatan: parentDetail.address?.kecamatan || '',
            desa: parentDetail.address?.desa || '',
            kodePos: parentDetail.address?.kode_pos || '',
            detail: parentDetail.address?.jalan || '',
          },
          children: parentDetail.children.map((child: any) => ({
            id: child.nik,
            name: child.nama,
            avatar: child.image_anak || '/image/icon/bayi-icon.svg',
            gender: child.gender,
            ageYears: child.umur_tahun || 0,
            ageMonths: child.umur_bulan || 0,
            nik: child.nik
          })),
        };
        
        setData(transformedData);
        
      } catch (err) {
        console.error('Error loading parent data:', err);
        setError('Gagal memuat data orang tua');
      } finally {
        setLoading(false);
      }
    };

    loadParentData();
  }, [parentId]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAddChild, setShowAddChild] = useState(false);
  const [childForm, setChildForm] = useState({
    name: '', nik: '', tempat: '', tgl: '', age: '', unit: 'bulan', order: '', gender: 'L', berat: '', tinggi: '', lingkar: '', photo: '' as string | null,
  });
  const [showDelete, setShowDelete] = useState(false);
  const [childMenuOpenId, setChildMenuOpenId] = useState<string | null>(null);
  const [childDeleteId, setChildDeleteId] = useState<string | null>(null);



  return (
    <Layout>
      <div className="min-h-screen relative overflow-x-hidden">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-60 z-10"
          style={{
            background: `radial-gradient(ellipse at center top, rgba(158, 202, 214, 0.6) 0%, rgba(158, 202, 214, 0.3) 30%, rgba(158, 202, 214, 0.1) 50%, transparent 70%)`
          }}
        />

        <div className="relative z-20 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/orang-tua" className="mb-4 inline-flex items-center gap-2 text-lg  md:text-2xl text-gray-700 hover:underline">
            <FiArrowLeft size={20} />
              <span>Orang Tua</span>
            </Link>
            <div className="text-center text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-700 mb-4">Profile Orang Tua</div>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#407A81]"></div>
                <p className="mt-4 text-gray-600">Memuat data...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-[#407A81] text-white rounded-md hover:bg-[#326269]"
                >
                  Coba Lagi
                </button>
              </div>
            ) : !data ? (
              <div className="text-center py-20">
                <p className="text-gray-500">Data tidak ditemukan</p>
              </div>
            ) : (
              <>
            

            {/* Detail Card */}
            <div 
              className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6"
              style={{ boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D' }}
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-end relative">
                  <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 text-[#397789]"><FiMoreVertical /></button>
                  {menuOpen && (
                    <div className="absolute top-8 right-0 w-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-20">
                      <button onClick={() => { router.push(`/orang-tua/edit/${parentId}`); setMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">Edit</button>
                      <button onClick={() => { setMenuOpen(false); setShowDelete(true); }} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">Hapus</button>
                    </div>
                  )}
                </div>

                {/* Father */}
                <SectionTitle title="Identitas Ayah" />
                <IdentityRow
                  image={data.father.image}
                  name={data.father.name}
                  nik={data.father.nik}
                  phone={data.father.phone}
                  birthPlace={data.father.birthPlace}
                  birthDate={data.father.birthDate}
                  subject="Ayah"
                />

                {/* Mother */}
                <div className="mt-4 sm:mt-6">
                  <SectionTitle title="Identitas Ibu" />
                  <IdentityRow
                    image={data.mother.image}
                    name={data.mother.name}
                    nik={data.mother.nik}
                    phone={data.mother.phone}
                    birthPlace={data.mother.birthPlace}
                    birthDate={data.mother.birthDate}
                    subject="Ibu"
                  />
                </div>

                {/* Family */}
                <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <div className="text-base sm:text-lg font-semibold text-gray-700 mb-2">Identitas Keluarga</div>
                    <div className="mb-2">
                      <div className="text-sm sm:text-base text-gray-500">No KK</div>
                      <div className="text-lg sm:text-xl font-semibold text-gray-800">{data.family.kk}</div>
                    </div>
                  </div>
                  <div>
                    <div className="h-[22px]" />
                    <div className="mb-2">
                      <div className="text-sm sm:text-base text-gray-500">Jumlah Anak</div>
                      <div className="text-lg sm:text-xl font-semibold text-gray-800">{`${data.family.childrenCount} Anak`}</div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <SectionTitle title="Alamat Rumah" />
                    <KeyValue label="Provinsi" value={data.address.provinsi} />
                    <KeyValue label="Kecamatan" value={data.address.kecamatan} />
                    <KeyValue label="Detail Jalan" value={data.address.detail} />
                  </div>
                  <div>
                    <div className="h-[22px]" />
                    <KeyValue label="Kota/Kabupaten" value={data.address.kota} />
                    <KeyValue label="Desa" value={data.address.desa} />
                    <KeyValue label="Kode Pos" value={data.address.kodePos} />
                  </div>
                </div>
              </div>
            </div>

            {/* Children Card */}
            <div 
              className="bg-white rounded-xl border border-gray-200 shadow-sm"
              style={{ boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D' }}
            >
              <div className="p-4 flex items-center justify-between">
                <div className="font-semibold text-gray-700 text-lg">Anak</div>
                <button onClick={() => setShowAddChild(true)} className="px-4 py-2 rounded-full bg-[#407A81] text-white text-sm hover:bg-[#326269]">Tambah Anak</button>
              </div>
              <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                {data?.children && data.children.length > 0 ? (
                  data.children.map((c: any) => (
                  <div
                    key={c.id}
                    className="relative rounded-md border border-gray-200 bg-white px-3 py-3 cursor-pointer hover:border-[#407A81]"
                    style={{ boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D' }}
                    onClick={() => router.push(`/anak/${c.nik}`)}
                  >
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      onClick={(e) => { e.stopPropagation(); setChildMenuOpenId(childMenuOpenId === c.id ? null : c.id); }}
                    >
                      <FiMoreVertical />
                    </button>
                    {childMenuOpenId === c.id && (
                      <div className="absolute right-2 top-8 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20 overflow-hidden">
                        <button
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setChildMenuOpenId(null); 
                            router.push(`/anak/edit/${c.nik}`);
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setChildMenuOpenId(null); setChildDeleteId(c.id); }}
                          className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#E5F3F5] flex items-center justify-center text-[#397789]">
                        {c.avatar && c.avatar !== '/image/icon/bayi-icon.svg' ? (
                          <img 
                            src={c.avatar} 
                            alt={c.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.removeAttribute('style');
                            }}
                          />
                        ) : null}
                        <svg 
                          width="28" 
                          height="28" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className={c.avatar && c.avatar !== '/image/icon/bayi-icon.svg' ? 'hidden' : ''}
                        >
                          <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8Z" fill="#397789"/>
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 text-lg leading-tight truncate">{c.name}</div>
                        <div className="text-xs text-[#407A81]">{c.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
                        <div className="text-xs text-gray-500">Umur: {formatAge(c.ageYears || 0, c.ageMonths || 0)}</div>
                      </div>
                    </div>
                  </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <div className="text-gray-400">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-3">
                        <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <p className="text-gray-500 text-base">Tidak Ada Anak</p>
                    <p className="text-gray-400 text-sm mt-1">Belum ada data anak yang terdaftar</p>
                  </div>
                )}
              </div>
            </div>
            {/* Child delete confirm */}
            {childDeleteId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setChildDeleteId(null)} />
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                  <div className="text-center text-lg font-semibold text-gray-900 mb-4">Hapus anak ini?</div>
                  <div className="space-y-3">
                    <button onClick={() => { console.log('hapus anak', childDeleteId); setChildDeleteId(null); }} className="w-full px-4 py-2 rounded-full bg-[#407A81] text-white hover:bg-[#326269]">Hapus</button>
                    <button onClick={() => setChildDeleteId(null)} className="w-full px-4 py-2 rounded-full border-2 border-[#407A81] text-[#407A81] hover:bg-[#E7F5F7]">Batalkan</button>
                  </div>
                </div>
              </div>
            )}
            {/* Add Child Modal */}
              {showAddChild && (
              <div className="fixed inset-0 z-50 overflow-y-auto px-4 py-20">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddChild(false)} />
                <div className="relative mx-auto bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-4 md:p-6">
                  <div className="text-center text-lg font-semibold mb-3">Tambah Anak</div>
                  <div className="flex items-center justify-center mb-4">
                    <label className="cursor-pointer">
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setChildForm((prev) => ({ ...prev, photo: url }));
                        }
                      }} />
                      <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden ring-2 ring-white">
                        {childForm.photo ? (
                          <img src={childForm.photo} alt="foto anak" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Foto</div>
                        )}
                      </div>
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-1.5">Identitas Anak</div>
                      <InputField label="Nama Anak" value={childForm.name} onChange={(v) => setChildForm((p) => ({ ...p, name: v }))} />
                      <InputField label="Tempat Lahir" value={childForm.tempat} onChange={(v) => setChildForm((p) => ({ ...p, tempat: v }))} />
                      <div className="grid grid-cols-2 gap-2.5">
                        <InputField label="Usia Bayi saat ini" value={childForm.age} onChange={(v) => setChildForm((p) => ({ ...p, age: v }))} />
                        <div className="mb-2">
                          <div className="text-[11px] text-gray-500 mb-1">Satuan</div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setChildForm((p) => ({ ...p, unit: 'bulan' }))} className={`px-2.5 py-1.5 rounded-md border text-sm ${childForm.unit === 'bulan' ? 'bg-[#E7F5F7] border-[#407A81] text-[#407A81]' : 'bg-white border-gray-300 text-gray-600'}`}>Bulan</button>
                            <button onClick={() => setChildForm((p) => ({ ...p, unit: 'tahun' }))} className={`px-2.5 py-1.5 rounded-md border text-sm ${childForm.unit === 'tahun' ? 'bg-[#E7F5F7] border-[#407A81] text-[#407A81]' : 'bg-white border-gray-300 text-gray-600'}`}>Tahun</button>
                          </div>
                        </div>
                      </div>
                      <InputField label="Anak Ke-" value={childForm.order} onChange={(v) => setChildForm((p) => ({ ...p, order: v }))} />
                    </div>
                    <div>
                      <div className="h-[18px]" />
                      <InputField label="NIK Anak" value={childForm.nik} onChange={(v) => setChildForm((p) => ({ ...p, nik: v }))} />
                      <InputField label="Tanggal Lahir" value={childForm.tgl} onChange={(v) => setChildForm((p) => ({ ...p, tgl: v }))} />
                      <div className="mb-2">
                        <div className="text-[11px] text-gray-500 mb-1">Jenis Kelamin</div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setChildForm((p) => ({ ...p, gender: 'L' }))} className={`px-2.5 py-1.5 rounded-md border text-sm ${childForm.gender === 'L' ? 'bg-[#E7F5F7] border-[#407A81] text-[#407A81]' : 'bg-white border-gray-300 text-gray-600'}`}>Laki Laki</button>
                          <button onClick={() => setChildForm((p) => ({ ...p, gender: 'P' }))} className={`px-2.5 py-1.5 rounded-md border text-sm ${childForm.gender === 'P' ? 'bg-[#E7F5F7] border-[#407A81] text-[#407A81]' : 'bg-white border-gray-300 text-gray-600'}`}>Perempuan</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-xs font-semibold text-gray-600 mb-2">Data Timbangan saat Lahir</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Berat Badan Lahir" value={childForm.berat} onChange={(v) => setChildForm((p) => ({ ...p, berat: v }))} />
                      <InputField label="Tinggi Badan Lahir" value={childForm.tinggi} onChange={(v) => setChildForm((p) => ({ ...p, tinggi: v }))} />
                    </div>
                    <InputField label="Lingkar Kepala Lahir" value={childForm.lingkar} onChange={(v) => setChildForm((p) => ({ ...p, lingkar: v }))} />
                  </div>
                  <div className="mt-5 flex items-center justify-center gap-2.5">
                    <button onClick={() => setShowAddChild(false)} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">Batal</button>
                    <button onClick={() => setShowAddChild(false)} className="px-4 py-2 rounded-md bg-[#407A81] text-white hover:bg-[#326269]">Tambah Anak</button>
                  </div>
                </div>
              </div>
            )}
            {/* Delete confirm modal */}
            {showDelete && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDelete(false)} />
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                  <div className="text-center text-lg font-semibold text-gray-900 mb-4">Apakah anda yakin ingin menghapusnya?</div>
                  <div className="space-y-3">
                    <button onClick={() => { setShowDelete(false); console.log('hapus orang tua'); }} className="w-full px-4 py-2 rounded-full bg-[#407A81] text-white hover:bg-[#326269]">Hapus</button>
                    <button onClick={() => setShowDelete(false)} className="w-full px-4 py-2 rounded-full border-2 border-[#407A81] text-[#407A81] hover:bg-[#E7F5F7]">Batalkan</button>
                  </div>
                </div>
              </div>
            )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <div className="text-sm sm:text-xs font-semibold text-gray-600 mb-2">{title}</div>;
}

function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2">
      <div className="text-xs sm:text-[11px] text-gray-500">{label}</div>
      <div className="text-base sm:text-sm text-gray-800">{value || 'Tidak ada'}</div>
    </div>
  );
}

function InputField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-2">
      <div className="text-[11px] text-gray-500 mb-1">{label}</div>
      <input 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#9ECAD6] focus:border-transparent text-sm" 
      />
    </div>
  );
}



function IdentityRow({ image, name, nik, phone, birthPlace, birthDate, subject }: { image: string; name: string; nik: string; phone: string; birthPlace: string; birthDate: string; subject?: 'Ayah' | 'Ibu'; }) {
  // Only clean name if it's not "Tidak ada"
  const cleanedName = name === 'Tidak ada' ? name : name.replace(/^(Bapak|Ibu)\s+/i, '').trim();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 items-start">
      {/* Left: Photo + helper (only when editing) + phone */}
      <div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 relative rounded-2xl overflow-hidden bg-[#E5F3F5] flex items-center justify-center text-[#397789]">
            {image && image !== '/image/icon/pengukuran-anak.jpg' ? (
              <img 
                src={image} 
                alt={name} 
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.removeAttribute('style');
                }}
              />
            ) : null}
            <svg 
              width="36" 
              height="36" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={image && image !== '/image/icon/pengukuran-anak.jpg' ? 'hidden' : ''}
            >
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8Z" fill="#397789"/>
            </svg>
          </div>
          {/* Header beside image */}
          <div className="min-w-0">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight truncate">
              {cleanedName === 'Tidak ada' 
                ? `${subject === 'Ibu' ? 'Ibu' : 'Bapak'} Tidak Ada`
                : `${subject === 'Ibu' ? 'Ibu' : 'Bapak'} ${cleanedName.split(/\s+/)[0]}`
              }
            </div>
            <div className="text-xs sm:text-sm text-[#397789] mt-1 truncate">No Telepon: {phone || 'Tidak ada'}</div>
          </div>

        </div>


      </div>

      {/* Right / Details column (view: empty spacer) */}
      <div className="-ml-1 sm:-ml-2 md:-ml-4 lg:-ml-6">
        <div />
      </div>

      {/* Full-width details row */}
      <div className="sm:col-span-2 mt-2 w-full">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-start justify-between w-full">
            <div>
              <div className="text-[11px] sm:text-xs text-gray-500 mb-1">Nama Lengkap</div>
              <div className="text-base sm:text-lg font-semibold text-gray-900">{cleanedName}</div>
            </div>
            <div className="pl-6 text-left lg:w-[360px] xl:w-[420px]">
              <div className="text-[11px] sm:text-xs text-gray-500 mb-1">NIK</div>
              <div className="text-base sm:text-lg font-semibold text-gray-900">{nik || 'Tidak ada'}</div>
            </div>
          </div>
          <div className="flex items-start justify-between w-full">
            <div>
              <div className="text-[11px] sm:text-xs text-gray-500 mb-1">Tempat Lahir</div>
              <div className="text-base sm:text-lg font-semibold text-gray-900">{birthPlace || 'Tidak ada'}</div>
            </div>
            <div className="pl-6 text-left lg:w-[360px] xl:w-[420px]">
              <div className="text-[11px] sm:text-xs text-gray-500 mb-1">Tanggal Lahir</div>
              <div className="text-base sm:text-lg font-semibold text-gray-900">{birthDate || 'Tidak ada'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


