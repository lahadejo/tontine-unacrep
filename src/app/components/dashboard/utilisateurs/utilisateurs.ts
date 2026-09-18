import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type StatutUtilisateur = 'Actif' | 'Inactif';

interface Permission {
  id: number;
  name: string;
  label: string;
  module: string;
}

interface Role {
  id: number;
  name: string;
  label: string;
  permissions: string[];
}

interface Utilisateur {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  agence: string;
  role: string;
  permissionsDirectes: string[];
  statut: StatutUtilisateur;
  derniereConnexion: string;
}

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.css'
})
export class Utilisateurs {

  recherche = '';
  filtreStatut: 'Tous' | StatutUtilisateur = 'Tous';
  filtreRole = 'Tous';

  modalUtilisateur = false;
  modalDetails = false;
  modeEdition = false;

  utilisateurSelectionne: Utilisateur | null = null;

  nouvelUtilisateur: Utilisateur = this.utilisateurVide();

  agences: string[] = [
    'Agence Centrale',
    'Agence Porto-Novo',
    'Agence Abomey',
    'Agence Parakou',
    'Agence Pobè'
  ];

  permissions: Permission[] = [
    {
      id: 1,
      name: 'users.view',
      label: 'Voir les utilisateurs',
      module: 'Utilisateurs'
    },
    {
      id: 2,
      name: 'users.create',
      label: 'Créer un utilisateur',
      module: 'Utilisateurs'
    },
    {
      id: 3,
      name: 'users.update',
      label: 'Modifier un utilisateur',
      module: 'Utilisateurs'
    },
    {
      id: 4,
      name: 'users.delete',
      label: 'Supprimer un utilisateur',
      module: 'Utilisateurs'
    },

    {
      id: 5,
      name: 'agencies.view',
      label: 'Voir les agences',
      module: 'Agences'
    },
    {
      id: 6,
      name: 'agencies.create',
      label: 'Créer une agence',
      module: 'Agences'
    },
    {
      id: 7,
      name: 'agencies.update',
      label: 'Modifier une agence',
      module: 'Agences'
    },
    {
      id: 8,
      name: 'agencies.delete',
      label: 'Supprimer une agence',
      module: 'Agences'
    },

    {
      id: 9,
      name: 'clients.view',
      label: 'Voir les clients',
      module: 'Clients'
    },
    {
      id: 10,
      name: 'clients.create',
      label: 'Créer un client',
      module: 'Clients'
    },
    {
      id: 11,
      name: 'clients.update',
      label: 'Modifier un client',
      module: 'Clients'
    },
    {
      id: 12,
      name: 'clients.delete',
      label: 'Supprimer un client',
      module: 'Clients'
    },

    {
      id: 13,
      name: 'contributions.view',
      label: 'Voir les cotisations',
      module: 'Cotisations'
    },
    {
      id: 14,
      name: 'contributions.create',
      label: 'Enregistrer une cotisation',
      module: 'Cotisations'
    },
    {
      id: 15,
      name: 'contributions.update',
      label: 'Modifier une cotisation',
      module: 'Cotisations'
    },
    {
      id: 16,
      name: 'contributions.delete',
      label: 'Supprimer une cotisation',
      module: 'Cotisations'
    },

    {
      id: 17,
      name: 'reports.view',
      label: 'Voir les rapports',
      module: 'Rapports'
    },
    {
      id: 18,
      name: 'reports.export',
      label: 'Exporter les rapports',
      module: 'Rapports'
    }
  ];

  roles: Role[] = [
    {
      id: 1,
      name: 'super-admin',
      label: 'Super Administrateur',
      permissions: this.permissions.map(
        permission => permission.name
      )
    },

    {
      id: 2,
      name: 'admin',
      label: 'Administrateur',
      permissions: [
        'users.view',
        'users.create',
        'users.update',

        'agencies.view',
        'agencies.create',
        'agencies.update',

        'clients.view',
        'clients.create',
        'clients.update',
        'clients.delete',

        'contributions.view',
        'contributions.create',
        'contributions.update',

        'reports.view',
        'reports.export'
      ]
    },

    {
      id: 3,
      name: 'responsable-agence',
      label: 'Responsable d’agence',
      permissions: [
        'users.view',

        'clients.view',
        'clients.create',
        'clients.update',

        'contributions.view',
        'contributions.create',
        'contributions.update',

        'reports.view'
      ]
    },

    {
      id: 4,
      name: 'agent',
      label: 'Agent',
      permissions: [
        'clients.view',
        'clients.create',
        'clients.update',

        'contributions.view',
        'contributions.create'
      ]
    },

    {
      id: 5,
      name: 'comptable',
      label: 'Comptable',
      permissions: [
        'clients.view',

        'contributions.view',
        'contributions.create',
        'contributions.update',

        'reports.view',
        'reports.export'
      ]
    },

    {
      id: 6,
      name: 'controleur',
      label: 'Contrôleur',
      permissions: [
        'users.view',
        'agencies.view',
        'clients.view',
        'contributions.view',
        'reports.view',
        'reports.export'
      ]
    }
  ];

