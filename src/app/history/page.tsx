import { Layout } from '@/components';

export default function HistoryPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-8 text-center">
            Riwayat Deteksi
          </h1>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-center py-12">
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada riwayat deteksi</h3>
                <p className="text-gray-500 mb-4">Mulai deteksi stunting untuk melihat riwayat di sini</p>
                <button className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-full hover:bg-[#2c5d6b] transition-colors">
                  Mulai Deteksi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
