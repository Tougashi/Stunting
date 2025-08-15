import { Layout } from '@/components';

export default function ScanPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-8">
            Scan Stunting Detection
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Upload foto anak atau gunakan kamera untuk deteksi stunting secara otomatis
          </p>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-lg font-medium text-gray-900 mb-2">Upload foto anak</p>
                <p className="text-gray-500 mb-4">atau seret dan lepas di sini</p>
                <button className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-full hover:bg-[#2c5d6b] transition-colors">
                  Pilih File
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
