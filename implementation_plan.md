# Implementation Plan - Document Summary Assistant

Build a clean, professional, full-stack frontend-only web application called **Document Summary Assistant** to extract text from PDF files and images (OCR) and generate AI summaries (Short, Medium, Long) with Key Points using Hugging Face inference (`facebook/bart-large-cnn`).

## User Review Required

> [!IMPORTANT]
> - **Git & Repository Notice**: Per user instructions, Git will **NOT** be initialized, and no commits/pushes will occur. All files will be generated locally in `d:\Study\Projects\Document Summarizer`.
> - **Architecture**: 100% Frontend-only application using React + Vite + Tailwind CSS. No backend servers, databases, auth, vector DBs, or RAG pipelines.
> - **Design Aesthetic**: Clean, high-readability SaaS interface without glassmorphism, heavy animations, or gradient backgrounds. Uses native SVG icons and clean typography.
> - **API Failure Handling**: If Hugging Face API fails, displays a clear, actionable error message to the user without silent fallbacks.

## Open Questions

None.

## Proposed Changes

### Setup & Configurations

#### [NEW] [package.json](file:///d:/Study/Projects/Document%20Summarizer/package.json)
- Minimal dependencies: `react`, `react-dom`, `vite`, `@tailwindcss/vite` (or `tailwindcss`), `pdfjs-dist`, `tesseract.js`, `axios`.

#### [NEW] [vite.config.js](file:///d:/Study/Projects/Document%20Summarizer/vite.config.js)
- Configure Vite React plugin.

#### [NEW] [tailwind.config.js](file:///d:/Study/Projects/Document%20Summarizer/tailwind.config.js) & [postcss.config.js](file:///d:/Study/Projects/Document%20Summarizer/postcss.config.js)
- Tailwind configuration styled with clean grayscale/slate/indigo color tokens.

#### [NEW] [.env.example](file:///d:/Study/Projects/Document%20Summarizer/.env.example)
- Environment variable template specifying `VITE_HF_TOKEN`.

#### [NEW] [index.html](file:///d:/Study/Projects/Document%20Summarizer/index.html)
- HTML document head configured with font, SEO tags, title "Document Summary Assistant".

---

### Core Services

#### [NEW] [src/services/pdfExtractor.js](file:///d:/Study/Projects/Document%20Summarizer/src/services/pdfExtractor.js)
- Extract text from `.pdf` files using `pdfjs-dist`.
- Worker setup using official unpkg/cdnjs worker path.
- Handles multi-page parsing and line break preservation.

#### [NEW] [src/services/ocrExtractor.js](file:///d:/Study/Projects/Document%20Summarizer/src/services/ocrExtractor.js)
- Extract text from image files (`.png`, `.jpg`, `.jpeg`, `.webp`) using `tesseract.js`.
- Provides progress callbacks to report OCR extraction percentage.

#### [NEW] [src/services/summarizer.js](file:///d:/Study/Projects/Document%20Summarizer/src/services/summarizer.js)
- Calls Hugging Face Inference API (`facebook/bart-large-cnn`).
- Configures min/max token length based on selected mode (`short`, `medium`, `long`).
- Handles response parsing into Summary, Key Points, and Main Takeaways.
- Returns explicit error details if API token is missing, rate-limited, or returns non-200 responses.

---

### UI Components & Styling

#### [NEW] [src/index.css](file:///d:/Study/Projects/Document%20Summarizer/src/index.css)
- Clean, minimal CSS setup with Tailwind directives and basic layout utilities.

#### [NEW] [src/components/LoadingSpinner.jsx](file:///d:/Study/Projects/Document%20Summarizer/src/components/LoadingSpinner.jsx)
- Simple SVG spinner with status and progress percentage text.

#### [NEW] [src/components/FileUpload.jsx](file:///d:/Study/Projects/Document%20Summarizer/src/components/FileUpload.jsx)
- Native drag-and-drop zone and file input button.
- Validates file type (`.pdf`, `.png`, `.jpg`, `.jpeg`, `.webp`) and size (<= 10MB).
- Shows selected file name, size badge, clear button, and error state.

#### [NEW] [src/components/SummaryOptions.jsx](file:///d:/Study/Projects/Document%20Summarizer/src/components/SummaryOptions.jsx)
- Length selector radio/button group (`Short`, `Medium`, `Long`).
- "Generate Summary" primary action button disabled during processing or when no file/text is loaded.

#### [NEW] [src/components/SummaryCard.jsx](file:///d:/Study/Projects/Document%20Summarizer/src/components/SummaryCard.jsx)
- Clean output card for the main generated summary.
- Copy button, character/word count badge.

#### [NEW] [src/components/KeyPoints.jsx](file:///d:/Study/Projects/Document%20Summarizer/src/components/KeyPoints.jsx)
- Structured card rendering key points (3-8 bullet items) and main takeaways.

#### [NEW] [src/pages/Home.jsx](file:///d:/Study/Projects/Document%20Summarizer/src/pages/Home.jsx)
- Main layout organizing Header, FileUpload, SummaryOptions, and 3 output cards (Extracted Text Preview, Generated Summary, Key Points).

#### [NEW] [src/App.jsx](file:///d:/Study/Projects/Document%20Summarizer/src/App.jsx) & [src/main.jsx](file:///d:/Study/Projects/Document%20Summarizer/src/main.jsx)
- React app entry points.

---

### Documentation

#### [NEW] [README.md](file:///d:/Study/Projects/Document%20Summarizer/README.md)
- Complete setup guide, local execution (`npm install` & `npm run dev`), Vercel deployment instructions, architecture description, and folder structure.

## Verification Plan

### Automated Verification
1. Run `npm install` to install dependencies.
2. Run `npm run dev` / `npx vite build` to verify bundling without errors.

### Manual Verification
1. Test PDF and Image upload & text extraction.
2. Test Hugging Face API call with API key and verify error display if key is invalid or API fails.
3. Verify mobile, tablet, and desktop responsiveness with clean professional styling.
