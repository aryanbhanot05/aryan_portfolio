import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Document, Page, pdfjs } from 'react-pdf';

// Required for react-pdf to function
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const resumeUrl = "/AryanResume.pdf"; 
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Function to scroll to a specific page when clicking buttons
  const scrollToPage = (pageIdx: number) => {
    const pageElement = document.getElementById(`page-${pageIdx}`);
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setPageNumber(pageIdx);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleShare = async () => {
    try {
      const fullUrl = window.location.origin + resumeUrl;
      await navigator.share({ title: 'Aryan Bhanot Resume', url: fullUrl });
    } catch (err) {
      console.error("Sharing failed", err);
    }
  };

  // Intersection Observer to update page number based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageId = entry.target.id;
            const pNum = parseInt(pageId.split('-')[1]);
            setPageNumber(pNum);
          }
        });
      },
      { threshold: 0.5, root: scrollContainerRef.current }
    );

    const pages = document.querySelectorAll('.pdf-page-wrapper');
    pages.forEach((page) => observer.observe(page));

    return () => observer.disconnect();
  }, [numPages, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 z-[101] flex flex-col glass-panel overflow-hidden shadow-2xl border border-border mt-16 bg-card"
          >
            {/* --- CUSTOM TOOLBAR --- */}
            <div className="flex flex-wrap items-center justify-between p-3 border-b border-border bg-card/50 backdrop-blur-md gap-4">
              
              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" size="icon" className="h-8 w-8 hover:bg-primary/10"
                  disabled={pageNumber <= 1} 
                  onClick={() => scrollToPage(pageNumber - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium min-w-[80px] text-center bg-muted/50 py-1 rounded-md">
                  {pageNumber} / {numPages || '--'}
                </span>
                <Button 
                  variant="outline" size="icon" className="h-8 w-8 hover:bg-primary/10"
                  disabled={pageNumber >= (numPages || 1)} 
                  onClick={() => scrollToPage(pageNumber + 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setScale(s => Math.max(s - 0.2, 0.5))}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <div className="text-xs font-mono w-12 text-center">{Math.round(scale * 100)}%</div>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setScale(s => Math.min(s + 0.2, 2.0))}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleShare} className="hover:text-primary">
                  <Share2 className="w-4 h-4" />
                </Button>
                
                <a href={resumeUrl} download="Aryan_Bhanot_Resume.pdf">
                  <Button variant="ghost" size="icon" className="hover:text-primary">
                    <Download className="w-4 h-4" />
                  </Button>
                </a>
                
                <div className="w-[1px] h-6 bg-border mx-1" /> {/* Divider */}

                <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-destructive/10 hover:text-destructive">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* --- SCROLLABLE PDF VIEW AREA --- */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-8 flex flex-col items-center gap-8 scroll-smooth"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent'
              }}
            >
              <Document
                file={resumeUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                className="flex flex-col items-center gap-8"
                loading={
                  <div className="flex flex-col items-center gap-4 mt-20">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground animate-pulse">Preparing document...</p>
                  </div>
                }
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <motion.div 
                    key={`page_${index + 1}`} 
                    id={`page-${index + 1}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="pdf-page-wrapper shadow-2xl ring-1 ring-border bg-white"
                  >
                    <Page 
                      pageNumber={index + 1} 
                      scale={scale} 
                      renderAnnotationLayer={true}
                      renderTextLayer={true}
                    />
                  </motion.div>
                ))}
              </Document>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;