
import React, { useState } from 'react';
import type { SermonRequest } from './types';
import { generateSermon } from './services/geminiService';
import SermonGeneratorForm from './components/SermonGeneratorForm';
import SermonDisplay from './components/SermonDisplay';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sermon, setSermon] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleGenerateSermon = async (request: SermonRequest) => {
    setIsLoading(true);
    setSermon('');
    setError('');
    try {
      const result = await generateSermon(request);
      setSermon(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="lg:pr-6">
            <SermonGeneratorForm onGenerate={handleGenerateSermon} isLoading={isLoading} />
          </div>
          <div className="lg:pl-6">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold text-amber-400 mb-4">Naskah Dihasilkan</h2>
              <div className="bg-gray-800 rounded-lg p-6 h-[75vh] overflow-y-auto border border-gray-700 shadow-lg">
                {isLoading && <LoadingSpinner />}
                {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-md">{error}</div>}
                {!isLoading && !error && sermon && <SermonDisplay content={sermon} />}
                {!isLoading && !error && !sermon && (
                  <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>Naskah pidato Anda akan muncul di sini setelah dibuat.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
