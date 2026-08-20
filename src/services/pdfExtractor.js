import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker using unpkg CDN matching the library version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

/**
 * Extracts raw text from a PDF file.
 * Reads all pages and preserves paragraph breaks.
 * 
 * @param {File} file - PDF file object
 * @returns {Promise<{ text: string, totalPages: number }>}
 */
export async function extractTextFromPdf(file) {
  if (!file || file.type !== 'application/pdf') {
    throw new Error('Invalid file format. Please upload a valid PDF document.');
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDocument = await loadingTask.promise;

    const totalPages = pdfDocument.numPages;
    let fullText = '';

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();

      let lastY = null;
      let pageText = '';

      for (const item of textContent.items) {
        // Detect vertical line break to preserve paragraph structure
        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
          pageText += '\n';
        }
        pageText += item.str + ' ';
        lastY = item.transform[5];
      }

      fullText += pageText.trim() + '\n\n';
    }

    const cleanedText = fullText.trim();
    if (!cleanedText) {
      throw new Error('No readable text found in the PDF. The file may be empty or contain only scanned images without OCR.');
    }

    return {
      text: cleanedText,
      totalPages
    };
  } catch (error) {
    if (error.message && error.message.includes('No readable text')) {
      throw error;
    }
    throw new Error(`PDF Extraction failed: ${error.message || 'Unable to parse PDF document.'}`);
  }
}
