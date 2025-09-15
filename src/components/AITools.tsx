import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  ThumbsUp, 
  ThumbsDown,
  MessageSquare,
  Mic,
  Send,
  Sparkles,
  Target,
  BarChart3,
  Users,
  Calendar,
  HelpCircle
} from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'partner' | 'project' | 'budget' | 'timeline';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  reason: string;
  actionItems: string[];
  data?: any;
}

interface Prediction {
  id: string;
  title: string;
  prediction: string;
  probability: number;
  timeframe: string;
  riskLevel: 'low' | 'medium' | 'high';
  mitigation?: string[];
}

const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    type: 'partner',
    title: 'Partenariat avec ENSAI recommandé',
    description: 'École Nationale Supérieure d\'Agriculture et d\'Industries Alimentaires',
    confidence: 85,
    impact: 'high',
    reason: 'Forte compatibilité basée sur les domaines de recherche agricole et les projets passés',
    actionItems: [
      'Initier un contact avec le département de recherche',
      'Préparer une proposition de collaboration',
      'Organiser une réunion de présentation'
    ],
    data: {
      matchingFields: ['Agriculture durable', 'Sécurité alimentaire', 'Innovation agricole'],
      potentialProjects: 3,
      estimatedBudget: 75000
    }
  },
  {
    id: '2',
    type: 'budget',
    title: 'Optimisation budgétaire détectée',
    description: 'Économies potentielles sur les projets en cours',
    confidence: 92,
    impact: 'medium',
    reason: 'Analyse des dépenses révèle des opportunités d\'optimisation sans impact sur la qualité',
    actionItems: [
      'Réviser les contrats de services',
      'Négocier les tarifs fournisseurs',
      'Réallouer les ressources excédentaires'
    ],
    data: {
      potentialSavings: 12000,
      affectedProjects: 2,
      savingsPercentage: 12
    }
  },
  {
    id: '3',
    type: 'timeline',
    title: 'Risque de retard identifié',
    description: 'Projet "Recherche Agricole" pourrait être en retard',
    confidence: 78,
    impact: 'high',
    reason: 'Taux d\'avancement actuel insuffisant par rapport aux échéances',
    actionItems: [
      'Réunion d\'urgence avec l\'équipe',
      'Révision du planning',
      'Allocation de ressources supplémentaires'
    ],
    data: {
      currentProgress: 45,
      expectedProgress: 65,
      daysRemaining: 45
    }
  }
];

const mockPredictions: Prediction[] = [
  {
    id: '1',
    title: 'Croissance des partenariats',
    prediction: 'Augmentation de 15% des nouveaux partenariats',
    probability: 85,
    timeframe: '6 prochains mois',
    riskLevel: 'low'
  },
  {
    id: '2',
    title: 'Contrainte budgétaire',
    prediction: 'Possible dépassement budgétaire sur 2 projets',
    probability: 72,
    timeframe: '3 prochains mois',
    riskLevel: 'high',
    mitigation: [
      'Surveillance hebdomadaire des dépenses',
      'Révision des scopes de projet',
      'Négociation avec les partenaires'
    ]
  },
  {
    id: '3',
    title: 'Demande d\'échanges étudiants',
    prediction: 'Pic de demandes en septembre (+40%)',
    probability: 90,
    timeframe: '8 mois',
    riskLevel: 'medium',
    mitigation: [
      'Préparation des capacités d\'accueil',
      'Formation du personnel',
      'Partenariats additionnels'
    ]
  }
];

interface AIToolsProps {
  onBack: () => void;
}

