import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  description: string;
  permissions: string[];
  utilisateurs: number;
}

@Component({
  selector: 'app-roles-permissions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './roles-permissions.html',
  styleUrl: './roles-permissions.css'
})
export class RolesPermissions {

  recherche = '';

  modalRole = false;

  modalDetails = false;

  modeEdition = false;

  roleSelectionne: Role | null = null;

  nouveauRole: Role = this.roleVide();

  permissions: Permission[] = [
    // Utilisateurs
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

    // Agences
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

    // Clients
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

    // Cotisations
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

    // Rapports
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
      description: 'Accès complet à toutes les fonctionnalités du système.',
      permissions: this.permissions.map(
        permission => permission.name
      ),
      utilisateurs: 1
    },

    {
      id: 2,
      name: 'admin',
      label: 'Administrateur',
      description: 'Gestion générale de la plateforme et des opérations.',
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
      ],
      utilisateurs: 0
    },

    {
      id: 3,
      name: 'responsable-agence',
      label: 'Responsable d’agence',
      description: 'Gestion des activités et des utilisateurs de son agence.',
      permissions: [
        'users.view',
        'clients.view',
        'clients.create',
        'clients.update',
        'contributions.view',
        'contributions.create',
        'contributions.update',
        'reports.view'
      ],
      utilisateurs: 1
    },

    {
      id: 4,
      name: 'agent',
      label: 'Agent',
      description: 'Gestion des clients et enregistrement des cotisations.',
      permissions: [
        'clients.view',
        'clients.create',
        'clients.update',
        'contributions.view',
        'contributions.create'
      ],
      utilisateurs: 1
    },

    {
      id: 5,
      name: 'comptable',
      label: 'Comptable',
      description: 'Suivi financier, cotisations et rapports comptables.',
      permissions: [
        'clients.view',
        'contributions.view',
        'contributions.create',
        'contributions.update',
        'reports.view',
        'reports.export'
      ],
      utilisateurs: 1
    },

    {
      id: 6,
      name: 'controleur',
      label: 'Contrôleur',
      description: 'Contrôle des opérations et consultation des rapports.',
      permissions: [
        'users.view',
        'agencies.view',
        'clients.view',
        'contributions.view',
        'reports.view',
        'reports.export'
      ],
      utilisateurs: 1
    }
  ];

  private roleVide(): Role {
    return {
      id: 0,
      name: '',
      label: '',
      description: '',
      permissions: [],
      utilisateurs: 0
    };
  }

  get totalRoles(): number {
    return this.roles.length;
  }

  get totalPermissions(): number {
    return this.permissions.length;
  }

  get rolesActifs(): number {
    return this.roles.filter(
      role => role.utilisateurs > 0
    ).length;
  }

  get rolesFiltres(): Role[] {
    const recherche = this.recherche
      .trim()
      .toLowerCase();

    if (!recherche) {
      return this.roles;
    }

    return this.roles.filter(role =>
      role.label
        .toLowerCase()
        .includes(recherche) ||
      role.name
        .toLowerCase()
        .includes(recherche) ||
      role.description
        .toLowerCase()
        .includes(recherche)
    );
  }

  get modulesPermissions(): string[] {
    return Array.from(
      new Set(
        this.permissions.map(
          permission => permission.module
        )
      )
    );
  }

  permissionsParModule(module: string): Permission[] {
    return this.permissions.filter(
      permission =>
        permission.module === module
    );
  }

  ouvrirAjout(): void {
    this.modeEdition = false;
    this.nouveauRole = this.roleVide();
    this.modalRole = true;
  }

  ouvrirModification(role: Role): void {
    this.modeEdition = true;

    this.nouveauRole = {
      ...role,
      permissions: [
        ...role.permissions
      ]
    };

    this.modalRole = true;
  }

  voirRole(role: Role): void {
    this.roleSelectionne = role;
    this.modalDetails = true;
  }

  fermerModalRole(): void {
    this.modalRole = false;
  }

  fermerModalDetails(): void {
    this.modalDetails = false;
    this.roleSelectionne = null;
  }

  enregistrerRole(): void {
    if (
      !this.nouveauRole.name ||
      !this.nouveauRole.label
    ) {
      return;
    }

    if (this.modeEdition) {
      const index =
        this.roles.findIndex(
          role =>
            role.id ===
            this.nouveauRole.id
        );

      if (index !== -1) {
        this.roles[index] = {
          ...this.nouveauRole
        };
      }
    } else {
      const nouvelId =
        this.roles.length > 0
          ? Math.max(
              ...this.roles.map(
                role => role.id
              )
            ) + 1
          : 1;

      this.roles.push({
        ...this.nouveauRole,
        id: nouvelId
      });
    }

    this.fermerModalRole();
  }

  supprimerRole(role: Role): void {
    if (role.utilisateurs > 0) {
      window.alert(
        'Ce rôle ne peut pas être supprimé car il est actuellement attribué à un ou plusieurs utilisateurs.'
      );

      return;
    }

    const confirmation =
      window.confirm(
        `Voulez-vous vraiment supprimer le rôle « ${role.label} » ?`
      );

    if (!confirmation) {
      return;
    }

    this.roles =
      this.roles.filter(
        item => item.id !== role.id
      );
  }

  permissionEstActive(
    permissionName: string
  ): boolean {
    return this.nouveauRole.permissions
      .includes(permissionName);
  }

  togglePermission(
    permissionName: string
  ): void {
    const permissions =
      this.nouveauRole.permissions;

    const index =
      permissions.indexOf(
        permissionName
      );

    if (index >= 0) {
      permissions.splice(index, 1);
    } else {
      permissions.push(
        permissionName
      );
    }
  }

  toutesPermissionsActives(
    module: string
  ): boolean {
    const permissions =
      this.permissionsParModule(module);

    return permissions.length > 0 &&
      permissions.every(
        permission =>
          this.permissionEstActive(
            permission.name
          )
      );
  }

  toggleModule(
    module: string
  ): void {
    const permissions =
      this.permissionsParModule(module);

    const toutesActives =
      this.toutesPermissionsActives(
        module
      );

    permissions.forEach(
      permission => {
        const index =
          this.nouveauRole.permissions
            .indexOf(
              permission.name
            );

        if (toutesActives) {
          if (index >= 0) {
            this.nouveauRole.permissions
              .splice(index, 1);
          }
        } else {
          if (index === -1) {
            this.nouveauRole.permissions
              .push(permission.name);
          }
        }
      }
    );
  }

  toutSelectionner(): void {
    this.nouveauRole.permissions =
      this.permissions.map(
        permission => permission.name
      );
  }

  toutDeselectionner(): void {
    this.nouveauRole.permissions = [];
  }

  nombrePermissionsRole(
    role: Role
  ): number {
    return role.permissions.length;
  }

  pourcentagePermissions(
    role: Role
  ): number {
    if (this.permissions.length === 0) {
      return 0;
    }

    return Math.round(
      (
        role.permissions.length /
        this.permissions.length
      ) * 100
    );
  }
}