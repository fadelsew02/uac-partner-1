import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Bell, 
  Brain, 
  Users, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Trash2,
  Settings,
  Filter
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'reminder' | 'ai' | 'team' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionRequired?: boolean;
  relatedItem?: {
    type: string;
    id: string;
    name: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'reminder',
    title: 'Échéance projet proche',
    message: 'Le projet "Recherche Agricole" avec l\'Université de Lomé se termine dans 5 jours.',
    timestamp: '2024-01-20T10:30:00Z',
    read: false,
    priority: 'high',
    actionRequired: true,
    relatedItem: {
      type: 'project',
      id: '1',
      name: 'Recherche Agricole'
    }
  },
  {
    id: '2',
    type: 'ai',
    title: 'Nouveau partenaire suggéré',
    message: 'L\'IA a identifié ENSAI comme partenaire potentiel avec 85% de compatibilité pour vos projets de formation.',
    timestamp: '2024-01-20T09:15:00Z',
    read: false,
    priority: 'medium',
    actionRequired: true,
    relatedItem: {
      type: 'recommendation',
      id: '2',
      name: 'ENSAI'
    }
  },
  {
    id: '3',
    type: 'team',
    title: 'Nouveau message d\'équipe',
    message: 'Dr. Kokou a partagé un document dans le projet "Échange Étudiant".',
    timestamp: '2024-01-20T08:45:00Z',
    read: false,
    priority: 'medium',
    actionRequired: false,
    relatedItem: {
      type: 'project',
      id: '2',
      name: 'Échange Étudiant'
    }
  },
  {
    id: '4',
    type: 'ai',
    title: 'Alerte budget',
    message: 'Le projet avec IRSP Ouidah utilise 78% de son budget avec 45% d\'avancement.',
    timestamp: '2024-01-20T08:00:00Z',
    read: true,
    priority: 'high',
    actionRequired: true,
    relatedItem: {
      type: 'project',
      id: '2',
      name: 'Formation IRSP'
    }
  },
  {
    id: '5',
    type: 'system',
    title: 'Rapport mensuel disponible',
    message: 'Votre rapport d\'activité de janvier est prêt à être consulté.',
    timestamp: '2024-01-20T07:30:00Z',
    read: true,
    priority: 'low',
    actionRequired: false
  },
  {
    id: '6',
    type: 'reminder',
    title: 'Réunion planifiée',
    message: 'Réunion de suivi avec l\'équipe UAC-Lomé prévue demain à 14h.',
    timestamp: '2024-01-19T16:00:00Z',
    read: true,
    priority: 'medium',
    actionRequired: false,
    relatedItem: {
      type: 'meeting',
      id: '3',
      name: 'Suivi UAC-Lomé'
    }
  }
];

interface NotificationCenterProps {
  onBack: () => void;
  onNotificationAction: (notificationId: string, action: string) => void;
}

export function NotificationCenter({ onBack, onNotificationAction }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder': return Calendar;
      case 'ai': return Brain;
      case 'team': return Users;
      case 'system': return Settings;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'reminder': return 'text-warning';
      case 'ai': return 'text-info';
      case 'team': return 'text-primary';
      case 'system': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'À l\'instant';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    if (diffInHours < 48) return 'Hier';
    return date.toLocaleDateString('fr-FR');
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notif.read;
    return notif.type === activeTab;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2>Notifications</h2>
          {unreadCount > 0 && (
            <Badge className="bg-destructive text-destructive-foreground animate-pulse-green">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Tout lire
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll}>
            <Trash2 className="w-4 h-4 mr-2" />
            Effacer
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 text-xs">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="unread">Non lues</TabsTrigger>
          <TabsTrigger value="ai">IA</TabsTrigger>
          <TabsTrigger value="reminder">Rappels</TabsTrigger>
          <TabsTrigger value="team">Équipe</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-3 mt-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-muted-foreground">Aucune notification</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Vous êtes à jour !
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <Card 
                  key={notification.id}
                  className={`cursor-pointer transition-all animate-growth ${
                    !notification.read 
                      ? 'border-l-4 border-l-primary bg-muted/30' 
                      : 'opacity-75'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-muted ${getNotificationColor(notification.type)}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getPriorityColor(notification.priority)}`}
                            >
                              {notification.priority === 'high' ? 'Urgent' : 
                               notification.priority === 'medium' ? 'Important' : 'Info'}
                            </Badge>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-green" />
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          
                          <div className="flex gap-2">
                            {notification.actionRequired && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNotificationAction(notification.id, 'view');
                                }}
                              >
                                Voir
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        {notification.relatedItem && (
                          <div className="mt-2 p-2 bg-background rounded text-xs">
                            <span className="text-muted-foreground">Lié à: </span>
                            <span className="font-medium">{notification.relatedItem.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      {unreadCount > 0 && (
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Actions rapides</h4>
                <p className="text-sm opacity-90">{unreadCount} notifications non lues</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={markAllAsRead}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Tout marquer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}