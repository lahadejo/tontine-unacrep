import { Routes } from '@angular/router';

import { Login } from './components/auth/login/login';
import { Landing } from './components/landing/landing/landing';
import { Register } from './components/auth/register/register';

import { Layout } from './components/dashboard/layout/layout';
import { Home } from './components/dashboard/home/home';
import { Agences } from './components/dashboard/agences/agences';
import { Utilisateurs } from './components/dashboard/utilisateurs/utilisateurs';
import { RolesPermissions } from './components/dashboard/roles-permissions/roles-permissions';
import { Taches } from './components/dashboard/taches/taches';
import { Clients } from './components/dashboard/clients/clients';
import { Cartes } from './components/dashboard/cartes/cartes';
import { Cotisations } from './components/dashboard/cotisations/cotisations';
import { Cycles } from './components/dashboard/cycles/cycles';
import { Portefeuilles } from './components/dashboard/portefeuilles/portefeuilles';
import { Retraits } from './components/dashboard/retraits/retraits';
import { Commissions } from './components/dashboard/commissions/commissions';
import { Factures } from './components/dashboard/factures/factures';
import { Rapports } from './components/dashboard/rapports/rapports';
import { Notifications } from './components/dashboard/notifications/notifications';
import { Parametres } from './components/dashboard/parametres/parametres';
import { Profil } from './components/dashboard/profil/profil';

export const routes: Routes = [

  // Landing Page
  {
    path: '',
    component: Landing
  },

  // Authentification
  {
    path: 'connexion',
    component: Login
  },

  {
    path: 'inscription',
    component: Register
  },

  // Dashboard
  {
    path: 'dashboard',
    component: Layout,
    
    children: [
      {
        path: '',
        component: Home
      },

      {
        path: 'agences',
        component: Agences
      },

      {
        path: 'utilisateurs',
        component: Utilisateurs
      },

      {
        path: 'roles-permissions',
        component: RolesPermissions
      },

      {
        path: 'taches',
        component: Taches
      },

      {
        path: 'clients',
        component: Clients
      },

      {
        path: 'cartes',
        component: Cartes
      },

      {
        path: 'cotisations',
        component: Cotisations
      },

      {
        path: 'cycles',
        component: Cycles
      },

      {
        path: 'portefeuilles',
        component: Portefeuilles
      },

      {
        path: 'retraits',
        component: Retraits
      },

      {
        path: 'commissions',
        component: Commissions
      },

      {
        path: 'factures',
        component: Factures
      },

      {
        path: 'rapports',
        component: Rapports
      },

      {
        path: 'notifications',
        component: Notifications
      },

      {
        path: 'parametres',
        component: Parametres
      },
      
      {
        path: 'profil',
        component: Profil
      },
    ]
  }

];