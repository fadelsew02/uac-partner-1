import React from 'react';
import { Home, Users, FolderOpen, BarChart3, MessageSquare, Settings, Bell, Brain } from 'lucide-react';

interface MobileLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasNotifications?: boolean;
}

const tabs = [
  { id: 'dashboard', icon: Home, label: 'Accueil' },
  { id: 'partnerships', icon: Users, label: 'Partenariats' },
  { id: 'projects', icon: FolderOpen, label: 'Projets' },
  { id: 'analytics', icon: BarChart3, label: 'Analyse' },
  { id: 'collaboration', icon: MessageSquare, label: 'Collab' }
];

export function MobileLayout({ children, activeTab, onTabChange, hasNotifications }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto border-x">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-secondary-foreground text-sm font-bold">U</span>
          </div>
          <h1>UAC PartnerHub</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onTabChange('notifications')}
            className="p-2 hover:bg-primary/80 rounded-full relative"
          >
            <Bell className="w-5 h-5" />
            {hasNotifications && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-pulse-green" />
            )}
          </button>
          <button 
            onClick={() => onTabChange('ai-tools')}
            className="p-2 hover:bg-primary/80 rounded-full"
          >
            <Brain className="w-5 h-5 text-info" />
          </button>
          <button 
            onClick={() => onTabChange('profile')}
            className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center"
          >
            <span className="text-secondary-foreground text-sm">A</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-card border-t border-border px-2 py-2">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}