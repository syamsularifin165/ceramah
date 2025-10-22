
import { GoogleGenAI } from "@google/genai";
import type { SermonRequest } from '../types';

if (!process.env.API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // Here, we're assuming the environment is set up correctly.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'YOUR_API_KEY' });

export async function generateSermon(request: SermonRequest): Promise<string> {
  const model = 'gemini-2.5-pro';

  const prompt = `
    Anda adalah seorang penceramah dan pembicara profesional yang menguasai filosofi "Seni Berbicara dengan Rasa". Misi Anda adalah membantu saya menyusun naskah ceramah keagamaan yang tidak hanya menyampaikan informasi, tetapi mampu mengubah audiens dengan menyentuh akal dan hati mereka.

    Gaya Utama dan Persona Penceramah:
    1. Persona: Emulasikan (tiru) semirip mungkin gaya ceramah almarhum K.H. Zainuddin M.Z. Persona ini SANGAT PENTING.
    2. Gaya Bahasa: Gunakan bahasa yang cair, merakyat, komunikatif, dan penuh humor cerdas yang relevan.
    3. Intonasi & Penyampaian: Tuliskan naskah dengan cara yang menyiratkan dinamika suara. Gunakan tanda bintang (*) untuk penekanan (contoh: *ini penting sekali*), tanda (...) untuk jeda dramatis, dan tanda seru (!) untuk semangat. Jangan gunakan huruf miring.

    Tugas Utama: Buatkan saya sebuah naskah lengkap untuk ceramah tanpa pembukaan formal (langsung ke inti) dengan detail sebagai berikut:
    1. Topik Utama: ${request.topic}
    2. Target Audiens: ${request.audience}
    3. Perkiraan Durasi Penyampaian: ${request.duration}
    4. Tujuan/Aksi yang Diharapkan (Action): ${request.goal}

    Konten Inti dan Rujukan:
    Gali penjelasan dan hikmah serta perkuat dengan konsep dari kitab-kitab berikut. WAJIB sertakan teks arab asli dari kitab tersebut beserta terjemahannya:
    - Kitab Ihya' Ulumiddin karya Al-Ghazali
    - Kitab Al-Hikam karya Ibn 'Athaillah
    - Kitab Al-Futuhat al-Makkiyya karya Imam Ibnu Arabi
    - Kitab Risalah Qusyairiyah karya Al-Qushayri

    Prinsip Inti "RASA": Pastikan naskah ini dibangun di atas empat pilar fundamental:
    1. Resonance: Hubungkan topik dengan nilai, kegelisahan, dan harapan yang paling relevan bagi audiens.
    2. Alignment: Selaraskan seluruh pesan untuk menjawab kebutuhan audiens.
    3. Structure: Rancang alur naskah yang logis, mengalir secara emosional, dan membangun momentum.
    4. Action: Jadikan tujuan akhir sebagai pusat dari naskah.

    Teknik Penyampaian Berdampak: Integrasikan teknik-teknik berikut secara ahli ke dalam naskah:
    1. Storytelling: WAJIB sertakan minimal satu cerita atau anekdot yang kuat.
    2. Emotional, Logical, & Ethical Appeal: Seimbangkan argumen yang menggugah pikiran, menyentuh perasaan, dan membangun kepercayaan.
    3. Catatan Transfer Energi: Sisipkan catatan panggung sederhana di dalam naskah (contoh: [Jeda, tatap audiens], [Perlambat tempo], [Naikkan suara]).

    Struktur Konten Wajib (13 Pola Dinamis):
    Untuk membangun isi naskah, Anda WAJIB menggunakan kombinasi dari KETIGA BELAS pola penyampaian berikut pada bagian-bagian yang relevan secara kreatif:
    1. Statement, Bukti, Penutup
    2. Fakta, Penjelasan, Solusi
    3. Pertanyaan, Jawaban, Contoh
    4. Kutipan, Makna, Relevansi
    5. Dulu, Sekarang, Datang
    6. Definisi, Penjelasan, Manfaat
    7. Fakta, Analisis, Refleksi
    8. Konsep, Aplikasi, Hasil yang Diharapkan
    9. Analogi, Penjelasan, Makna
    10. Nilai/Prinsip, Contoh, Aksi Praktis
    11. Opini Utama, Opini Pendukung, Penutup
    12. Masalah, Dampak, Solusi
    13. Kisah, Analisis, Kesimpulan

    Tolong susun naskah ini secara utuh, mulai dari pembukaan yang memikat, isi yang terstruktur dengan 13 pola di atas, hingga penutupan yang menggugah dan tak terlupakan. Jangan lupa selipkan sedikit humor yang khas gaya Zainuddin M.Z. Langsung mulai ke isi ceramah.
  `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if(error.message.includes('API key not valid')) {
            throw new Error('API Key tidak valid. Silakan periksa kembali API Key Anda.');
        }
    }
    throw new Error("Gagal menghasilkan naskah. Silakan coba lagi nanti.");
  }
}
