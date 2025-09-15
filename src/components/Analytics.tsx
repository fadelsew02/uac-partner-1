import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Download, 
  TrendingUp, 
  Users, 
  FileText, 
  Brain,
  Calendar,
  Filter,
  Share2
} from 'lucide-react';

const mockData = {
  partnershipsOverTime: [
    { month: 'Jan', count: 5, completed: 2 },
    { month: 'Fév', count: 8, completed: 3 },
    { month: 'Mar', count: 12, completed: 5 },
    { month: 'Avr', count: 15, completed: 7 },
    { month: 'Mai', count: 18, completed: 9 },
    { month: 'Juin', count: 22, completed: 12 }
  ],
  partnershipsByType: [
    { name: 'Recherche', value: 40, color: '#007A33' },
    { name: 'Formation', value: 30, color: '#FFD700' },
    { name: 'Échange', value: 20, color: '#00BFFF' },
    { name: 'Technique', value: 10, color: '#D21034' }
  ],
  partnershipsByRegion: [
    { name: 'Bénin', value: 8, color: '#007A33' },
    { name: 'Togo', value: 6, color: '#FFD700' },
    { name: 'Niger', value: 4, color: '#00BFFF' },
    { name: 'Burkina', value: 3, color: '#D21034' },
    { name: 'Mali', value: 2, color: '#E0F7E9' }
  ],
  projectSuccess: [
    { month: 'Jan', success: 85, average: 75 },
    { month: 'Fév', success: 88, average: 76 },
    { month: 'Mar', success: 82, average: 77 },
    { month: 'Avr', success: 90, average: 78 },
    { month: 'Mai', success: 87, average: 79 },
    { month: 'Juin', success: 92, average: 80 }
  ],
  budgetAnalysis: [
    { category: 'Recherche', budgeted: 50000, spent: 45000 },
    { category: 'Formation', budgeted: 30000, spent: 28000 },
    { category: 'Échange', budgeted: 25000, spent: 20000 },
    { category: 'Technique', budgeted: 15000, spent: 12000 }
  ],
  kpis: {
    totalPartnerships: 23,
    activeProjects: 8,
    completionRate: 87,
    budgetUtilization: 85,
    averageProjectDuration: 6.5,
    partnerSatisfaction: 4.2
  },
  predictions: [
    {
      title: 'Croissance des partenariats',
      prediction: '+15% dans les 6 prochains mois',
      confidence: 85,
      type: 'growth'
    },
    {
      title: 'Risque de retard',
      prediction: '2 projets pourraient être en retard',
      confidence: 72,
      type: 'risk'
    },
    {
      title: 'Opportunité budgétaire',
      prediction: '12% d\'économies possibles',
      confidence: 90,
      type: 'opportunity'
    }
  ]
};

interface AnalyticsProps {
  onBack: () => void;
}

export function Analytics({ onBack }: AnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [showExportDialog, setShowExportDialog] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleExport = (format: string) => {
    console.log(`Exporting data in ${format} format`);
    setShowExportDialog(false);
    // Mock export functionality
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2>Analyse d'Impact</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowExportDialog(!showExportDialog)}
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Partager
          </Button>
        </div>
      </div>

      {/* Export Options */}
      {showExportDialog && (
        <Card className="animate-growth">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">Options d'export</h4>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
                <FileText className="w-4 h-4 mr-2" />
                Excel
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
                <FileText className="w-4 h-4 mr-2" />
                CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex gap-2">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">3 mois</SelectItem>
            <SelectItem value="6months">6 mois</SelectItem>
            <SelectItem value="1year">1 an</SelectItem>
            <SelectItem value="2years">2 ans</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes régions</SelectItem>
            <SelectItem value="benin">Bénin</SelectItem>
            <SelectItem value="togo">Togo</SelectItem>
            <SelectItem value="niger">Niger</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs Dashboard */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="animate-growth">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Partenariats</p>
                <p className="text-2xl font-bold text-primary">{mockData.kpis.totalPartnerships}</p>
              </div>
              <Badge className="bg-success text-success-foreground">+12%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-growth" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taux réussite</p>
                <p className="text-2xl font-bold text-success">{mockData.kpis.completionRate}%</p>
              </div>
              <Badge className="bg-success text-success-foreground">+5%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-growth" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Utilisation budget</p>
                <p className="text-2xl font-bold text-warning">{mockData.kpis.budgetUtilization}%</p>
              </div>
              <Badge className="bg-warning text-warning-foreground">-3%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-growth" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <p className="text-2xl font-bold text-primary">{mockData.kpis.partnerSatisfaction}/5</p>
              </div>
              <Badge className="bg-primary text-primary-foreground">+0.2</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Predictions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-info" />
            Prédictions IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockData.predictions.map((prediction, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-3 bg-muted rounded-lg animate-slide-geometric"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-3 h-3 rounded-full mt-1 ${
                prediction.type === 'growth' ? 'bg-success' :
                prediction.type === 'risk' ? 'bg-destructive' : 'bg-info'
              }`} />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{prediction.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{prediction.prediction}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 bg-background rounded-full h-2">
                    <div 
                      className="h-2 bg-info rounded-full transition-all"
                      style={{ width: `${prediction.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{prediction.confidence}%</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="space-y-6">
        {/* Partnerships Over Time */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Évolution des Partenariats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.partnershipsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#007A33" name="Total" />
                  <Bar dataKey="completed" fill="#FFD700" name="Terminés" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Partnership Types Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Par Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockData.partnershipsByType}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {mockData.partnershipsByType.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {mockData.partnershipsByType.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span>{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Par Région</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockData.partnershipsByRegion.map((region, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{region.name}</span>
                      <span>{region.value}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all"
                        style={{ 
                          width: `${(region.value / Math.max(...mockData.partnershipsByRegion.map(r => r.value))) * 100}%`,
                          backgroundColor: region.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Rate Trend */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Taux de Réussite</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.projectSuccess}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="success" 
                    stroke="#007A33" 
                    strokeWidth={3}
                    name="UAC PartnerHub"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="average" 
                    stroke="#FFD700" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Moyenne secteur"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Budget Analysis */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Analyse Budgétaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.budgetAnalysis.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.category}</span>
                    <span>{formatCurrency(item.spent)} / {formatCurrency(item.budgeted)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="h-3 bg-primary rounded-full transition-all"
                      style={{ width: `${(item.spent / item.budgeted) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {((item.spent / item.budgeted) * 100).toFixed(1)}% utilisé
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}