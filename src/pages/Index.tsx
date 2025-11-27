import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { App } from "@/types/app";
import { SearchBar } from "../components/SearchBar";
import { AppCard } from "../components/AppCard";
import { AppModal } from "../components/AppModal";
import { Pagination } from "../components/Pagination";
import { useRecentApps } from "../hooks/useRecentApps";
import { Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = parseInt(import.meta.env.VITE_ITEMS_PER_PAGE, 10);
const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchApps = async (): Promise<App[]> => {
  try {
    const response = await fetch(`${BASE_URL}/ferramentas_search.json`);
    if (!response.ok) {
      throw new Error("Failed to fetch apps");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching apps:", error);
    throw error;
  }
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { recentApps, addRecentApp } = useRecentApps();

  const {
    data: apps = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
  });

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return apps;
    const query = searchQuery.toLowerCase();
    return apps.filter((app) => app.name.toLowerCase().includes(query));
  }, [apps, searchQuery]);

  const totalPages = Math.ceil(filteredApps.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedApps = filteredApps.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleAppClick = (app: App) => {
    setSelectedApp(app);
    setIsModalOpen(true);
    addRecentApp(app);
  };

  const handleRecentAppClick = (app: App) => {
    setSelectedApp(app);
    addRecentApp(app);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="flex justify-center">
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
          </div>
        </header>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive text-lg">
              Erro ao carregar ferramentas. Tente novamente mais tarde.
            </p>
          </div>
        )}

        {!isLoading && !error && paginatedApps.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              {searchQuery
                ? "Nenhuma ferramenta encontrada. Tente outra busca."
                : "Nenhuma ferramenta disponível."}
            </p>
          </div>
        )}

        {!isLoading && !error && paginatedApps.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedApps.map((app) => (
                <AppCard
                  key={app.app_id}
                  app={app}
                  onClick={() => handleAppClick(app)}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      <AppModal
        app={selectedApp}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recentApps={recentApps.filter((a) => a.app_id !== selectedApp?.app_id)}
        onRecentAppClick={handleRecentAppClick}
      />
    </div>
  );
};

export default Index;
