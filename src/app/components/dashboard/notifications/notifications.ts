import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type NotificationType =
  | 'cotisation'
  | 'retrait'
  | 'carte'
  | 'client'
  | 'systeme';

interface NotificationItem {
  id: number;
  type: NotificationType;
  titre: string;
  message: string;
  date: string;
  heure: string;
  lue: boolean;
  importante: boolean;
  aujourdHui: boolean;
  montant?: number;
  reference?: string;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notifications.html'
})
export class Notifications {

  recherche = '';
  filtreType = 'toutes';
  filtreStatut = 'toutes';

  notificationSelectionnee: NotificationItem | null = null;
  afficherDetails = false;

  notifications: NotificationItem[] = [
    {
      id: 1,
      type: 'cotisation',
      titre: 'Nouvelle cotisation reçue',
      message: 'Jean Kouassi a effectué une cotisation de 500 FCFA sur sa carte.',
      date: 'Aujourd’hui',
      heure: '12:45',
      lue: false,
      importante: false,
      aujourdHui: true,
      montant: 500,
      reference: 'CAR-00125'
    },
    {
      id: 2,
      type: 'retrait',
      titre: 'Retrait effectué',
      message: 'Marie Adé a effectué un retrait de 12 600 FCFA sur sa carte.',
      date: 'Aujourd’hui',
      heure: '12:27',
      lue: false,
      importante: true,
      aujourdHui: true,
      montant: 12600,
      reference: 'CAR-00126'
    },
    {
      id: 3,
      type: 'carte',
      titre: 'Nouvelle carte créée',
      message: 'Une nouvelle carte Journalière de 500 FCFA a été créée.',
      date: 'Aujourd’hui',
      heure: '11:58',
      lue: false,
      importante: false,
      aujourdHui: true,
      montant: 500,
      reference: 'CAR-00129'
    },
    {
      id: 4,
      type: 'client',
      titre: 'Nouveau client enregistré',
      message: 'Un nouveau client a été enregistré depuis l’Agence Centrale.',
      date: 'Aujourd’hui',
      heure: '11:20',
      lue: true,
      importante: false,
      aujourdHui: true,
      reference: 'CLI-00452'
    },
    {
      id: 5,
      type: 'systeme',
      titre: 'Commission configurée',
      message: 'Le taux de commission UNACREP a été mis à jour par l’administration.',
      date: 'Aujourd’hui',
      heure: '10:45',
      lue: false,
      importante: true,
      aujourdHui: true
    },
    {
      id: 6,
      type: 'cotisation',
      titre: 'Cotisation en attente',
      message: 'Une cotisation prévue sur une carte n’a pas encore été enregistrée.',
      date: 'Aujourd’hui',
      heure: '09:32',
      lue: false,
      importante: true,
      aujourdHui: true,
      reference: 'CAR-00118'
    },
    {
      id: 7,
      type: 'retrait',
      titre: 'Demande de retrait disponible',
      message: 'Le cycle de la carte est arrivé à échéance. Le retrait est maintenant disponible.',
      date: 'Hier',
      heure: '16:18',
      lue: true,
      importante: true,
      aujourdHui: false,
      montant: 25000,
      reference: 'CAR-00114'
    },
    {
      id: 8,
      type: 'carte',
      titre: 'Carte désactivée',
      message: 'La carte a été désactivée à la suite de l’arrêt du cycle.',
      date: 'Hier',
      heure: '14:52',
      lue: true,
      importante: false,
      aujourdHui: false,
      reference: 'CAR-00107'
    },
    {
      id: 9,
      type: 'client',
      titre: 'Informations client modifiées',
      message: 'Les informations d’un client ont été mises à jour.',
      date: 'Hier',
      heure: '13:40',
      lue: true,
      importante: false,
      aujourdHui: false,
      reference: 'CLI-00441'
    },
    {
      id: 10,
      type: 'systeme',
      titre: 'Synchronisation terminée',
      message: 'La synchronisation des données de la plateforme s’est terminée avec succès.',
      date: '17 sept. 2026',
      heure: '18:05',
      lue: true,
      importante: false,
      aujourdHui: false
    }
  ];

  get totalNotifications(): number {
    return this.notifications.length;
  }

  get notificationsNonLues(): number {
    return this.notifications.filter(notification => !notification.lue).length;
  }

  get notificationsAujourdHui(): number {
    return this.notifications.filter(notification => notification.aujourdHui).length;
  }

  get notificationsImportantes(): number {
    return this.notifications.filter(notification => notification.importante).length;
  }

  get notificationsFiltrees(): NotificationItem[] {
    const recherche = this.recherche.trim().toLowerCase();

    return this.notifications.filter(notification => {

      const correspondRecherche =
        !recherche ||
        notification.titre.toLowerCase().includes(recherche) ||
        notification.message.toLowerCase().includes(recherche) ||
        (notification.reference?.toLowerCase().includes(recherche) ?? false);

      const correspondType =
        this.filtreType === 'toutes' ||
        notification.type === this.filtreType;

      const correspondStatut =
        this.filtreStatut === 'toutes' ||
        (this.filtreStatut === 'lues' && notification.lue) ||
        (this.filtreStatut === 'non-lues' && !notification.lue);

      return correspondRecherche && correspondType && correspondStatut;
    });
  }

  getTypeLabel(type: NotificationType): string {
    switch (type) {
      case 'cotisation':
        return 'Cotisation';

      case 'retrait':
        return 'Retrait';

      case 'carte':
        return 'Carte';

      case 'client':
        return 'Client';

      case 'systeme':
        return 'Système';

      default:
        return 'Notification';
    }
  }

  getTypeClasses(type: NotificationType): string {
    switch (type) {
      case 'cotisation':
        return 'bg-green-100 text-green-700';

      case 'retrait':
        return 'bg-blue-100 text-blue-700';

      case 'carte':
        return 'bg-purple-100 text-purple-700';

      case 'client':
        return 'bg-orange-100 text-orange-700';

      case 'systeme':
        return 'bg-slate-100 text-slate-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  getIconBackground(type: NotificationType): string {
    switch (type) {
      case 'cotisation':
        return 'bg-green-100 text-green-600';

      case 'retrait':
        return 'bg-blue-100 text-blue-600';

      case 'carte':
        return 'bg-purple-100 text-purple-600';

      case 'client':
        return 'bg-orange-100 text-orange-600';

      case 'systeme':
        return 'bg-slate-100 text-slate-600';

      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  formatMontant(montant: number): string {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA';
  }

  marquerCommeLue(notification: NotificationItem): void {
    notification.lue = true;
  }

  marquerCommeNonLue(notification: NotificationItem): void {
    notification.lue = false;
  }

  marquerToutesCommeLues(): void {
    this.notifications.forEach(notification => {
      notification.lue = true;
    });
  }

  supprimerNotification(notification: NotificationItem): void {
    this.notifications = this.notifications.filter(
      item => item.id !== notification.id
    );

    if (this.notificationSelectionnee?.id === notification.id) {
      this.fermerDetails();
    }
  }

  ouvrirNotification(notification: NotificationItem): void {
    this.notificationSelectionnee = notification;
    this.afficherDetails = true;

    notification.lue = true;
  }

  fermerDetails(): void {
    this.afficherDetails = false;
    this.notificationSelectionnee = null;
  }

  actualiser(): void {
    // Sera connecté plus tard à Laravel.
    this.notifications = [...this.notifications];
  }

  reinitialiserFiltres(): void {
    this.recherche = '';
    this.filtreType = 'toutes';
    this.filtreStatut = 'toutes';
  }
}