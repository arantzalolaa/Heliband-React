import { Home, Clock, User } from 'lucide-react';

interface BottomNavProps {
  currentView: 'dashboard' | 'historical' | 'profile';
  onNavigate: (view: 'dashboard' | 'historical' | 'profile') => void;
}

export function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard' as const, icon: Home, label: 'Inicio' },
    { id: 'historical' as const, icon: Clock, label: 'Historial' },
    { id: 'profile' as const, icon: User, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl z-50">
      <div className="max-w-md mx-auto px-6 py-2 pb-4">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 py-3 px-5 rounded-2xl transition-all active:scale-95 ${
                  isActive 
                    ? 'text-orange-500 bg-orange-50' 
                    : 'text-gray-400 hover:text-gray-600 active:bg-gray-50'
                }`}
              >
                <Icon size={26} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
