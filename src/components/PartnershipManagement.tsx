import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, 
  Plus, 
  Filter, 
  Users, 
  Calendar, 
  MapPin, 
  FileText,
  Edit3,
  Trash2,
  Brain,
  Share2
} from 'lucide-react';

interface Partnership {
  id: string;
  name: string;
  type: string;
  status: 'Actif' | 'En cours' | 'Planifié' | 'Terminé';
  region: string;
  startDate: string;
  endDate: string;
  description: string;
  documents: string[];
  progress: number;
}

const mockPartnerships: Partnership[] = [
  {
    id: '1',
    name: 'Université de Lomé',
    type: 'Recherche',
    status: 'Actif',
    region: 'Togo',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    description: 'Collaboration en recherche agricole durable',
    documents: ['contrat.pdf', 'budget.xlsx'],
    progress: 75
  },
  {
    id: '2',
    name: 'IRSP Ouidah',
    type: 'Formation',
    status: 'En cours',
    region: 'Bénin',
    startDate: '2024-03-01',
    endDate: '2024-08-30',
    description: 'Programme d\'échange étudiant',
    documents: ['accord.pdf'],
    progress: 45
  },
  {
    id: '3',
    name: 'Université de Cotonou',
    type: 'Échange',
    status: 'Planifié',
    region: 'Bénin',
    startDate: '2024-09-01',
    endDate: '2025-06-30',
    description: 'Échange de professeurs et étudiants',
    documents: ['proposition.pdf'],
    progress: 25
  }
];

interface PartnershipManagementProps {
  onBack: () => void;
}

export function PartnershipManagement({ onBack }: PartnershipManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null);
  const [newPartnership, setNewPartnership] = useState({
    name: '',
    type: '',
    region: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const filteredPartnerships = mockPartnerships.filter(partnership => {
    const matchesSearch = partnership.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partnership.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || partnership.type === filterType;
    const matchesStatus = filterStatus === 'all' || partnership.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddPartnership = () => {
    // Mock add functionality
    console.log('Adding partnership:', newPartnership);
    setIsAddDialogOpen(false);
    setNewPartnership({
      name: '',
      type: '',
      region: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'bg-success text-success-foreground';
      case 'En cours': return 'bg-warning text-warning-foreground';
      case 'Planifié': return 'bg-info text-info-foreground';
      case 'Terminé': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (selectedPartnership) {
    return (
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setSelectedPartnership(null)}>
            ← Retour
          </Button>
          <h2 className="flex-1">{selectedPartnership.name}</h2>
          <Button size="sm" variant="outline">
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>

        {/* Partnership Details */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3>{selectedPartnership.name}</h3>
                <p className="text-muted-foreground">{selectedPartnership.type}</p>
                <Badge className={getStatusColor(selectedPartnership.status)}>
                  {selectedPartnership.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Région</Label>
                <p className="flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {selectedPartnership.region}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Durée</Label>
                <p className="flex items-center gap-1 mt-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedPartnership.startDate).toLocaleDateString()} - {new Date(selectedPartnership.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground">Description</Label>
              <p className="mt-1">{selectedPartnership.description}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Documents</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedPartnership.documents.map((doc, index) => (
                  <Badge key={index} variant="outline" className="cursor-pointer">
                    <FileText className="w-3 h-3 mr-1" />
                    {doc}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <Button className="w-full" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Partager avec l'équipe
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Brain className="w-4 h-4 mr-2 text-info" />
                Obtenir des recommandations IA
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2>Gestion des Partenariats</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-4">
            <DialogHeader>
              <DialogTitle>Nouveau Partenariat</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name">Nom de l'institution</Label>
                <Input
                  id="name"
                  value={newPartnership.name}
                  onChange={(e) => setNewPartnership({...newPartnership, name: e.target.value})}
                  placeholder="Ex: Université de Lomé"
                />
              </div>
              <div>
                <Label htmlFor="type">Type de partenariat</Label>
                <Select 
                  value={newPartnership.type} 
                  onValueChange={(value) => setNewPartnership({...newPartnership, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Recherche">Recherche</SelectItem>
                    <SelectItem value="Formation">Formation</SelectItem>
                    <SelectItem value="Échange">Échange</SelectItem>
                    <SelectItem value="Technique">Technique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="region">Région</Label>
                <Input
                  id="region"
                  value={newPartnership.region}
                  onChange={(e) => setNewPartnership({...newPartnership, region: e.target.value})}
                  placeholder="Ex: Togo"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="startDate">Date début</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newPartnership.startDate}
                    onChange={(e) => setNewPartnership({...newPartnership, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Date fin</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newPartnership.endDate}
                    onChange={(e) => setNewPartnership({...newPartnership, endDate: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPartnership.description}
                  onChange={(e) => setNewPartnership({...newPartnership, description: e.target.value})}
                  placeholder="Décrivez les objectifs du partenariat"
                  rows={3}
                />
              </div>
              <Button onClick={handleAddPartnership} className="w-full">
                Créer le partenariat
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un partenariat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous types</SelectItem>
              <SelectItem value="Recherche">Recherche</SelectItem>
              <SelectItem value="Formation">Formation</SelectItem>
              <SelectItem value="Échange">Échange</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous statuts</SelectItem>
              <SelectItem value="Actif">Actif</SelectItem>
              <SelectItem value="En cours">En cours</SelectItem>
              <SelectItem value="Planifié">Planifié</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Partnerships List */}
      <div className="space-y-3">
        {filteredPartnerships.map((partnership, index) => (
          <Card 
            key={partnership.id} 
            className="cursor-pointer hover:shadow-md transition-shadow animate-growth"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedPartnership(partnership)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium truncate">{partnership.name}</h4>
                      <p className="text-sm text-muted-foreground">{partnership.type}</p>
                    </div>
                    <Badge className={getStatusColor(partnership.status)}>
                      {partnership.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {partnership.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {partnership.region}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(partnership.startDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {partnership.documents.length} docs
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPartnerships.length === 0 && (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-muted-foreground">Aucun partenariat trouvé</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}
    </div>
  );
}