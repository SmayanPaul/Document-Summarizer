import axios from 'axios';

// Default provider configuration
const DEFAULT_PROVIDER = 'gemini';

/**
 * Length instructions for Google Gemini summarization modes
 */
const LENGTH_INSTRUCTIONS = {
  short: 'Provide a concise summary in around 50-80 words.',
  medium: 'Provide a balanced summary in around 150-200 words.',
  long: 'Provide a detailed, thorough summary in around 300-400 words.'
};

/**
 * Provider-agnostic summary service function.
 * UI components call this function without needing knowledge of specific API vendors.
 * 
 * @param {string} text - Extracted document text
 * @param {'short' | 'medium' | 'long'} lengthMode - Summary length preference
 * @param {object} [options] - Provider settings (default: 'gemini')
 * @returns {Promise<{ summary: string, keyPoints: string[], takeaways: string }>}
 */
export async function generateSummary(text, lengthMode = 'medium', options = {}) {
  if (!text || !text.trim()) {
    throw new Error('No document text provided for summarization.');
  }

  const cleanedText = text.trim();
  if (cleanedText.length < 40) {
    throw new Error('Extracted text is too short to generate a summary. Minimum 40 characters required.');
  }

  const provider = options.provider || DEFAULT_PROVIDER;

  switch (provider) {
    case 'gemini':
      return await summarizeWithGemini(cleanedText, lengthMode);
    default:
      throw new Error(`Unsupported AI provider: "${provider}"`);
  }
}

/**
 * Google Gemini Inference Handler using gemini-1.5-flash
 */
async function summarizeWithGemini(text, lengthMode) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_KEY || import.meta.env.VITE_GOOGLE_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error(
      'Gemini API key missing. Please add VITE_GEMINI_API_KEY to your .env file.'
    );
  }

  const lengthPrompt = LENGTH_INSTRUCTIONS[lengthMode] || LENGTH_INSTRUCTIONS.medium;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

  const promptText = `You are an expert document summarizer. Analyze the following document text and produce a structured summary JSON.

Instructions:
1. ${lengthPrompt}
2. Extract 3 to 8 key bullet point highlights from the document.
3. Write 1 single main takeaway sentence.

Output JSON format strictly with the keys:
{
  "summary": "...",
  "keyPoints": ["...", "..."],
  "takeaways": "..."
}

Document Text:
${text.slice(0, 30000)}`;

  try {
    const response = await axios.post(
      endpoint,
      {
        contents: [
          {
            parts: [
              {
                text: promptText
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 40000
      }
    );

    const candidates = response.data?.candidates;
    if (Array.isArray(candidates) && candidates[0]?.content?.parts?.[0]?.text) {
      const jsonText = candidates[0].content.parts[0].text.trim();
      const parsed = JSON.parse(jsonText);

      return {
        summary: parsed.summary || 'Summary unavailable.',
        keyPoints: Array.isArray(parsed.keyPoints) && parsed.keyPoints.length > 0
          ? parsed.keyPoints
          : [parsed.summary || 'No key points extracted.'],
        takeaways: parsed.takeaways || parsed.summary || 'No main takeaway extracted.'
      };
    }

    if (response.data?.error) {
      throw new Error(`Gemini API Error: ${response.data.error.message || response.data.error}`);
    }

    throw new Error('Received an unexpected response structure from Gemini API.');
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 400 && data?.error?.message?.includes('API_KEY')) {
        throw new Error('Invalid Gemini API key in VITE_GEMINI_API_KEY. Please verify your API key in the .env file.');
      }

      if (status === 429) {
        throw new Error('Gemini API quota exceeded or rate limit reached. Please wait a moment before trying again.');
      }

      const message = data?.error?.message || (typeof data === 'string' ? data : error.message);
      throw new Error(`Gemini API Error [HTTP ${status}]: ${message}`);
    }

    if (error.code === 'ECONNABORTED') {
      throw new Error('Summary generation request timed out. The document may be too large or network connection is slow.');
    }

    throw new Error(error.message || 'Failed to connect to Gemini AI service.');
  }
}
