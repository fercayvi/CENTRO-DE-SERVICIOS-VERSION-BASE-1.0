import React, { useState, useMemo, useEffect } from 'react';
import {
  LayoutGrid,
  Wallet,
  CreditCard,
  CalendarClock,
  ArrowLeft,
  Info,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { Service, CategoryConfig, SiteSettings, NewsItem } from '../types';
import { defaultCategories } from '../data';
import ServiceCard from './ServiceCard';

const CATEGORY_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutGrid,
  Wallet,
  CreditCard,
  CalendarClock,
};

const CATEGORY_COLOR_MAP: Record<string, { iconColor: string; bgLight: string }> = {
  indigo: {
    iconColor: 'text-indigo-600',
    bgLight: 'bg-indigo-50/80 border-indigo-100',
  },
  emerald: {
    iconColor: 'text-emerald-600',
    bgLight: 'bg-emerald-50/80 border-emerald-100',
  },
  violet: {
    iconColor: 'text-violet-600',
    bgLight: 'bg-violet-50/80 border-violet-100',
  },
  amber: {
    iconColor: 'text-amber-600',
    bgLight: 'bg-amber-50/80 border-amber-100',
  },
};

interface HomeTabProps {
  services: (Service & { hidden?: boolean })[];
  onSelectService: (service: Service & { hidden?: boolean }) => void;
  selectedCategory?: string | null;
  onSelectCategory?: (category: string | null) => void;
  categories?: CategoryConfig[];
  settings?: SiteSettings;
  newsList?: NewsItem[];
  onViewAllNews?: () => void;
  onSelectNews?: (news: NewsItem) => void;
}

