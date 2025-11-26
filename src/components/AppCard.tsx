import { App } from '../types/app';
import { Card } from '../components/ui/card';

interface AppCardProps {
  app: App;
  onClick: () => void;
}

export const AppCard = ({ app, onClick }: AppCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={{
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div className="p-6 flex flex-col items-center gap-4 h-full">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: app.color }}
        >
          <img
            src={app.icon}
            alt={`${app.name} icon`}
            className="w-12 h-12 object-contain"
            loading="lazy"
          />
        </div>
        <h3 className="text-lg font-semibold text-center text-card-foreground group-hover:text-primary transition-colors">
          {app.name}
        </h3>
      </div>
    </Card>
  );
};
