import html2pdf from 'html2pdf.js';
import { Profile } from '../types';

export async function exportToPDF(elementId: string, filename = 'CV.pdf') {
  const element = document.getElementById(elementId);
  if (!element) return;

  await html2pdf()
    .set({
      margin: 10,
      filename,
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    })
    .from(element)
    .save();
}

export function exportToJSON(profile: Profile, filename = 'perfil-cv.json') {
  const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
