import { App } from '@/types/app';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Separator } from '../components/ui/separator';

interface AppModalProps {
  app: App | null;
  isOpen: boolean;
  onClose: () => void;
  recentApps: App[];
  onRecentAppClick: (app: App) => void;
}

export const AppModal = ({
  app,
  isOpen,
  onClose,
  recentApps,
  onRecentAppClick,
}: AppModalProps) => {
  if (!app) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: app.color }}
            >
              <img
                src={app.icon}
                alt={`${app.name} icon`}
                className="w-10 h-10 object-contain"
              />
            </div>
            <DialogTitle className="text-2xl font-bold text-card-foreground">
              {app.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <p className="text-muted-foreground mb-4">
              Integre <strong>{app.name}</strong> com centenas de outras ferramentas através da Pluga.
              Automatize tarefas e economize tempo conectando seus aplicativos favoritos.
            </p>
            <Button
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => window.open(app.link, '_blank')}
            >
              Ver integrações disponíveis
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {recentApps.length > 0 && (
            <>
              <Separator className="bg-border" />
              <div>
                <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                  Últimas ferramentas visualizadas
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {recentApps.map((recentApp) => (
                    <button
                      key={recentApp.app_id}
                      onClick={() => onRecentAppClick(recentApp)}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-secondary transition-colors group"
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ backgroundColor: recentApp.color }}
                      >
                        <img
                          src={recentApp.icon}
                          alt={`${recentApp.name} icon`}
                          className="w-7 h-7 object-contain"
                        />
                      </div>
                      <span className="text-xs font-medium text-center text-card-foreground line-clamp-2">
                        {recentApp.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
