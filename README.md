# Document Summary Assistant

A clean, production-ready full-stack web application designed for automatic document text extraction and AI-powered summarization.

---

## Overview

Document Summary Assistant enables users to upload PDF files or document images (PNG, JPG, WEBP) and generate summaries in three length modes (Short, Medium, Long), accompanied by structured Key Points and Main Takeaways.

The application features a dedicated provider-agnostic AI service layer that communicates with Hugging Face's `facebook/bart-large-cnn` inference model, allowing seamless expansion to other AI providers (such as OpenAI, Gemini, or Groq) without altering UI components.

---

## Key Features

- **Multi-Format Upload**: Drag-and-drop or file browser support for PDF documents and image files.
- **Client-Side Text Extraction**:
  - PDF text parsing preserving paragraph structures via `pdfjs-dist`.
  - Optical Character Recognition (OCR) for image files using `tesseract.js` with progress reporting.
- **Flexible Summary Lengths**: Choose between Short (~50-80 words), Medium (~100-180 words), or Long (~200-350 words) summary modes.
- **Structured Output**: Displays extracted text preview, generated summary, key bullet points (3-8 items), and main takeaways.
- **Provider-Agnostic Architecture**: Decoupled service layer in `src/services/summarizer.js`.
- **Validation & Safety**: File size limits (10MB max), type checking, error notifications, and disabled action buttons during processing.

---

## Folder Structure

```
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
    ├── components/
    │   ├── FileUpload.jsx
    │   ├── KeyPoints.jsx
    │   ├── LoadingSpinner.jsx
    │   ├── SummaryCard.jsx
    │   └── SummaryOptions.jsx
    ├── services/
    │   ├── ocrExtractor.js
    │   ├── pdfExtractor.js
    │   └── summarizer.js
    └── pages/
        └── Home.jsx
```

---

## Technologies Used

- **Frontend**: React 18, Vite, Tailwind CSS
- **Document Processing**: `pdfjs-dist` (PDF parsing), `tesseract.js` (OCR)
- **HTTP Client**: Axios
- **AI Model**: Hugging Face Inference API (`facebook/bart-large-cnn`)

---

## Setup & Running Locally

### 1. Prerequisites

Ensure Node.js (v18.0.0 or higher) and `npm` are installed on your machine.

### 2. Environment Configuration

Copy `.env.example` to `.env` in the root directory:

```bash
cp .env.example .env
```

Add your Hugging Face API Token:

```env
VITE_HF_TOKEN=your_hugging_face_token_here
```

*(You can obtain a free API token from your [Hugging Face Settings](https://huggingface.co/settings/tokens)).*

### 3. Installation

Install all required dependencies:

```bash
npm install
```

### 4. Start Development Server

Run the local development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

---

## Deployment to Vercel

### Step 1: Push Code to Repository

*(Note: Perform git initialization and repository creation manually when ready).*

### Step 2: Import into Vercel

1. Log in to [Vercel Dashboard](https://vercel.com).
2. Click **Add New** > **Project**.
3. Select your repository.

### Step 3: Configure Build Settings & Environment Variables

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variable**:
  - Key: `VITE_HF_TOKEN`
  - Value: Your Hugging Face API Token

### Step 4: Deploy

Click **Deploy**. Vercel will build and host your production web application.
