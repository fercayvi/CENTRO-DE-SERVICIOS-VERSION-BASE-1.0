import React, { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

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

  useEffect(() => {
    if (isOpen) setZoom(1);
  }, [isOpen, imageUrl]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === '+' || e.key === '=') {
      setZoom((prev) => Math.min(prev + 0.25, 3));
    } else if (e.key === '-' || e.key === '_') {
      setZoom((prev) => Math.max(prev - 0.25, 0.5));
    } else if (e.key === '0') {
      setZoom(1);
    } else if (e.key === 'ArrowLeft' && onPrev) {
      onPrev();
    } else if (e.key === 'ArrowRight' && onNext) {
      onNext();
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Vista ampliada de imagen'}
      className="fixed inset-0 z-[9999] h-[100dvh] w-screen top-0 left-0 flex items-center justify-center overflow-hidden bg-slate-950/95 backdrop-blur-sm select-none animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Minimal floating controls */}
      <div
        className="absolute top-3 right-3 z-30 flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900/80 p-1.5 text-white shadow-lg backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={zoom <= 0.5}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-200 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-35"
          title="Reducir zoom (-)"
          aria-label="Reducir zoom"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        {zoom !== 1 && (
          <span className="min-w-10 text-center text-xs tabular-nums text-slate-200" aria-live="polite">
            {Math.round(zoom * 100)}%
          </span>
        )}
        <button
          type="button"
          onClick={handleZoomIn}
          disabled={zoom >= 3}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-200 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-35"
          title="Aumentar zoom (+)"
          aria-label="Aumentar zoom"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        {zoom !== 1 && (
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
            title="Restablecer zoom (0)"
            aria-label="Restablecer zoom"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
        <div className="mx-0.5 h-6 w-px bg-white/15" aria-hidden="true" />
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
          title="Cerrar (Esc)"
          aria-label="Cerrar imagen ampliada"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        className={`flex h-full w-full items-center justify-center p-4 sm:p-6 ${zoom > 1 ? 'overflow-auto' : 'overflow-hidden'} custom-scrollbar`}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {onPrev && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            disabled={!hasPrev}
            className="absolute left-2 sm:left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-white shadow-lg transition-colors hover:bg-slate-800 disabled:opacity-25"
            title="Imagen anterior (←)"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        <div
          className="m-auto flex origin-center items-center justify-center transition-transform duration-150 ease-out"
          style={{ transform: `scale(${zoom})` }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageUrl}
            alt={title || 'Imagen ampliada'}
            className="max-h-[calc(100dvh-32px)] max-w-[calc(100vw-32px)] rounded-md object-contain"
          />
        </div>

        {onNext && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            disabled={!hasNext}
            className="absolute right-2 sm:right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-white shadow-lg transition-colors hover:bg-slate-800 disabled:opacity-25"
            title="Siguiente imagen (→)"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};
