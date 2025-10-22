
import React, { useState } from 'react';
import type { SermonRequest } from '../types';

interface Props {
  onGenerate: (request: SermonRequest) => void;
  isLoading: boolean;
}

const SermonGeneratorForm: React.FC<Props> = ({ onGenerate, isLoading }) => {
  const initialTopic = `وَالتَّصَوُّفُ يَدْعُو إِلَى تَخْلِيَةِ الْقَلْبِ مِنَ الرَّذَائِلِ وَتَحْلِيَتِهِ بِالْفَضَائِلِ، وَعِنْدَئِذٍ تَسْتَوْلِي عَلَيْهِ الْأَنْوَارُ الْقُدْسِيَّةُ، فَيَتَعَلَّقُ بِاللّٰهِ وَيُؤْثِرُهُ سُبْحَانَهُ عَلَى هَوَاهُ وَعَلَى كُلِّ مَا سِوَاهُ لِأَنَّهُ جَلَّ جَلَالُهُ وَعَزَّ شَأْنُهُ هُوَ الْمَطْلُوبُ وَالْمَرْغُوبُ وَالْمَحْبُوبُ، مِنْهُ ابْتِدَاؤُنَا وَإِلَيْهِ انْتِهَاؤُنَا. 

Tasawuf mengajak kepada pengosongan hati dari segala keburukan/kerendahan dan penghiasan hati dengan segala keutamaan, dan pada saat itulah cahaya-cahaya suci akan menguasainya, sehingga ia bergantung kepada Allah dan mengutamakan-Nya –Mahasuci Dia– di atas hawa nafsunya dan di atas segala sesuatu selain-Nya karena Dia –Maha Agung keagungan-Nya dan Maha Mulia kedudukan-Nya– adalah yang dicari, yang diinginkan dan yang dicintai, dari-Nya permulaan kita dan kepada-Nya akhir kita.`;

  const [formData, setFormData] = useState<SermonRequest>({
    topic: initialTopic,
    persona: 'Almarhum K.H. Zainuddin M.Z.',
    audience: 'Murid tarekat yang mengetahui dasar tasawuf',
    duration: '30 menit',
    goal: 'Mendorong audiens untuk selalu hidup bertujuan hanya kepada Allah SWT dan mencari ridla Allah SWT dalam rangka mahabbah dan makrifat kepada-Nya.',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const Label: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-amber-300 mb-2">{children}</label>
  );

  const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input {...props} className={`w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${props.className}`} />
  );
  
  const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
    <textarea {...props} className={`w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${props.className}`} />
  );

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
      <h2 className="text-2xl font-bold text-amber-400 mb-6">Parameter Ceramah</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="topic">Topik Utama</Label>
          <TextArea 
            id="topic" 
            name="topic" 
            rows={10} 
            value={formData.topic} 
            onChange={handleChange}
            placeholder="Masukkan kutipan, ide, atau tema utama di sini..."
          />
        </div>
        <div>
          <Label htmlFor="persona">Persona Penceramah</Label>
          <Input 
            type="text" 
            id="persona" 
            name="persona" 
            value={formData.persona} 
            onChange={handleChange}
            placeholder="Contoh: K.H. Zainuddin M.Z."
          />
        </div>
        <div>
          <Label htmlFor="audience">Target Audiens</Label>
          <Input 
            type="text" 
            id="audience" 
            name="audience" 
            value={formData.audience} 
            onChange={handleChange}
            placeholder="Contoh: Generasi milenial, jamaah pengajian"
          />
        </div>
        <div>
          <Label htmlFor="duration">Durasi Penyampaian</Label>
          <Input 
            type="text" 
            id="duration" 
            name="duration" 
            value={formData.duration} 
            onChange={handleChange}
            placeholder="Contoh: 15 menit, 1 jam"
          />
        </div>
        <div>
          <Label htmlFor="goal">Tujuan / Aksi yang Diharapkan</Label>
          <TextArea 
            id="goal" 
            name="goal" 
            rows={3}
            value={formData.goal} 
            onChange={handleChange}
            placeholder="Apa yang Anda ingin audiens lakukan setelah mendengar ceramah?"
          />
        </div>
        <div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out disabled:bg-amber-800 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Memproses...</span>
              </>
            ) : (
                <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11.983 1.907a.75.75 0 00-1.966 0l-7.25 4.5A.75.75 0 002 7.25v5.5a.75.75 0 00.767.744l7.25 1.25a.75.75 0 00.466 0l7.25-1.25A.75.75 0 0018 12.75v-5.5a.75.75 0 00-.767-.744l-7.25-4.5zM12.5 13.389l-5-1.042V8.652l5 1.042v3.695zM3.5 7.828l6-3.75v10.844l-6-1.25V7.828zM16.5 7.828v4.344l-6 1.25V4.078l6 3.75z" />
                </svg>
                <span>Buat Naskah Ceramah</span>
                </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SermonGeneratorForm;
