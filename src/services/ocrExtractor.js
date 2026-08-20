import { createWorker } from 'tesseract.js';

/**
 * Extracts text from an image file using Tesseract OCR.
 * 
 * @param {File} file - Image file object (.png, .jpg, .jpeg, .webp)
 * @param {Function} onProgress - Optional callback for tracking OCR percentage
 * @returns {Promise<{ text: string }>}
 */
export async function extractTextFromImage(file, onProgress = () => {}) {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (!file || !validTypes.includes(file.type)) {
    throw new Error('Invalid image file format. Supported types are PNG, JPG, JPEG, and WEBP.');
  }

  let worker = null;
  try {
    worker = await createWorker('eng', 1, {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          const progressPercentage = Math.round((m.progress || 0) * 100);
          onProgress({
            status: 'Recognizing text via OCR...',
            progress: progressPercentage
          });
        } else if (m.status) {
          onProgress({
            status: `OCR Setup: ${m.status}`,
            progress: 10
          });
        }
      }
    });

    const imageUrl = URL.createObjectURL(file);
    const ret = await worker.recognize(imageUrl);
    URL.revokeObjectURL(imageUrl);

    await worker.terminate();

    const extractedText = ret.data.text ? ret.data.text.trim() : '';

    if (!extractedText) {
      throw new Error('OCR did not detect any readable text in the provided image.');
    }

    return { text: extractedText };
  } catch (error) {
    if (worker) {
      try {
        await worker.terminate();
      } catch (e) {
        // Ignore cleanup errors
      }
    }
    throw new Error(`OCR processing failed: ${error.message || 'Unable to extract text from image.'}`);
  }
}
