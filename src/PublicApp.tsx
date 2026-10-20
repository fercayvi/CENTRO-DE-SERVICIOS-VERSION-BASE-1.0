import React, { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Service } from './types';
import { initialServices, initialNews, initialContact, defaultCategories, siteSettings } from './data';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';
import HomeTab from './components/HomeTab';
import ServiceDetail from './components/ServiceDetail';
import NewsTab from './components/NewsTab';
import AsistenteTab from './components/AsistenteTab';
import SearchTab from './components/SearchTab';
import ScrollProgressBar from './components/ScrollProgressBar';

/**
 * Experiencia pública del portal.
 * No monta AdminPanel ni contiene sesión, escritura de configuración o handlers de edición.
 * Los datos publicados se compilan desde src/data.ts.
 */
export default function PublicApp() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentTab, setCurrentTab] = useState<'inicio' | 'buscar' | 'noticias' | 'asistente'>('inicio');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<(Service & { hidden?: boolean }) | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [unreadNewsCount, setUnreadNewsCount] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  // En la versión pública, regresar automáticamente al inicio tras 2 minutos sin actividad,
  // tanto al consultar un trámite como al permanecer en cualquier sección de navegación.
  useEffect(() => {
    if (!selectedService && currentTab === 'inicio') return;

    let idleTimeout: ReturnType<typeof setTimeout>;

    const returnToMenu = () => {
      setIsImageZoomed(false);
      setSelectedService(null);
      setSearchQuery('');
      setCurrentTab('inicio');
      setSelectedCategory(null);
    };

    const resetIdleTimeout = () => {
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(returnToMenu, 2 * 60 * 1000);
    };

    const activityEvents: (keyof WindowEventMap)[] = [
      'pointerdown', 'pointermove', 'keydown', 'touchstart', 'scroll', 'wheel'
    ];

    resetIdleTimeout();
    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetIdleTimeout, { passive: true });
    });

    return () => {
      clearTimeout(idleTimeout);
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetIdleTimeout);
      });
    };
  }, [selectedService, currentTab]);

  const handleSelectService = (service: Service & { hidden?: boolean }) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const scrollContainer = document.getElementById('phone-main-scrollable-content');
    scrollContainer?.scrollTo({ top: 0, behavior: 'instant' });
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    setSelectedService(service);
  };

  const handleTabChange = (tab: 'inicio' | 'buscar' | 'noticias' | 'asistente') => {
    setCurrentTab(tab);
    setSelectedService(null);
    if (tab === 'inicio') {
      setSearchQuery('');
      setSelectedCategory(null);
    }
  };

  const goHome = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    setSelectedService(null);
    setSearchQuery('');
    setSelectedCategory(null);
    setCurrentTab('inicio');
  };

  return (
    <div id="app-root-layout" className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <main id="phone-wrapper-container" className="w-full min-h-screen flex flex-col relative">
        <div id="phone-screen-container" className="w-full flex-1 overflow-hidden flex flex-col relative">
          <div id="phone-main-scrollable-content" ref={scrollRef} className="flex-1 overflow-y-auto pt-2 sm:pt-3 relative pb-28">
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
              <div className={selectedService ? 'hidden' : ''}>
                <TopBar
                  showAdminButton={false}
                  currentTab={currentTab}
                  setCurrentTab={handleTabChange}
                  unreadNewsCount={unreadNewsCount}
                  searchQuery={searchQuery}
                  onSearch={(query) => {
                    setSearchQuery(query);
                    setCurrentTab('buscar');
                    setSelectedService(null);
                  }}
                  onGoHome={goHome}
                />
              </div>
              {selectedService ? (
                <div className="relative animate-fadeIn min-h-screen">
                  <div id="service-detail-backdrop" className="fixed inset-0 bg-slate-50 z-30 pointer-events-none" aria-hidden="true" />
                  <div className="relative z-40 w-full max-w-5xl mx-auto px-1 sm:px-3 py-1 sm:py-3">
                    <ServiceDetail
                      service={selectedService}
                      onBack={() => {
                        setSelectedService(null);
                        setIsImageZoomed(false);
                      }}
                      isAdminLoggedIn={false}
                      onLightboxToggle={setIsImageZoomed}
                    />
                  </div>
                </div>
              ) : (
                <>
                  {currentTab === 'inicio' && (
                    <div className="space-y-4 animate-fadeIn">
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          handleTabChange('buscar');
                          window.scrollTo({ top: 0, behavior: 'instant' });
                          scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
                        }}
                        className="w-full mb-6 relative flex items-center"
                      >
                        <div className="absolute left-4 sm:left-5 pointer-events-none flex items-center justify-center text-slate-400">
                          <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <input
                          type="text"
                          id="hero-search-input"
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                          onFocus={() => {
                            setCurrentTab('buscar');
                            setSelectedService(null);
                          }}
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck={false}
                          placeholder="Ej. Vacaciones, recibos de nómina, vales, incapacidad..."
                          className="w-full pl-12 sm:pl-14 pr-12 py-3.5 sm:py-4 bg-slate-50 focus:bg-white text-base sm:text-lg text-slate-800 placeholder:text-slate-400 font-medium rounded-2xl border border-slate-200 shadow-md hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
                            title="Borrar búsqueda"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </form>
                      <HomeTab
                        services={initialServices}
                        onSelectService={handleSelectService}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                        categories={defaultCategories}
                        settings={siteSettings}
                      />
                    </div>
                  )}

                  {currentTab === 'buscar' && (
                    <SearchTab
                      services={initialServices}
                      searchQuery={searchQuery}
                      onSearchQueryChange={setSearchQuery}
                      onSelectService={handleSelectService}
                      categories={defaultCategories}
                    />
                  )}

                  {currentTab === 'noticias' && (
                    <NewsTab newsList={initialNews} onUnreadCountChange={setUnreadNewsCount} />
                  )}

                  {currentTab === 'asistente' && <AsistenteTab contactInfo={initialContact} />}
                </>
              )}
            </div>
          </div>
          {!isImageZoomed && (
            <BottomNav
              currentTab={currentTab}
              setCurrentTab={handleTabChange}
              unreadNewsCount={unreadNewsCount}
            />
          )}
        </div>
      </main>
      <ScrollProgressBar className={isImageZoomed ? 'hidden' : ''} />
    </div>
  );
}
