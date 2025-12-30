import { useState, useCallback } from 'react';
import { X, Upload, Download } from 'lucide-react';

interface CSVUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export function CSVUploadModal({ isOpen, onClose, onUpload }: CSVUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'text/csv' || droppedFile?.name.endsWith('.csv')) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleNext = () => {
    if (!file) return;
    setIsVerifying(true);
    
    // Simulate verification
    let prog = 0;
    const interval = setInterval(() => {
      prog += 10;
      setProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      setFile(null);
      setIsVerifying(false);
      setProgress(0);
      onClose();
    }
  };

  const handleCancel = () => {
    setFile(null);
    setIsVerifying(false);
    setProgress(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-lg mx-4 animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">CSV Upload</h2>
            <p className="text-sm text-muted-foreground">Add your documents here</p>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragging ? 'border-primary bg-primary/5' : 'border-border'
            }`}
          >
            {isVerifying ? (
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="hsl(var(--border))"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="hsl(var(--foreground))"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={175.93}
                      strokeDashoffset={175.93 - (175.93 * progress) / 100}
                      className="transition-all duration-200"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                    {progress}%
                  </span>
                </div>
                <p className="text-muted-foreground">Verifying...</p>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-background" />
                </div>
                <p className="text-foreground mb-2">Drag your file(s) to start uploading</p>
                <p className="text-muted-foreground text-sm mb-4">OR</p>
                <label className="inline-block px-4 py-2 border border-border rounded-lg text-sm cursor-pointer hover:bg-muted transition-colors">
                  Browse files
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>

                <div className="mt-6 flex items-center justify-between px-4 py-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    {file ? file.name : 'Sample File.csv'}
                  </span>
                  <Download className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 border border-border rounded-lg text-sm hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            {isVerifying && progress === 100 ? (
              <button
                onClick={handleUpload}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
              >
                Upload
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!file || isVerifying}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next
                <span>→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
