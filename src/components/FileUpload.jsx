import React, { useRef, useState } from 'react';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXTENSIONS = ['.pdf', '.png', '.jpg', '.jpeg', '.webp'];

/**
 * FileUpload Component
 * Terminal Control Panel with file readout telemetry & industrial upload control.
 */
export default function FileUpload({ onFileSelected, selectedFile, onClearFile, disabled }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const validateAndSelectFile = (file) => {
    setError(null);
    if (!file) return;

    const extension = '.' + file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setError(`ERR_UNSUPPORTED_FORMAT: ${extension.toUpperCase()}`);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`ERR_FILE_EXCEEDS_10MB (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
      return;
    }

    onFileSelected(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getFileExtension = (filename) => {
    if (!filename) return 'NONE';
    return filename.split('.').pop().toUpperCase();
  };

  return (
    <div className="w-full bg-[#f6f6f6] dark:bg-[#0f0f0f] border border-[#d0d0d0] dark:border-[#202020] p-5 space-y-4 transition-colors duration-150">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf, .png, .jpg, .jpeg, .webp"
        className="hidden"
        disabled={disabled}
      />

      {/* Terminal Drag Target Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border p-4 transition-colors duration-150 ${
          isDragOver
            ? 'border-[#fc6e1c] dark:border-[#ff6b2c] bg-[#fc6e1c]/10 dark:bg-[#ff6b2c]/10'
            : 'border-[#d0d0d0] dark:border-[#202020] bg-[#e4e4e4] dark:bg-[#080808]'
        }`}
      >
        {selectedFile ? (
          <div className="space-y-3 font-mono text-xs">
            <div className="grid grid-cols-2 gap-y-2 border-b border-[#d0d0d0] dark:border-[#202020] pb-3 text-[#666666] dark:text-[#7a7a7a]">
              <div>
                <span className="text-[#666666] dark:text-[#7a7a7a] block text-[10px] uppercase">FILE:</span>
                <span className="text-[#111111] dark:text-[#f5f5f5] font-semibold truncate block">{selectedFile.name}</span>
              </div>
              <div>
                <span className="text-[#666666] dark:text-[#7a7a7a] block text-[10px] uppercase">FORMAT:</span>
                <span className="text-[#fc6e1c] dark:text-[#ff6b2c] font-semibold uppercase">{getFileExtension(selectedFile.name)}</span>
              </div>
              <div>
                <span className="text-[#666666] dark:text-[#7a7a7a] block text-[10px] uppercase">SIZE:</span>
                <span className="text-[#111111] dark:text-[#f5f5f5]">{formatFileSize(selectedFile.size)}</span>
              </div>
              <div>
                <span className="text-[#666666] dark:text-[#7a7a7a] block text-[10px] uppercase">STATUS:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold uppercase">LOADED</span>
              </div>
            </div>

            {!disabled && (
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#111111] dark:text-[#f5f5f5] bg-[#f6f6f6] dark:bg-[#0f0f0f] border border-[#d0d0d0] dark:border-[#202020] hover:border-[#fc6e1c] dark:hover:border-[#ff6b2c] transition-colors"
                >
                  CHANGE FILE
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClearFile();
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/20 border border-red-300 dark:border-red-900/40 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
                >
                  REMOVE
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="font-mono text-xs text-[#666666] dark:text-[#7a7a7a]">
              [ DRAG & DROP DOCUMENT HERE ]
            </div>
            <div className="font-mono text-[11px] text-[#666666] dark:text-[#7a7a7a]">
              SUPPORTED: PDF &bull; PNG &bull; JPG &bull; WEBP (MAX 10MB)
            </div>
            <div className="pt-2">
              <button
                type="button"
                disabled={disabled}
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#fc6e1c] dark:text-[#ff6b2c] bg-[#f6f6f6] dark:bg-[#0f0f0f] border border-[#fc6e1c] dark:border-[#ff6b2c] hover:bg-[#fc6e1c] dark:hover:bg-[#ff6b2c] hover:text-white dark:hover:text-black transition-colors duration-150 cursor-pointer"
              >
                SELECT FILE
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 text-xs font-mono text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/20 border border-red-300 dark:border-red-900/40 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="font-bold hover:text-red-800 dark:hover:text-red-200 ml-2">
            ×
          </button>
        </div>
      )}
    </div>
  );
}
