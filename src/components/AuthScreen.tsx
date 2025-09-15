import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  User, 
  Shield,
  UserCheck,
  GraduationCap,
  Settings
} from 'lucide-react';

interface AuthScreenProps {
  onLogin: (userRole: string) => void;
}

const personas = [
  {
    id: 'admin',
    name: 'Administrateur',
    description: 'Gérer tous les partenariats et utilisateurs',
    icon: Settings,
    color: 'bg-primary text-primary-foreground',
    features: ['Gestion complète', 'Analytics avancés', 'Contrôle d\'accès']
  },
  {
    id: 'professor',
    name: 'Professeur',
    description: 'Coordonner projets et collaborations',
    icon: UserCheck,
    color: 'bg-warning text-warning-foreground',
    features: ['Suivi projets', 'Collaboration équipe', 'Rapports']
  },
  {
    id: 'student',
    name: 'Étudiant',
    description: 'Participer aux échanges et projets',
    icon: GraduationCap,
    color: 'bg-info text-info-foreground',
    features: ['Candidatures', 'Suivi statut', 'Communications']
  }
];

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock authentication
    setTimeout(() => {
      const role = selectedPersona || 'admin';
      onLogin(role);
      setIsLoading(false);
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock registration
    setTimeout(() => {
      const role = registerForm.role || 'student';
      onLogin(role);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto animate-growth">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-secondary-foreground font-bold text-xl">U</span>
            </div>
          </div>
          <div>
            <h1 className="text-primary">UAC PartnerHub</h1>
            <p className="text-muted-foreground">Gérez vos partenariats universitaires</p>
          </div>
        </div>

        {/* Persona Selection */}
        {!selectedPersona && activeTab === 'login' && (
          <Card className="animate-growth">
            <CardHeader>
              <CardTitle className="text-center">Choisissez votre rôle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {personas.map((persona) => {
                const Icon = persona.icon;
                return (
                  <button
                    key={persona.id}
                    onClick={() => setSelectedPersona(persona.id)}
                    className="w-full p-4 text-left border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${persona.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{persona.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {persona.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {persona.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Auth Forms */}
        {(selectedPersona || activeTab === 'register') && (
          <Card className="animate-growth">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Connexion</TabsTrigger>
                  <TabsTrigger value="register">Inscription</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4 mt-6">
                  {selectedPersona && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      {(() => {
                        const persona = personas.find(p => p.id === selectedPersona);
                        if (!persona) return null;
                        const Icon = persona.icon;
                        return (
                          <>
                            <div className={`p-2 rounded-lg ${persona.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{persona.name}</p>
                              <p className="text-xs text-muted-foreground">{persona.description}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setSelectedPersona('')}
                            >
                              Changer
                            </Button>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre.email@uac.bj"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="password">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Connexion...' : 'Se connecter'}
                    </Button>

                    <div className="text-center">
                      <Button variant="link" className="text-sm">
                        Mot de passe oublié ?
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="space-y-4 mt-6">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          placeholder="Prénom"
                          value={registerForm.firstName}
                          onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          placeholder="Nom"
                          value={registerForm.lastName}
                          onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="registerEmail">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="registerEmail"
                          type="email"
                          placeholder="votre.email@uac.bj"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="role">Rôle</Label>
                      <Select 
                        value={registerForm.role} 
                        onValueChange={(value) => setRegisterForm({...registerForm, role: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner votre rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Étudiant</SelectItem>
                          <SelectItem value="professor">Professeur</SelectItem>
                          <SelectItem value="admin">Administrateur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="registerPassword">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="registerPassword"
                          type="password"
                          placeholder="••••••••"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Création...' : 'Créer un compte'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Security Notice */}
        <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Shield className="w-3 h-3" />
          Sécurisé par UAC - Données chiffrées
        </div>
      </div>
    </div>
  );
}