  utilisateurs: Utilisateur[] = [
    {
      id: 1,
      prenom: 'Jean',
      nom: 'Kossi',
      email: 'jean.kossi@unacrep.bj',
      telephone: '+229 97 00 00 01',
      agence: 'Agence Centrale',
      role: 'super-admin',
      permissionsDirectes: [],
      statut: 'Actif',
      derniereConnexion: '02/09/2026 à 08:42'
    },

    {
      id: 2,
      prenom: 'Marie',
      nom: 'Adjovi',
      email: 'marie.adjovi@unacrep.bj',
      telephone: '+229 97 00 00 02',
      agence: 'Agence Porto-Novo',
      role: 'responsable-agence',
      permissionsDirectes: [],
      statut: 'Actif',
      derniereConnexion: '02/09/2026 à 09:15'
    },

    {
      id: 3,
      prenom: 'Paul',
      nom: 'Dossou',
      email: 'paul.dossou@unacrep.bj',
      telephone: '+229 97 00 00 03',
      agence: 'Agence Abomey',
      role: 'agent',
      permissionsDirectes: [],
      statut: 'Actif',
      derniereConnexion: '01/09/2026 à 16:30'
    },

    {
      id: 4,
      prenom: 'Thomas',
      nom: 'Ahouansou',
      email: 'thomas.ahouansou@unacrep.bj',
      telephone: '+229 97 00 00 04',
      agence: 'Agence Parakou',
      role: 'comptable',
      permissionsDirectes: [],
      statut: 'Actif',
      derniereConnexion: '01/09/2026 à 14:22'
    },

    {
      id: 5,
      prenom: 'David',
      nom: 'Soglo',
      email: 'david.soglo@unacrep.bj',
      telephone: '+229 97 00 00 05',
      agence: 'Agence Pobè',
      role: 'controleur',
      permissionsDirectes: [],
      statut: 'Inactif',
      derniereConnexion: '28/08/2026 à 11:05'
    }
  ];

  private utilisateurVide(): Utilisateur {
    return {
      id: 0,
      prenom: '',
      nom: '',
      email: '',
      telephone: '',
      agence: '',
      role: '',
      permissionsDirectes: [],
      statut: 'Actif',
      derniereConnexion: 'Jamais'
    };
  }

  get totalUtilisateurs(): number {
    return this.utilisateurs.length;
  }

  get utilisateursActifs(): number {
    return this.utilisateurs.filter(
      utilisateur =>
        utilisateur.statut === 'Actif'
    ).length;
  }

  get utilisateursInactifs(): number {
    return this.utilisateurs.filter(
      utilisateur =>
        utilisateur.statut === 'Inactif'
    ).length;
  }

  get administrateurs(): number {
    return this.utilisateurs.filter(
      utilisateur =>
        utilisateur.role === 'super-admin' ||
        utilisateur.role === 'admin'
    ).length;
  }

  get utilisateursFiltres(): Utilisateur[] {

    const recherche =
      this.recherche.trim().toLowerCase();

    return this.utilisateurs.filter(
      utilisateur => {

        const correspondRecherche =
          !recherche ||

          `${utilisateur.prenom} ${utilisateur.nom}`
            .toLowerCase()
            .includes(recherche) ||

          utilisateur.email
            .toLowerCase()
            .includes(recherche) ||

          utilisateur.telephone
            .toLowerCase()
            .includes(recherche) ||

          utilisateur.agence
            .toLowerCase()
            .includes(recherche);

        const correspondStatut =
          this.filtreStatut === 'Tous' ||
          utilisateur.statut === this.filtreStatut;

        const correspondRole =
          this.filtreRole === 'Tous' ||
          utilisateur.role === this.filtreRole;

        return (
          correspondRecherche &&
          correspondStatut &&
          correspondRole
        );
      }
    );
  }

