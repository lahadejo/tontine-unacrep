import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* ====================================================== */
/* TYPES */
/* ====================================================== */

type NotificationCle =
  | 'nouvellesCotisations'
  | 'nouveauxClients'
  | 'nouvellesCartes'
  | 'retraits'
  | 'commissions'
  | 'alertesSysteme';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametres.html'
})
export class Parametres {

  /* ====================================================== */
  /* ONGLET ACTIF */
  /* ====================================================== */

  ongletActif = 'general';

  onglets = [
    {
      id: 'general',
      label: 'Général'
    },
    {
      id: 'cotisations',
      label: 'Cotisations'
    },
    {
      id: 'commissions',
      label: 'Commissions'
    },
    {
      id: 'retraits',
      label: 'Retraits'
    },
    {
      id: 'notifications',
      label: 'Notifications'
    },
    {
      id: 'securite',
      label: 'Sécurité'
    },
    {
      id: 'systeme',
      label: 'Système'
    }
  ];

  /* ====================================================== */
  /* INFORMATIONS GÉNÉRALES */
  /* ====================================================== */

  organisation = {
    nom: 'UNACREP',
    sigle: 'UNACREP',
    telephone: '+229 00 00 00 00',
    email: 'contact@unacrep.bj',
    adresse: 'Cotonou, Bénin',
    description:
      'Système de gestion des recouvrements, tontines et paiements UNACREP'
  };

  /* ====================================================== */
  /* PARAMÈTRES COTISATIONS */
  /* ====================================================== */

  cotisations = {
    paiementMobileMoney: true,
    paiementDirectClient: true,
    paiementParAgent: false,
    autoriserRetard: true,
    rattrapageCycleActuel: true,
    bloquerHorsCycle: true,
    confirmationAutomatique: true
  };

  /* ====================================================== */
  /* COMMISSION */
  /* ====================================================== */

  commission = {
    taux: 5,
    active: true,
    application: 'retrait',
    mode: 'pourcentage'
  };

  /* ====================================================== */
  /* RETRAITS */
  /* ====================================================== */

  retraits = {
    mobileMoney: true,
    retraitAgence: false,
    retraitAnticipe: false,
    unRetraitParCycle: true,
    autoriserRetraitFinCycle: true,
    factureAutomatique: true,
    validationCaissier: true,
    validationComptable: true
  };

  /* ====================================================== */
  /* NOTIFICATIONS */
  /* ====================================================== */

  notifications = {
    nouvellesCotisations: true,
    nouveauxClients: true,
    nouvellesCartes: true,
    retraits: true,
    commissions: true,
    alertesSysteme: true,
    notificationsNavigateur: true,
    notificationsEmail: false
  };

  /* ====================================================== */
  /* OPTIONS DE NOTIFICATIONS */
  /* ====================================================== */

  notificationsOptions: {
    cle: NotificationCle;
    titre: string;
    description: string;
  }[] = [
    {
      cle: 'nouvellesCotisations',
      titre: 'Nouvelles cotisations',
      description:
        'Recevoir une notification lors d’une nouvelle cotisation.'
    },
    {
      cle: 'nouveauxClients',
      titre: 'Nouveaux clients',
      description:
        'Recevoir une notification lors de l’inscription d’un nouveau client.'
    },
    {
      cle: 'nouvellesCartes',
      titre: 'Nouvelles cartes',
      description:
        'Recevoir une notification lorsqu’une nouvelle carte est créée.'
    },
    {
      cle: 'retraits',
      titre: 'Retraits',
      description:
        'Recevoir une notification lors d’un retrait effectué ou disponible.'
    },
    {
      cle: 'commissions',
      titre: 'Commissions',
      description:
        'Recevoir une notification concernant les commissions UNACREP.'
    },
    {
      cle: 'alertesSysteme',
      titre: 'Alertes système',
      description:
        'Recevoir les alertes importantes liées au fonctionnement du système.'
    }
  ];

  /* ====================================================== */
  /* SÉCURITÉ */
  /* ====================================================== */

  securite = {
    doubleAuthentification: false,
    expirationSession: 30,
    verrouillageApresEchecs: true,
    nombreTentatives: 5,
    journalisation: true
  };

  /* ====================================================== */
  /* SYSTÈME */
  /* ====================================================== */

  systeme = {
    langue: 'fr',
    fuseauHoraire: 'Africa/Porto-Novo',
    devise: 'FCFA',
    formatDate: 'DD/MM/YYYY',
    theme: 'clair'
  };

