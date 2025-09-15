import React, { useState, useEffect } from 'react';
import { MobileLayout } from './components/MobileLayout';
import { Dashboard } from './components/Dashboard';
import { PartnershipManagement } from './components/PartnershipManagement';
import { ProjectTracking } from './components/ProjectTracking';
import { Analytics } from './components/Analytics';
import { NotificationCenter } from './components/NotificationCenter';
import { AITools } from './components/AITools';
import { AuthScreen } from './components/AuthScreen';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hasNotifications, setHasNotifications] = useState(true);

  // Mock data for demonstrating role-based personalization
  const getRoleBasedWelcome = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Tableau de bord administrateur - Vue complète sur tous les partenariats';
      case 'professor':
        return 'Espace professeur - Vos projets et collaborations';
      case 'student':
        return 'Portail étudiant - Vos candidatures et échanges';
      default:
        return 'Bienvenue sur UAC PartnerHub';
    }
  };

  const handleLogin = (role: string) => {
    setUserRole(role);
    setIsAuthenticated(true);
    toast.success(`Connexion réussie en tant que ${role}`, {
      description: getRoleBasedWelcome(role),
      duration: 3000
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setActiveTab('dashboard');
    toast.info('Déconnexion réussie');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Mock notification clearing when visiting notification center
    if (tab === 'notifications') {
      setTimeout(() => {
        setHasNotifications(false);
      }, 1000);
    }
  };

  const handleAddPartnership = () => {
    setActiveTab('partnerships');
    toast.success('Redirection vers la gestion des partenariats');
  };

  const handleViewDetails = (type: string, id?: string) => {
    switch (type) {
      case 'partnerships':
        setActiveTab('partnerships');
        break;
      case 'projects':
        setActiveTab('projects');
        break;
      case 'analytics':
        setActiveTab('analytics');
        break;
      default:
        console.log(`Viewing ${type} details`, id);
    }
  };

  const handleNotificationAction = (notificationId: string, action: string) => {
    toast.info(`Action "${action}" sur la notification ${notificationId}`);
  };

  // Mock periodic notifications for demo
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        setHasNotifications(true);
      }, 30000); // New notification every 30 seconds for demo

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  const renderCurrentScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            onAddPartnership={handleAddPartnership}
            onViewDetails={handleViewDetails}
          />
        );
      case 'partnerships':
        return (
          <PartnershipManagement 
            onBack={() => setActiveTab('dashboard')}
          />
        );
      case 'projects':
        return (
          <ProjectTracking 
            onBack={() => setActiveTab('dashboard')}
          />
        );
      case 'analytics':
        return (
          <Analytics 
            onBack={() => setActiveTab('dashboard')}
          />
        );
      case 'collaboration':
        return (
          <div className="p-4 space-y-6">
            <div className="text-center py-8">
              <h2>Collaboration d'Équipe</h2>
              <p className="text-muted-foreground mt-2">
                Chat en temps réel et partage de documents
              </p>
              <div className="mt-6 p-6 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Fonctionnalité en cours de développement
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Bientôt : Chat temps réel, partage de fichiers, notifications d'équipe
                </p>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <NotificationCenter 
            onBack={() => setActiveTab('dashboard')}
            onNotificationAction={handleNotificationAction}
          />
        );
      case 'ai-tools':
        return (
          <AITools 
            onBack={() => setActiveTab('dashboard')}
          />
        );
      case 'profile':
        return (
          <div className="p-4 space-y-6">
            <h2>Profil Utilisateur</h2>
            <div className="space-y-4">
              <div className="text-center py-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground text-2xl font-bold">
                    {userRole.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3>Utilisateur {userRole}</h3>
                <p className="text-muted-foreground">UAC PartnerHub</p>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium">Rôle actuel</h4>
                  <p className="text-sm text-muted-foreground capitalize">{userRole}</p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium">Accès aux fonctionnalités</h4>
                  <div className="text-sm text-muted-foreground mt-2">
                    {userRole === 'admin' && '✓ Accès complet • ✓ Gestion utilisateurs • ✓ Analytics avancés'}
                    {userRole === 'professor' && '✓ Gestion projets • ✓ Collaboration • ✓ Rapports'}
                    {userRole === 'student' && '✓ Candidatures • ✓ Suivi statut • ✓ Communications'}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="w-full mt-6 p-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        );
      default:
        return (
          <Dashboard 
            onAddPartnership={handleAddPartnership}
            onViewDetails={handleViewDetails}
          />
        );
    }
  };

  return (
    <>
      <MobileLayout
        activeTab={activeTab}
        onTabChange={handleTabChange}
        hasNotifications={hasNotifications}
      >
        {renderCurrentScreen()}
      </MobileLayout>
      <Toaster 
        richColors
        position="top-center"
        className="toaster-mobile"
      />
    </>
  );
}