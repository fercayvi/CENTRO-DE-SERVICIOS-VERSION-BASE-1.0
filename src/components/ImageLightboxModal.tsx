import React, { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  title?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  imageUrl,
  title,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false
}) => {
  const [zoom, setZoom] = useState<number>(1);

  // Reset zoom whenever a new image is opened
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
    }
  }, [isOpen, imageUrl]);

  // Keyboard navigation (ESC to close, +/- for zoom, ArrowLeft/ArrowRight for gallery navigation)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === '+' || e.key === '=') {
      setZoom((prev) => Math.min(prev + 0.25, 3));
    } else if (e.key === '-' || e.key === '_') {
      setZoom((prev) => Math.max(prev - 0.25, 0.5));
    } else if (e.key === '0') {
      setZoom(1);
    } else if (e.key === 'ArrowLeft') {
      if (onPrev) {
        onPrev();
      }
    } else if (e.key === 'ArrowRight') {
      if (onNext) {
        onNext();
      }
    }
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !imageUrl) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex flex-col h-[100dvh] w-screen top-0 left-0 animate-fadeIn select-none overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Header Bar */}
      <div className="bg-slate-900/95 border-b border-slate-800 px-3 sm:px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between text-white shrink-0 gap-3 z-10 shadow-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
            <Maximize2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-white truncate">
              {title || 'Infografía Oficial en Alta Resolución'}
            </h3>
            <p className="text-[11px] text-slate-400 truncate">
              Vista ampliada detallada • Clic en controles o usa las teclas +/- para zoom
            </p>
          </div>
        </div>

        {/* Toolbar controls */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 shrink-0 w-full sm:w-auto">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              className="min-w-10 min-h-10 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
              title="Reducir zoom (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-200 px-2 min-w-[52px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
              title="Aumentar zoom (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {zoom !== 1 && (
              <button
                type="button"
                onClick={handleResetZoom}
                className="min-w-10 min-h-10 p-2 ml-1 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-slate-700 transition-colors cursor-pointer"
                title="Restablecer a 100% (0)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="min-w-11 min-h-11 p-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white transition-colors cursor-pointer ml-1 shadow-xs"
            title="Cerrar vista ampliada (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage (Smart Fitted & Centered with Zoom Support) */}
      <div 
        className={`flex-1 min-h-0 flex items-center justify-center p-2 sm:p-4 relative ${zoom > 1 ? 'overflow-auto' : 'overflow-hidden'} custom-scrollbar`}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Previous Image Button */}
        {onPrev && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            disabled={!hasPrev}
            className="absolute left-2 sm:left-4 z-20 min-w-11 min-h-11 p-2 sm:p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white disabled:opacity-30 disabled:hover:bg-slate-900/80 transition-all border border-slate-700 shadow-xl cursor-pointer"
            title="Imagen anterior (←)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div 
          className="transition-transform duration-150 ease-out origin-center flex items-center justify-center m-auto"
          style={{ transform: `scale(${zoom})` }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageUrl}
            alt={title || 'Infografía'}
            className="max-h-[calc(100dvh-170px)] sm:max-h-[calc(100dvh-130px)] w-auto max-w-full object-contain mx-auto rounded-lg shadow-2xl border border-slate-700/60 cursor-default bg-slate-900/40"
          />
        </div>

        {/* Next Image Button */}
        {onNext && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            disabled={!hasNext}
            className="absolute right-2 sm:right-4 z-20 min-w-11 min-h-11 p-2 sm:p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white disabled:opacity-30 disabled:hover:bg-slate-900/80 transition-all border border-slate-700 shadow-xl cursor-pointer"
            title="Siguiente imagen (→)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom status bar */}
      <div className="bg-slate-900/95 border-t border-slate-800 px-3 sm:px-4 py-2 text-center text-[10px] sm:text-[11px] text-slate-400 shrink-0">
        💡 <strong>Tip:</strong> Puedes usar las flechas <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">←</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">→</kbd> para navegar, <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">+</kbd> y <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">-</kbd> para zoom, o <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">Esc</kbd> para cerrar.
      </div>
    </div>
  );
};
