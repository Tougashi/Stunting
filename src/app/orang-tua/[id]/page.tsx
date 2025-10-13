'use client';

import React, { useMemo, useState } from 'react';
import { Layout } from '@/components';
import Link from 'next/link';
import Image from 'next/image';
import { FiMoreVertical } from 'react-icons/fi';

export default function OrangTuaDetailPage() {
  const parent = {
    father: {
      name: 'Mustafa',
      nik: '002211102131223',
      phone: '0851 1234 1234',
      birthPlace: 'Garut',
      birthDate: '11/02/1990',
      image: '/image/icon/pengukuran-anak.jpg',
    },
    mother: {
      name: 'Ibu Aisyah',
      nik: '002211102131223',
      phone: '0851 1234 1234',
      birthPlace: 'Garut',
      birthDate: '11/02/1999',
      image: '/image/icon/pengukuran-anak.jpg',
    },
    family: {
      kk: '002211102131223',
      childrenCount: 2,
    },
    address: {
      provinsi: 'Jawa Barat',
      kota: 'Kota Tasikmalaya',
      kecamatan: 'Taman Sari',
      desa: 'Tamansjaya',
      kodePos: '4645',
      detail: 'Jl. Tamansjaya',
    },
    children: [
      { id: '1', name: 'Emma Jhon', avatar: '/image/icon/bayi-icon.svg' },
      { id: '2', name: 'Siti Rosidah', avatar: '/image/icon/bayi-icon.svg' },
      { id: '3', name: 'Rehand', avatar: '/image/icon/bayi-icon.svg' },
    ],
  };

  const initialData = useMemo(() => parent, []);
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAddChild, setShowAddChild] = useState(false);
  const [childForm, setChildForm] = useState({
    name: '', nik: '', tempat: '', tgl: '', age: '', unit: 'bulan', order: '', gender: 'L', berat: '', tinggi: '', lingkar: '', photo: '' as string | null,
  });
  const [showDelete, setShowDelete] = useState(false);

  const update = (path: string, value: string | number) => {
    setData((prev) => {
      const next: any = { ...prev };
      const keys = path.split('.');
      let cur: any = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = { ...cur[keys[i]] };
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const handleSave = () => {
    console.log('Save parent data', data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setData(initialData);
    setIsEditing(false);
  };

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
            <Link href="/orang-tua" className="mb-4 inline-flex items-center gap-2 text-lg  md:text-2xl text-[#397789] hover:underline">
              <span>&lt;</span>
              <span>Orang Tua</span>
            </Link>
            <div className="text-center text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-700 mb-4">Profile Orang Tua</div>

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
                      <button onClick={() => { setIsEditing(true); setMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">Edit</button>
                      <button onClick={() => { setMenuOpen(false); setShowDelete(true); }} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">Hapus</button>
                    </div>
                  )}
                </div>

                {/* Father */}
                <SectionTitle title="Identitas Ayah" />
                <IdentityRow
                  editing={isEditing}
                  image={data.father.image}
                  name={data.father.name}
                  nik={data.father.nik}
                  phone={data.father.phone}
                  birthPlace={data.father.birthPlace}
                  birthDate={data.father.birthDate}
                  subject="Ayah"
                  onChange={(field, val) => update(`father.${field}`, val)}
                />

                {/* Mother */}
                <div className="mt-4 sm:mt-6">
                  <SectionTitle title="Identitas Ibu" />
                  <IdentityRow
                    editing={isEditing}
                    image={data.mother.image}
                    name={data.mother.name}
                    nik={data.mother.nik}
                    phone={data.mother.phone}
                    birthPlace={data.mother.birthPlace}
                    birthDate={data.mother.birthDate}
                    subject="Ibu"
                    onChange={(field, val) => update(`mother.${field}`, val)}
                  />
                </div>

                {/* Family */}
                <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                <SectionTitle title="Identitas Keluarga" />
                    {isEditing ? (
                  <InputField label="NIK Keluarga" value={data.family.kk} onChange={(v) => update('family.kk', v)} />
                    ) : (
                  <div className="mb-2">
                    <div className="text-sm sm:text-base text-gray-500">NIK Keluarga</div>
                    <div className="text-lg sm:text-xl font-semibold text-gray-800">{data.family.kk}</div>
                  </div>
                    )}
                  </div>
                  <div>
                    <div className="h-[22px]" />
                    {isEditing ? (
                  <InputField label="Jumlah Anak" value={String(data.family.childrenCount)} onChange={(v) => update('family.childrenCount', Number(v))} />
                    ) : (
                  <div className="mb-2">
                    <div className="text-sm sm:text-base text-gray-500">Jumlah Anak</div>
                    <div className="text-lg sm:text-xl font-semibold text-gray-800">{`${data.family.childrenCount} Anak`}</div>
                  </div>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <SectionTitle title="Alamat Rumah" />
                    {isEditing ? (
                      <>
                        <InputField label="Provinsi" value={data.address.provinsi} onChange={(v) => update('address.provinsi', v)} />
                        <InputField label="Kecamatan" value={data.address.kecamatan} onChange={(v) => update('address.kecamatan', v)} />
                        <InputField label="Detail Jalan" value={data.address.detail} onChange={(v) => update('address.detail', v)} />
                      </>
                    ) : (
                      <>
                        <KeyValue label="Provinsi" value={data.address.provinsi} />
                        <KeyValue label="Kecamatan" value={data.address.kecamatan} />
                        <KeyValue label="Detail Jalan" value={data.address.detail} />
                      </>
                    )}
                  </div>
                  <div>
                    <div className="h-[22px]" />
                    {isEditing ? (
                      <>
                        <InputField label="Kota/Kabupaten" value={data.address.kota} onChange={(v) => update('address.kota', v)} />
                        <InputField label="Desa" value={data.address.desa} onChange={(v) => update('address.desa', v)} />
                        <InputField label="Kode Pos" value={data.address.kodePos} onChange={(v) => update('address.kodePos', v)} />
                      </>
                    ) : (
                      <>
                        <KeyValue label="Kota/Kabupaten" value={data.address.kota} />
                        <KeyValue label="Desa" value={data.address.desa} />
                        <KeyValue label="Kode Pos" value={data.address.kodePos} />
                      </>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex items-center justify-end gap-3">
                    <button onClick={handleCancel} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">Batal</button>
                    <button onClick={handleSave} className="px-4 py-2 rounded-md bg-[#407A81] text-white hover:bg-[#326269]">Simpan</button>
                  </div>
                )}
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
                {parent.children.map((c) => (
                  <div key={c.id} className="relative rounded-md border border-gray-200 bg-white px-3 py-3" style={{ boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D' }}>
                    <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"><FiMoreVertical /></button>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#E5F3F5] flex items-center justify-center text-[#397789]">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8Z" fill="#397789"/>
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 text-lg leading-tight truncate">{c.name}</div>
                        <div className="text-xs text-[#407A81]">Laki Laki</div>
                        <div className="text-xs text-gray-500">Umur: 2 Tahun</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
      <div className="text-base sm:text-sm text-gray-800">{value}</div>
    </div>
  );
}

function InputField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-2">
      <div className="text-xs sm:text-[11px] text-gray-500 mb-1">{label}</div>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#9ECAD6] focus:border-transparent text-base sm:text-sm" />
    </div>
  );
}

function IdentityRow({ editing = false, image, name, nik, phone, birthPlace, birthDate, subject, onChange }: { editing?: boolean; image: string; name: string; nik: string; phone: string; birthPlace: string; birthDate: string; subject?: 'Ayah' | 'Ibu'; onChange?: (field: string, value: string) => void; }) {
  const cleanedName = name.replace(/^(Bapak|Ibu)\s+/i, '').trim();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 items-start">
      {/* Left: Photo + helper (only when editing) + phone */}
      <div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`${editing ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32'} relative rounded-2xl overflow-hidden bg-[#E5F3F5] flex items-center justify-center text-[#397789]`}>
            {editing && image && image.startsWith('blob:') ? (
              <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8Z" fill="#397789"/>
              </svg>
            )}
          </div>
          {/* Header beside image in view mode */}
          {!editing && (
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight truncate">{subject === 'Ibu' ? 'Ibu' : 'Bapak'} {cleanedName.split(/\s+/)[0]}</div>
              <div className="text-xs sm:text-sm text-[#397789] mt-1 truncate">No Telepon: {phone}</div>
            </div>
          )}
          {editing && (
            <div className="text-xs sm:text-[11px] text-gray-500 leading-4">
              <div className="font-semibold">Upload Foto {subject}</div>
              <div>Profile Picture should be in the standard</div>
              <div>format png, jpg & no more than 2MB</div>
            </div>
          )}
        </div>

        {/* Upload control only when editing */}
        {editing && (
          <div className="mt-3">
            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer text-sm">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    // update preview image
                    onChange && onChange('image', url);
                  }
                }}
              />
              <span>Pilih Foto</span>
            </label>
          </div>
        )}

        {editing ? (
          <>
            <div className="mt-3 sm:mt-4">
              <InputField label={`Nomor Telepon ${subject}`} value={phone} onChange={(v) => onChange && onChange('phone', v)} />
            </div>
            <div className="mt-2">
              <InputField label="Tempat Lahir" value={birthPlace} onChange={(v) => onChange && onChange('birthPlace', v)} />
            </div>
          </>
        ) : null}
      </div>

      {/* Right / Details column (view: empty spacer) */}
      <div className="-ml-1 sm:-ml-2 md:-ml-4 lg:-ml-6">
        {editing ? (
          <>
            <InputField label="Nama Lengkap" value={name} onChange={(v) => onChange && onChange('name', v)} />
            <InputField label="NIK" value={nik} onChange={(v) => onChange && onChange('nik', v)} />
            <div className="mb-2">
              <div className="text-xs sm:text-[11px] text-gray-500 mb-1">Tanggal Lahir</div>
              <input value={birthDate} onChange={(e) => onChange && onChange('birthDate', e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#9ECAD6] focus:border-transparent text-base sm:text-sm" />
            </div>
          </>
        ) : (
          <div />
        )}
      </div>

      {/* Full-width details row (view mode) */}
      {!editing && (
        <div className="sm:col-span-2 mt-2 w-full">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start justify-between w-full">
              <div>
                <div className="text-[11px] sm:text-xs text-gray-500 mb-1">Nama Lengkap</div>
                <div className="text-base sm:text-lg font-semibold text-gray-900">{cleanedName}</div>
              </div>
              <div className="pl-6 text-left lg:w-[360px] xl:w-[420px]">
                <div className="text-[11px] sm:text-xs text-gray-500 mb-1">NIK</div>
                <div className="text-base sm:text-lg font-semibold text-gray-900">{nik}</div>
              </div>
            </div>
            <div className="flex items-start justify-between w-full">
              <div>
                <div className="text-[11px] sm:text-xs text-gray-500 mb-1">Tempat Lahir</div>
                <div className="text-base sm:text-lg font-semibold text-gray-900">{birthPlace}</div>
              </div>
              <div className="pl-6 text-left lg:w-[360px] xl:w-[420px]">
                <div className="text-[11px] sm:text-xs text-gray-500 mb-1">Tanggal Lahir</div>
                <div className="text-base sm:text-lg font-semibold text-gray-900">{birthDate}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


