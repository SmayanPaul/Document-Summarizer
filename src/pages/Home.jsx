import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import SummaryOptions from '../components/SummaryOptions';
import SummaryCard from '../components/SummaryCard';
import KeyPoints from '../components/KeyPoints';
import LoadingSpinner from '../components/LoadingSpinner';
import ThemeToggle from '../components/ThemeToggle';
import { extractTextFromPdf } from '../services/pdfExtractor';
import { extractTextFromImage } from '../services/ocrExtractor';
import { generateSummary } from '../services/summarizer';

export default function Home() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [pdfMeta, setPdfMeta] = useState(null);
  const [summaryMode, setSummaryMode] = useState('medium');
  const [generatedSummary, setGeneratedSummary] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [progressStatus, setProgressStatus] = useState(null);
  const [progressPercent, setProgressPercent] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileSelected = async (selectedFile) => {
    setFile(selectedFile);
    setExtractedText('');
    setPdfMeta(null);
    setGeneratedSummary(null);
    setErrorMessage(null);
    setIsExtracting(true);

    try {
      if (selectedFile.type === 'application/pdf') {
        setProgressStatus('PARSING PDF DOCUMENT STRUCTURE...');
        setProgressPercent(30);
        const result = await extractTextFromPdf(selectedFile);
        setExtractedText(result.text);
        setPdfMeta({ totalPages: result.totalPages });
      } else {
        setProgressStatus('INITIALIZING TESSERACT OCR ENGINE...');
        setProgressPercent(10);
        const result = await extractTextFromImage(selectedFile, ({ status, progress }) => {
          setProgressStatus(status ? status.toUpperCase() : 'PROCESSING...');
          setProgressPercent(progress);
        });
        setExtractedText(result.text);
      }
    } catch (err) {
      setErrorMessage(err.message || 'ERR_TEXT_EXTRACTION_FAILED');
      setFile(null);
    } finally {
      setIsExtracting(false);
      setProgressStatus(null);
      setProgressPercent(null);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setExtractedText('');
    setPdfMeta(null);
    setGeneratedSummary(null);
    setErrorMessage(null);
  };

  const handleGenerateSummary = async () => {
    if (!extractedText) return;

    setErrorMessage(null);
    setIsSummarizing(true);
    setProgressStatus('EXECUTING GEMINI AI ANALYSIS...');

    try {
      const result = await generateSummary(extractedText, summaryMode);
      setGeneratedSummary(result);
    } catch (err) {
      setErrorMessage(err.message || 'ERR_SUMMARY_GENERATION_FAILED');
    } finally {
      setIsSummarizing(false);
      setProgressStatus(null);
    }
  };

  const isProcessing = isExtracting || isSummarizing;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-mono">
      {/* WORKSTATION HEADER */}
      <header className="border-b border-[#fc6e1c] dark:border-[#fc6e1c] pb-6 flex items-start justify-between transition-colors duration-150">
        <div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-wider text-[#111111] dark:text-[#f5f5f5]">
            DOCUMENT <span className="text-[#fc6e1c] dark:text-[#ff6b2c]">INTELLIGENCE</span>
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-[#666666] dark:text-[#7a7a7a] mt-1.5">
            EXTRACT &bull; ANALYZE &bull; SUMMARIZE
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* ERROR BANNER */}
      {errorMessage && (
        <div className="p-4 bg-red-100 dark:bg-red-950/20 border border-red-300 dark:border-red-900/50 text-red-700 dark:text-red-400 text-xs font-mono flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <span className="font-bold">[ERR]</span>
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="font-bold hover:text-red-900 dark:hover:text-red-200 text-sm leading-none"
          >
            ×
          </button>
        </div>
      )}

      {/* TOP ROW: SOURCE DOCUMENT & SUMMARY CONFIGURATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SOURCE DOCUMENT */}
        <div className="lg:col-span-6 space-y-2">
          <h2 className="font-display font-bold text-xs uppercase tracking-widest text-[#111111] dark:text-[#f5f5f5]">
            SOURCE DOCUMENT
          </h2>
          <FileUpload
            onFileSelected={handleFileSelected}
            selectedFile={file}
            onClearFile={handleClearFile}
            disabled={isProcessing}
          />
        </div>

        {/* SUMMARY CONFIGURATION */}
        <div className="lg:col-span-6 space-y-2">
          <h2 className="font-display font-bold text-xs uppercase tracking-widest text-[#111111] dark:text-[#f5f5f5]">
            SUMMARY CONFIGURATION
          </h2>
          <SummaryOptions
            selectedMode={summaryMode}
            onSelectMode={setSummaryMode}
            onGenerate={handleGenerateSummary}
            disabled={isProcessing}
            hasContent={Boolean(extractedText)}
          />
        </div>
      </div>

      {/* PROCESSING SCANNER INDICATOR */}
      {isProcessing && (
        <LoadingSpinner message={progressStatus} progress={progressPercent} />
      )}

      {/* MIDDLE & BOTTOM ROW: PREVIEW & AI ANALYSIS REPORT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: DOCUMENT PREVIEW */}
        <div className="lg:col-span-6 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-xs uppercase tracking-widest text-[#111111] dark:text-[#f5f5f5]">
              DOCUMENT PREVIEW
            </h2>
            {extractedText && (
              <span className="text-[10px] font-mono text-[#666666] dark:text-[#7a7a7a]">
                {extractedText.length} CHARACTERS
              </span>
            )}
          </div>

          {extractedText ? (
            <div className="bg-[#f6f6f6] dark:bg-[#0f0f0f] border border-[#d0d0d0] dark:border-[#202020] p-4 font-mono text-xs text-[#111111] dark:text-[#f5f5f5] leading-relaxed max-h-[500px] overflow-y-auto whitespace-pre-wrap transition-colors duration-150">
              {extractedText}
            </div>
          ) : (
            <div className="bg-[#f6f6f6] dark:bg-[#0f0f0f] border border-[#d0d0d0] dark:border-[#202020] p-12 text-center text-[#666666] dark:text-[#7a7a7a] space-y-2 transition-colors duration-150">
              <div className="font-mono text-xs">[ NO TEXT EXTRACTED ]</div>
              <div className="text-[11px]">Upload a source document to view content preview.</div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: AI ANALYSIS REPORT */}
        <div className="lg:col-span-6 space-y-2">
          <h2 className="font-display font-bold text-xs uppercase tracking-widest text-[#fc6e1c] dark:text-[#ff6b2c]">
            AI ANALYSIS REPORT
          </h2>

          {/* EMPTY STATE */}
          {!file && !extractedText && !isProcessing && (
            <div className="bg-[#f6f6f6] dark:bg-[#0f0f0f] border border-[#d0d0d0] dark:border-[#202020] p-16 text-center space-y-3 transition-colors duration-150">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#111111] dark:text-[#f5f5f5]">
                NO ANALYSIS GENERATED
              </h3>
              <p className="font-mono text-xs text-[#666666] dark:text-[#7a7a7a] max-w-xs mx-auto">
                Upload a source document and run intelligence extraction.
              </p>
            </div>
          )}

          {/* GENERATED REPORT PANELS */}
          {generatedSummary?.summary && (
            <div className="space-y-6">
              {/* EXECUTIVE SUMMARY */}
              <SummaryCard
                summary={generatedSummary.summary}
                lengthMode={summaryMode}
              />

              {/* KEY INSIGHTS & MAIN TAKEAWAY */}
              {generatedSummary?.keyPoints && (
                <KeyPoints
                  keyPoints={generatedSummary.keyPoints}
                  takeaways={generatedSummary.takeaways}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