export default function HomeTab({
  services,
  onSelectService,
  selectedCategory: controlledCategory,
  onSelectCategory,
  categories,
  settings,
  newsList = [],
  onViewAllNews,
  onSelectNews,
}: HomeTabProps) {
  const [showScrollHint, setShowScrollHint] = useState(false);

  // Detecta desplazamiento tanto en el contenedor interno como en la ventana.
  useEffect(() => {
    const scrollContainer = document.getElementById('phone-main-scrollable-content');
    if (!scrollContainer) return;

    const updateHint = () => {
      const containerHasOverflow = scrollContainer.scrollHeight > scrollContainer.clientHeight + 80;
      const windowHasOverflow = document.documentElement.scrollHeight > window.innerHeight + 80;
      const hasMoreContent = containerHasOverflow || windowHasOverflow;
      const currentScroll = Math.max(window.scrollY, scrollContainer.scrollTop);
      setShowScrollHint(hasMoreContent && currentScroll < 40);
    };

    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(updateHint)
      : null;
    observer?.observe(scrollContainer);
    if (scrollContainer.firstElementChild) observer?.observe(scrollContainer.firstElementChild);

    const frame = window.requestAnimationFrame(updateHint);
    scrollContainer.addEventListener('scroll', updateHint, { passive: true });
    window.addEventListener('scroll', updateHint, { passive: true });
    window.addEventListener('resize', updateHint);

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      scrollContainer.removeEventListener('scroll', updateHint);
      window.removeEventListener('scroll', updateHint);
      window.removeEventListener('resize', updateHint);
    };
  }, [services.length, newsList.length, controlledCategory]);

  const isAllServicesDefault = settings?.defaultHomeView === 'all_services';
  const previewNews = [...newsList].filter(item => item.showOnHome !== false).sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || (b.date || '').localeCompare(a.date || '')).slice(0, 3);

  // Manejo de Estado (inicializado en 'all' si defaultHomeView es 'all_services', de lo contrario null)
  const [internalCategory, setInternalCategory] = useState<string | null>(() => {
    return isAllServicesDefault ? 'all' : null;
  });

  const activeCategories = useMemo(() => {
    return categories && categories.length > 0 ? categories : defaultCategories;
  }, [categories]);

  // Si defaultHomeView es 'all_services' y la categoría es null (vista inicial),
  // se muestra directamente la vista de "Todos los trámites" ('all')
  const rawCategory = controlledCategory !== undefined 
    ? controlledCategory 
    : internalCategory;

  const selectedCategory = (rawCategory === null && isAllServicesDefault)
    ? 'all'
    : rawCategory;

  const handleCategoryChange = (cat: string | null) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    setInternalCategory(cat);
  };

  // Obtener el objeto de la categoría activa
  const activeCategoryObj = useMemo(() => {
    if (!selectedCategory) return null;
    return activeCategories.find(c => 
      c.id === selectedCategory || 
      c.label === selectedCategory || 
      c.defaultLabel === selectedCategory
    );
  }, [activeCategories, selectedCategory]);

  const categoryDisplayTitle = activeCategoryObj ? activeCategoryObj.label : selectedCategory;

  const isShowingAllServices =
    selectedCategory === 'all' ||
    selectedCategory === 'Todos los trámites' ||
    activeCategoryObj?.id === 'all' ||
    (typeof categoryDisplayTitle === 'string' &&
      categoryDisplayTitle.trim().toLowerCase() === 'todos los trámites');

  const showNewsPreview = settings?.showNewsOnHome === true && (selectedCategory === null || isShowingAllServices);

  // Filtrado de servicios para Nivel 2
  const filteredServices = useMemo(() => {
    if (!selectedCategory) return [];

    // Si la categoría seleccionada es 'all' o equivalente a 'Todos los trámites'
    if (
      selectedCategory === 'all' || 
      selectedCategory === 'Todos los trámites' || 
      (activeCategoryObj && activeCategoryObj.id === 'all')
    ) {
      return services.filter(s => !s.hidden);
    }

    return services.filter((service) => {
      if (service.hidden) return false;
      if (!activeCategoryObj) {
        return service.category === selectedCategory;
      }
      return (
        service.category === activeCategoryObj.label ||
        service.category === activeCategoryObj.defaultLabel ||
        service.category === activeCategoryObj.id
      );
    });
  }, [services, selectedCategory, activeCategoryObj]);

  const getCategoryCount = (cat: CategoryConfig) => {
    if (cat.id === 'all') {
      return services.filter(s => !s.hidden).length;
    }
    return services.filter(s => 
      !s.hidden && (
        s.category === cat.label || 
        s.category === cat.defaultLabel || 
        s.category === cat.id
      )
    ).length;
  };

  // Obtención dinámica y en tiempo real de los primeros trámites activos de la categoría (Nivel 1)
  const getCategoryPreviewItems = (
    cat: CategoryConfig
  ): Array<{ title: string; service?: Service & { hidden?: boolean } }> => {
    // Si la categoría es "Todos los trámites" (id === 'all'), no se muestran viñetas (tarjeta limpia)
    if (
      cat.id === 'all' || 
      cat.label === 'Todos los trámites' || 
      cat.defaultLabel === 'Todos los trámites'
    ) {
      return [];
    }

    // Filtrar los trámites activos (!s.hidden) que correspondan a esta categoría
    const matchedServices = services.filter((s) => {
      if (s.hidden) return false;
      return (
        s.category === cat.label ||
        s.category === cat.defaultLabel ||
        s.category === cat.id
      );
    });

    if (matchedServices.length > 0) {
      // Tomamos los primeros 3 trámites activos con su objeto de servicio
      return matchedServices.slice(0, 3).map((s) => ({
        title: s.title,
        service: s,
      }));
    }

    return [];
  };

  // Filtrar categorías visibles (Nivel 1)
  const visibleCategories = useMemo(() => {
    return activeCategories.filter((cat) => !cat.hidden);
  }, [activeCategories]);

  // Clases de cuadrícula dinámicas según la cantidad de categorías visibles
  let gridColsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
  if (visibleCategories.length === 3) {
    gridColsClass = 'grid-cols-1 sm:grid-cols-3';
  } else if (visibleCategories.length === 2) {
    gridColsClass = 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto';
  } else if (visibleCategories.length === 1) {
    gridColsClass = 'grid-cols-1 max-w-sm mx-auto';
  }

  return (
    <div className="w-full">
      {/* 1. VISTA INICIAL (NIVEL 1 - 4 TARJETAS PRINCIPALES) */}
      {selectedCategory === null ? (
        <div className="py-2 animate-fadeIn">
          <div className={`grid ${gridColsClass} gap-4 sm:gap-6`}>
            {visibleCategories.map((cat) => {
              const IconComponent = CATEGORY_ICON_MAP[cat.iconName] || LayoutGrid;
                const colorStyles = CATEGORY_COLOR_MAP[cat.colorScheme] || CATEGORY_COLOR_MAP.indigo;
                const count = getCategoryCount(cat);
                const previewItems = getCategoryPreviewItems(cat);
                const hasPreview = cat.id !== 'all' && previewItems.length > 0;

                return (
                  <div
                    key={cat.id}
                    role="button"
                    tabIndex={0}
                    id={`cat-card-${cat.id}`}
                    onClick={() => handleCategoryChange(cat.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCategoryChange(cat.id);
                      }
                    }}
                    className={`bg-white rounded-2xl shadow-xs border border-slate-200/90 hover:shadow-md hover:border-blue-500 hover:ring-2 hover:ring-blue-100/80 transition-all cursor-pointer flex flex-col items-center p-4 sm:p-5 text-center group active:scale-[0.98] min-h-[275px] sm:min-h-[300px] w-full select-none ${
                      hasPreview ? 'justify-between' : 'justify-center'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center w-full text-center">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs mb-3 ${colorStyles.bgLight}`}>
                        <IconComponent className={`w-7 h-7 sm:w-8 sm:h-8 ${colorStyles.iconColor}`} />
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {cat.label}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium mt-1">
                        {count} {count === 1 ? 'trámite' : 'trámites'}
                      </p>
                    </div>

                    {/* Previsualización dinámica de trámites principales (Nivel 1) */}
                    {hasPreview && (
                      <div className="w-full mt-4 pt-3.5 border-t border-slate-100 flex flex-col gap-1.5 text-left">
                        {previewItems.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.service) {
                                onSelectService(item.service);
                              } else {
                                handleCategoryChange(cat.id);
                              }
                            }}
                            className="w-full bg-slate-50 hover:bg-blue-100 hover:text-blue-700 text-slate-600 text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer transition-colors font-medium border border-transparent hover:border-blue-200 text-left"
                            title={item.title}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-400 shrink-0 transition-colors" />
                            <span className="truncate leading-tight flex-1">{item.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        /* 2. VISTA SECUNDARIA (NIVEL 2 - TRÁMITES DE LA CATEGORÍA SELECCIONADA) */
        <div className="py-2 animate-fadeIn">
          {/* Botón superior de volver a categorías (oculto si la pantalla principal por defecto es 'Todos los trámites') */}
          {!(isAllServicesDefault && isShowingAllServices) && (
            <div>
              <button
                type="button"
                id="back-to-categories-btn"
                onClick={() => handleCategoryChange(null)}
                className="text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-xl mb-6 inline-flex items-center gap-2 -ml-4 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver a Categorías</span>
              </button>
            </div>
          )}

          {/* Título de la categoría seleccionada con nombre personalizado (se oculta si muestra todos los trámites) */}
          {!isShowingAllServices && (
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {categoryDisplayTitle}
            </h2>
          )}

          {/* Cuadrícula con las tarjetas de los trámites */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-3.5 pb-2">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() => onSelectService(service)}
              />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-10 bg-white border border-slate-200 rounded-2xl p-6">
              <Info className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">No se encontraron trámites</p>
              <p className="text-[11px] text-slate-400 mt-1">No hay trámites disponibles en esta categoría.</p>
            </div>
          )}
        </div>
      )}

      {/* Vista previa de noticias: solo aparece en la pantalla principal, no dentro de una categoría. */}
      {showNewsPreview && (
        <section className="mt-8 sm:mt-10 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-blue-50/50 p-4 sm:p-6 shadow-xs animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Entérate de lo que pasa en Ayvi</h2>
              <p className="text-sm text-slate-500 mt-1">Comunicados, eventos y logros de nuestra comunidad.</p>
            </div>
            <button type="button" onClick={onViewAllNews} className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl px-3 py-2 text-sm font-bold text-blue-700 hover:bg-blue-100/70 transition-colors">
              Ver todas las noticias <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {previewNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {previewNews.map((item) => (
                <button type="button" key={item.id} onClick={() => onSelectNews?.(item)} className="group min-w-0 rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-blue-300 hover:shadow-sm transition-all">
                  {item.imageUrl && <div className="w-full h-32 overflow-hidden rounded-lg mb-3 bg-white"><img src={item.imageUrl} alt="" className="w-full h-full object-contain" style={{ objectPosition: `${item.imagePositionX ?? 50}% ${item.imagePositionY ?? 50}%`, transform: `scale(${(item.imageZoom ?? 100) / 100})`, transformOrigin: 'center' }} /></div>}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {item.featured ? <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide bg-amber-50 text-amber-700">Destacado</span> : <span />}
                    <span className="text-[10px] text-slate-400 truncate">{item.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-3">{item.summary}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-xs font-bold text-blue-600">Leer noticia <ArrowRight className="w-3.5 h-3.5" /></span>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 px-4 py-6 text-center">
              <p className="text-sm font-semibold text-slate-600">Próximamente habrá novedades.</p>
              <p className="text-xs text-slate-500 mt-1">Las noticias publicadas aparecerán aquí.</p>
            </div>
          )}
        </section>
      )}
      {showScrollHint && (
        <button
          type="button"
          onClick={() => {
            const scrollContainer = document.getElementById('phone-main-scrollable-content');
            const containerHasOverflow = Boolean(
              scrollContainer && scrollContainer.scrollHeight > scrollContainer.clientHeight + 80
            );
            const distance = Math.max(window.innerHeight * 0.65, 320);
            if (containerHasOverflow) {
              scrollContainer?.scrollBy({ top: distance, behavior: 'smooth' });
            } else {
              window.scrollBy({ top: distance, behavior: 'smooth' });
            }
          }}
          className="fixed bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/95 px-4 py-2.5 text-xs sm:text-sm font-semibold text-blue-700 shadow-lg backdrop-blur-sm transition-all hover:bg-blue-50 hover:shadow-xl animate-bounce"
          aria-label="Desliza hacia abajo para descubrir más contenido"
        >
          <span>Desliza para descubrir más</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
