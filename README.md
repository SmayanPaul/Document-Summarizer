# Document Intelligence Workstation

🔗 Live Demo: https://document-summarizer-fawn.vercel.app/

An AI-powered document analysis platform that extracts text from PDFs and images, performs OCR when required, and generates structured summaries using Google's Gemini AI.

---

## Overview

Document Intelligence Workstation enables users to upload PDF documents or image files, extract readable text, and generate AI-powered summaries with key insights and takeaways.

The application combines PDF parsing, OCR processing, and Google's Gemini 1.5 Flash model to provide fast and accurate document intelligence in a modern industrial-style interface.

---

## Features

### Document Processing
- Upload PDF documents
- Upload image files (PNG, JPG, JPEG, WEBP)
- Automatic PDF text extraction using PDF.js
- OCR-based text extraction using Tesseract.js
- Real-time processing status updates

### AI Summarization
- Powered by Google Gemini 1.5 Flash
- Three summary modes:
  - Short
  - Medium
  - Long
- Executive summary generation
- Key point extraction
- Main takeaway identification

### User Interface
- Industrial workstation-inspired design
- Dark mode and Light mode support
- Responsive desktop and mobile layouts
- Copy-to-clipboard functionality
- Error handling and validation feedback
- Interactive processing indicators

---

## Folder Structure

```text
Document Summarizer/
├── .env.example
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    │
    ├── components/
    │   ├── FileUpload.jsx
    │   ├── GridBackground.jsx
    │   ├── KeyPoints.jsx
    │   ├── LoadingSpinner.jsx
    │   ├── SummaryCard.jsx
    │   ├── SummaryOptions.jsx
    │   └── ThemeToggle.jsx
    │
    ├── pages/
    │   └── Home.jsx
    │
    └── services/
        ├── ocrExtractor.js
        ├── pdfExtractor.js
        └── summarizer.js
```

---

## Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS

### Document Processing
- PDF.js (`pdfjs-dist`)
- Tesseract.js

### AI Integration
- Google Gemini 1.5 Flash API

### Utilities
- Axios
- Lucide React

---

## Setup & Running Locally

### 1. Prerequisites

Ensure the following are installed:

- Node.js (v18+)
- npm

---

### 2. Environment Configuration

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

You can obtain an API key from:

https://aistudio.google.com

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Production Build

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---


## Supported File Types

| Format | Supported |
|----------|----------|
| PDF | Yes |
| PNG | Yes |
| JPG | Yes |
| JPEG | Yes |
| WEBP | Yes |

---

## Future Improvements

- DOCX document support
- Chat with document
- Summary export (PDF/TXT)
- Multi-document analysis
- Multi-language OCR
- Summary history
- User authentication

---

## Author

Smayan Paul

Engineering Student

Document Intelligence Workstation