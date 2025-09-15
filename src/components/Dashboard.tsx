import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Users, 
  FolderOpen, 
  TrendingUp, 
  Bell, 
  Plus, 
  ChevronRight,
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface DashboardProps {
  onAddPartnership: () => void;
  onViewDetails: (type: string, id?: string) => void;
}

const mockData = {
  stats: {
    activePartnerships: 15,
    ongoingProjects: 8,
    completedProjects: 23,
    pendingTasks: 12
  },
  recentPartnerships: [
    {
      id: '1',
      name: 'Université de Lomé',
      type: 'Recherche',
      status: 'Actif',
      progress: 75,
      lastUpdate: '2 jours'
    },
    {
      id: '2',
      name: 'IRSP Ouidah',
      type: 'Formation',
      status: 'En cours',
      progress: 45,
      lastUpdate: '1 semaine'
    },
    {
      id: '3',
      name: 'Université de Cotonou',
      type: 'Échange',
      status: 'Planifié',
      progress: 25,
      lastUpdate: '3 jours'
    }
  ],
  aiInsights: [
    {
      type: 'recommendation',
      title: 'Nouveau partenaire suggéré',
      description: 'ENSAI - 85% de compatibilité',
      priority: 'high'
    },
    {
      type: 'alert',
      title: 'Échéance approche',
      description: 'Projet Lomé dans 5 jours',
      priority: 'medium'
    }
  ]
};

export function Dashboard({ onAddPartnership, onViewDetails }: DashboardProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6">
        <div className="relative z-10">
          <h2>Bienvenue sur PartnerHub</h2>
          <p className="mt-2 opacity-90">
            Gérez vos partenariats universitaires avec intelligence
          </p>
        </div>
        <div className="absolute right-0 top-0 opacity-20">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1645263012668-a6617115f9b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdW5pdmVyc2l0eSUyMHN0dWRlbnRzJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NTc5NTc3MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Collaboration universitaire"
            className="w-32 h-24 object-cover rounded"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="animate-growth">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Partenariats</p>
                <p className="text-2xl font-bold text-primary">{mockData.stats.activePartnerships}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-growth" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Projets</p>
                <p className="text-2xl font-bold text-primary">{mockData.stats.ongoingProjects}</p>
              </div>
              <FolderOpen className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-growth" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Terminés</p>
                <p className="text-2xl font-bold text-success">{mockData.stats.completedProjects}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-growth" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tâches</p>
                <p className="text-2xl font-bold text-warning">{mockData.stats.pendingTasks}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-info" />
            Insights IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockData.aiInsights.map((insight, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-3 bg-muted rounded-lg animate-slide-geometric"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {insight.type === 'recommendation' ? (
                <TrendingUp className="w-5 h-5 text-info mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className="font-medium text-sm">{insight.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
              </div>
              <Badge variant={insight.priority === 'high' ? 'default' : 'secondary'} className="animate-pulse-green">
                {insight.priority === 'high' ? 'Priorité' : 'Info'}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Partnerships */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Partenariats Récents</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onViewDetails('partnerships')}
            >
              Voir tout
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockData.recentPartnerships.map((partnership, index) => (
            <div 
              key={partnership.id}
              className="flex items-center gap-3 p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors animate-growth"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onViewDetails('partnership', partnership.id)}
            >
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{partnership.name}</h4>
                <p className="text-xs text-muted-foreground">{partnership.type} • {partnership.lastUpdate}</p>
                <div className="mt-2">
                  <Progress value={partnership.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{partnership.progress}% complété</p>
                </div>
              </div>
              <Badge 
                variant={partnership.status === 'Actif' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {partnership.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="pb-6">
        <h3 className="mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={onAddPartnership} className="h-auto p-4 flex flex-col gap-2">
            <Plus className="w-6 h-6" />
            <span className="text-sm">Nouveau Partenariat</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onViewDetails('projects')}
            className="h-auto p-4 flex flex-col gap-2"
          >
            <FolderOpen className="w-6 h-6" />
            <span className="text-sm">Gérer Projets</span>
          </Button>
        </div>
      </div>
    </div>
  );
}