  /* ====================================================== */
  /* MESSAGE */
  /* ====================================================== */

  messageSucces = '';
  afficherMessageSucces = false;

  /* ====================================================== */
  /* CHANGER D'ONGLET */
  /* ====================================================== */

  changerOnglet(onglet: string): void {
    this.ongletActif = onglet;
    this.fermerMessage();
  }

  /* ====================================================== */
  /* NOTIFICATIONS */
  /* ====================================================== */

  getNotificationValue(cle: NotificationCle): boolean {
    return this.notifications[cle];
  }

  toggleNotification(cle: NotificationCle): void {
    this.notifications[cle] = !this.notifications[cle];
  }

  /* ====================================================== */
  /* ENREGISTRER */
  /* ====================================================== */

  enregistrer(): void {

    /*
     * Cette méthode sera connectée plus tard
     * à l'API Laravel.
     */

    this.messageSucces =
      'Les paramètres ont été enregistrés avec succès.';

    this.afficherMessageSucces = true;

    setTimeout(() => {
      this.afficherMessageSucces = false;
    }, 4000);
  }

  /* ====================================================== */
  /* RÉINITIALISER */
  /* ====================================================== */

  reinitialiser(): void {

    /* ------------------------------------------------------ */
    /* ORGANISATION */
    /* ------------------------------------------------------ */

    this.organisation = {
      nom: 'UNACREP',
      sigle: 'UNACREP',
      telephone: '+229 00 00 00 00',
      email: 'contact@unacrep.bj',
      adresse: 'Cotonou, Bénin',
      description:
        'Système de gestion des recouvrements, tontines et paiements UNACREP'
    };

    /* ------------------------------------------------------ */
    /* COTISATIONS */
    /* ------------------------------------------------------ */

    this.cotisations = {
      paiementMobileMoney: true,
      paiementDirectClient: true,
      paiementParAgent: false,
      autoriserRetard: true,
      rattrapageCycleActuel: true,
      bloquerHorsCycle: true,
      confirmationAutomatique: true
    };

    /* ------------------------------------------------------ */
    /* COMMISSION */
    /* ------------------------------------------------------ */

    this.commission = {
      taux: 5,
      active: true,
      application: 'retrait',
      mode: 'pourcentage'
    };

    /* ------------------------------------------------------ */
    /* RETRAITS */
    /* ------------------------------------------------------ */

    this.retraits = {
      mobileMoney: true,
      retraitAgence: false,
      retraitAnticipe: false,
      unRetraitParCycle: true,
      autoriserRetraitFinCycle: true,
      factureAutomatique: true,
      validationCaissier: true,
      validationComptable: true
    };

    /* ------------------------------------------------------ */
    /* NOTIFICATIONS */
    /* ------------------------------------------------------ */

    this.notifications = {
      nouvellesCotisations: true,
      nouveauxClients: true,
      nouvellesCartes: true,
      retraits: true,
      commissions: true,
      alertesSysteme: true,
      notificationsNavigateur: true,
      notificationsEmail: false
    };

    /* ------------------------------------------------------ */
    /* SÉCURITÉ */
    /* ------------------------------------------------------ */

    this.securite = {
      doubleAuthentification: false,
      expirationSession: 30,
      verrouillageApresEchecs: true,
      nombreTentatives: 5,
      journalisation: true
    };

    /* ------------------------------------------------------ */
    /* SYSTÈME */
    /* ------------------------------------------------------ */

    this.systeme = {
      langue: 'fr',
      fuseauHoraire: 'Africa/Porto-Novo',
      devise: 'FCFA',
      formatDate: 'DD/MM/YYYY',
      theme: 'clair'
    };

    /* ------------------------------------------------------ */
    /* MESSAGE */
    /* ------------------------------------------------------ */

    this.messageSucces =
      'Les paramètres ont été réinitialisés.';

    this.afficherMessageSucces = true;

    setTimeout(() => {
      this.afficherMessageSucces = false;
    }, 4000);
  }

  /* ====================================================== */
  /* FERMER LE MESSAGE */
  /* ====================================================== */

  fermerMessage(): void {
    this.afficherMessageSucces = false;
  }

  /* ====================================================== */
  /* NOM DE L'ONGLET ACTIF */
  /* ====================================================== */

  getNomOngletActif(): string {
    return this.onglets.find(
      onglet => onglet.id === this.ongletActif
    )?.label ?? 'Général';
  }
}