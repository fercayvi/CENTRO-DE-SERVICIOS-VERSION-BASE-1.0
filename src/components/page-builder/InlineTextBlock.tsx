import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  FileText,
  Link as LinkIcon
} from 'lucide-react';
import DOMPurify from 'dompurify';
import { TextLayoutBlock } from '../../types';

interface InlineTextBlockProps {
  block: TextLayoutBlock;
  onChange: (updated: TextLayoutBlock) => void;
  isSelected?: boolean;
  readOnly?: boolean;
}

// Utility to clean empty html artifacts like <br>, <p><br></p>, etc.
function normalizeHtmlContent(html: string): string {
  if (!html) return '';
  const trimmed = html.trim();
  if (
    trimmed === '' ||
    trimmed === '<br>' ||
    trimmed === '<p><br></p>' ||
    trimmed === '<div><br></div>' ||
    trimmed === '<p></p>' ||
    trimmed === '<div></div>'
  ) {
    return '';
  }
  return html;
}

// Clean and sanitize rich text allowing strictly: b, strong, i, em, u, p, br, ul, ol, li, a, stripping style & class
export function sanitizeRichText(html: string): string {
  if (!html) return '';
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'u', 'p', 'br', 'ul', 'ol', 'li', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });

  // Force rel="noopener noreferrer" and target="_blank" on all links
  const withRel = sanitized.replace(/<a\b([^>]*)>/gi, (match, attrs) => {
    let newAttrs = attrs;
    if (!/target\s*=/i.test(newAttrs)) {
      newAttrs += ' target="_blank"';
    }
    if (/rel\s*=\s*["'][^"']*["']/i.test(newAttrs)) {
      newAttrs = newAttrs.replace(/rel\s*=\s*["'][^"']*["']/i, 'rel="noopener noreferrer"');
    } else {
      newAttrs += ' rel="noopener noreferrer"';
    }
    return `<a${newAttrs}>`;
  });

  return normalizeHtmlContent(withRel);
}

