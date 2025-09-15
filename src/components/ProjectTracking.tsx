import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  FolderOpen, 
  Calendar, 
  Users, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Plus,
  Bell
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  partnership: string;
  progress: number;
  status: 'En cours' | 'Terminé' | 'En retard' | 'Planifié';
  dueDate: string;
  budget: {
    allocated: number;
    spent: number;
  };
  tasks: Task[];
  team: TeamMember[];
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Programme de Recherche Agricole',
    partnership: 'Université de Lomé',
    progress: 75,
    status: 'En cours',
    dueDate: '2024-12-31',
    budget: {
      allocated: 50000,
      spent: 35000
    },
    tasks: [
      { id: '1', title: 'Collecte de données terrain', completed: true, dueDate: '2024-02-15', priority: 'high' },
      { id: '2', title: 'Analyse statistique', completed: true, dueDate: '2024-03-01', priority: 'medium' },
      { id: '3', title: 'Rédaction rapport intermédiaire', completed: false, dueDate: '2024-01-25', priority: 'high' },
      { id: '4', title: 'Présentation résultats', completed: false, dueDate: '2024-02-10', priority: 'medium' }
    ],
    team: [
      { id: '1', name: 'Dr. Kokou', role: 'Chef de projet', avatar: 'K' },
      { id: '2', name: 'Mme Assou', role: 'Analyste', avatar: 'A' },
      { id: '3', name: 'M. Djibril', role: 'Chercheur', avatar: 'D' }
    ]
  },
  {
    id: '2',
    name: 'Échange Étudiant',
    partnership: 'IRSP Ouidah',
    progress: 45,
    status: 'En cours',
    dueDate: '2024-08-30',
    budget: {
      allocated: 25000,
      spent: 12000
    },
    tasks: [
      { id: '5', title: 'Sélection des étudiants', completed: true, dueDate: '2024-01-15', priority: 'high' },
      { id: '6', title: 'Préparation logistique', completed: false, dueDate: '2024-01-28', priority: 'high' },
      { id: '7', title: 'Orientation étudiants', completed: false, dueDate: '2024-02-05', priority: 'medium' }
    ],
    team: [
      { id: '4', name: 'Prof. Ablode', role: 'Coordinateur', avatar: 'A' },
      { id: '5', name: 'Mme Fatou', role: 'Assistant', avatar: 'F' }
    ]
  }
];

interface ProjectTrackingProps {
  onBack: () => void;
}

export function ProjectTracking({ onBack }: ProjectTrackingProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  React.useEffect(() => {
    if (selectedProject) {
      setTasks(selectedProject.tasks);
    }
  }, [selectedProject]);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'bg-info text-info-foreground';
      case 'Terminé': return 'bg-success text-success-foreground';
      case 'En retard': return 'bg-destructive text-destructive-foreground';
      case 'Planifié': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-success';
      default: return 'border-l-muted';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (selectedProject) {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const budgetPercentage = (selectedProject.budget.spent / selectedProject.budget.allocated) * 100;

    return (
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setSelectedProject(null)}>
            ← Retour
          </Button>
          <h2 className="flex-1">{selectedProject.name}</h2>
          <Button size="sm" variant="outline">
            <Bell className="w-4 h-4" />
          </Button>
        </div>

        {/* Project Overview */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3>{selectedProject.name}</h3>
                <p className="text-muted-foreground">{selectedProject.partnership}</p>
              </div>
              <Badge className={getStatusColor(selectedProject.status)}>
                {selectedProject.status}
              </Badge>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progression générale</span>
                  <span>{selectedProject.progress}%</span>
                </div>
                <Progress value={selectedProject.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Échéance</p>
                  <p className="text-sm font-medium">
                    {getDaysUntilDue(selectedProject.dueDate)} jours
                  </p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <CheckCircle className="w-5 h-5 mx-auto mb-1 text-success" />
                  <p className="text-xs text-muted-foreground">Tâches</p>
                  <p className="text-sm font-medium">
                    {completedTasks}/{totalTasks}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget Tracking */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-warning" />
              Suivi Budgétaire
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Dépensé</span>
              <span>{budgetPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={budgetPercentage} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatCurrency(selectedProject.budget.spent)}</span>
              <span>{formatCurrency(selectedProject.budget.allocated)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Équipe Projet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedProject.team.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{member.name}</h4>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Tâches ({completedTasks}/{totalTasks})
              </span>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={`flex items-start gap-3 p-3 bg-muted rounded-lg border-l-4 ${getPriorityColor(task.priority)}`}
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <h4 className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                    {getDaysUntilDue(task.dueDate) < 0 && !task.completed && (
                      <span className="flex items-center gap-1 text-destructive">
                        <AlertTriangle className="w-3 h-3" />
                        En retard
                      </span>
                    )}
                    {getDaysUntilDue(task.dueDate) <= 3 && getDaysUntilDue(task.dueDate) >= 0 && !task.completed && (
                      <span className="flex items-center gap-1 text-warning">
                        <Clock className="w-3 h-3" />
                        Urgent
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2>Suivi des Projets</h2>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="animate-growth">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En cours</p>
                <p className="text-2xl font-bold text-primary">
                  {mockProjects.filter(p => p.status === 'En cours').length}
                </p>
              </div>
              <FolderOpen className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-growth" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Terminés</p>
                <p className="text-2xl font-bold text-success">
                  {mockProjects.filter(p => p.status === 'Terminé').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {mockProjects.map((project, index) => (
          <Card 
            key={project.id} 
            className="cursor-pointer hover:shadow-md transition-shadow animate-growth"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedProject(project)}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">{project.partnership}</p>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Échéance: {new Date(project.dueDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {project.team.length} membres
                  </span>
                </div>

                {getDaysUntilDue(project.dueDate) <= 7 && (
                  <div className="flex items-center gap-1 text-warning text-xs">
                    <AlertTriangle className="w-3 h-3" />
                    Échéance dans {getDaysUntilDue(project.dueDate)} jours
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}