export function AITools({ onBack }: AIToolsProps) {
  const [activeSection, setActiveSection] = useState('recommendations');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: 'Bonjour ! Je suis votre assistant IA pour UAC PartnerHub. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date()
    }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [automationSettings, setAutomationSettings] = useState({
    autoReports: true,
    smartReminders: true,
    budgetAlerts: true,
    partnerSuggestions: false
  });

  const handleRecommendationAction = (recommendationId: string, action: 'accept' | 'reject') => {
    console.log(`${action} recommendation ${recommendationId}`);
    // Mock action handling
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const userMessage = {
      type: 'user',
      message: chatMessage,
      timestamp: new Date()
    };

    // Mock AI response
    const aiResponses = [
      'Basé sur vos données, je recommande de contacter l\'Université de Parakou pour un partenariat en agriculture.',
      'Votre taux de réussite des projets est de 87%, ce qui est excellent ! Voulez-vous voir les détails ?',
      'J\'ai identifié 3 opportunités d\'optimisation budgétaire. Souhaitez-vous les examiner ?',
      'Le projet avec l\'IRSP Ouidah progresse bien. Prochaine étape : finaliser les documents.',
      'Analyse terminée. Vos partenariats sont diversifiés et équilibrés géographiquement.'
    ];

    const aiMessage = {
      type: 'ai',
      message: aiResponses[Math.floor(Math.random() * aiResponses.length)],
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage, aiMessage]);
    setChatMessage('');
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Mock voice input
    if (!isListening) {
      setTimeout(() => {
        setChatMessage('Montre-moi les recommandations pour de nouveaux partenariats');
        setIsListening(false);
      }, 2000);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-info text-info-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-info/10 rounded-lg">
          <Brain className="w-6 h-6 text-info" />
        </div>
        <div>
          <h2>Outils IA</h2>
          <p className="text-sm text-muted-foreground">Intelligence artificielle pour optimiser vos partenariats</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'recommendations', label: 'Recommandations', icon: Target },
          { id: 'predictions', label: 'Prédictions', icon: TrendingUp },
          { id: 'chat', label: 'Assistant IA', icon: MessageSquare },
          { id: 'automation', label: 'Automatisation', icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeSection === tab.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveSection(tab.id)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Recommendations Section */}
      {activeSection === 'recommendations' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3>Recommandations Personnalisées</h3>
            <Badge className="bg-info text-info-foreground">
              {mockRecommendations.length} disponibles
            </Badge>
          </div>

          {mockRecommendations.map((rec, index) => (
            <Card key={rec.id} className="animate-growth" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{rec.title}</h4>
                      <Badge className={getImpactColor(rec.impact)}>
                        Impact {rec.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Niveau de confiance</span>
                        <span className="font-medium">{rec.confidence}%</span>
                      </div>
                      <Progress value={rec.confidence} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-3 rounded-lg text-sm">
                  <strong>Raison :</strong> {rec.reason}
                </div>

                <div>
                  <Label className="text-sm font-medium">Actions suggérées :</Label>
                  <ul className="mt-2 space-y-1">
                    {rec.actionItems.map((action, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                {rec.data && (
                  <div className="grid grid-cols-2 gap-4 text-sm bg-background p-3 rounded-lg">
                    {rec.type === 'partner' && (
                      <>
                        <div>
                          <span className="text-muted-foreground">Domaines communs</span>
                          <p className="font-medium">{rec.data.matchingFields.length}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Budget estimé</span>
                          <p className="font-medium">{rec.data.estimatedBudget.toLocaleString()} FCFA</p>
                        </div>
                      </>
                    )}
                    {rec.type === 'budget' && (
                      <>
                        <div>
                          <span className="text-muted-foreground">Économies</span>
                          <p className="font-medium text-success">{rec.data.potentialSavings.toLocaleString()} FCFA</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Pourcentage</span>
                          <p className="font-medium">{rec.data.savingsPercentage}%</p>
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleRecommendationAction(rec.id, 'accept')}
                    className="flex items-center gap-2"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Accepter
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRecommendationAction(rec.id, 'reject')}
                    className="flex items-center gap-2"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    Rejeter
                  </Button>
                  <Button variant="ghost" size="sm">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Plus d'infos
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Predictions Section */}
      {activeSection === 'predictions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3>Analyse Prédictive</h3>
            <Badge className="bg-warning text-warning-foreground">
              Basé sur TensorFlow
            </Badge>
          </div>

          {mockPredictions.map((pred, index) => (
            <Card key={pred.id} className="animate-growth" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{pred.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{pred.prediction}</p>
                  </div>
                  <Badge className={getRiskColor(pred.riskLevel)}>
                    Risque {pred.riskLevel}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Probabilité</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={pred.probability} className="h-2 flex-1" />
                      <span className="font-medium">{pred.probability}%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Horizon</span>
                    <p className="font-medium">{pred.timeframe}</p>
                  </div>
                </div>

                {pred.mitigation && (
                  <div>
                    <Label className="text-sm font-medium">Actions préventives :</Label>
                    <ul className="mt-2 space-y-1">
                      {pred.mitigation.map((action, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-warning rounded-full mt-2 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Chat Assistant Section */}
      {activeSection === 'chat' && (
        <div className="space-y-4">
          <h3>Assistant IA Conversationnel</h3>
          
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="h-64 overflow-y-auto space-y-3 border rounded-lg p-3">
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <span className="text-xs opacity-70">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Posez votre question à l'IA..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  size="sm"
                  variant={isListening ? 'destructive' : 'outline'}
                  onClick={toggleVoiceInput}
                >
                  <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
                </Button>
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                Suggérés : "Quels sont mes meilleurs partenariats ?" • "Analyse mon budget" • "Recommandations"
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Automation Section */}
      {activeSection === 'automation' && (
        <div className="space-y-4">
          <h3>Automatisation Intelligente</h3>
          
          <Card>
            <CardHeader>
              <CardTitle>Paramètres d'automatisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-medium">Rapports automatiques</Label>
                  <p className="text-sm text-muted-foreground">
                    Génération mensuelle des rapports d'activité
                  </p>
                </div>
                <Switch
                  checked={automationSettings.autoReports}
                  onCheckedChange={(checked) => 
                    setAutomationSettings(prev => ({ ...prev, autoReports: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-medium">Rappels intelligents</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications basées sur les échéances et priorités
                  </p>
                </div>
                <Switch
                  checked={automationSettings.smartReminders}
                  onCheckedChange={(checked) => 
                    setAutomationSettings(prev => ({ ...prev, smartReminders: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-medium">Alertes budgétaires</Label>
                  <p className="text-sm text-muted-foreground">
                    Surveillance automatique des dépassements
                  </p>
                </div>
                <Switch
                  checked={automationSettings.budgetAlerts}
                  onCheckedChange={(checked) => 
                    setAutomationSettings(prev => ({ ...prev, budgetAlerts: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-medium">Suggestions de partenaires</Label>
                  <p className="text-sm text-muted-foreground">
                    Recommandations proactives de nouveaux partenaires
                  </p>
                </div>
                <Switch
                  checked={automationSettings.partnerSuggestions}
                  onCheckedChange={(checked) => 
                    setAutomationSettings(prev => ({ ...prev, partnerSuggestions: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistiques d'automatisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-sm text-muted-foreground">Tâches automatisées</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-success">8h</p>
                  <p className="text-sm text-muted-foreground">Temps économisé/semaine</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}