  nomRole(roleName: string): string {

    const role =
      this.roles.find(
        item => item.name === roleName
      );

    return role?.label ?? roleName;
  }

  nomPermission(
    permissionName: string
  ): string {

    const permission =
      this.permissions.find(
        item => item.name === permissionName
      );

    return permission?.label ?? permissionName;
  }

  permissionsUtilisateur(
    utilisateur: Utilisateur
  ): string[] {

    const role =
      this.roles.find(
        item => item.name === utilisateur.role
      );

    const permissionsRole =
      role?.permissions ?? [];

    return Array.from(
      new Set([
        ...permissionsRole,
        ...utilisateur.permissionsDirectes
      ])
    );
  }

  ouvrirAjout(): void {

    this.modeEdition = false;

    this.nouvelUtilisateur =
      this.utilisateurVide();

    this.modalUtilisateur = true;
  }

  ouvrirModification(
    utilisateur: Utilisateur
  ): void {

    this.modeEdition = true;

    this.nouvelUtilisateur = {
      ...utilisateur,
      permissionsDirectes: [
        ...utilisateur.permissionsDirectes
      ]
    };

    this.modalUtilisateur = true;
  }

  voirUtilisateur(
    utilisateur: Utilisateur
  ): void {

    this.utilisateurSelectionne =
      utilisateur;

    this.modalDetails = true;
  }

  fermerModalUtilisateur(): void {
    this.modalUtilisateur = false;
  }

  fermerModalDetails(): void {

    this.modalDetails = false;

    this.utilisateurSelectionne =
      null;
  }

  enregistrerUtilisateur(): void {

    if (
      !this.nouvelUtilisateur.prenom ||
      !this.nouvelUtilisateur.nom ||
      !this.nouvelUtilisateur.email ||
      !this.nouvelUtilisateur.role ||
      !this.nouvelUtilisateur.agence
    ) {
      return;
    }

    if (this.modeEdition) {

      const index =
        this.utilisateurs.findIndex(
          utilisateur =>
            utilisateur.id ===
            this.nouvelUtilisateur.id
        );

      if (index !== -1) {

        this.utilisateurs[index] = {
          ...this.nouvelUtilisateur
        };
      }

    } else {

      const nouvelId =
        this.utilisateurs.length > 0
          ? Math.max(
              ...this.utilisateurs.map(
                utilisateur =>
                  utilisateur.id
              )
            ) + 1
          : 1;

      this.utilisateurs.push({
        ...this.nouvelUtilisateur,
        id: nouvelId
      });
    }

    this.fermerModalUtilisateur();
  }

  supprimerUtilisateur(
    utilisateur: Utilisateur
  ): void {

    const confirmation =
      window.confirm(
        `Voulez-vous vraiment supprimer ${utilisateur.prenom} ${utilisateur.nom} ?`
      );

    if (!confirmation) {
      return;
    }

    this.utilisateurs =
      this.utilisateurs.filter(
        item =>
          item.id !== utilisateur.id
      );
  }

  changerStatut(
    utilisateur: Utilisateur
  ): void {

    utilisateur.statut =
      utilisateur.statut === 'Actif'
        ? 'Inactif'
        : 'Actif';
  }

  permissionEstActive(
    permissionName: string
  ): boolean {

    return this.nouvelUtilisateur
      .permissionsDirectes
      .includes(permissionName);
  }

  togglePermission(
    permissionName: string
  ): void {

    const permissions =
      this.nouvelUtilisateur
        .permissionsDirectes;

    const index =
      permissions.indexOf(permissionName);

    if (index >= 0) {

      permissions.splice(index, 1);

    } else {

      permissions.push(permissionName);
    }
  }

  permissionsParModule(
    module: string
  ): Permission[] {

    return this.permissions.filter(
      permission =>
        permission.module === module
    );
  }

  get modulesPermissions(): string[] {

    return Array.from(
      new Set(
        this.permissions.map(
          permission =>
            permission.module
        )
      )
    );
  }

  changementRole(): void {
    /*
     * Les permissions du rôle sont
     * héritées automatiquement.
     *
     * Les permissions directes restent
     * séparées afin de respecter la
     * logique Laravel + Spatie.
     */
  }

  initiales(
    utilisateur: Utilisateur
  ): string {

    const prenom =
      utilisateur.prenom
        ?.charAt(0)
        .toUpperCase() ?? '';

    const nom =
      utilisateur.nom
        ?.charAt(0)
        .toUpperCase() ?? '';

    return `${prenom}${nom}`;
  }
}