export const InlineTextBlock: React.FC<InlineTextBlockProps> = ({
  block,
  onChange,
  isSelected = false,
  readOnly = false
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isBoldActive, setIsBoldActive] = useState<boolean>(false);
  const [isItalicActive, setIsItalicActive] = useState<boolean>(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('https://');
  const [linkError, setLinkError] = useState<string | null>(null);
  const savedLinkRangeRef = useRef<Range | null>(null);

  // Check whether content is genuinely empty
  const cleanContent = sanitizeRichText(block.content || '');
  const hasContent = Boolean(cleanContent !== '');

  // Synchronize external block.content into contentEditable without overriding while actively typing
  useEffect(() => {
    if (!readOnly && contentRef.current && document.activeElement !== contentRef.current) {
      const currentHtml = contentRef.current.innerHTML;
      const targetHtml = sanitizeRichText(block.content || '');
      if (normalizeHtmlContent(currentHtml) !== normalizeHtmlContent(targetHtml)) {
        contentRef.current.innerHTML = targetHtml;
      }
    }
  }, [block.content, readOnly]);

  // Ensure default paragraph separator is <p>
  useEffect(() => {
    if (!readOnly) {
      try {
        document.execCommand('defaultParagraphSeparator', false, 'p');
      } catch {
        // Ignore if browser restricts command outside focus
      }
    }
  }, [readOnly]);

  // Update active state of bold/italic on selection change
  const updateActiveFormats = useCallback(() => {
    if (readOnly) return;
    try {
      setIsBoldActive(document.queryCommandState('bold'));
      setIsItalicActive(document.queryCommandState('italic'));
    } catch {
      // Non-critical format query error
    }
  }, [readOnly]);

  const handleContentInput = () => {
    if (contentRef.current) {
      const rawHtml = contentRef.current.innerHTML;
      const cleanHtml = sanitizeRichText(rawHtml);
      onChange({ ...block, content: cleanHtml });
      updateActiveFormats();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (contentRef.current) {
      const rawHtml = contentRef.current.innerHTML;
      const cleanHtml = sanitizeRichText(rawHtml);
      // Clean up stray browser empty tags
      if (cleanHtml === '') {
        contentRef.current.innerHTML = '';
      } else if (contentRef.current.innerHTML !== cleanHtml) {
        contentRef.current.innerHTML = cleanHtml;
      }
      onChange({ ...block, content: cleanHtml });
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    const htmlData = clipboardData.getData('text/html');
    const textData = clipboardData.getData('text/plain');

    let contentToInsert = '';
    if (htmlData) {
      contentToInsert = sanitizeRichText(htmlData);
    }

    if (!contentToInsert && textData) {
      contentToInsert = textData
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\r\n|\r|\n/g, '<br>');
    }

    if (contentToInsert) {
      document.execCommand('insertHTML', false, contentToInsert);
      handleContentInput();
    }
  };

  const handleFocus = () => {
    if (readOnly) return;
    setIsFocused(true);
    try {
      document.execCommand('defaultParagraphSeparator', false, 'p');
    } catch {
      // ignore
    }
    updateActiveFormats();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...block, title: e.target.value });
  };

  // Keyboard navigation for Enter and Shift+Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (readOnly) return;
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift + Enter: clean line break (<br>)
        e.preventDefault();
        document.execCommand('insertLineBreak');
        handleContentInput();
      } else {
        // Normal Enter: new paragraph or list item
        // Allow default browser behaviour with <p> separator
        setTimeout(handleContentInput, 0);
      }
    }
  };

  // Helper formatting buttons using document.execCommand with immediate state sync
  const applyFormat = (command: 'bold' | 'italic' | 'insertUnorderedList' | 'insertOrderedList') => {
    if (readOnly) return;
    if (contentRef.current) {
      contentRef.current.focus();
    }

    document.execCommand(command, false);

    if (contentRef.current) {
      const rawHtml = contentRef.current.innerHTML;
      const cleanHtml = sanitizeRichText(rawHtml);
      onChange({ ...block, content: cleanHtml });
    }

    updateActiveFormats();
  };

  const handleInsertLink = () => {
    if (readOnly) return;

    const selection = window.getSelection();
    const activeRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    const rangeBelongsToEditor = Boolean(
      activeRange &&
      contentRef.current &&
      contentRef.current.contains(activeRange.commonAncestorContainer)
    );

    savedLinkRangeRef.current = rangeBelongsToEditor && activeRange
      ? activeRange.cloneRange()
      : null;

    setLinkUrl('https://');
    setLinkError(savedLinkRangeRef.current && !savedLinkRangeRef.current.collapsed
      ? null
      : 'Selecciona primero el texto que quieres convertir en enlace.');
    setLinkDialogOpen(true);
  };

  const restoreSavedLinkSelection = (): boolean => {
    const range = savedLinkRangeRef.current;
    const editor = contentRef.current;
    if (!range || !editor || !editor.contains(range.commonAncestorContainer)) return false;

    editor.focus();
    const selection = window.getSelection();
    if (!selection) return false;
    selection.removeAllRanges();
    selection.addRange(range);
    return true;
  };

  const persistEditedLink = () => {
    if (!contentRef.current) return;
    const cleanHtml = sanitizeRichText(contentRef.current.innerHTML);
    if (contentRef.current.innerHTML !== cleanHtml) {
      contentRef.current.innerHTML = cleanHtml;
    }
    onChange({ ...block, content: cleanHtml });
    updateActiveFormats();
  };

  const handleApplyLink = () => {
    const range = savedLinkRangeRef.current;
    if (!range || range.collapsed || !range.toString().trim()) {
      setLinkError('Selecciona primero el texto dentro del contenido y vuelve a abrir Insertar enlace.');
      return;
    }

    const trimmed = linkUrl.trim();
    if (!trimmed) {
      setLinkError('Escribe una dirección web válida.');
      return;
    }

    const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(trimmed);
    const candidate = hasScheme ? trimmed : `https://${trimmed}`;
    let parsedUrl: URL;

    try {
      parsedUrl = new URL(candidate);
    } catch {
      setLinkError('La dirección no tiene un formato válido.');
      return;
    }

    if (!['http:', 'https:', 'mailto:', 'tel:'].includes(parsedUrl.protocol)) {
      setLinkError('Solo se permiten enlaces HTTP, HTTPS, correo (mailto) o teléfono (tel).');
      return;
    }

    if (!restoreSavedLinkSelection()) {
      setLinkError('Se perdió la selección del texto. Cierra este cuadro, selecciona el texto y vuelve a intentarlo.');
      return;
    }

    document.execCommand('createLink', false, candidate);
    persistEditedLink();
    setLinkDialogOpen(false);
    setLinkError(null);
    savedLinkRangeRef.current = null;
  };

  const handleRemoveLink = () => {
    if (!restoreSavedLinkSelection()) {
      setLinkError('Se perdió la selección del texto. Cierra este cuadro, selecciona el texto y vuelve a intentarlo.');
      return;
    }

    document.execCommand('unlink', false);
    persistEditedLink();
    setLinkDialogOpen(false);
    setLinkError(null);
    savedLinkRangeRef.current = null;
  };

  const handleAlign = (align: 'left' | 'center' | 'right') => {
    onChange({ ...block, align });
  };

  const alignClass = 
    block.align === 'center' ? 'text-center' : 
    block.align === 'right' ? 'text-right' : 
    'text-left';

  const styleClass = 
    block.style === 'lead' ? 'text-base sm:text-lg leading-relaxed text-slate-800' : 
    block.style === 'heading' ? 'text-lg sm:text-xl font-bold text-slate-900' : 
    'text-sm sm:text-base leading-relaxed text-slate-700';

  const shouldShowToolbar = !readOnly && (isSelected || isFocused);

  // READ-ONLY MODE (e.g. Preview Mode)
  if (readOnly) {
    const sanitizedHtml = cleanContent;

    return (
      <div className="space-y-2">
        {block.title && (
          <div className={`flex items-center gap-2 border-b border-slate-100 pb-2 ${
            block.align === 'center' ? 'justify-center' : block.align === 'right' ? 'justify-end' : ''
          }`}>
            <FileText className="w-4 h-4 text-blue-600 shrink-0 opacity-75" />
            <h3 className={`text-base sm:text-lg font-bold text-slate-900 ${alignClass}`}>
              {block.title}
            </h3>
          </div>
        )}
        <div
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
          className={`whitespace-pre-wrap break-words ${styleClass} ${alignClass} [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>p]:my-1.5 [&_strong]:font-bold [&_b]:font-bold`}
          dangerouslySetInnerHTML={{ __html: sanitizedHtml || '<p class="text-slate-300 italic">Sin contenido</p>' }}
        />
      </div>
    );
  }

  return (
    <div className={`relative group/text rounded-xl transition-all ${
      shouldShowToolbar ? 'ring-2 ring-blue-500/80 border-blue-400 bg-blue-50/5' : ''
    }`}>
      {/* Floating mini formatting toolbar - positioned above without obscuring the first line */}
      {shouldShowToolbar && (
        <div 
          className="absolute -top-12 sm:-top-13 left-0 z-30 flex items-center gap-1 bg-slate-900 text-white px-2.5 py-1.5 rounded-xl shadow-xl border border-slate-800 animate-fadeIn select-none"
          onMouseDown={(e) => {
            // Prevent blur of editable content when clicking toolbar buttons
            e.preventDefault();
          }}
        >
          <button
            type="button"
            onClick={() => applyFormat('bold')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isBoldActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Negrita (Ctrl+B)"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => applyFormat('italic')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isItalicActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Cursiva (Ctrl+I)"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleInsertLink}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Insertar o editar hipervínculo"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => applyFormat('insertUnorderedList')}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Lista con viñetas"
          >
            <List className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => applyFormat('insertOrderedList')}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Lista numerada (1, 2, 3...)"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-4 bg-slate-700 mx-1" />

          <button
            type="button"
            onClick={() => handleAlign('left')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              block.align === 'left' || !block.align ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
            }`}
            title="Alinear a la izquierda"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => handleAlign('center')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              block.align === 'center' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
            }`}
            title="Centrar texto"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => handleAlign('right')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              block.align === 'right' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
            }`}
            title="Alinear a la derecha"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Editable Title */}
      <div className={`flex items-center gap-2 border-b border-slate-100 pb-2.5 pt-1 ${
        block.align === 'center' ? 'justify-center' : block.align === 'right' ? 'justify-end' : ''
      }`}>
        <FileText className="w-4 h-4 text-blue-600 shrink-0 opacity-75" />
        <input
          ref={titleRef}
          type="text"
          value={block.title || ''}
          onChange={handleTitleChange}
          placeholder="Escribe un título para esta sección (opcional)..."
          className={`w-full text-base sm:text-lg font-bold text-slate-900 bg-transparent border-0 focus:outline-none focus:ring-0 placeholder:text-slate-300 ${alignClass}`}
        />
      </div>

      {/* Direct WYSIWYG contentEditable Body with strict whitespace and line break preservation */}
      <div className="relative pt-2">
        {/* Native-behaving visual placeholder: only visible when completely empty AND NOT focused */}
        {!hasContent && !isFocused && (
          <div 
            onClick={() => {
              if (contentRef.current) {
                contentRef.current.focus();
              }
            }}
            className={`absolute inset-0 pt-2 pointer-events-none text-slate-300 italic select-none ${styleClass} ${alignClass}`}
          >
            Haz clic aquí y escribe directamente tu texto... Puedes dar Enters, espacios, viñetas o listas.
          </div>
        )}

        <div
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleContentInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          onKeyUp={updateActiveFormats}
          onMouseUp={updateActiveFormats}
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
          className={`min-h-[85px] p-2 -m-2 rounded-xl focus:outline-none transition-colors outline-none whitespace-pre-wrap break-words ${styleClass} ${alignClass}`}
        />
      </div>

      {linkDialogOpen && (
        <div className="fixed inset-0 z-[80] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inline-link-dialog-title"
            className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <LinkIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 id="inline-link-dialog-title" className="text-sm font-bold text-slate-900">
                  Insertar hipervínculo
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Selecciona texto dentro del párrafo y escribe la dirección a la que debe llevar.
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="inline-link-url" className="block text-xs font-semibold text-slate-700">
                Dirección web, correo o teléfono
              </label>
              <input
                id="inline-link-url"
                type="text"
                autoFocus
                value={linkUrl}
                onChange={(event) => {
                  setLinkUrl(event.target.value);
                  setLinkError(null);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleApplyLink();
                  }
                  if (event.key === 'Escape') {
                    setLinkDialogOpen(false);
                    setLinkError(null);
                    savedLinkRangeRef.current = null;
                  }
                }}
                placeholder="https://ejemplo.com"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              {linkError && (
                <p role="alert" className="text-xs text-rose-700 font-medium">{linkError}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleRemoveLink}
                disabled={!savedLinkRangeRef.current || savedLinkRangeRef.current.collapsed}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:text-slate-300 disabled:cursor-not-allowed"
              >
                Quitar enlace
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    setLinkDialogOpen(false);
                    setLinkError(null);
                    savedLinkRangeRef.current = null;
                  }}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleApplyLink}
                  disabled={!savedLinkRangeRef.current || savedLinkRangeRef.current.collapsed}
                  className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  Aplicar enlace
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
