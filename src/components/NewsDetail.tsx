import React from 'react';
import { ChevronLeft, CalendarDays, Newspaper } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsDetailProps {
  news: NewsItem;
  onBack: () => void;
}

export default function NewsDetail({ news, onBack }: NewsDetailProps) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-3 sm:p-4 border-b border-slate-100">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-700 transition-colors">
          <ChevronLeft className="w-5 h-5" /> Volver a noticias
        </button>
      </div>
      {news.imageUrl && <img src={news.imageUrl} alt="" className="w-full max-h-[420px] object-cover" />}
      <div className="p-5 sm:p-8 lg:p-10 space-y-6">
        <div className="flex items-center gap-2 flex-wrap">
          {news.featured && <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-1">Destacado</span>}
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium"><CalendarDays className="w-3.5 h-3.5" />{news.date}</span>
          <span className="text-xs text-slate-400">Comunicado oficial</span>
        </div>
        <header className="space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-slate-900">{news.title}</h1>
          {news.summary && <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{news.summary}</p>}
        </header>
        <div className="border-t border-slate-100 pt-6 text-sm sm:text-base text-slate-700 leading-8 whitespace-pre-line">{news.content}</div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {news.attachmentUrl && <a href={news.attachmentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-3 border border-slate-300 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-50">{news.attachmentName || 'Descargar documento'}</a>}
          {news.linkUrl && <a href={news.linkUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm">{news.linkLabel || 'Conoce más'}</a>}
        </div>
      </div>
    </article>
  );
}
