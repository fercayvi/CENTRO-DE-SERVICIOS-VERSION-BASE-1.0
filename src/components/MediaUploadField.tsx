import React, { useRef } from 'react';
import { 
  Trash2, Image as ImageIcon, 
  Video, FileDown, FileCheck, Check 
} from 'lucide-react';

export interface MediaUploadFieldProps {
  type: 'image' | 'video' | 'pdf';
  label: string;
  value: string;
  onChange: (value: string, fileName?: string) => void;
  placeholderUrl?: string;
  helperText?: string;
  titleValue?: string;
  onTitleChange?: (title: string) => void;
  idPrefix?: string;
}

export const MediaUploadField: React.FC<MediaUploadFieldProps> = ({
  type,
  label,
  value,
  onChange,
  placeholderUrl,
  helperText,
  titleValue,
  onTitleChange,
  idPrefix = 'media'
}) => {
  const getIcon = () => {
    switch (type) {
      case 'image':
        return ImageIcon;
      case 'video':
        return Video;
      case 'pdf':
        return FileDown;
    }
  };

  const getAcceptType = () => {
    switch (type) {
      case 'image': return 'image/*';
      case 'video': return 'video/*';
      case 'pdf': return '.pdf';
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    onChange('');
  };

  const IconComponent = getIcon();
  const hasValue = Boolean(value && typeof value === 'string' && value.trim().length > 0);

  return (
    <div className="space-y-2.5 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
      {/* Header con Etiqueta */}
      <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <IconComponent className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{label}</span>
        </label>
      </div>

      {/* Campo de Selección de Archivo Local */}
      <div className="space-y-1.5">
        <div className="relative flex items-center bg-white border border-slate-300 rounded-xl p-1.5 hover:border-blue-400 transition-colors focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-600">
          <input
            ref={fileInputRef}
            id={`${idPrefix}-${type}-file-input`}
            type="file"
            accept={getAcceptType()}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // Atrapa el nombre real y le pone la diagonal
                onChange(`/${file.name}`);
              }
            }}
            className="w-full text-xs sm:text-sm font-medium text-slate-500 cursor-pointer 
            file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 
            file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 
            hover:file:bg-blue-100 transition-all focus:outline-none"
          />
        </div>
        {!hasValue && (
          <p className="text-[10px] text-slate-500 mt-1 ml-1">
            Selecciona el archivo para completar su ruta; después cópialo manualmente a public/ o pega una URL pública.
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor={`${idPrefix}-${type}-path-input`} className="block text-[11px] font-bold text-slate-700">
          Ruta pública o URL completa
        </label>
        <input
          id={`${idPrefix}-${type}-path-input`}
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholderUrl || (type === 'image' ? '/imagen.png o https://...' : type === 'video' ? '/video.mp4 o https://...' : '/documento.pdf o https://...')}
          className="w-full px-3 py-2.5 border border-slate-300 rounded-xl bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
        />
        <p className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200/80 rounded-lg p-2 leading-relaxed">
          Importante: elegir un archivo solo registra su nombre y ruta; no lo sube ni lo copia. Si utilizas una ruta como <code>/archivo.ext</code>, copia el archivo manualmente a la carpeta <code>public/</code> de la aplicación y conserva el mismo nombre. También puedes pegar una URL pública completa.
        </p>
      </div>

      {/* Vista previa en tiempo real cuando contiene una ruta o URL */}
      {hasValue && (
        <div className="p-3 bg-white border border-emerald-200/90 rounded-xl shadow-2xs flex items-center justify-between gap-3 animate-fadeIn mt-2">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {type === 'image' && (
              <img 
                src={value} 
                alt="Vista previa" 
                className="w-11 h-11 rounded-lg object-cover border border-slate-200 shrink-0 shadow-2xs bg-slate-100" 
                onError={(e) => {
                  // Si estás editando y la foto aún no está en public, oculta el cuadro roto
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            {type === 'video' && (
              <div className="w-11 h-11 rounded-lg bg-blue-900 text-blue-200 flex items-center justify-center shrink-0 shadow-2xs">
                <Video className="w-5 h-5" />
              </div>
            )}
            {type === 'pdf' && (
              <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs">
                <FileCheck className="w-5 h-5" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider">
                  <Check className="w-3 h-3" />
                  Recurso referenciado
                </span>
                <span className="text-xs text-emerald-700 font-bold">Ruta/URL configurada</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate mt-0.5">
                {value}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              id={`${idPrefix}-${type}-clear-btn`}
              onClick={handleClear}
              className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer min-w-[34px] min-h-[34px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-rose-500/20 active:scale-95"
              title="Quitar archivo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Título opcional de botón para PDF */}
      {type === 'pdf' && onTitleChange && (
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Texto o Título del Botón de Descarga
          </label>
          <input
            id={`${idPrefix}-pdf-title-input`}
            type="text"
            value={titleValue || ''}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Ej. Descargar Solicitud de Vacaciones (PDF)"
            className="w-full px-4 py-2 text-xs sm:text-sm font-medium border border-slate-300 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 min-h-[42px]"
          />
        </div>
      )}

      {/* Texto de ayuda */}
      {helperText && (
        <p className="text-[10px] text-slate-400 font-medium pt-1">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default MediaUploadField;
